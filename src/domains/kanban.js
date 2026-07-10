import { t, currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { state } from '../store.js';
import { formatDate, formatTimeAgo } from '../utils/dates.js';
import { priorityLabel, recurrenceSymbol } from '../utils/labels.js';
import { showToast } from '../ui/toast.js';
import { getTaskAttachments, formatFileSize } from './attachments.js';
import { getTaskComments } from './comments.js';
import { getTaskSubtasks, getTaskProgress } from './subtasks.js';
import { getTaskTotalTime, formatDurationShort } from './time-tracking.js';
import { getFilteredTasks, getProjectName, getProjectColor, showArchivedTasks } from './filters.js';
import { notifyTaskCompleted, evaluateAutomationRules } from './notifications.js';
import { saveSetting } from './settings.js';
import { closeModalForce } from './task-modal.js';
import { refreshAllViews } from '../ui/tabs.js';
import { getColumnName } from '../config.js';
import { getUserDisplayName } from './team.js';
import { isOverdue } from './tasks.js';
import { getCategories } from './categories.js';
import { getTags } from './tags.js';
// Temporary backwards imports: kanbanSort/cardDisplaySettings/
// customKanbanStatuses stay in main.js because loadSettings() reassigns
// them - and, for customKanbanStatuses, ensureCustomStatuses() also
// reassigns it - and can't move until bootstrap/ensure-tables.js is
// extracted.
import {
  kanbanSort, cardDisplaySettings, customKanbanStatuses
} from '../main.js';

export var kanbanGroupBy = 'status'; // 'status' | 'priority' | 'project'
export var expandedKanbanCards = {}; // taskId -> true quand la tuile est dépliée (A2)
export var collapsedKanbanCols = {}; // col.key -> true when collapsed

export var defaultKanbanStatuses = [
  { key: 'todo',     label_fr: 'À faire',   label_en: 'To do',        color: '#f59e0b', cssClass: 'col-todo' },
  { key: 'progress', label_fr: 'En cours',  label_en: 'In progress',  color: '#3b82f6', cssClass: 'col-progress' },
  { key: 'done',     label_fr: 'Terminé',   label_en: 'Done',         color: '#22c55e', cssClass: 'col-done' }
];
export function getKanbanStatuses() {
  return customKanbanStatuses || defaultKanbanStatuses;
}
export async function saveKanbanStatuses() {
  await saveSetting('kanban_statuses', JSON.stringify(customKanbanStatuses));
  await syncTaskStatusChoices();
  syncSubtaskStatusChoices();
}

export async function syncTaskStatusChoices() {
  try {
    var statuses = getKanbanStatuses();
    var choices = statuses.map(function(s) { return s.key; });
    if (choices.indexOf('archived') === -1) choices.push('archived');
    var choiceOptions = {};
    statuses.forEach(function(s) {
      if (s.color) choiceOptions[s.key] = { fillColor: s.color, textColor: '#271A79' };
    });
    choiceOptions.archived = { fillColor: '#EEFFEE', textColor: '#271A79' };
    var statusCol = getColumnName('tasks', 'status');
    await grist.docApi.applyUserActions([
      ['ModifyColumn', state.TASKS_TABLE, statusCol, { widgetOptions: JSON.stringify({ choices: choices, choiceOptions: choiceOptions }) }]
    ]);
    state.taskTableColumns = null;
  } catch (e) {
    console.log('syncTaskStatusChoices:', e.message);
  }
}

// Synchronise les choix (+ couleurs) de la colonne Status de PM_Subtasks avec les
// statuts Kanban personnalisés → la grille Grist native affiche les bonnes pastilles.
export async function syncSubtaskStatusChoices() {
  try {
    var statuses = getKanbanStatuses();
    var choices = statuses.map(function(s) { return s.key; });
    if (choices.indexOf('archived') === -1) choices.push('archived');
    var choiceOptions = {};
    statuses.forEach(function(s) {
      if (s.color) choiceOptions[s.key] = { fillColor: s.color, textColor: '#ffffff' };
    });
    var widgetOptions = JSON.stringify({ widget: 'TextBox', choices: choices, choiceOptions: choiceOptions });
    // Évite les réécritures inutiles (signature en cache navigateur)
    if (typeof localStorage !== 'undefined' && localStorage.getItem('pm_subtask_status_sig') === widgetOptions) return;
    await grist.docApi.applyUserActions([
      ['ModifyColumn', state.SUBTASKS_TABLE, 'Status', { widgetOptions: widgetOptions }]
    ]);
    if (typeof localStorage !== 'undefined') localStorage.setItem('pm_subtask_status_sig', widgetOptions);
  } catch (e) {
    console.log('syncSubtaskStatusChoices:', e.message);
  }
}
export function getStatusLabel(key) {
  var statuses = getKanbanStatuses();
  var found = statuses.find(function(s) { return s.key === key; });
  if (found) return currentLang === 'fr' ? found.label_fr : found.label_en;
  return key;
}

export function setKanbanGroupBy(value) {
  kanbanGroupBy = value;
  renderKanbanView();
}

export function sortKanbanTasks(list) {
  var arr = list.slice();
  if (kanbanSort === 'alpha') {
    arr.sort(function(a, b) { return (a.Title || '').localeCompare(b.Title || ''); });
  } else if (kanbanSort === 'alpha-desc') {
    arr.sort(function(a, b) { return (b.Title || '').localeCompare(a.Title || ''); });
  } else if (kanbanSort === 'due') {
    arr.sort(function(a, b) {
      var da = a.Due_Date || null, db = b.Due_Date || null;
      if (da && db) return da - db;
      if (da) return -1;
      if (db) return 1;
      return 0;
    });
  } else if (kanbanSort === 'priority') {
    var po = { high: 0, medium: 1, low: 2 };
    arr.sort(function(a, b) {
      var pa = po[a.Priority] !== undefined ? po[a.Priority] : 3;
      var pb = po[b.Priority] !== undefined ? po[b.Priority] : 3;
      return pa - pb;
    });
  }
  return arr; // 'manual' : ordre d'origine inchangé
}

export function toggleKanbanCol(key) {
  collapsedKanbanCols[key] = !collapsedKanbanCols[key];
  renderKanbanView();
}

// A2 : déplier/replier le détail d'une tuile Kanban (clic simple sur le bouton)
export function toggleCardExpand(taskId, ev) {
  if (ev) { ev.stopPropagation(); ev.preventDefault(); }
  if (expandedKanbanCards[taskId]) delete expandedKanbanCards[taskId];
  else expandedKanbanCards[taskId] = true;
  renderKanbanView();
}

export function getTaskDateProgress(task) {
  if (!task || !task.Start_Date || !task.Due_Date || task.Due_Date <= task.Start_Date) return null;
  var now = Math.floor(Date.now() / 1000);
  if (now <= task.Start_Date) return 0;
  if (now >= task.Due_Date) return 100;
  return Math.max(0, Math.min(100, Math.round(((now - task.Start_Date) / (task.Due_Date - task.Start_Date)) * 100)));
}

export function openCardSubtasksModal(taskId) {
  var task = state.tasks.find(function(t) { return t.id === taskId; });
  if (!task) return;
  var taskSubtasks = getTaskSubtasks(taskId);
  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal compact-subtasks-modal" onclick="event.stopPropagation()">';
  html += '<div class="modal-header"><h3>' + (currentLang === 'fr' ? 'Sous-tâches' : 'Subtasks') + '</h3><button class="modal-close" onclick="closeModalForce()">✕</button></div>';
  html += '<div class="modal-body">';
  html += '<div class="compact-subtasks-title">' + sanitize(task.Title || '') + '</div>';
  if (taskSubtasks.length === 0) {
    html += '<div class="subtasks-empty">' + t('noSubtasks') + '</div>';
  } else {
    html += '<div class="compact-subtasks-list">';
    taskSubtasks.forEach(function(st) {
      html += '<label class="compact-subtask-item">';
      html += '<input type="checkbox" ' + (st.Completed ? 'checked' : '') + ' onchange="toggleSubtaskFromPopup(' + st.id + ', ' + taskId + ', this.checked)">';
      html += '<span class="' + (st.Completed ? 'completed' : '') + '">' + sanitize(st.Title) + '</span>';
      html += '</label>';
    });
    html += '</div>';
  }
  html += '</div></div></div>';
  document.getElementById('modal-container').innerHTML = html;
}

export function openCardCommentsModal(taskId) {
  var task = state.tasks.find(function(t) { return t.id === taskId; });
  var taskComments = getTaskComments(taskId);
  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal compact-subtasks-modal" onclick="event.stopPropagation()">';
  html += '<div class="modal-header"><h3>' + t('comments') + '</h3><button class="modal-close" onclick="closeModalForce()">✕</button></div>';
  html += '<div class="modal-body">';
  if (task) html += '<div class="compact-subtasks-title">' + sanitize(task.Title || '') + '</div>';
  if (taskComments.length === 0) {
    html += '<div class="comments-empty">' + t('noComments') + '</div>';
  } else {
    html += '<div class="quick-comments-list">';
    taskComments.forEach(function(cmt) {
      html += '<div class="quick-comment-item">';
      html += '<div class="quick-comment-meta">👤 ' + sanitize(cmt.Author || 'Anonyme') + ' · ' + formatTimeAgo(cmt.Created_At) + '</div>';
      html += '<div class="quick-comment-content">' + sanitize(cmt.Content) + '</div>';
      html += '</div>';
    });
    html += '</div>';
  }
  html += '</div></div></div>';
  document.getElementById('modal-container').innerHTML = html;
}

export function openCardAttachmentsModal(taskId) {
  var task = state.tasks.find(function(t) { return t.id === taskId; });
  var list = getTaskAttachments(taskId);
  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal compact-subtasks-modal" onclick="event.stopPropagation()">';
  html += '<div class="modal-header"><h3>' + (currentLang === 'fr' ? 'Pièces jointes' : 'Attachments') + '</h3><button class="modal-close" onclick="closeModalForce()">✕</button></div>';
  html += '<div class="modal-body">';
  if (task) html += '<div class="compact-subtasks-title">' + sanitize(task.Title || '') + '</div>';
  if (list.length === 0) {
    html += '<div class="attach-empty">' + (currentLang === 'fr' ? 'Aucune pièce jointe' : 'No attachments') + '</div>';
  } else {
    html += '<div class="quick-attachments-list">';
    list.forEach(function(att) {
      html += '<div class="quick-attachment-item">';
      html += '<span class="quick-attachment-name">📎 ' + sanitize(att.File_Name || '') + '</span>';
      html += '<span class="quick-attachment-size">' + formatFileSize(att.File_Size) + '</span>';
      html += '<button class="attach-btn" onclick="openAttachmentInNewTab(' + att.id + ')">' + (currentLang === 'fr' ? 'Ouvrir' : 'Open') + '</button>';
      html += '<button class="attach-btn" onclick="downloadAttachment(' + att.id + ')">' + (currentLang === 'fr' ? 'Télécharger' : 'Download') + '</button>';
      html += '</div>';
    });
    html += '</div>';
  }
  html += '</div></div></div>';
  document.getElementById('modal-container').innerHTML = html;
}

export function renderKanbanView() {
  var board = document.getElementById('kanban-board');
  var sel = document.getElementById('kanban-groupby');
  if (sel && sel.value !== kanbanGroupBy) sel.value = kanbanGroupBy;
  var sortSel = document.getElementById('kanban-sort');
  if (sortSel && sortSel.value !== kanbanSort) sortSel.value = kanbanSort;

  var columns = [];
  var filteredTasks = getFilteredTasks();

  if (kanbanGroupBy === 'priority') {
    columns = [
      { key: 'high',   label: '🔴 ' + t('priorityHigh'),   cssClass: 'col-todo',     field: 'Priority' },
      { key: 'medium', label: '🟡 ' + t('priorityMedium'), cssClass: 'col-progress', field: 'Priority' },
      { key: 'low',    label: '🟢 ' + t('priorityLow'),    cssClass: 'col-done',     field: 'Priority' }
    ];
  } else if (kanbanGroupBy === 'project') {
    var projMap = {};
    filteredTasks.forEach(function(task) {
      var pid = task.Project_Id || 0;
      if (!projMap[pid]) {
        projMap[pid] = { key: String(pid), label: pid ? (getProjectName(pid) || 'Projet ' + pid) : (currentLang === 'fr' ? 'Sans projet' : 'No project'), cssClass: 'col-todo', field: 'Project_Id', tasks: [], color: getProjectColor(pid || null) };
      }
      projMap[pid].tasks.push(task);
    });
    columns = Object.values(projMap).sort(function(a, b) { return a.label.localeCompare(b.label); });
  } else if (showArchivedTasks) {
    columns = [
      { key: 'archived', label: currentLang === 'fr' ? '📦 Archives' : '📦 Archives', cssClass: 'col-custom', field: 'Status', color: '#94a3b8' }
    ];
  } else {
    var statuses = getKanbanStatuses();
    columns = statuses.map(function(s) {
      return {
        key: s.key,
        label: (s.emoji ? s.emoji + ' ' : '') + (currentLang === 'fr' ? s.label_fr : s.label_en),
        cssClass: s.cssClass || 'col-custom',
        field: 'Status',
        color: s.color
      };
    });
  }

  var html = '';
  for (var s = 0; s < columns.length; s++) {
    var col = columns[s];
    var colTasks = col.tasks || filteredTasks.filter(function(task) {
      if (col.field === 'Status') return task.Status === col.key;
      if (col.field === 'Priority') return task.Priority === col.key;
      return false;
    });
    colTasks = sortKanbanTasks(colTasks);
    var dotStyle = col.color ? 'display:inline-block;width:10px;height:10px;border-radius:50%;background:' + col.color + ';margin-right:6px;' : 'display:none;';
    var isCollapsed = !!collapsedKanbanCols[col.key];

    if (isCollapsed) {
      var collapsedStyle = col.color ? 'background:' + col.color + '15;border-left:3px solid ' + col.color + ';color:' + col.color + ';' : '';
      html += '<div class="kanban-column kanban-column-collapsed ' + col.cssClass + '" onclick="toggleKanbanCol(\'' + sanitize(col.key) + '\')" title="' + col.label + '" style="' + collapsedStyle + '">';
      html += '<div class="kanban-col-header-collapsed">';
      html += '<span class="col-collapse-icon">⇄</span>';
      html += '<span class="col-collapsed-label">' + col.label + ' (' + colTasks.length + ')</span>';
      html += '</div></div>';
      continue;
    }

    html += '<div class="kanban-column ' + col.cssClass + '">';
    var headerStyle = col.color ? 'border-bottom-color:' + col.color + ';color:' + col.color + ';' : '';
    html += '<div class="kanban-col-header" style="' + headerStyle + '">';
    html += '<div style="display:flex;align-items:center;gap:4px;"><span style="' + dotStyle + '"></span>' + col.label + ' <span class="col-count">' + colTasks.length + '</span></div>';
    html += '<div style="display:flex;align-items:center;gap:4px;">';
    if (kanbanGroupBy === 'status') html += '<button class="col-add" onclick="openNewTaskModal(\'' + col.key + '\')" title="' + (currentLang === 'fr' ? 'Nouvelle tâche' : 'New task') + '">+</button>';
    var collapseColor = col.color ? 'color:' + col.color + ';background:white;' : '';
    html += '<button class="col-add" onclick="toggleKanbanCol(\'' + sanitize(col.key) + '\')" title="' + (currentLang === 'fr' ? 'Réduire' : 'Collapse') + '" style="' + collapseColor + '">⇄</button>';
    html += '</div>';
    html += '</div>';
    html += '<div class="kanban-cards" data-groupby="' + kanbanGroupBy + '" data-value="' + sanitize(col.key) + '" data-field="' + col.field + '" ondragover="onDragOver(event)" ondrop="onDrop(event)" ondragleave="onDragLeave(event)">';

    if (colTasks.length === 0) {
      html += '<div class="kanban-empty"><div class="kanban-empty-icon">📝</div>' + t('noTasks') + '</div>';
    } else {
      for (var i = 0; i < colTasks.length; i++) {
        html += renderTaskCard(colTasks[i]);
      }
    }

    html += '</div>';
    if (kanbanGroupBy === 'status') html += '<button class="kanban-add-btn" onclick="openNewTaskModal(\'' + col.key + '\')">' + t('addTask') + '</button>';
    html += '</div>';
  }

  board.innerHTML = html;
}

export function renderTaskCard(task) {
  var cd = cardDisplaySettings;
  var overdueHtml = isOverdue(task) ? ' <span class="overdue-badge">' + t('overdue') + '</span>' : '';
  var taskSubtasks = getTaskSubtasks(task.id);
  var progressPct = getTaskProgress(task);
  var completedCount = taskSubtasks.filter(function(st) { return st.Completed; }).length;
  var taskComments = getTaskComments(task.id);
  var taskAttachments = getTaskAttachments(task.id);

  var priorityClass = 'priority-' + (task.Priority || 'medium');
  var projColor = getProjectColor(task.Project_Id);
  var projName = getProjectName(task.Project_Id);
  var html = '<div class="task-card ' + priorityClass + '" draggable="true" ondragstart="onDragStart(event, ' + task.id + ')" data-id="' + task.id + '" ondblclick="openEditTaskModal(' + task.id + ')" style="border-left:none;padding:0;overflow:visible;">';
  html += '<div class="task-card-body">';

  html += '<div class="task-card-header">';
  html += '<div class="task-card-topline">';
  if (cd.priority) html += '<div class="task-card-priority-text priority-text-' + (task.Priority || 'medium') + '">' + priorityLabel(task.Priority) + '</div>';
  html += '<div class="task-card-meta-actions">';
  var _isExpanded = !!expandedKanbanCards[task.id];
  html += '<button class="btn-icon task-card-expand-btn" onclick="event.stopPropagation();toggleCardExpand(' + task.id + ', event)" title="' + (currentLang === 'fr' ? 'Détails' : 'Details') + '">' + (_isExpanded ? '▲' : '▼') + '</button>';
  html += '</div></div>';
  html += '<div class="task-card-title" onclick="openEditTaskModal(' + task.id + ')">' + sanitize(task.Title) + '</div>';
  if (projName) html += '<div class="task-card-project-name"><span style="background:' + projColor + ';"></span>' + sanitize(projName) + '</div>';
  html += '</div>';

  if (cd.description && task.Description) {
    html += '<div class="task-card-desc">' + sanitize(task.Description) + '</div>';
  }

  var dateProgress = getTaskDateProgress(task);
  if (dateProgress !== null) {
    html += '<div class="task-date-progress" title="' + (currentLang === 'fr' ? 'Avancement selon les dates' : 'Date progress') + '">';
    html += '<div class="task-date-progress-fill" style="width:' + dateProgress + '%"></div>';
    html += '</div>';
  }

  if (cd.subtasks && taskSubtasks.length > 0) {
    var barClass = progressPct === 100 ? 'bar-done' : (progressPct >= 50 ? 'bar-progress' : 'bar-todo');
    html += '<div class="task-card-subtasks">';
    html += '<div class="subtask-progress-row">';
    html += '<div class="subtask-progress-bar thin"><div class="subtask-progress-fill ' + barClass + '" style="width:' + progressPct + '%"></div></div>';
    html += '<span class="subtask-count">' + completedCount + '/' + taskSubtasks.length + '</span>';
    html += '<button class="subtask-mini-btn" onclick="event.stopPropagation();openCardSubtasksModal(' + task.id + ')" title="' + (currentLang === 'fr' ? 'Sous-tâches' : 'Subtasks') + '">☑</button>';
    html += '</div></div>';
  }

  html += '<div class="task-card-row">';
  if (cd.date && task.Due_Date) {
    html += '<span class="task-card-date">📅 ' + formatDate(task.Due_Date) + overdueHtml + '</span>';
  }
  if (cd.comments && taskComments.length > 0) {
    html += '<button class="task-card-comments card-quick-btn" onclick="event.stopPropagation();openCardCommentsModal(' + task.id + ')" title="' + t('comments') + '">💬 ' + taskComments.length + '</button>';
  }
  if (taskAttachments.length > 0) {
    html += '<button class="task-card-attachments card-quick-btn" onclick="event.stopPropagation();openCardAttachmentsModal(' + task.id + ')" title="' + (currentLang === 'fr' ? 'Pièces jointes' : 'Attachments') + '">📎 ' + taskAttachments.length + '</button>';
  }
  var totalTime = getTaskTotalTime(task.id);
  var isTimerRunning = !!state.activeTimers[task.id];
  if (cd.time && (totalTime > 0 || isTimerRunning)) {
    html += '<span class="task-card-time' + (isTimerRunning ? ' timer-running' : '') + '">⏱️ ' + formatDurationShort(totalTime) + (isTimerRunning ? ' ●' : '') + '</span>';
    if (isTimerRunning) html += '<button class="task-card-pause-btn" onclick="event.stopPropagation();pauseTimer(' + task.id + ')" title="' + (currentLang === 'fr' ? 'Pause' : 'Pause') + '">⏸</button>';
  }
  if (task.Recurrence && task.Recurrence !== 'none') {
    var recLabel = recurrenceSymbol(task.Recurrence);
    html += '<span class="task-card-recurrence">' + recLabel + '</span>';
  }
  html += '</div>';

  var tagList = Array.isArray(task.Tag) ? task.Tag : [];
  if ((cd.category && task.Category) || (cd.tags && tagList.length > 0)) {
    html += '<div class="task-card-row task-card-taxonomy">';
    if (cd.category && task.Category) {
      var catObj = getCategories().find(function(c) { return c.name === task.Category; });
      var catColor = catObj ? catObj.color : '#6366f1';
      html += '<span class="task-card-category" style="color:' + catColor + ';">' + sanitize(task.Category) + '</span>';
    }
    if (cd.tags) {
      for (var ti = 0; ti < tagList.length; ti++) {
        var tagObj = getTags().find(function(tg) { return tg.name === tagList[ti]; });
        var tagColor = tagObj ? tagObj.color : '#94a3b8';
        html += '<span class="task-card-tag" style="border-color:' + tagColor + '80;color:' + tagColor + ';">' + sanitize(tagList[ti]) + '</span>';
      }
    }
    html += '</div>';
  }

  if (cd.assignee && task.Assignee) {
    html += '<div class="task-card-row task-card-assignee-row">';
    var assigneeList = task.Assignee.split(',').map(function(a) { return a.trim(); }).filter(Boolean);
    if (state.raciEnabled) {
      for (var ai = 0; ai < assigneeList.length; ai++) {
        html += '<span class="task-card-assignee raci-badge raci-r">R ' + sanitize(getUserDisplayName(assigneeList[ai])) + '</span>';
      }
      var raciRoles = [
        { arr: task.Accountable, cls: 'raci-a', letter: 'A' },
        { arr: task.Consulted,   cls: 'raci-c', letter: 'C' },
        { arr: task.Informed,    cls: 'raci-i', letter: 'I' }
      ];
      for (var ri = 0; ri < raciRoles.length; ri++) {
        if (raciRoles[ri].arr) {
          var rList = raciRoles[ri].arr.split(',').map(function(a) { return a.trim(); }).filter(Boolean);
          for (var rj = 0; rj < rList.length; rj++) {
            html += '<span class="task-card-assignee raci-badge ' + raciRoles[ri].cls + '">' + raciRoles[ri].letter + ' ' + sanitize(getUserDisplayName(rList[rj])) + '</span>';
          }
        }
      }
    } else {
      for (var ai2 = 0; ai2 < assigneeList.length; ai2++) {
        html += '<span class="task-card-assignee">👤 ' + sanitize(getUserDisplayName(assigneeList[ai2])) + '</span>';
      }
    }
    html += '</div>';
  }

  if (task.Status === 'done') {
    html += '<div class="task-card-row" style="justify-content:flex-end;"><button class="btn btn-sm" style="font-size:10px;padding:2px 8px;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:6px;cursor:pointer;" onclick="event.stopPropagation();archiveTask(' + task.id + ')" title="' + (currentLang === 'fr' ? 'Archiver' : 'Archive') + '">📦 ' + (currentLang === 'fr' ? 'Archiver' : 'Archive') + '</button></div>';
  }
  if (task.Status === 'archived') {
    html += '<div class="task-card-row" style="justify-content:flex-end;"><button class="btn btn-sm" style="font-size:10px;padding:2px 8px;background:#dbeafe;border:1px solid #93c5fd;border-radius:6px;cursor:pointer;" onclick="event.stopPropagation();restoreTask(' + task.id + ')" title="' + (currentLang === 'fr' ? 'Restaurer' : 'Restore') + '">♻️ ' + (currentLang === 'fr' ? 'Restaurer' : 'Restore') + '</button></div>';
  }

  // A2 : panneau de détail déplié (description complète, sous-tâches, commentaires)
  if (_isExpanded) {
    var _fr = currentLang === 'fr';
    html += '<div class="task-card-detail" onclick="event.stopPropagation();">';
    if (task.Description) {
      html += '<div class="tcd-section"><div class="tcd-label">' + (_fr ? 'Description' : 'Description') + '</div>';
      html += '<div class="tcd-desc">' + sanitize(task.Description) + '</div></div>';
    }
    if (taskSubtasks.length > 0) {
      html += '<div class="tcd-section"><div class="tcd-label">' + (_fr ? 'Sous-tâches' : 'Subtasks') + ' (' + completedCount + '/' + taskSubtasks.length + ')</div>';
      taskSubtasks.forEach(function(st) {
        html += '<label class="tcd-subtask"><input type="checkbox" ' + (st.Completed ? 'checked' : '') + ' onclick="event.stopPropagation();toggleSubtaskFromCard(' + st.id + ', this.checked)">';
        html += '<span' + (st.Completed ? ' style="text-decoration:line-through;color:#94a3b8;"' : '') + '>' + sanitize(st.Title) + '</span>';
        if (st.Due_Date) html += '<span class="tcd-st-date">📅 ' + formatDate(st.Due_Date) + '</span>';
        html += '</label>';
      });
      html += '</div>';
    }
    if (taskComments.length > 0) {
      html += '<div class="tcd-section"><div class="tcd-label">' + (_fr ? 'Commentaires' : 'Comments') + ' (' + taskComments.length + ')</div>';
      taskComments.slice(-5).forEach(function(cmt) {
        html += '<div class="tcd-comment"><span class="tcd-c-author">👤 ' + sanitize(cmt.Author || '?') + '</span> ';
        html += '<span class="tcd-c-time">' + formatTimeAgo(cmt.Created_At) + '</span>';
        html += '<div class="tcd-c-content">' + sanitize(cmt.Content) + '</div></div>';
      });
      html += '</div>';
    }
    if (!task.Description && taskSubtasks.length === 0 && taskComments.length === 0) {
      html += '<div style="color:#94a3b8;font-size:12px;padding:4px 0;">' + (_fr ? 'Aucun détail pour le moment' : 'No details yet') + '</div>';
    }
    html += '<div class="tcd-actions">';
    html += '<button class="btn btn-sm" onclick="event.stopPropagation();openEditTaskModal(' + task.id + ')">✏️ ' + (_fr ? 'Éditer la tâche' : 'Edit task') + '</button>';
    if (state.isOwner) html += '<button class="btn btn-sm tcd-delete-btn" onclick="event.stopPropagation();deleteTask(' + task.id + ')">🗑️ ' + t('delete') + '</button>';
    html += '</div>';
    html += '</div>';
  }

  html += '</div></div>';
  return html;
}

export async function archiveTask(taskId) {
  try {
    var statusCol = getColumnName('tasks', 'status');
    var task = state.tasks.find(function(t) { return t.id === taskId; });
    var oldStatus = task ? task.Status : '';
    await grist.docApi.applyUserActions([['UpdateRecord', state.TASKS_TABLE, taskId, { [statusCol]: 'archived' }]]);
    if (task) task.Status = 'archived';
    showToast(currentLang === 'fr' ? 'Tâche archivée' : 'Task archived', 'success');
    if (task && oldStatus !== 'archived') {
      await evaluateAutomationRules(Object.assign({}, task, { Status: 'archived' }), { status: { from: oldStatus, to: 'archived' } });
    }
    refreshAllViews();
  } catch (e) {
    showToast('Error: ' + e.message, 'error');
  }
}

export async function restoreTask(taskId) {
  try {
    var statusCol = getColumnName('tasks', 'status');
    var task = state.tasks.find(function(t) { return t.id === taskId; });
    var oldStatus = task ? task.Status : '';
    await grist.docApi.applyUserActions([['UpdateRecord', state.TASKS_TABLE, taskId, { [statusCol]: 'todo' }]]);
    if (task) task.Status = 'todo';
    showToast(currentLang === 'fr' ? 'Tâche restaurée' : 'Task restored', 'success');
    if (task && oldStatus !== 'todo') {
      await evaluateAutomationRules(Object.assign({}, task, { Status: 'todo' }), { status: { from: oldStatus, to: 'todo' } });
    }
    refreshAllViews();
  } catch (e) {
    showToast('Error: ' + e.message, 'error');
  }
}

// =============================================================================
// DRAG & DROP
// =============================================================================

export var draggedTaskId = null;

export var _kanbanScrollInterval = null;
export function onDragStart(e, taskId) {
  draggedTaskId = taskId;
  e.target.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  var board = document.getElementById('kanban-board');
  if (board) {
    document.addEventListener('dragover', function _autoScroll(ev) {
      var rect = board.getBoundingClientRect();
      var edge = 60;
      var speed = 8;
      if (ev.clientX > rect.right - edge) board.scrollLeft += speed;
      else if (ev.clientX < rect.left + edge) board.scrollLeft -= speed;
      if (!draggedTaskId) document.removeEventListener('dragover', _autoScroll);
    });
  }
}

export function onDragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add('drag-over');
}

export function onDragLeave(e) {
  e.currentTarget.classList.remove('drag-over');
}

export async function onDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  var field = e.currentTarget.getAttribute('data-field') || 'Status';
  var newValue = e.currentTarget.getAttribute('data-value');
  if (draggedTaskId && newValue) {
    try {
      var draggedTask = state.tasks.find(function(t) { return t.id === draggedTaskId; });
      var oldVal = draggedTask ? draggedTask[field] : '';
      var record = {};
      if (field === 'Project_Id') {
        record[field] = newValue ? parseInt(newValue) : null;
      } else {
        record[field] = newValue;
      }
      await grist.docApi.applyUserActions([['UpdateRecord', state.TASKS_TABLE, draggedTaskId, record]]);
      for (var i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].id === draggedTaskId) {
          state.tasks[i][field] = record[field];
          break;
        }
      }
      showToast(t('taskMoved'), 'success');
	      if (draggedTask && oldVal !== newValue) {
	        var dropChanges = {};
	        if (field === 'Status') dropChanges.status = { from: oldVal, to: newValue };
        if (field === 'Priority') dropChanges.priority = { from: oldVal, to: newValue };
        if (Object.keys(dropChanges).length > 0) {
	          await evaluateAutomationRules(Object.assign({}, draggedTask, record), dropChanges);
	        }
	        if (field === 'Status' && newValue === 'done' && oldVal !== 'done') {
	          await notifyTaskCompleted(Object.assign({}, draggedTask, record));
	        }
      }
      refreshAllViews();
    } catch (err) {
      console.error('Error moving task:', err);
    }
  }
  draggedTaskId = null;
}

export function toggleKanbanFullscreen() {
  var el = document.getElementById('tab-kanban');
  var btn = document.getElementById('kanban-fullscreen-btn');
  if (!el) return;
  var on = el.classList.toggle('kanban-fullscreen');
  if (btn) {
    var label = on ? (currentLang === 'fr' ? 'Quitter le plein écran' : 'Exit fullscreen') : (currentLang === 'fr' ? 'Afficher le Kanban en plein écran' : 'Show Kanban fullscreen');
    btn.title = label;
    btn.setAttribute('aria-label', label);
    btn.textContent = on ? '↙' : '⛶';
  }
}
