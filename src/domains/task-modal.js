import { t, currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { state } from '../store.js';
import { formatDate, formatTimeAgo, fromEpoch, toEpoch } from '../utils/dates.js';
import { priorityLabel, recurrenceSymbol } from '../utils/labels.js';
import { showToast } from '../ui/toast.js';
import { showConfirmModal } from '../ui/confirm-modal.js';
import { loadAllData } from './data-loader.js';
import { getTaskAttachments, renderAttachmentsSection, uploadTaskAttachments } from './attachments.js';
import { getTaskComments } from './comments.js';
import {
  getTaskTimeEntries, getTaskTotalTime, formatDuration, formatDurationShort,
  pauseTimer, startTimer, addManualTimeEntry
} from './time-tracking.js';
import {
  getTaskSubtasks, getTaskProgress, isSubtaskBlocked, getSubtaskBlocker,
  setStStatus, setStType, setStPill, startEditSubtask, cancelEditSubtask,
  filterStAssignees, openSubtaskDepModal
} from './subtasks.js';
import { generateOccurrences, createNextOccurrence } from './recurrence.js';
import {
  notifyTaskCompleted, notifyConcernedUsers, splitRecipientValues, resolveUserEmail,
  evaluateAutomationRules
} from './notifications.js';
import { myAssigneeValue } from './filters.js';
import { shouldLimitToMyProjects, canEditWorkItems } from './permissions.js';
import { getKanbanStatuses } from './kanban.js';
import { refreshAllViews } from '../ui/tabs.js';
import { setField } from '../config.js';
import { isOverdue, statusLabel } from './tasks.js';
import { getCategories } from './categories.js';
import { getTags } from './tags.js';

// Résout les entrées d'editAssignees (emails/noms, buffer inchangé) vers des
// ids de lignes Utilisateurs, pour l'écriture dans la colonne Assignee
// (devenue Reference List) - lecture et logique de notification restent
// basées sur la chaîne d'emails grâce à la normalisation faite dans
// data-loader.js.
function resolveAssigneeIds(list) {
  var ids = [];
  (list || []).forEach(function(val) {
    var u = state.users.find(function(usr) { return usr.Email === val || usr.Name === val; });
    if (u && ids.indexOf(u.id) === -1) ids.push(u.id);
  });
  return ids;
}

export function getInputValue(id, fallback) {
  var el = document.getElementById(id);
  if (!el) return fallback || '';
  return el.value;
}

export function getEstimatedHoursInput() {
  var raw = String(getInputValue('task-estimated-hours', '')).trim().replace(',', '.');
  if (!raw) return 0;
  var value = parseFloat(raw);
  return isFinite(value) && value >= 0 ? value : 0;
}

export function requireTaskTitle() {
  var modal = document.getElementById('modal-container');
  var titleEl = modal ? modal.querySelector('#task-title') : null;
  var title = titleEl ? titleEl.value.trim() : '';
  if (!title) {
    showToast(currentLang === 'fr' ? 'Ajoutez un titre avant d’enregistrer.' : 'Add a title before saving.', 'error');
    if (titleEl) titleEl.focus();
    return '';
  }
  return title;
}

export async function refreshTaskTableColumns() {
  try {
    var data = await grist.docApi.fetchTable(state.TASKS_TABLE);
    state.taskTableColumns = data ? Object.keys(data) : null;
  } catch (e) {
    state.taskTableColumns = null;
  }
}

export async function keepExistingTaskColumns(record) {
  if (!state.taskTableColumns) await refreshTaskTableColumns();
  if (!state.taskTableColumns) return record;
  var filtered = {};
  Object.keys(record).forEach(function(key) {
    if (state.taskTableColumns.indexOf(key) !== -1) filtered[key] = record[key];
  });
  return filtered;
}

export async function removeCommentsForTask(taskId) {
  var toRemove = state.comments.filter(function(c) { return c.Task_Id === taskId; });
  if (!toRemove.length) return;
  await grist.docApi.applyUserActions(toRemove.map(function(c) {
    return ['RemoveRecord', state.COMMENTS_TABLE, c.id];
  }));
}

export async function removeSubtasksForTask(taskId) {
  var toRemove = state.subtasks.filter(function(st) { return st.Parent_Task_Id === taskId; });
  if (!toRemove.length) return;
  await grist.docApi.applyUserActions(toRemove.map(function(st) {
    return ['RemoveRecord', state.SUBTASKS_TABLE, st.id];
  }));
}

export async function removeAttachmentsForTask(taskId) {
  var toRemove = state.attachments.filter(function(attachment) { return attachment.Task_Id === taskId; });
  if (!toRemove.length) return;
  await grist.docApi.applyUserActions(toRemove.map(function(attachment) {
    return ['RemoveRecord', state.ATTACHMENTS_TABLE, attachment.id];
  }));
}

export async function removeTimeEntriesForTask(taskId) {
  var toRemove = state.timeEntries.filter(function(entry) { return entry.Task_Id === taskId; });
  if (!toRemove.length) return;
  await grist.docApi.applyUserActions(toRemove.map(function(entry) {
    return ['RemoveRecord', state.TIME_ENTRIES_TABLE, entry.id];
  }));
  delete state.activeTimers[taskId];
}

export async function removeDraftChildren(taskId) {
  await removeCommentsForTask(taskId);
  await removeSubtasksForTask(taskId);
  await removeAttachmentsForTask(taskId);
  await removeTimeEntriesForTask(taskId);
}

export function captureTaskFormState() {
  var autoExtendEl = document.getElementById('task-auto-extend');
  return {
    title: getInputValue('task-title'),
    description: getInputValue('task-desc'),
    status: getInputValue('task-status'),
    priority: getInputValue('task-priority'),
    group: getInputValue('task-group'),
    start: getInputValue('task-start'),
    due: getInputValue('task-due'),
    category: getInputValue('task-category'),
    project: getInputValue('task-project'),
    recurrence: getInputValue('task-recurrence', 'none'),
    estimatedHours: getInputValue('task-estimated-hours'),
    extensionDate: getInputValue('task-extension-date'),
    autoExtend: autoExtendEl ? autoExtendEl.checked : null
  };
}

export function restoreTaskFormState(state) {
  if (!state) return;
  [
    ['task-title', state.title],
    ['task-desc', state.description],
    ['task-status', state.status],
    ['task-priority', state.priority],
    ['task-group', state.group],
    ['task-start', state.start],
    ['task-due', state.due],
    ['task-category', state.category],
    ['task-project', state.project],
    ['task-recurrence', state.recurrence],
    ['task-estimated-hours', state.estimatedHours],
    ['task-extension-date', state.extensionDate]
  ].forEach(function(pair) {
    var el = document.getElementById(pair[0]);
    if (el && pair[1] !== undefined && pair[1] !== null) el.value = pair[1];
  });
  var autoExtendEl = document.getElementById('task-auto-extend');
  if (autoExtendEl && state.autoExtend !== null) autoExtendEl.checked = state.autoExtend;
}

export function openNewTaskModal(defaultStatus) {
  if (!canEditWorkItems()) {
    showToast(currentLang === 'fr' ? 'Vous n’avez pas les droits pour créer une tâche.' : 'You do not have permission to create a task.', 'error');
    return;
  }
  return startNewTask(defaultStatus); // approche brouillon -> éditeur complet
}

export var editAssignees = [];
export var editAccountable = [];
export var editConsulted = [];
export var editInformed = [];
export var editTags = [];
export var draftTaskId = null; // id de la tâche brouillon en cours de création (approche "créer puis éditer")

export function renderTagChips() {
  var html = '';
  for (var i = 0; i < editTags.length; i++) {
    var tagObj = getTags().find(function(tg) { return tg.name === editTags[i]; });
    var color = tagObj ? tagObj.color : '#94a3b8';
    html += '<span class="assignee-chip-tag" style="border-color:' + color + ';color:' + color + ';">' + sanitize(editTags[i]) + ' <span class="chip-remove" onclick="removeTagChip(' + i + ')">✕</span></span>';
  }
  return html;
}

export function renderTagField() {
  var tagSelectOptions = '<option value="">-- ' + t('tag') + ' --</option>';
  getTags().forEach(function(tg) {
    tagSelectOptions += '<option value="' + sanitize(tg.name) + '">' + sanitize(tg.name) + '</option>';
  });
  var html = '<div class="detail-field">';
  html += '<span class="detail-field-icon">🏷️</span>';
  html += '<span class="detail-field-label">' + t('tag') + '</span>';
  html += '<div class="detail-field-value">';
  html += '<div class="assignee-chips" id="tag-chips">' + renderTagChips() + '</div>';
  html += '<div class="assignee-add-row">';
  html += '<select id="tag-select">' + tagSelectOptions + '</select>';
  html += '<button class="assignee-add-btn" onclick="addTagChip()">' + (currentLang === 'fr' ? 'Ajouter' : 'Add') + '</button>';
  html += '</div></div></div>';
  return html;
}

export function addTagChip() {
  var sel = document.getElementById('tag-select');
  if (!sel) return;
  var val = sel.value;
  if (!val || editTags.indexOf(val) !== -1) return;
  editTags.push(val);
  var container = document.getElementById('tag-chips');
  if (container) container.innerHTML = renderTagChips();
  sel.value = '';
}

export function removeTagChip(index) {
  editTags.splice(index, 1);
  var container = document.getElementById('tag-chips');
  if (container) container.innerHTML = renderTagChips();
}

// Crée une tâche brouillon immédiatement puis ouvre l'éditeur COMPLET.
// À la fermeture : si un titre a été saisi -> enregistrée ; sinon -> brouillon supprimé.
export async function startNewTask(defaultStatus, dateStr, prefill) {
  prefill = prefill || {};
  var statuses = getKanbanStatuses();
  if (shouldLimitToMyProjects() && editAssignees.length === 0) {
    var mine = myAssigneeValue();
    if (mine) editAssignees = [mine];
  }
  var record = {};
  setField(record, 'tasks', 'title', prefill.title || '');
  setField(record, 'tasks', 'status', defaultStatus || (statuses[0] && statuses[0].key) || 'todo');
  setField(record, 'tasks', 'priority', prefill.priority || 'medium');
  if (prefill.description) setField(record, 'tasks', 'description', prefill.description);
  if (prefill.category) setField(record, 'tasks', 'category', prefill.category);
  if (prefill.group) setField(record, 'tasks', 'group', prefill.group);
  if (prefill.tag) setField(record, 'tasks', 'tag', ['L', prefill.tag]);
  if (prefill.recurrence && prefill.recurrence !== 'none') setField(record, 'tasks', 'recurrence', prefill.recurrence);
  if (prefill.estimatedHours) setField(record, 'tasks', 'estimatedHours', prefill.estimatedHours);
  if (editAssignees.length > 0) setField(record, 'tasks', 'assignee', ['L'].concat(resolveAssigneeIds(editAssignees)));
  if (state.currentProjectId) setField(record, 'tasks', 'projectId', state.currentProjectId);
  setField(record, 'tasks', 'createdAt', Math.floor(Date.now() / 1000));
  if (state.TASKS_TABLE === state.DEFAULT_TASKS_TABLE) record.Auto_Extend = true;
  if (dateStr) { setField(record, 'tasks', 'startDate', toEpoch(dateStr)); setField(record, 'tasks', 'dueDate', toEpoch(dateStr)); }
  try {
    record = await keepExistingTaskColumns(record);
    var res = await grist.docApi.applyUserActions([['AddRecord', state.TASKS_TABLE, null, record]]);
    var newId = (res && res.retValues && res.retValues[0]) || null;
    if (!newId) { showToast('Error', 'error'); return; }
    draftTaskId = newId;
    await loadAllData();
    await removeDraftChildren(newId);
    await loadAllData();
    openEditTaskModal(newId);
  } catch (e) { showToast('Error: ' + e.message, 'error'); }
}

export function openEditTaskModal(taskId, preserveAssignees) {
  var task = state.tasks.find(function(t) { return t.id === taskId; });
  if (!task) return;

  if (!preserveAssignees) {
    editAssignees = task.Assignee ? task.Assignee.split(',').map(function(a) { return a.trim(); }).filter(Boolean) : [];
    editAccountable = task.Accountable ? task.Accountable.split(',').map(function(a) { return a.trim(); }).filter(Boolean) : [];
    editConsulted = task.Consulted ? task.Consulted.split(',').map(function(a) { return a.trim(); }).filter(Boolean) : [];
    editInformed = task.Informed ? task.Informed.split(',').map(function(a) { return a.trim(); }).filter(Boolean) : [];
    editTags = Array.isArray(task.Tag) ? task.Tag.slice() : [];
  }

  var groupOptions = '<option value="">--</option>';
  for (var i = 0; i < state.groups.length; i++) {
    var sel = state.groups[i].Name === task.Group_Name ? ' selected' : '';
    groupOptions += '<option value="' + sanitize(state.groups[i].Name) + '"' + sel + '>' + sanitize(state.groups[i].Name) + '</option>';
  }

  var startVal = task.Start_Date ? new Date(task.Start_Date * 1000).toISOString().split('T')[0] : '';
  var dueVal = task.Due_Date ? new Date(task.Due_Date * 1000).toISOString().split('T')[0] : '';

  // Progress calculation based on subtasks
  var progressPct = getTaskProgress(task);
  var barClass = progressPct === 100 ? 'bar-done' : (progressPct >= 50 ? 'bar-progress' : 'bar-todo');

  // Priority dot color
  var dotColor = task.Priority === 'high' ? '#ef4444' : (task.Priority === 'medium' ? '#f59e0b' : '#22c55e');

  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal modal-detail" onclick="event.stopPropagation()">';

  // Top bar: group + status badge
  html += '<div class="modal-detail-top">';
  html += '<span class="group-dot" style="background:' + dotColor + '"></span>';
  if (task.Group_Name) html += '<span style="font-size:12px;color:#64748b;">' + sanitize(task.Group_Name) + '</span>';
  html += '<span class="status-badge status-' + task.Status + '">● ' + statusLabel(task.Status) + '</span>';
  html += '<div style="flex:1;"></div>';
  html += '<button type="button" id="task-save-top-' + task.id + '" class="btn btn-primary" onclick="event.preventDefault();event.stopPropagation();updateTask(' + task.id + ')" style="padding:6px 16px;font-size:12px;border-radius:8px;margin-right:8px;">💾 ' + t('save') + '</button>';
  html += '<button class="modal-close" onclick="closeModalForce()">✕</button>';
  html += '</div>';

  // Content: left + right
  html += '<div class="modal-detail-content">';

  // === LEFT PANEL ===
  html += '<div class="modal-detail-left">';
  html += '<input class="detail-title-input" type="text" id="task-title" value="' + sanitize(task.Title) + '" />';

  // Description
  html += '<div class="detail-field">';
  html += '<div class="detail-field-value"><textarea id="task-desc" placeholder="' + t('fieldDescription') + '">' + sanitize(task.Description) + '</textarea></div>';
  html += '</div>';

  // Assignees (multi) — or RACI roles
  if (state.raciEnabled) {
    html += renderRaciField('R', t('raciResponsible'), 'assignee', 'editAssignees');
    html += renderRaciField('A', t('raciAccountable'), 'accountable', 'editAccountable');
    html += renderRaciField('C', t('raciConsulted'), 'consulted', 'editConsulted');
    html += renderRaciField('I', t('raciInformed'), 'informed', 'editInformed');
  } else {
    html += '<div class="detail-field">';
    html += '<span class="detail-field-icon">👤</span>';
    html += '<span class="detail-field-label">' + t('fieldAssignee') + '</span>';
    html += '<div class="detail-field-value">';
    html += '<div class="assignee-chips" id="assignee-chips">';
    html += renderRaciChips('editAssignees');
    html += '</div>';
    html += '<div class="assignee-add-row">';
    html += '<select id="assignee-select">';
    html += '<option value="">-- ' + t('searchAssignee') + ' --</option>';
    for (var i = 0; i < state.users.length; i++) {
      html += '<option value="' + sanitize(state.users[i].Email || state.users[i].Name) + '">' + sanitize(state.users[i].Name || state.users[i].Email) + '</option>';
    }
    html += '</select>';
    html += '<button class="assignee-add-btn" onclick="addRaciChip(\'editAssignees\',\'assignee\')">' + t('addAssignee') + '</button>';
    html += '</div>';
    html += '</div></div>';
  }

  // Status
  html += '<div class="detail-field">';
  html += '<span class="detail-field-icon">📊</span>';
  html += '<span class="detail-field-label">' + t('fieldStatus') + '</span>';
  html += '<div class="detail-field-value"><select id="task-status">';
  var _statuses2 = getKanbanStatuses();
  for (var _si2 = 0; _si2 < _statuses2.length; _si2++) {
    var _s2 = _statuses2[_si2];
    var _sl2 = currentLang === 'fr' ? _s2.label_fr : _s2.label_en;
    html += '<option value="' + _s2.key + '"' + (task.Status === _s2.key ? ' selected' : '') + '>' + _sl2 + '</option>';
  }
  html += '</select></div></div>';

  // Dates
  html += '<div class="detail-field">';
  html += '<span class="detail-field-icon">📅</span>';
  html += '<span class="detail-field-label">' + t('fieldStartDate') + '</span>';
  html += '<div class="detail-field-value"><input type="date" id="task-start" value="' + startVal + '" /></div>';
  html += '</div>';

  html += '<div class="detail-field">';
  html += '<span class="detail-field-icon">⏰</span>';
  html += '<span class="detail-field-label">' + t('fieldDueDate') + '</span>';
  html += '<div class="detail-field-value"><input type="date" id="task-due" value="' + dueVal + '" /></div>';
  html += '</div>';

  // Priority
  html += '<div class="detail-field">';
  html += '<span class="detail-field-icon">🔥</span>';
  html += '<span class="detail-field-label">' + t('fieldPriority') + '</span>';
  html += '<div class="detail-field-value"><select id="task-priority">';
  html += '<option value="high"' + (task.Priority === 'high' ? ' selected' : '') + '>' + t('priorityHigh') + '</option>';
  html += '<option value="medium"' + (task.Priority === 'medium' ? ' selected' : '') + '>' + t('priorityMedium') + '</option>';
  html += '<option value="low"' + (task.Priority === 'low' ? ' selected' : '') + '>' + t('priorityLow') + '</option>';
  html += '</select></div></div>';

  // Group
  html += '<div class="detail-field">';
  html += '<span class="detail-field-icon">👥</span>';
  html += '<span class="detail-field-label">' + t('fieldGroup') + '</span>';
  html += '<div class="detail-field-value"><select id="task-group">' + groupOptions + '</select></div>';
  html += '</div>';

  // Project
  var projectOptions = '<option value="">' + t('noProject') + '</option>';
  for (var pi = 0; pi < state.projects.length; pi++) {
    var projSel = state.projects[pi].id === task.Project_Id ? ' selected' : '';
    projectOptions += '<option value="' + state.projects[pi].id + '"' + projSel + '>' + sanitize(state.projects[pi].Name) + '</option>';
  }
  html += '<div class="detail-field">';
  html += '<span class="detail-field-icon">📂</span>';
  html += '<span class="detail-field-label">' + t('project') + '</span>';
  html += '<div class="detail-field-value"><select id="task-project">' + projectOptions + '</select></div>';
  html += '</div>';

  // Category
  var categoryOptions = '<option value="">--</option>';
  var editCategories = getCategories();
  for (var ci = 0; ci < editCategories.length; ci++) {
    var catSel = editCategories[ci].name === task.Category ? ' selected' : '';
    categoryOptions += '<option value="' + sanitize(editCategories[ci].name) + '"' + catSel + '>' + sanitize(editCategories[ci].name) + '</option>';
  }
  html += '<div class="detail-field">';
  html += '<span class="detail-field-icon">📁</span>';
  html += '<span class="detail-field-label">' + t('fieldCategory') + '</span>';
  html += '<div class="detail-field-value"><select id="task-category">' + categoryOptions + '</select></div>';
  html += '</div>';

  // Tag (multi-sélection par puces, sur le modèle des puces RACI)
  html += renderTagField();

  // === SUBTASKS SECTION ===
  var taskSubtasks = getTaskSubtasks(task.id);
  html += '<div class="subtasks-section">';
  html += '<div class="subtasks-header">';
  html += '<span class="detail-field-icon">☑️</span>';
  html += '<span class="detail-field-label">' + t('subtasks') + '</span>';
  html += '<span class="subtask-badge">' + taskSubtasks.filter(function(st) { return st.Completed; }).length + '/' + taskSubtasks.length + '</span>';
  html += '</div>';
  
  html += '<div class="subtasks-list" id="subtasks-list">';
  if (taskSubtasks.length === 0) {
    html += '<div class="subtasks-empty">' + t('noSubtasks') + '</div>';
  } else {
    for (var si = 0; si < taskSubtasks.length; si++) {
      var st = taskSubtasks[si];
      var stBlocked = isSubtaskBlocked(st);
      var stBlocker = getSubtaskBlocker(st);
      var stDueDateStr = st.Due_Date ? new Date(st.Due_Date * 1000).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
      var stDueClass = (st.Due_Date && !st.Completed && st.Due_Date < Math.floor(Date.now() / 1000)) ? ' st-overdue' : '';
      html += '<div class="subtask-item' + (st.Completed ? ' completed' : '') + (stBlocked ? ' blocked' : '') + '" data-id="' + st.id + '" id="st-row-' + st.id + '">';
      // Normal view
      html += '<div class="subtask-view" id="st-view-' + st.id + '">';
      html += '<input type="checkbox" class="subtask-checkbox" ' + (st.Completed ? 'checked' : '') + (stBlocked ? ' disabled' : '') + ' onchange="toggleSubtask(' + st.id + ', this.checked)" />';
      html += '<span class="subtask-title">' + sanitize(st.Title) + '</span>';
      if (stBlocked && stBlocker) {
        html += '<span class="subtask-blocked-badge" title="' + t('blockedBy') + ' ' + sanitize(stBlocker.Title) + '">🔒</span>';
      }
      // Meta : status + priority + assignee + due date
      html += '<span class="subtask-meta">';
      if (st.Status && st.Status !== 'todo') {
        var stStatusColor = st.Status === 'done' ? '#22c55e' : '#f59e0b';
        html += '<span class="subtask-assignee-badge" style="background:' + stStatusColor + '20;color:' + stStatusColor + ';">' + (st.Status === 'done' ? '✅' : '🔄') + '</span>';
      }
      if (st.Priority && st.Priority !== 'medium') {
        var stPrioColor = st.Priority === 'high' ? '#ef4444' : '#94a3b8';
        html += '<span class="subtask-assignee-badge" style="background:' + stPrioColor + '20;color:' + stPrioColor + ';">' + (st.Priority === 'high' ? '🔴' : '⬇️') + '</span>';
      }
      if (st.Assignee) {
        st.Assignee.split(',').map(function(a) { return a.trim(); }).filter(Boolean).forEach(function(an) {
          html += '<span class="subtask-assignee-badge">👤 ' + sanitize(an) + '</span>';
        });
      }
      if (stDueDateStr) html += '<span class="subtask-due-badge' + stDueClass + '">📅 ' + stDueDateStr + '</span>';
      if (st.Estimated_Hours) html += '<span class="subtask-assignee-badge">⏱ ' + st.Estimated_Hours + 'h</span>';
      if (st.Recurrence && st.Recurrence !== 'none') {
        var recSymbol = recurrenceSymbol(st.Recurrence);
        html += '<span class="subtask-assignee-badge" title="' + t('recurrence') + '">'+  recSymbol + '</span>';
      }
      html += '</span>';
      if (st.Recurrence && st.Recurrence !== 'none') {
        html += '<button class="subtask-dep-btn" onclick="generateSubtaskOccurrences(' + st.id + ', ' + task.id + ')" title="' + t('generateMonth') + '">📅+</button>';
      }
      html += '<button class="subtask-edit-btn" onclick="startEditSubtask(' + st.id + ', ' + task.id + ')" title="' + t('editSubtask') + '">✏️</button>';
      html += '<button class="subtask-dep-btn" onclick="openSubtaskDepModal(' + st.id + ', ' + task.id + ')" title="' + t('dependencies') + '">🔗</button>';
      html += '<button class="subtask-delete" onclick="deleteSubtask(' + st.id + ', ' + task.id + ')" title="' + t('delete') + '">✕</button>';
      html += '</div>';
      // Edit view (hidden by default)
      // Assignés multiples : liste de cases à cocher (comme les tâches, séparés par virgule)
      var stAssignees = (st.Assignee || '').split(',').map(function(a) { return a.trim(); }).filter(Boolean);
      var assigneeListHtml = '<div class="st-assignee-list" id="st-assignee-' + st.id + '" style="display:flex;flex-wrap:wrap;gap:4px 10px;max-height:84px;overflow-y:auto;padding:6px 8px;border:1px solid #e2e8f0;border-radius:8px;">';
      if (state.users.length === 0) {
        assigneeListHtml += '<span style="font-size:11px;color:#94a3b8;">' + (currentLang === 'fr' ? 'Aucun membre' : 'No members') + '</span>';
      }
      for (var ui = 0; ui < state.users.length; ui++) {
        var uName = state.users[ui].Name;
        var uChk = stAssignees.indexOf(uName) !== -1 ? ' checked' : '';
        assigneeListHtml += '<label style="display:inline-flex;align-items:center;gap:4px;font-size:12px;cursor:pointer;white-space:nowrap;"><input type="checkbox" value="' + sanitize(uName) + '"' + uChk + '> ' + sanitize(uName) + '</label>';
      }
      assigneeListHtml += '</div>';
      var stDueDateInput = st.Due_Date ? new Date(st.Due_Date * 1000).toISOString().split('T')[0] : '';
      var stStatus = st.Status || 'todo';
      var stPriority = st.Priority || 'medium';
      var stLbl = { todo: t('statusTodo'), progress: t('statusProgress'), done: t('statusDone') };
      var prLbl = { high: t('priorityHigh'), medium: t('priorityMedium'), low: t('priorityLow') };
      html += '<div class="subtask-edit-form" id="st-edit-' + st.id + '">';
      // Title
      html += '<input type="text" class="subtask-edit-title" id="st-title-' + st.id + '" value="' + sanitize(st.Title) + '" placeholder="' + (currentLang === 'fr' ? 'Titre de la sous-tâche...' : 'Subtask title...') + '">';
      // Description
      html += '<textarea class="subtask-edit-title" id="st-desc-' + st.id + '" rows="2" placeholder="' + (currentLang === 'fr' ? 'Description (optionnel)...' : 'Description (optional)...') + '" style="resize:vertical;">' + sanitize(st.Description || '') + '</textarea>';
      // B2 : type (sous-tâche / jalon)
      var stType = st.Type || 'subtask';
      html += '<div><div class="st-pill-label">' + (currentLang === 'fr' ? 'Type' : 'Type') + '</div>';
      html += '<div class="st-pill-group">';
      html += '<button type="button" class="st-pill' + (stType !== 'milestone' ? ' active-progress' : '') + '" onclick="setStType(' + st.id + ',\'subtask\',this)">' + (currentLang === 'fr' ? '↳ Sous-tâche' : '↳ Subtask') + '</button>';
      html += '<button type="button" class="st-pill' + (stType === 'milestone' ? ' active-progress' : '') + '" onclick="setStType(' + st.id + ',\'milestone\',this)">' + (currentLang === 'fr' ? '◆ Jalon (1 date)' : '◆ Milestone (1 date)') + '</button>';
      html += '</div>';
      html += '<input type="hidden" id="st-type-' + st.id + '" value="' + stType + '">';
      html += '</div>';
      // Status pills — statuts personnalisés (getKanbanStatuses), avec couleur réelle
      html += '<div>';
      html += '<div class="st-pill-label">' + (currentLang === 'fr' ? 'Statut' : 'Status') + '</div>';
      html += '<div class="st-pill-group" id="st-status-group-' + st.id + '">';
      getKanbanStatuses().forEach(function(s) {
        var sLbl = (s.emoji ? s.emoji + ' ' : '') + (currentLang === 'fr' ? s.label_fr : s.label_en);
        var sActiveStyle = (stStatus === s.key) ? ('background:' + (s.color || '#3b82f6') + ';color:#fff;border-color:' + (s.color || '#3b82f6') + ';') : '';
        html += '<button type="button" class="st-pill" style="' + sActiveStyle + '" onclick="setStStatus(' + st.id + ',\'' + s.key + '\',this)">' + sanitize(sLbl) + '</button>';
      });
      html += '</div>';
      html += '<input type="hidden" id="st-status-' + st.id + '" value="' + stStatus + '">';
      html += '</div>';
      // Priority pills
      html += '<div>';
      html += '<div class="st-pill-label">' + (currentLang === 'fr' ? 'Priorité' : 'Priority') + '</div>';
      html += '<div class="st-pill-group" id="st-priority-group-' + st.id + '">';
      ['high','medium','low'].forEach(function(p) {
        html += '<button type="button" class="st-pill' + (stPriority === p ? ' active-' + p : '') + '" onclick="setStPill(\'priority\',' + st.id + ',\'' + p + '\',this)">' + prLbl[p] + '</button>';
      });
      html += '</div>';
      html += '<input type="hidden" id="st-priority-' + st.id + '" value="' + stPriority + '">';
      html += '</div>';
      // Assignés (multiples)
      html += '<div>';
      html += '<div class="st-pill-label">' + t('subtaskAssignee') + (currentLang === 'fr' ? ' (plusieurs possibles)' : ' (multiple)') + '</div>';
      if (state.users.length > 1) {
        html += '<input type="text" id="st-assignee-search-' + st.id + '" oninput="filterStAssignees(' + st.id + ', this.value)" placeholder="' + (currentLang === 'fr' ? '🔍 Rechercher un membre...' : '🔍 Search a member...') + '" style="width:100%;padding:5px 8px;border:1px solid #e2e8f0;border-radius:6px;font-size:12px;margin-bottom:4px;" autocomplete="off">';
      }
      html += assigneeListHtml;
      html += '</div>';
      // Date + hours row
      html += '<div class="st-meta-row">';
      var stStartDateInput = st.Start_Date ? new Date(st.Start_Date * 1000).toISOString().split('T')[0] : '';
      html += '<input type="date" class="subtask-edit-date" id="st-start-' + st.id + '" value="' + stStartDateInput + '" title="' + (currentLang === 'fr' ? 'Date début' : 'Start date') + '">';
      html += '<input type="date" class="subtask-edit-date" id="st-due-' + st.id + '" value="' + stDueDateInput + '" title="' + (currentLang === 'fr' ? 'Échéance' : 'Due date') + '">';
      html += '<input type="number" class="st-hours-input" id="st-hours-' + st.id + '" value="' + (st.Estimated_Hours || '') + '" placeholder="' + (currentLang === 'fr' ? 'Heures' : 'Hours') + '" min="0" step="0.5">';
      html += '</div>';
      // Recurrence
      var stRecur = st.Recurrence || 'none';
      html += '<div style="display:flex;align-items:center;gap:8px;margin-top:6px;">';
      html += '<span style="font-size:11px;color:#64748b;">🔄 ' + (currentLang === 'fr' ? 'Récurrence' : 'Recurrence') + '</span>';
      html += '<select id="st-recur-' + st.id + '" style="flex:1;font-size:12px;">';
      html += '<option value="none"' + (stRecur === 'none' ? ' selected' : '') + '>' + t('recurrenceNone') + '</option>';
      html += '<option value="daily"' + (stRecur === 'daily' ? ' selected' : '') + '>' + t('recurrenceDaily') + '</option>';
      html += '<option value="weekly"' + (stRecur === 'weekly' ? ' selected' : '') + '>' + t('recurrenceWeekly') + '</option>';
      html += '<option value="biweekly"' + (stRecur === 'biweekly' ? ' selected' : '') + '>' + t('recurrenceBiweekly') + '</option>';
      html += '<option value="monthly"' + (stRecur === 'monthly' ? ' selected' : '') + '>' + t('recurrenceMonthly') + '</option>';
      html += '<option value="quarterly"' + (stRecur === 'quarterly' ? ' selected' : '') + '>' + t('recurrenceQuarterly') + '</option>';
      html += '<option value="yearly"' + (stRecur === 'yearly' ? ' selected' : '') + '>' + t('recurrenceYearly') + '</option>';
      html += '</select>';
      html += '</div>';
      // Actions
      html += '<div class="st-form-actions">';
      html += '<button type="button" class="subtask-cancel-btn" onclick="cancelEditSubtask(' + st.id + ')">' + (currentLang === 'fr' ? 'Annuler' : 'Cancel') + '</button>';
      html += '<button type="button" class="subtask-save-btn" onclick="saveEditSubtask(' + st.id + ', ' + task.id + ')">✓ ' + (currentLang === 'fr' ? 'Enregistrer' : 'Save') + '</button>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
    }
  }
  html += '</div>';

  // Add subtask input
  html += '<div class="subtask-add-row">';
  html += '<input type="text" id="new-subtask-input" class="subtask-input" placeholder="' + t('subtaskPlaceholder') + '" onkeypress="if(event.key===\'Enter\'){event.preventDefault();addSubtask(' + task.id + ');}" />';
  html += '<button type="button" class="subtask-add-btn" onclick="event.preventDefault();addSubtask(' + task.id + ')">+</button>';
  html += '</div>';
  html += '</div>';

  // === ATTACHMENTS SECTION (D2) ===
  html += '<div class="attachments-section">';
  html += '<div class="comments-header">';
  html += '<span class="detail-field-icon">📎</span>';
  html += '<span class="detail-field-label">' + (currentLang === 'fr' ? 'Pièces jointes' : 'Attachments') + '</span>';
  html += '<span class="comment-badge">' + getTaskAttachments(task.id).length + '</span>';
  html += '</div>';
  html += '<div class="attachments-list" id="attachments-list-' + task.id + '"></div>';
  html += '<div class="attach-add-row">';
  html += '<label class="attach-upload-btn">📎 ' + (currentLang === 'fr' ? 'Ajouter un fichier' : 'Add file') + '<input type="file" multiple style="display:none;" onchange="uploadTaskAttachments(' + task.id + ', Array.from(this.files)); this.value=\'\';"></label>';
  html += '<span class="attach-status" id="attach-status-' + task.id + '"></span>';
  html += '</div>';
  html += '<div class="attach-hint">' + (currentLang === 'fr' ? 'Tous formats · max 5 Mo par fichier (images compressées automatiquement)' : 'All formats · max 5MB per file (images auto-compressed)') + '</div>';
  html += '</div>';

  // === COMMENTS SECTION ===
  var taskComments = getTaskComments(task.id);
  html += '<div class="comments-section">';
  html += '<div class="comments-header">';
  html += '<span class="detail-field-icon">💬</span>';
  html += '<span class="detail-field-label">' + t('comments') + '</span>';
  html += '<span class="comment-badge">' + taskComments.length + '</span>';
  html += '</div>';
  
  html += '<div class="comments-list" id="comments-list">';
  if (taskComments.length === 0) {
    html += '<div class="comments-empty">' + t('noComments') + '</div>';
  } else {
    for (var ci = 0; ci < taskComments.length; ci++) {
      var cmt = taskComments[ci];
      html += '<div class="comment-item">';
      html += '<div class="comment-header">';
      html += '<span class="comment-author">👤 ' + sanitize(cmt.Author || 'Anonyme') + '</span>';
      html += '<span class="comment-time">' + formatTimeAgo(cmt.Created_At) + '</span>';
      if (state.isOwner) html += '<button class="comment-delete" onclick="deleteComment(' + cmt.id + ', ' + task.id + ')">✕</button>';
      html += '</div>';
      html += '<div class="comment-content">' + sanitize(cmt.Content) + '</div>';
      html += '</div>';
    }
  }
  html += '</div>';
  
  // Add comment input
  html += '<div class="comment-add-row">';
  html += '<textarea id="new-comment-input" class="comment-input" placeholder="' + t('commentPlaceholder') + '" rows="2"></textarea>';
  html += '<button type="button" class="comment-add-btn" onclick="event.preventDefault();addComment(' + task.id + ')">' + t('addComment') + '</button>';
  html += '</div>';
  html += '</div>';

  html += '</div>'; // end left

  // === RIGHT PANEL ===
  html += '<div class="modal-detail-right">';

  // Progression card
  html += '<div class="detail-card">';
  html += '<h4>⏳ ' + t('progression') + '</h4>';
  html += '<div class="detail-info-row"><span class="info-label">' + t('advancement') + '</span><span class="info-value">' + progressPct + '%</span></div>';
  html += '<div class="progress-bar-bg"><div class="progress-bar-fill ' + barClass + '" style="width:' + progressPct + '%"></div></div>';
  html += '<div class="detail-info-row"><span class="info-label">' + t('startLabel') + '</span><span class="info-value">' + (startVal ? formatDate(task.Start_Date) : '--') + '</span></div>';
  html += '<div class="detail-info-row"><span class="info-label">' + t('dueLabel') + '</span><span class="info-value" style="' + (isOverdue(task) ? 'color:#dc2626;' : '') + '">' + (dueVal ? formatDate(task.Due_Date) : '--') + (isOverdue(task) ? ' ⚠️' : '') + '</span></div>';
  html += '</div>';

  // Quick actions card
  html += '<div class="detail-card">';
  html += '<h4>⚡ ' + t('quickActions') + '</h4>';
  if (task.Status === 'done') {
    html += '<button class="quick-action-btn" onclick="quickAction(' + task.id + ',\'todo\')">🔄 ' + t('reopenTask') + '</button>';
  } else if (task.Status === 'todo') {
    html += '<button class="quick-action-btn" onclick="quickAction(' + task.id + ',\'progress\')">▶️ ' + t('startTask') + '</button>';
    html += '<button class="quick-action-btn" onclick="quickAction(' + task.id + ',\'done\')">✅ ' + t('completeTask') + '</button>';
  } else {
    html += '<button class="quick-action-btn" onclick="quickAction(' + task.id + ',\'done\')">✅ ' + t('completeTask') + '</button>';
    html += '<button class="quick-action-btn" onclick="quickAction(' + task.id + ',\'todo\')">⏪ ' + t('reopenTask') + '</button>';
  }
  html += '</div>';

  // Summary card
  html += '<div class="detail-card">';
  html += '<h4>📋 ' + t('taskSummary') + '</h4>';
  html += '<div class="detail-info-row"><span class="info-label">' + t('fieldStatus') + ' :</span><span class="info-value" style="color:' + (task.Status === 'done' ? '#22c55e' : (task.Status === 'progress' ? '#3b82f6' : '#f59e0b')) + '">' + statusLabel(task.Status) + '</span></div>';
  html += '<div class="detail-info-row"><span class="info-label">' + t('fieldPriority') + ' :</span><span class="info-value" style="color:' + dotColor + '">' + priorityLabel(task.Priority) + '</span></div>';
  html += '<div class="detail-info-row"><span class="info-label">' + t('fieldAssignee') + ' :</span><span class="info-value">' + editAssignees.length + '</span></div>';
  html += '</div>';

  // Time Tracking card
  var totalTime = getTaskTotalTime(task.id);
  var isTimerRunning = !!state.activeTimers[task.id];
  var taskTimeEntries = getTaskTimeEntries(task.id);
	  html += '<div class="detail-card time-card">';
	  html += '<h4>⏱️ ' + t('timeTracking') + '</h4>';
	  html += '<label for="task-estimated-hours" style="display:block;font-size:11px;font-weight:700;color:#64748b;margin-bottom:4px;">' + t('estimatedTime') + ' (h)</label>';
	  html += '<input type="number" id="task-estimated-hours" min="0" step="0.5" value="' + (task.Estimated_Hours || '') + '" placeholder="Ex. 8" class="form-input" style="width:100%;margin-bottom:10px;" />';
	  
	  // Timer button
  html += '<div class="timer-control">';
  if (isTimerRunning) {
    html += '<button class="timer-btn timer-stop" onclick="pauseTimer(' + task.id + ')">⏸️ Pause</button>';
    html += '<span class="timer-status running">● ' + t('timerRunning') + '</span>';
  } else {
    html += '<button class="timer-btn timer-start" onclick="startTimer(' + task.id + ')">▶️ ' + t('startTimer') + '</button>';
  }
  html += '</div>';
  
  // Manual time entry
  html += '<div class="manual-time-entry" style="display:flex;align-items:center;gap:6px;margin-top:8px;flex-wrap:wrap;">';
  html += '<input type="number" id="manual-hours" min="0" max="99" placeholder="0" style="width:52px;" class="form-input" title="' + (currentLang === 'fr' ? 'Heures' : 'Hours') + '"> h';
  html += '<input type="number" id="manual-minutes" min="0" max="59" placeholder="0" style="width:52px;" class="form-input" title="' + (currentLang === 'fr' ? 'Minutes' : 'Minutes') + '"> min';
  html += '<button class="btn btn-secondary btn-sm" onclick="addManualTimeEntry(' + task.id + ')">+ ' + (currentLang === 'fr' ? 'Ajouter' : 'Add') + '</button>';
  html += '</div>';

  // Time summary
  html += '<div class="time-summary">';
  html += '<div class="detail-info-row"><span class="info-label">' + t('totalTime') + ' :</span><span class="info-value time-value">' + formatDuration(totalTime) + '</span></div>';
  if (task.Estimated_Hours) {
    var estimatedSec = task.Estimated_Hours * 3600;
    var pctUsed = Math.round((totalTime / estimatedSec) * 100);
    html += '<div class="detail-info-row"><span class="info-label">' + t('estimatedTime') + ' :</span><span class="info-value">' + task.Estimated_Hours + 'h (' + pctUsed + '%)</span></div>';
  }
  html += '</div>';
  
  // Recent time entries (newest first)
  if (taskTimeEntries.length > 0) {
    html += '<div class="time-entries">';
    html += '<div class="time-entries-label">' + t('timeEntries') + ':</div>';
    html += '<div style="max-height:120px;overflow-y:auto;">';
    for (var tei = 0; tei < taskTimeEntries.length; tei++) {
      var te = taskTimeEntries[tei];
      html += '<div class="time-entry-item">';
      html += '<span class="te-duration">' + formatDurationShort(te.Duration) + '</span>';
      html += '<span class="te-date">' + formatTimeAgo(te.Start_Time) + '</span>';
      html += '</div>';
    }
    html += '</div>';
    html += '</div>';
  }
  html += '</div>';

  // Extension card
  html += '<div class="detail-card">';
  html += '<h4>📏 ' + t('extensionDate') + '</h4>';
  var extDateVal = task.Extension_Date ? fromEpoch(task.Extension_Date) : '';
  html += '<div style="margin-bottom:10px;"><input type="date" id="task-extension-date" value="' + extDateVal + '" style="width:100%;padding:6px 10px;border:1px solid #e2e8f0;border-radius:6px;font-size:12px;" /></div>';
  html += '<label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer;">';
  html += '<input type="checkbox" id="task-auto-extend" ' + (task.Auto_Extend ? 'checked' : '') + ' style="width:16px;height:16px;accent-color:#3b82f6;flex-shrink:0;margin-top:2px;" />';
  html += '<span style="font-size:11px;color:#64748b;line-height:1.3;">' + t('autoExtendHint') + '</span>';
  html += '</label>';
  html += '</div>';

  // Recurrence card
  var hasRecurrence = task.Recurrence && task.Recurrence !== 'none';
  html += '<div class="detail-card">';
  html += '<h4>🔄 ' + t('recurrence') + '</h4>';
  html += '<select id="task-recurrence" class="recurrence-select">';
  html += '<option value="none"' + (!hasRecurrence ? ' selected' : '') + '>' + t('recurrenceNone') + '</option>';
  html += '<option value="daily"' + (task.Recurrence === 'daily' ? ' selected' : '') + '>' + t('recurrenceDaily') + '</option>';
  html += '<option value="weekly"' + (task.Recurrence === 'weekly' ? ' selected' : '') + '>' + t('recurrenceWeekly') + '</option>';
  html += '<option value="biweekly"' + (task.Recurrence === 'biweekly' ? ' selected' : '') + '>' + t('recurrenceBiweekly') + '</option>';
  html += '<option value="monthly"' + (task.Recurrence === 'monthly' ? ' selected' : '') + '>' + t('recurrenceMonthly') + '</option>';
  html += '<option value="quarterly"' + (task.Recurrence === 'quarterly' ? ' selected' : '') + '>' + t('recurrenceQuarterly') + '</option>';
  html += '<option value="yearly"' + (task.Recurrence === 'yearly' ? ' selected' : '') + '>' + t('recurrenceYearly') + '</option>';
  html += '</select>';
  if (hasRecurrence) {
    html += '<div class="recurrence-explain">ℹ️ ' + t('recurrenceExplain') + '</div>';
    html += '<div class="recurrence-batch-btns">';
    html += '<button class="btn btn-secondary btn-sm" onclick="generateOccurrences(' + task.id + ', \'month\')">' + t('generateMonth') + '</button>';
    html += '<button class="btn btn-secondary btn-sm" onclick="generateOccurrences(' + task.id + ', \'year\')">' + t('generateYear') + '</button>';
    html += '</div>';
  }
  html += '</div>';

  html += '</div>'; // end right
  html += '</div>'; // end content

  // Footer
  html += '<div class="modal-detail-footer">';
  if (state.isOwner) html += '<button class="btn-danger" onclick="deleteTask(' + task.id + ')">' + t('delete') + '</button>';
  else html += '<div></div>';
  html += '<div style="display:flex;gap:8px;">';
  html += '<button type="button" class="btn btn-secondary" onclick="event.preventDefault();closeModalForce()">' + t('cancel') + '</button>';
  html += '<button type="button" class="btn btn-primary" onclick="saveTaskFromFooter(' + task.id + ', event)">' + t('save') + '</button>';
  html += '</div></div>';

  html += '</div></div>'; // end modal + overlay

  document.getElementById('modal-container').innerHTML = html;
  // D2 : remplir la liste des pièces jointes (token asynchrone à part)
  renderAttachmentsSection(task.id);
}

export function saveTaskFromFooter(taskId, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  var topSaveButton = document.getElementById('task-save-top-' + taskId);
  if (topSaveButton) {
    topSaveButton.click();
  } else {
    updateTask(taskId);
  }
}

export function getRaciArray(varName) {
  if (varName === 'editAssignees') return editAssignees;
  if (varName === 'editAccountable') return editAccountable;
  if (varName === 'editConsulted') return editConsulted;
  if (varName === 'editInformed') return editInformed;
  return [];
}

export function renderRaciChips(varName) {
  var arr = getRaciArray(varName);
  var html = '';
  for (var i = 0; i < arr.length; i++) {
    var name = arr[i];
    var displayName = name;
    for (var j = 0; j < state.users.length; j++) {
      if (state.users[j].Email === name || state.users[j].Name === name) {
        displayName = state.users[j].Name || state.users[j].Email;
        break;
      }
    }
    html += '<span class="assignee-chip-tag">' + sanitize(displayName) + ' <span class="chip-remove" onclick="removeRaciChip(\'' + varName + '\',' + i + ',\'' + varName.replace('edit', '').toLowerCase() + '\')">✕</span></span>';
  }
  return html;
}

export function renderRaciField(letter, label, selectSuffix, varName) {
  var raciColors = { R: '#3b82f6', A: '#f59e0b', C: '#8b5cf6', I: '#64748b' };
  var color = raciColors[letter] || '#94a3b8';
  var html = '<div class="detail-field">';
  html += '<span class="detail-field-icon" style="background:' + color + ';color:#fff;width:24px;height:24px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;">' + letter + '</span>';
  html += '<span class="detail-field-label">' + label + '</span>';
  html += '<div class="detail-field-value">';
  html += '<div class="assignee-chips" id="' + selectSuffix + '-chips">';
  html += renderRaciChips(varName);
  html += '</div>';
  html += '<div class="assignee-add-row">';
  html += '<select id="' + selectSuffix + '-select">';
  html += '<option value="">-- ' + t('searchAssignee') + ' --</option>';
  for (var i = 0; i < state.users.length; i++) {
    html += '<option value="' + sanitize(state.users[i].Email || state.users[i].Name) + '">' + sanitize(state.users[i].Name || state.users[i].Email) + '</option>';
  }
  html += '</select>';
  html += '<button class="assignee-add-btn" onclick="addRaciChip(\'' + varName + '\',\'' + selectSuffix + '\')">' + t('addAssignee') + '</button>';
  html += '</div>';
  html += '</div></div>';
  return html;
}

export function addRaciChip(varName, selectSuffix) {
  var sel = document.getElementById(selectSuffix + '-select');
  var arr = getRaciArray(varName);
  var val = sel.value;
  if (!val || arr.indexOf(val) !== -1) return;
  arr.push(val);
  var container = document.getElementById(selectSuffix + '-chips');
  if (container) container.innerHTML = renderRaciChips(varName);
  sel.value = '';
}

export function removeRaciChip(varName, index, selectSuffix) {
  var arr = getRaciArray(varName);
  arr.splice(index, 1);
  var container = document.getElementById(selectSuffix + '-chips') || document.getElementById(varName.replace('edit', '').toLowerCase() + '-chips');
  if (container) container.innerHTML = renderRaciChips(varName);
}

export async function quickAction(taskId, newStatus) {
  var task = state.tasks.find(function(t) { return t.id === taskId; });
  var wasNotDone = task && task.Status !== 'done';
  
  try {
    await grist.docApi.applyUserActions([
      ['UpdateRecord', state.TASKS_TABLE, taskId, { Status: newStatus }]
    ]);
    for (var i = 0; i < state.tasks.length; i++) {
      if (state.tasks[i].id === taskId) { state.tasks[i].Status = newStatus; break; }
    }
	    showToast(t('taskMoved'), 'success');
	    if (newStatus === 'done' && wasNotDone && task) {
	      await notifyTaskCompleted(Object.assign({}, task, { Status: newStatus }));
	    }
	    
	    // Create next occurrence if task is recurring and just completed
    if (newStatus === 'done' && wasNotDone && task && task.Recurrence && task.Recurrence !== 'none') {
      await createNextOccurrence(task);
    }
    
    closeModalForce();
    await loadAllData();
  } catch (e) {
    console.error('Error quick action:', e);
  }
}

// =============================================================================
// SUBTASKS CRUD
// =============================================================================

export async function addSubtask(parentTaskId) {
  var input = document.getElementById('new-subtask-input');
  var title = input.value.trim();
  if (!title) return;

  var formState = captureTaskFormState();
  var savedAssignees = editAssignees.slice();
  var savedTags = editTags.slice();
  var savedAccountable = editAccountable.slice();
  var savedConsulted = editConsulted.slice();
  var savedInformed = editInformed.slice();
  var scrollPos = getModalScrollTop();

  var taskSubtasks = getTaskSubtasks(parentTaskId);
  var maxOrder = taskSubtasks.length > 0 ? Math.max.apply(null, taskSubtasks.map(function(st) { return st.Order || 0; })) : 0;

  try {
    await grist.docApi.applyUserActions([
      ['AddRecord', state.SUBTASKS_TABLE, null, {
        Parent_Task_Id: parentTaskId,
        Title: title,
        Status: 'todo',
        Priority: 'medium',
        Completed: false,
        Order: maxOrder + 1,
        Created_At: Math.floor(Date.now() / 1000)
      }]
    ]);
    input.value = '';
    await loadAllData();
    editAssignees = savedAssignees;
    editTags = savedTags;
    editAccountable = savedAccountable;
    editConsulted = savedConsulted;
    editInformed = savedInformed;
    openEditTaskModal(parentTaskId, true);
    restoreTaskFormState(formState);
    restoreModalScrollTop(scrollPos);
  } catch (e) {
    console.error('Error adding subtask:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

export function getModalScrollTop() {
  var modal = document.querySelector('#modal-container .modal');
  return modal ? modal.scrollTop : 0;
}

export function restoreModalScrollTop(pos) {
  setTimeout(function() {
    var modal = document.querySelector('#modal-container .modal');
    if (modal) modal.scrollTop = pos;
  }, 50);
}

export async function toggleSubtask(subtaskId, completed) {
  var savedAssignees = editAssignees.slice();
  var savedTags = editTags.slice();
  var savedAccountable = editAccountable.slice();
  var savedConsulted = editConsulted.slice();
  var savedInformed = editInformed.slice();
  var scrollPos = getModalScrollTop();
  try {
    var newStatus = completed ? 'done' : 'todo';
    await grist.docApi.applyUserActions([
      ['UpdateRecord', state.SUBTASKS_TABLE, subtaskId, { Completed: completed, Status: newStatus }]
    ]);
    for (var i = 0; i < state.subtasks.length; i++) {
      if (state.subtasks[i].id === subtaskId) {
        state.subtasks[i].Completed = completed;
        state.subtasks[i].Status = newStatus;
        break;
      }
    }
    showToast(t('subtaskCompleted'), 'success');
    var subtask = state.subtasks.find(function(st) { return st.id === subtaskId; });
    if (subtask) {
      editAssignees = savedAssignees;
      editTags = savedTags;
      editAccountable = savedAccountable;
      editConsulted = savedConsulted;
      editInformed = savedInformed;
      openEditTaskModal(subtask.Parent_Task_Id, true);
      restoreModalScrollTop(scrollPos);
    }
  } catch (e) {
    console.error('Error toggling subtask:', e);
  }
}

export async function deleteSubtask(subtaskId, parentTaskId) {
  var confirmed = await showConfirmModal(
    currentLang === 'fr' ? 'Supprimer cette sous-tâche ?' : 'Delete this subtask?',
    currentLang === 'fr' ? 'Supprimer la sous-tâche' : 'Delete subtask'
  );
  if (!confirmed) return;
  var formState = captureTaskFormState();
  var savedAssignees = editAssignees.slice();
  var savedTags = editTags.slice();
  var savedAccountable = editAccountable.slice();
  var savedConsulted = editConsulted.slice();
  var savedInformed = editInformed.slice();
  var scrollPos = getModalScrollTop();
  try {
    var actions = state.subtasks
      .filter(function(st) { return st.Blocked_By_Subtask_Id === subtaskId; })
      .map(function(st) { return ['UpdateRecord', state.SUBTASKS_TABLE, st.id, { Blocked_By_Subtask_Id: null }]; });
    actions.push(['RemoveRecord', state.SUBTASKS_TABLE, subtaskId]);
    await grist.docApi.applyUserActions(actions);
    showToast(t('subtaskDeleted'), 'info');
    await loadAllData();
    editAssignees = savedAssignees;
    editTags = savedTags;
    editAccountable = savedAccountable;
    editConsulted = savedConsulted;
    editInformed = savedInformed;
    openEditTaskModal(parentTaskId, true);
    restoreTaskFormState(formState);
    restoreModalScrollTop(scrollPos);
  } catch (e) {
    console.error('Error deleting subtask:', e);
  }
}

// Toggle pill selection for status/priority
// Sélecteur de statut de sous-tâche (statuts personnalisés avec couleur réelle)
export async function saveEditSubtask(subtaskId, parentTaskId) {
  var titleInput    = document.getElementById('st-title-'    + subtaskId);
  var descInput     = document.getElementById('st-desc-'     + subtaskId);
  var statusSel     = document.getElementById('st-status-'   + subtaskId);
  var prioritySel   = document.getElementById('st-priority-' + subtaskId);
  var assigneeBox   = document.getElementById('st-assignee-' + subtaskId);
  var startDateInput= document.getElementById('st-start-'    + subtaskId);
  var dueDateInput  = document.getElementById('st-due-'      + subtaskId);
  var hoursInput    = document.getElementById('st-hours-'    + subtaskId);
  var recurSel      = document.getElementById('st-recur-'    + subtaskId);
  if (!titleInput) return;
  var newTitle = titleInput.value.trim();
  if (!newTitle) return;
  var newAssignee = '';
  if (assigneeBox) {
    var checked = assigneeBox.querySelectorAll('input[type="checkbox"]:checked');
    newAssignee = Array.prototype.map.call(checked, function(c) { return c.value; }).join(', ');
  }
  var newStartDate = startDateInput && startDateInput.value ? Math.floor(new Date(startDateInput.value).getTime() / 1000) : null;
  var newDueDate = dueDateInput && dueDateInput.value ? Math.floor(new Date(dueDateInput.value).getTime() / 1000) : null;
  var newStatus = statusSel ? statusSel.value : 'todo';
  var typeEl = document.getElementById('st-type-' + subtaskId);
  var fields = {
    Title: newTitle,
    Description: descInput ? descInput.value : '',
    Status: newStatus,
    Completed: newStatus === 'done',
    Priority: prioritySel ? prioritySel.value : 'medium',
    Assignee: newAssignee,
    Estimated_Hours: hoursInput && hoursInput.value ? parseFloat(hoursInput.value) : null,
    Recurrence: recurSel ? recurSel.value : 'none',
    Type: typeEl ? typeEl.value : 'subtask'
  };
  if (newStartDate) fields.Start_Date = newStartDate;
  if (newDueDate) fields.Due_Date = newDueDate;
  var existingSubtask = state.subtasks.find(function(s) { return s.id === subtaskId; });
  var previousAssignee = existingSubtask ? existingSubtask.Assignee : '';
  var savedAssignees = editAssignees.slice();
  var savedTags = editTags.slice();
  var savedAccountable = editAccountable.slice();
  var savedConsulted = editConsulted.slice();
  var savedInformed = editInformed.slice();
  try {
    await grist.docApi.applyUserActions([['UpdateRecord', state.SUBTASKS_TABLE, subtaskId, fields]]);
    showToast(t('subtaskSaved'), 'success');
    if (fields.Assignee !== previousAssignee) {
      var previousKeys = {};
      splitRecipientValues(previousAssignee).forEach(function(value) {
        var email = resolveUserEmail(value);
        previousKeys[(email || value).toLowerCase()] = true;
      });
      var newlyAssigned = splitRecipientValues(fields.Assignee).filter(function(value) {
        var email = resolveUserEmail(value);
        return !previousKeys[(email || String(value)).toLowerCase()];
      });
      if (newlyAssigned.length) {
        await notifyConcernedUsers(parentTaskId, newlyAssigned, 'task_assigned', newTitle);
      }
    }
    await loadAllData();
    editAssignees = savedAssignees;
    editTags = savedTags;
    editAccountable = savedAccountable;
    editConsulted = savedConsulted;
    editInformed = savedInformed;
    openEditTaskModal(parentTaskId, true);
  } catch (e) {
    console.error('Error saving subtask:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

export async function generateSubtaskOccurrences(subtaskId, parentTaskId) {
  var st = state.subtasks.find(function(s) { return s.id === subtaskId; });
  if (!st || !st.Recurrence || st.Recurrence === 'none') return;
  var baseDate = st.Due_Date ? new Date(st.Due_Date * 1000) : new Date();
  var actions = [];
  // Nombre d'occurrences générées selon la fréquence (fenêtre raisonnable)
  var countMap = { daily: 7, weekly: 4, biweekly: 4, monthly: 3, quarterly: 4, yearly: 3 };
  var count = countMap[st.Recurrence] || 3;
  for (var i = 1; i <= count; i++) {
    var d = new Date(baseDate);
    if (st.Recurrence === 'daily') d.setDate(d.getDate() + i);
    else if (st.Recurrence === 'weekly') d.setDate(d.getDate() + i * 7);
    else if (st.Recurrence === 'biweekly') d.setDate(d.getDate() + i * 14);
    else if (st.Recurrence === 'monthly') d.setMonth(d.getMonth() + i);
    else if (st.Recurrence === 'quarterly') d.setMonth(d.getMonth() + i * 3);
    else if (st.Recurrence === 'yearly') d.setFullYear(d.getFullYear() + i);
    else d.setMonth(d.getMonth() + i);
    actions.push(['AddRecord', state.SUBTASKS_TABLE, null, {
      Parent_Task_Id: parentTaskId,
      Title: st.Title,
      Description: st.Description || '',
      Status: 'todo',
      Priority: st.Priority || 'medium',
      Assignee: st.Assignee || '',
      Due_Date: Math.floor(d.getTime() / 1000),
      Recurrence: st.Recurrence,
      Completed: false,
      Order: (st.Order || 0) + i
    }]);
  }
  try {
    await grist.docApi.applyUserActions(actions);
    showToast((currentLang === 'fr' ? count + ' occurrence(s) créée(s)' : count + ' occurrence(s) created'), 'success');
    var savedAssignees = editAssignees.slice();
    var savedTags = editTags.slice();
  var savedAccountable = editAccountable.slice();
  var savedConsulted = editConsulted.slice();
  var savedInformed = editInformed.slice();
    await loadAllData();
    editAssignees = savedAssignees;
    editTags = savedTags;
    editAccountable = savedAccountable;
    editConsulted = savedConsulted;
    editInformed = savedInformed;
    openEditTaskModal(parentTaskId, true);
  } catch (e) {
    console.error('Error generating subtask occurrences:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

// =============================================================================
// COMMENTS CRUD
// =============================================================================

export async function addComment(taskId) {
  var textarea = document.getElementById('new-comment-input');
  var content = textarea.value.trim();
  if (!content) return;
  var formState = captureTaskFormState();
  var savedAssignees = editAssignees.slice();
  var savedTags = editTags.slice();
  var savedAccountable = editAccountable.slice();
  var savedConsulted = editConsulted.slice();
  var savedInformed = editInformed.slice();
  var scrollPos = getModalScrollTop();

  try {
    await grist.docApi.applyUserActions([
      ['AddRecord', state.COMMENTS_TABLE, null, {
        Task_Id: taskId,
        Author: state.currentUserEmail || 'Utilisateur',
        Content: content,
        Created_At: Math.floor(Date.now() / 1000)
      }]
    ]);
    textarea.value = '';
    showToast(t('commentAdded'), 'success');
    var commentTask = state.tasks.find(function(t2) { return t2.id === taskId; });
    if (commentTask) {
      await notifyConcernedUsers(taskId, splitRecipientValues(commentTask.Assignee), 'comment_added', commentTask.Title || '');
    }
    await loadAllData();
    editAssignees = savedAssignees;
    editTags = savedTags;
    editAccountable = savedAccountable;
    editConsulted = savedConsulted;
    editInformed = savedInformed;
    openEditTaskModal(taskId, true);
    restoreTaskFormState(formState);
    restoreModalScrollTop(scrollPos);
  } catch (e) {
    console.error('Error adding comment:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

export async function deleteComment(commentId, taskId) {
  if (!state.isOwner) return;
  var confirmed = await showConfirmModal(
    currentLang === 'fr' ? 'Supprimer ce commentaire ?' : 'Delete this comment?',
    currentLang === 'fr' ? 'Supprimer le commentaire' : 'Delete comment'
  );
  if (!confirmed) return;
  var formState = captureTaskFormState();
  var savedAssignees = editAssignees.slice();
  var savedTags = editTags.slice();
  var savedAccountable = editAccountable.slice();
  var savedConsulted = editConsulted.slice();
  var savedInformed = editInformed.slice();
  try {
    await grist.docApi.applyUserActions([
      ['RemoveRecord', state.COMMENTS_TABLE, commentId]
    ]);
    showToast(t('commentDeleted'), 'info');
    await loadAllData();
    editAssignees = savedAssignees;
    editTags = savedTags;
    editAccountable = savedAccountable;
    editConsulted = savedConsulted;
    editInformed = savedInformed;
    openEditTaskModal(taskId, true);
    restoreTaskFormState(formState);
  } catch (e) {
    console.error('Error deleting comment:', e);
  }
}

export function closeModal(e) {
  // Désactivé volontairement : on NE ferme PAS au clic extérieur (évite les fermetures
  // accidentelles, notamment quand une sélection de texte se relâche hors de la modale).
  // La fermeture se fait via la croix (✕) ou le bouton Annuler (closeModalForce).
}

export function closeModalForce() {
  // Gestion du brouillon de nouvelle tâche : titre saisi -> on enregistre ; sinon -> on supprime
  if (draftTaskId != null) {
    var did = draftTaskId; draftTaskId = null;
    var ti = document.getElementById('task-title');
    var titleVal = ti ? ti.value.trim() : '';
    if (titleVal) { updateTask(did); return; } // updateTask enregistre, ferme et recharge
    removeDraftChildren(did)
      .then(function () { return grist.docApi.applyUserActions([['RemoveRecord', state.TASKS_TABLE, did]]); })
      .then(function () { return loadAllData(); })
      .then(function () { refreshAllViews(); })
      .catch(function () {});
  }
  document.getElementById('modal-container').innerHTML = '';
}

// =============================================================================
// CRUD OPERATIONS
// =============================================================================

export async function createTask() {
  var title = requireTaskTitle();
  if (!title) return;
  if (shouldLimitToMyProjects() && editAssignees.length === 0) {
    var mine = myAssigneeValue();
    if (mine) editAssignees = [mine];
  }

  var projectEl = document.getElementById('task-project');
  var projectId = projectEl && projectEl.value ? parseInt(projectEl.value) : 0;

  var record = {};
  setField(record, 'tasks', 'title', title);
  setField(record, 'tasks', 'description', getInputValue('task-desc').trim());
  setField(record, 'tasks', 'status', getInputValue('task-status'));
  setField(record, 'tasks', 'priority', getInputValue('task-priority'));
  setField(record, 'tasks', 'assignee', ['L'].concat(resolveAssigneeIds(editAssignees)));
  if (state.raciEnabled && state.TASKS_TABLE === state.DEFAULT_TASKS_TABLE) {
    record.Accountable = editAccountable.join(', ');
    record.Consulted = editConsulted.join(', ');
    record.Informed = editInformed.join(', ');
  }
  setField(record, 'tasks', 'group', getInputValue('task-group'));
  setField(record, 'tasks', 'startDate', toEpoch(getInputValue('task-start')));
  setField(record, 'tasks', 'dueDate', toEpoch(getInputValue('task-due')));
  setField(record, 'tasks', 'category', getInputValue('task-category').trim());
  setField(record, 'tasks', 'projectId', projectId);
  setField(record, 'tasks', 'estimatedHours', getEstimatedHoursInput());
  setField(record, 'tasks', 'createdAt', Math.floor(Date.now() / 1000));
  setField(record, 'tasks', 'tag', ['L'].concat(editTags));
  // B4 : prolongation auto activée par défaut sur les nouvelles tâches (modifiable ensuite)
  if (state.TASKS_TABLE === state.DEFAULT_TASKS_TABLE) record.Auto_Extend = true;

  try {
    record = await keepExistingTaskColumns(record);
    var createResult = await grist.docApi.applyUserActions([
      ['AddRecord', state.TASKS_TABLE, null, record]
    ]);
    var newTaskId = (createResult && createResult.retValues && createResult.retValues[0]) || null;
    showToast(t('taskCreated'), 'success');
    if (newTaskId) {
	      await notifyConcernedUsers(newTaskId, editAssignees.slice(), 'task_assigned', title);
    }
    closeModalForce();
    await loadAllData();
    if (newTaskId) {
      openEditTaskModal(newTaskId);
    }
  } catch (e) {
    console.error('Error creating task:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

export async function updateTask(taskId) {
  var title = requireTaskTitle();
  if (!title) return;
  if (shouldLimitToMyProjects() && editAssignees.length === 0) {
    var mine = myAssigneeValue();
    if (mine) editAssignees = [mine];
  }
  var wasDraft = draftTaskId === taskId;

  var task = state.tasks.find(function(t) { return t.id === taskId; });
  var wasNotDone = task && task.Status !== 'done';
  var newStatus = getInputValue('task-status');

  var recurrenceEl = document.getElementById('task-recurrence');
  var newRecurrence = recurrenceEl ? recurrenceEl.value : (task ? task.Recurrence : 'none');

  var projectEl = document.getElementById('task-project');
  var projectId = projectEl && projectEl.value ? parseInt(projectEl.value) : 0;

  var record = {};
  setField(record, 'tasks', 'title', title);
  setField(record, 'tasks', 'description', getInputValue('task-desc').trim());
  setField(record, 'tasks', 'status', newStatus);
  setField(record, 'tasks', 'priority', getInputValue('task-priority'));
  setField(record, 'tasks', 'assignee', ['L'].concat(resolveAssigneeIds(editAssignees)));
  if (state.raciEnabled && state.TASKS_TABLE === state.DEFAULT_TASKS_TABLE) {
    record.Accountable = editAccountable.join(', ');
    record.Consulted = editConsulted.join(', ');
    record.Informed = editInformed.join(', ');
  }
  setField(record, 'tasks', 'group', getInputValue('task-group'));
  setField(record, 'tasks', 'startDate', toEpoch(getInputValue('task-start')));
  setField(record, 'tasks', 'dueDate', toEpoch(getInputValue('task-due')));
  setField(record, 'tasks', 'category', getInputValue('task-category').trim());
  setField(record, 'tasks', 'projectId', projectId);
  setField(record, 'tasks', 'recurrence', newRecurrence);
  setField(record, 'tasks', 'estimatedHours', getEstimatedHoursInput());
  setField(record, 'tasks', 'tag', ['L'].concat(editTags));

  // Extension fields
  var extDateEl = document.getElementById('task-extension-date');
  if (extDateEl) record.Extension_Date = toEpoch(extDateEl.value);
  var autoExtEl = document.getElementById('task-auto-extend');
  if (autoExtEl) record.Auto_Extend = autoExtEl.checked;

  // Auto-freeze extension date when completing a task with auto-extend
  if (newStatus === 'done' && task && task.Auto_Extend && task.Status !== 'done') {
    record.Extension_Date = Math.floor(Date.now() / 1000);
    record.Auto_Extend = false;
  }

  try {
    record = await keepExistingTaskColumns(record);
    await grist.docApi.applyUserActions([
      ['UpdateRecord', state.TASKS_TABLE, taskId, record]
    ]);
    if (wasDraft) draftTaskId = null; // ce brouillon devient une vraie tâche seulement après sauvegarde réussie
    showToast(t('taskUpdated'), 'success');
    var autoChanges = {};
    if (task) {
      if (task.Status !== newStatus) { autoChanges.status = { from: task.Status, to: newStatus }; }
      var newPriority = document.getElementById('task-priority').value;
      if (task.Priority !== newPriority) autoChanges.priority = { from: task.Priority, to: newPriority };
      var newAssignee = editAssignees.join(', ');
      if (task.Assignee !== newAssignee) autoChanges.assignee = { from: task.Assignee, to: newAssignee };
    }
    if (Object.keys(autoChanges).length > 0) {
      await evaluateAutomationRules(Object.assign({}, task, record, { id: taskId }), autoChanges);
    }

	    if (autoChanges.assignee) {
	      var previousAssignees = splitRecipientValues(task ? task.Assignee : '');
	      var previousKeys = {};
	      previousAssignees.forEach(function(value) {
	        var email = resolveUserEmail(value);
	        previousKeys[(email || value).toLowerCase()] = true;
	      });
	      var newlyAssigned = editAssignees.filter(function(value) {
	        var email = resolveUserEmail(value);
	        return !previousKeys[(email || String(value)).toLowerCase()];
	      });
	      await notifyConcernedUsers(taskId, newlyAssigned, 'task_assigned', title);
	    }
	    if (newStatus === 'done' && wasNotDone) {
	      await notifyTaskCompleted(Object.assign({}, task, record, { id: taskId, Project_Id: projectId, Title: title }));
	    }

    // Create next occurrence if task is recurring and just completed
    if (newStatus === 'done' && wasNotDone && newRecurrence && newRecurrence !== 'none') {
      var updatedTask = Object.assign({}, task, record);
      await createNextOccurrence(updatedTask);
    }

    closeModalForce();
    await loadAllData();
  } catch (e) {
    console.error('Error updating task:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

export async function deleteTask(taskId) {
  if (!state.isOwner) return;
  var relatedSubtasks = state.subtasks.filter(function(st) { return st.Parent_Task_Id === taskId; });
  var confirmationMessage = currentLang === 'fr'
    ? 'Supprimer cette tâche et ses ' + relatedSubtasks.length + ' sous-tâche(s) ? Cette action est irréversible.'
    : 'Delete this task and its ' + relatedSubtasks.length + ' subtask(s)? This action cannot be undone.';
  var confirmed = await showConfirmModal(confirmationMessage, currentLang === 'fr' ? 'Supprimer la tâche' : 'Delete task');
  if (!confirmed) return;
  try {
    var deletedSubtaskIds = {};
    var actions = [];
    relatedSubtasks.forEach(function(st) { deletedSubtaskIds[st.id] = true; });

    state.subtasks.forEach(function(st) {
      if (st.Parent_Task_Id !== taskId && deletedSubtaskIds[st.Blocked_By_Subtask_Id]) {
        actions.push(['UpdateRecord', state.SUBTASKS_TABLE, st.id, { Blocked_By_Subtask_Id: null }]);
      }
    });
    state.comments.forEach(function(comment) {
      if (comment.Task_Id === taskId) actions.push(['RemoveRecord', state.COMMENTS_TABLE, comment.id]);
    });
    state.timeEntries.forEach(function(entry) {
      if (entry.Task_Id === taskId) actions.push(['RemoveRecord', state.TIME_ENTRIES_TABLE, entry.id]);
    });
    state.attachments.forEach(function(attachment) {
      if (attachment.Task_Id === taskId) actions.push(['RemoveRecord', state.ATTACHMENTS_TABLE, attachment.id]);
    });
    state.pmNotifications.forEach(function(notification) {
      if (notification.Task_Id === taskId) actions.push(['RemoveRecord', state.NOTIFICATIONS_TABLE, notification.id]);
    });
    relatedSubtasks.forEach(function(st) {
      actions.push(['RemoveRecord', state.SUBTASKS_TABLE, st.id]);
    });
    actions.push(['RemoveRecord', state.TASKS_TABLE, taskId]);

    await grist.docApi.applyUserActions(actions);
    if (draftTaskId === taskId) draftTaskId = null;
    document.getElementById('modal-container').innerHTML = '';
    showToast(t('taskDeleted'), 'info');
    await loadAllData();
  } catch (e) {
    console.error('Error deleting task:', e);
  }
}
