// =============================================================================
// GRIST PROJECT MANAGER WIDGET
// =============================================================================

import { APP_VERSION, currentLang, i18n, t } from './i18n.js';
import { formatDate, toEpoch, fromEpoch, getISOWeek, getWeekStart, formatTimeAgo } from './utils/dates.js';
import { priorityLabel, isMilestone, recurrenceSymbol } from './utils/labels.js';
import { CLIENT_TABLE_NAMES, defaultUiLabels } from './config.js';
import { state } from './store.js';
import { sanitize } from './utils/sanitize.js';
import {
  showConfirmModal, closeConfirmModal, showPromptModal, submitPromptModal,
  toggleEmojiPicker, renderEmojiPicker, selectEmoji, closePromptModal
} from './ui/confirm-modal.js';
import { showToast } from './ui/toast.js';
import {
  getTaskAttachments, formatFileSize, uploadTaskAttachments, downloadAttachment, deleteAttachment,
  viewAttachment, closeAttachmentViewer, renderAttachmentsSection, openAttachmentInNewTab
} from './domains/attachments.js';
import { logActivity, renderActivityLog, expandActivityLog } from './domains/activity-log.js';
import {
  renderTemplatesView, openNewTemplateModal, createTemplate, updateTemplate, deleteTemplate, useTemplate
} from './domains/templates.js';
import {
  updateStats, renderStatsView, renderWorkloadChart, renderTimelineChart, renderBurndownChart
} from './domains/stats.js';
import {
  openProjectModal, closeProjectModal, renderProjectList, editProject, saveProject, deleteProject
} from './domains/projects.js';
import {
  getTaskCustomFieldValue, getTaskCustomFieldsText, renderCustomFieldInput, updateCustomFieldValue,
  openCustomFieldsModal, toggleCfOptions, addCustomField, deleteCustomField
} from './domains/custom-fields.js';
import { getTaskComments } from './domains/comments.js';
import {
  getTaskTimeEntries, getTaskTotalTime, formatDuration, formatDurationShort,
  startTimer, pauseTimer, addManualTimeEntry
} from './domains/time-tracking.js';
import {
  getTaskDependencies, getTasksDependingOn, isTaskBlocked, ganttDepBadge,
  showGanttDependencyTooltip, hideGanttDependencyTooltip, normalizeDependencyProjectId,
  getDependencyCandidates, refreshDependencyTaskOptions, clearDependencyTaskSelection,
  openDependencyTaskOptions, closeDependencyTaskOptions, toggleDependencyTaskOptions, selectDependencyTask
} from './domains/dependencies.js';
import {
  getTaskSubtasks, getTaskProgress, isSubtaskBlocked, getSubtaskBlocker,
  toggleSubtaskFromPopup, toggleSubtaskFromCard, toggleSubtasks, expandAllSubtasks, collapseAllSubtasks,
  toggleSubtaskFromTable, openSubtaskDepModal, updateSubtaskDep,
  setStStatus, setStType, setStPill, startEditSubtask, cancelEditSubtask, filterStAssignees
} from './domains/subtasks.js';
import { generateOccurrences, addRecurrenceToEpoch, createNextOccurrence } from './domains/recurrence.js';
import {
  renderMultiFilter, toggleMsFilter, toggleMsOption, clearMsFilter, sortTable, renderTableView
} from './domains/table-view.js';
import {
  renderCalendarView, renderCalendarDay, onCalendarDayClick, onCalendarTaskDragStart, onCalendarDragOver,
  onCalendarDrop, openNewTaskModalWithDate, calendarToday, setCalendarMode, getTasksForDate,
  renderCalendarWeekView, calendarNav, renderCalendarMobileView, applyCalendarResponsiveClasses,
  attachCalendarResizeObserver, renderCalendarDayView, openNewTaskForDay
} from './domains/calendar.js';
import {
  roleLabel, renderProjectSelector, buildFilterCombo, toggleFilterCombo, filterComboSearch, selectFilterCombo,
  toggleProjectDropdown, filterProjectDropdown, selectProjectOption, filterByProject, myAssigneeValue,
  myProjectIdSet, toggleMyProjects, persistFilters, restoreFilters, filterByRole, filterByAssignee,
  filterByCategory, filterByTag, resetFilters, showArchivedTasks, toggleArchiveView, updateArchiveButton,
  getFilteredTasks, getProjectName, getProjectColor
} from './domains/filters.js';
import { loadAllData } from './domains/data-loader.js';
import {
  getUserRoles, userMatchesRole, userRoleDisplay, shouldLimitToMyProjects, canEditWorkItems,
  applyRoleVisibilityDefaults, applyBusinessRoleRestrictions, registerWidget, loadWidgetPermissions,
  applyOwnerRestrictions, checkSecurityStatus, applySecurityRules, removeSecurityRules
} from './domains/permissions.js';
import {
  openColumnMappingModal, detectTaskColumns, detectUserColumns, detectProjectColumns, saveColumnMapping
} from './domains/column-mapping-ui.js';
import {
  getOverdueTasks, getUpcomingTasks, getMyNotifications, getUnreadCount, getComputedAlertKey,
  isComputedAlertRead, getUnreadComputedTasks, updateNotificationBadge, showNotifications,
  closeNotifications, closeNotificationsOnOutsideClick, openNotification, openComputedNotification,
  markNotificationRead, markAllNotificationsRead, createNotification, splitRecipientValues,
  resolveUserEmail, getProjectLead, notifyTaskCompleted, notifyConcernedUsers, resolveRecipients,
  renderAutoMessage, evaluateAutomationRules, checkTimeBasedAutomations, cleanupOldNotifications
} from './domains/notifications.js';

// index.html can't change and calls these ~182 functions via inline
// onclick="..."/onchange="..." attributes (both in the static HTML and in
// HTML strings generated here). esbuild's --format=iife wraps everything in
// a closure, so plain function declarations are no longer implicit globals
// the way they were in the original unbundled script - without this, every
// one of these handlers throws "X is not defined" the moment it's clicked.
// Any new onclick handler added to generated HTML must be added here too.
Object.assign(window, {
  addComment, addCustomField, addDefaultAutomationRules, addDependency, addKanbanStatus, addManualTimeEntry,
  addRaciChip, addRoleChoice, addSubtask, applySecurityRules, archiveTask, calendarNav,
  calendarToday, cancelEditSubtask, clearDependencyTaskSelection, clearMsFilter, closeAttachmentViewer, closeAutomationModal,
  closeConfirmModal, closeModal, closeModalForce, closeNotifications, closeProjectModal, closePromptModal,
  closeTagsModal, collapseAllSubtasks, createGroup, createTask, createTemplate, createUser,
  deleteAttachment, deleteAutomationRule, deleteCategory, deleteComment, deleteCustomField, deleteGroup,
  deleteProject, deleteSubtask, deleteTag, deleteTask, deleteTemplate, deleteUser,
  detectProjectColumns, detectTaskColumns, detectUserColumns, downloadAttachment, editCategory, editKanbanStatus,
  editProject, editTag, expandActivityLog, expandAllSubtasks, exportGanttPdf, filterComboSearch, filterProjectDropdown,
  filterStAssignees, focusGanttTask, ganttCollapseAll, ganttExpandAll, ganttNav, ganttToday,
  generateOccurrences, generateSubtaskOccurrences, hideGanttDependencyTooltip, markAllNotificationsRead, markNotificationRead, onAutoActionChange,
  onAutoTriggerChange, onCalendarDayClick, onCalendarDragOver, onCalendarDrop, onCalendarTaskDragStart, onDragLeave,
  onDragOver, onDragStart, onDrop, openAddAutomationRuleModal, openAttachmentInNewTab, openCardAttachmentsModal,
  openCardCommentsModal, openCardSubtasksModal, openCategoriesModal, openColumnMappingModal, openComputedNotification, openCustomFieldsModal,
  openDependencyTaskOptions, openEditAutomationRuleModal, openEditGroupModal, openEditTaskModal, openEditUserModal, openManageRolesModal,
  openNewGroupModal, openNewTaskForDay, openNewTaskModal, openNewTemplateModal, openNewUserModal, openNotification,
  openProjectModal, openProjectModalForEdit, openSubtaskDepModal, openTagsModal, pauseTimer, quickAction,
  refreshDependencyTaskOptions, removeDependency, removeKanbanStatus, removeRaciChip, removeRoleChoice, removeSecurityRules,
  renderActivityLog, renderBurndownChart, renderEmojiPicker, renderProjectList, renderSettingsProjectsList, renderTableView,
  renderTemplatesView, renderTimelineChart, resetFilters, restoreTask, runSetupDiagnostic, saveAutomationRuleFromModal,
  saveCategory, saveColumnMapping, saveEditSubtask, saveInlineProjectEdit, saveProject, saveRoleChoices,
  saveTag, saveTaskFromFooter, saveUiLabelSettings, selectEmoji, selectFilterCombo, selectProjectOption,
  setCalendarMode, setGanttCustomRange, setGanttMode, setGanttSort, setGanttYear, setKanbanGroupBy,
  setKanbanSort, setStPill, setStStatus, setStType, setupCreateFrenchTables, setupUseExistingTables,
  showGanttDependencyTooltip, showNotifications, sortTable, startEditSubtask, startTimer, submitPromptModal,
  switchTab, toggleArchiveView, toggleAutomationRule, toggleCardDisplay, toggleCardExpand, toggleCfOptions,
  toggleDependencyTaskOptions, toggleEmojiPicker, toggleFilterCombo, toggleGanttFullscreen, toggleGanttSubtask, toggleKanbanCol,
  toggleKanbanFullscreen, toggleMsFilter, toggleMsOption, toggleMyProjects, toggleNotifyConcerned, toggleProjectDropdown,
  toggleRaci, toggleSubtask, toggleSubtaskFromCard, toggleSubtaskFromPopup, toggleSubtasks, updateCustomFieldValue,
  updateGroup, updateSubtaskDep, updateTask, updateTemplate, updateUser, uploadTaskAttachments,
  useTemplate, viewAttachment
});

// =============================================================================
// STATE
// =============================================================================

 // null = all projects
 // user Name
 // "Mes projets" : projets créés par moi OU où je suis assigné
 // taskId -> startTime (for running timers)
var kanbanGroupBy = 'status'; // 'status' | 'priority' | 'project'
var kanbanSort = 'manual'; // 'manual' | 'alpha' | 'alpha-desc' | 'due'
var expandedKanbanCards = {}; // taskId -> true quand la tuile est dépliée (A2)
var collapsedKanbanCols = {}; // col.key -> true when collapsed

var defaultKanbanStatuses = [
  { key: 'todo',     label_fr: 'À faire',   label_en: 'To do',        color: '#f59e0b', cssClass: 'col-todo' },
  { key: 'progress', label_fr: 'En cours',  label_en: 'In progress',  color: '#3b82f6', cssClass: 'col-progress' },
  { key: 'done',     label_fr: 'Terminé',   label_en: 'Done',         color: '#22c55e', cssClass: 'col-done' }
];
var customKanbanStatuses = null;
export function getKanbanStatuses() {
  return customKanbanStatuses || defaultKanbanStatuses;
}
async function saveKanbanStatuses() {
  await saveSetting('kanban_statuses', JSON.stringify(customKanbanStatuses));
  await syncTaskStatusChoices();
  syncSubtaskStatusChoices();
}

async function syncTaskStatusChoices() {
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
async function syncSubtaskStatusChoices() {
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
function getStatusLabel(key) {
  var statuses = getKanbanStatuses();
  var found = statuses.find(function(s) { return s.key === key; });
  if (found) return currentLang === 'fr' ? found.label_fr : found.label_en;
  return key;
}

var defaultCardDisplay = { description: true, priority: true, date: true, assignee: true, tags: true, category: true, time: true, subtasks: true, comments: true };
var cardDisplaySettings = Object.assign({}, defaultCardDisplay);
async function saveCardDisplaySettings() {
  await saveSetting('card_display', JSON.stringify(cardDisplaySettings));
}

 // notifier les utilisateurs concernés à la création/modification

// PM_Settings helpers

export async function loadSettings() {
  try {
    var data = await grist.docApi.fetchTable(state.SETTINGS_TABLE);
    state._settingsCache = {};
    if (data && data.id) {
      for (var i = 0; i < data.id.length; i++) {
        state._settingsCache[data.Key[i]] = { id: data.id[i], value: data.Value[i] };
      }
    }
    // Apply loaded settings
    if (state._settingsCache.kanban_statuses) {
      try { customKanbanStatuses = JSON.parse(state._settingsCache.kanban_statuses.value); } catch (e) {}
    }
    if (state._settingsCache.card_display) {
      try { cardDisplaySettings = Object.assign({}, defaultCardDisplay, JSON.parse(state._settingsCache.card_display.value)); } catch (e) {}
    }
    if (state._settingsCache.raci_enabled) {
      state.raciEnabled = state._settingsCache.raci_enabled.value === 'true';
    }
    if (state._settingsCache.kanban_sort) {
      kanbanSort = state._settingsCache.kanban_sort.value || 'manual';
    }
    if (state._settingsCache.automation_rules) {
      try { state.automationRules = JSON.parse(state._settingsCache.automation_rules.value); } catch (e2) { state.automationRules = []; }
    }
    if (state._settingsCache.notify_concerned) {
      state.notifyConcernedEnabled = state._settingsCache.notify_concerned.value !== 'false';
    }
    if (state._settingsCache.ui_labels) {
      try { state.uiLabels = Object.assign({}, defaultUiLabels, JSON.parse(state._settingsCache.ui_labels.value)); } catch (e3) {}
    }
  } catch (e) {
    console.log('[GristPM] PM_Settings not available yet');
  }
}

export async function saveSetting(key, value) {
  try {
    if (state._settingsCache[key]) {
      await grist.docApi.applyUserActions([['UpdateRecord', state.SETTINGS_TABLE, state._settingsCache[key].id, { Value: value }]]);
      state._settingsCache[key].value = value;
    } else {
      var result = await grist.docApi.applyUserActions([['AddRecord', state.SETTINGS_TABLE, null, { Key: key, Value: value }]]);
      var newId = (result && result.retValues && result.retValues[0]) || result;
      state._settingsCache[key] = { id: newId, value: value };
    }
  } catch (e) {
    console.error('[GristPM] Error saving setting:', e);
  }
}
var ganttMode = 'days';
var ganttSort = 'default'; // 'default' | 'priority' | 'alpha' | 'due'
var ganttCustomStart = ''; // mode 'custom' : date de début (YYYY-MM-DD)
var ganttCustomEnd = '';   // mode 'custom' : date de fin (YYYY-MM-DD)
var ganttYear = new Date().getFullYear();
var ganttMonth = new Date().getMonth();
var expandedGanttTasks = {}; // taskId -> true quand les sous-tâches sont visibles dans le Gantt
var selectedGanttTaskId = null;

function applyFrenchTableNames(updateDefaults) {
  state.TASKS_TABLE = CLIENT_TABLE_NAMES.tasks;
  state.USERS_TABLE = CLIENT_TABLE_NAMES.users;
  state.GROUPS_TABLE = CLIENT_TABLE_NAMES.groups;
  state.TEMPLATES_TABLE = CLIENT_TABLE_NAMES.templates;
  state.SUBTASKS_TABLE = CLIENT_TABLE_NAMES.subtasks;
  state.DEPENDENCIES_TABLE = CLIENT_TABLE_NAMES.dependencies;
  state.COMMENTS_TABLE = CLIENT_TABLE_NAMES.comments;
  state.TIME_ENTRIES_TABLE = CLIENT_TABLE_NAMES.timeEntries;
  state.CUSTOM_FIELDS_TABLE = CLIENT_TABLE_NAMES.customFields;
  state.CUSTOM_FIELD_VALUES_TABLE = CLIENT_TABLE_NAMES.customFieldValues;
  state.CATEGORIES_TABLE = CLIENT_TABLE_NAMES.categories;
  state.TAGS_TABLE = CLIENT_TABLE_NAMES.tags;
  state.PROJECTS_TABLE = CLIENT_TABLE_NAMES.projects;
  state.CONFIG_TABLE = CLIENT_TABLE_NAMES.config;
  state.SETTINGS_TABLE = CLIENT_TABLE_NAMES.settings;
  state.NOTIFICATIONS_TABLE = CLIENT_TABLE_NAMES.notifications;
  state.ACTIVITY_LOG_TABLE = CLIENT_TABLE_NAMES.activityLog;
  state.ATTACHMENTS_TABLE = CLIENT_TABLE_NAMES.attachments;
  state.USER_INFO_TABLE = CLIENT_TABLE_NAMES.userInfo;
  if (updateDefaults) {
    state.DEFAULT_TASKS_TABLE = CLIENT_TABLE_NAMES.tasks;
    state.DEFAULT_USERS_TABLE = CLIENT_TABLE_NAMES.users;
    state.DEFAULT_PROJECTS_TABLE = CLIENT_TABLE_NAMES.projects;
    state.DEFAULT_CATEGORIES_TABLE = CLIENT_TABLE_NAMES.categories;
    state.DEFAULT_TAGS_TABLE = CLIENT_TABLE_NAMES.tags;
  }
}

function hasFrenchClientTables(tableIds) {
  return tableIds.indexOf(CLIENT_TABLE_NAMES.config) !== -1 || tableIds.indexOf(CLIENT_TABLE_NAMES.tasks) !== -1;
}

function uiLabel(key) { return state.uiLabels[key] || defaultUiLabels[key] || key; }
async function saveUiLabels() { await saveSetting('ui_labels', JSON.stringify(state.uiLabels)); }

// Default table names — used to detect remapping: if a table var differs from
// its default it means the user mapped it to an existing table, so we must NOT
// auto-create the default PM_* table.

// Configuration mapping object

// =============================================================================
// UTILS
// =============================================================================

function isInsideGrist() {
  try { return window.frameElement !== null || window !== window.parent; }
  catch (e) { return true; }
}

// =============================================================================
// COLUMN MAPPING UTILITIES
// =============================================================================

// Load column mapping from PM_Config table
export async function loadColumnMapping() {
  try {
    var configData = await grist.docApi.fetchTable(state.CONFIG_TABLE);
    if (!configData || !configData.Config_Key) return;
    
    // Update columnMapping object from config table
    for (var i = 0; i < configData.Config_Key.length; i++) {
      var key = configData.Config_Key[i];
      var tableName = configData.Table_Name[i];
      var columnName = configData.Column_Name[i];
      
      // Convertit un suffixe snake_case vers camelCase (ex. start_date -> startDate)
      var toCamel = function(s) { return s.replace(/_([a-z])/g, function(_, c) { return c.toUpperCase(); }); };

      // Parse key to determine which mapping to update
      if (key.startsWith('task_')) {
        var field = toCamel(key.slice(5));
        if (state.columnMapping.tasks[field] !== undefined) {
          state.columnMapping.tasks[field] = columnName;
        }
      } else if (key.startsWith('user_')) {
        var field = toCamel(key.slice(5));
        if (state.columnMapping.users[field] !== undefined) {
          state.columnMapping.users[field] = columnName;
        }
      } else if (key.startsWith('project_')) {
        var field = toCamel(key.slice(8));
        if (state.columnMapping.projects[field] !== undefined) {
          state.columnMapping.projects[field] = columnName;
        }
      } else if (key.startsWith('category_')) {
        var field = toCamel(key.slice(9));
        if (state.columnMapping.categories[field] !== undefined) {
          state.columnMapping.categories[field] = columnName;
        }
      } else if (key.startsWith('tag_')) {
        var field = toCamel(key.slice(4));
        if (state.columnMapping.tags[field] !== undefined) {
          state.columnMapping.tags[field] = columnName;
        }
      }
      
      // Also update table names if they differ
      if (key === 'task_title') state.TASKS_TABLE = tableName;
      else if (key === 'user_name') state.USERS_TABLE = tableName;
      else if (key === 'project_name') state.PROJECTS_TABLE = tableName;
      else if (key === 'category_name') state.CATEGORIES_TABLE = tableName;
      else if (key === 'tag_name') state.TAGS_TABLE = tableName;
    }
  } catch (e) {
    console.log('Column mapping not loaded, using defaults:', e);
  }
}

// Set field value in a record object using mapping
export function setField(record, entity, field, value) {
  if (!record || !state.columnMapping[entity]) return;
  var columnName = state.columnMapping[entity][field];
  if (columnName) {
    record[columnName] = value;
  }
}

function getInputValue(id, fallback) {
  var el = document.getElementById(id);
  if (!el) return fallback || '';
  return el.value;
}

function getEstimatedHoursInput() {
  var raw = String(getInputValue('task-estimated-hours', '')).trim().replace(',', '.');
  if (!raw) return 0;
  var value = parseFloat(raw);
  return isFinite(value) && value >= 0 ? value : 0;
}

function requireTaskTitle() {
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

async function refreshTaskTableColumns() {
  try {
    var data = await grist.docApi.fetchTable(state.TASKS_TABLE);
    state.taskTableColumns = data ? Object.keys(data) : null;
  } catch (e) {
    state.taskTableColumns = null;
  }
}

async function keepExistingTaskColumns(record) {
  if (!state.taskTableColumns) await refreshTaskTableColumns();
  if (!state.taskTableColumns) return record;
  var filtered = {};
  Object.keys(record).forEach(function(key) {
    if (state.taskTableColumns.indexOf(key) !== -1) filtered[key] = record[key];
  });
  return filtered;
}

async function removeCommentsForTask(taskId) {
  var toRemove = state.comments.filter(function(c) { return c.Task_Id === taskId; });
  if (!toRemove.length) return;
  await grist.docApi.applyUserActions(toRemove.map(function(c) {
    return ['RemoveRecord', state.COMMENTS_TABLE, c.id];
  }));
}

async function removeSubtasksForTask(taskId) {
  var toRemove = state.subtasks.filter(function(st) { return st.Parent_Task_Id === taskId; });
  if (!toRemove.length) return;
  await grist.docApi.applyUserActions(toRemove.map(function(st) {
    return ['RemoveRecord', state.SUBTASKS_TABLE, st.id];
  }));
}

async function removeAttachmentsForTask(taskId) {
  var toRemove = state.attachments.filter(function(attachment) { return attachment.Task_Id === taskId; });
  if (!toRemove.length) return;
  await grist.docApi.applyUserActions(toRemove.map(function(attachment) {
    return ['RemoveRecord', state.ATTACHMENTS_TABLE, attachment.id];
  }));
}

async function removeTimeEntriesForTask(taskId) {
  var toRemove = state.timeEntries.filter(function(entry) { return entry.Task_Id === taskId; });
  if (!toRemove.length) return;
  await grist.docApi.applyUserActions(toRemove.map(function(entry) {
    return ['RemoveRecord', state.TIME_ENTRIES_TABLE, entry.id];
  }));
  delete state.activeTimers[taskId];
}

async function removeDraftChildren(taskId) {
  await removeCommentsForTask(taskId);
  await removeSubtasksForTask(taskId);
  await removeAttachmentsForTask(taskId);
  await removeTimeEntriesForTask(taskId);
}

async function saveTaskFormSilently(taskId) {
  var title = requireTaskTitle();
  if (!title) return false;
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
  setField(record, 'tasks', 'assignee', editAssignees.join(', '));
  setField(record, 'tasks', 'group', getInputValue('task-group'));
  setField(record, 'tasks', 'startDate', toEpoch(getInputValue('task-start')));
  setField(record, 'tasks', 'dueDate', toEpoch(getInputValue('task-due')));
  setField(record, 'tasks', 'category', getInputValue('task-category').trim());
  setField(record, 'tasks', 'projectId', projectId);
  setField(record, 'tasks', 'recurrence', getInputValue('task-recurrence', 'none'));
  setField(record, 'tasks', 'estimatedHours', getEstimatedHoursInput());
  var tagEl = document.getElementById('task-tag');
  if (tagEl) setField(record, 'tasks', 'tag', tagEl.value.trim());
  if (state.raciEnabled && state.TASKS_TABLE === state.DEFAULT_TASKS_TABLE) {
    record.Accountable = editAccountable.join(', ');
    record.Consulted = editConsulted.join(', ');
    record.Informed = editInformed.join(', ');
  }
  record = await keepExistingTaskColumns(record);
  await grist.docApi.applyUserActions([
    ['UpdateRecord', state.TASKS_TABLE, taskId, record]
  ]);
  return true;
}

function captureTaskFormState() {
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
    tag: getInputValue('task-tag'),
    recurrence: getInputValue('task-recurrence', 'none'),
    estimatedHours: getInputValue('task-estimated-hours'),
    extensionDate: getInputValue('task-extension-date'),
    autoExtend: autoExtendEl ? autoExtendEl.checked : null
  };
}

function restoreTaskFormState(state) {
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
    ['task-tag', state.tag],
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

// Get column name for a field using mapping
export function getColumnName(entity, field) {
  if (!state.columnMapping[entity]) return field;
  return state.columnMapping[entity][field] || field;
}

export function isOverdue(task) {
  if (!task.Due_Date || task.Status === 'done') return false;
  var now = Math.floor(Date.now() / 1000);
  return task.Due_Date < now;
}

export function getUserDisplayName(emailOrName) {
  if (!emailOrName) return '';
  // Try to find user by email
  var user = state.users.find(function(u) { 
    return u.Email === emailOrName || u.Name === emailOrName; 
  });
  if (user && user.Name) return user.Name;
  // If no user found or no name, extract name from email
  if (emailOrName.indexOf('@') !== -1) {
    return emailOrName.split('@')[0];
  }
  return emailOrName;
}

export function statusLabel(s) {
  return getStatusLabel(s) || s || '';
}

// =============================================================================
// TABS
// =============================================================================

export function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });
  document.querySelectorAll('.tab-content').forEach(function(tc) {
    tc.classList.toggle('active', tc.id === 'tab-' + tabId);
  });
  // Save active tab to localStorage
  localStorage.setItem('pm-active-tab', tabId);
  
  if (tabId === 'calendar') renderCalendarView();
  if (tabId === 'kanban') renderKanbanView();
  if (tabId === 'table') renderTableView();
  if (tabId === 'gantt') renderGanttView();
  if (tabId === 'templates') renderTemplatesView();
  if (tabId === 'stats') renderStatsView();
  if (tabId === 'team') renderTeamView();
  if (tabId === 'settings') renderSettingsView();
}

function restoreActiveTab() {
  var savedTab = localStorage.getItem('pm-active-tab');
  var allowedTabs = ['kanban', 'gantt', 'team', 'settings'];
  if (savedTab && allowedTabs.indexOf(savedTab) !== -1) {
    switchTab(savedTab);
  } else {
    switchTab('kanban');
  }
}

// =============================================================================
// INIT — CREATE TABLES IF NEEDED
// =============================================================================

async function getRawSettingValue(key) {
  try {
    var data = await grist.docApi.fetchTable(state.SETTINGS_TABLE);
    if (!data || !data.Key) return null;
    for (var i = 0; i < data.Key.length; i++) {
      if (data.Key[i] === key) return data.Value[i];
    }
  } catch (e) {}
  return null;
}

function buildDefaultConfigRecords() {
  var defaultConfig = [
    ['task_title', state.TASKS_TABLE, 'Title', 'Titre', true, 'Title'],
    ['task_description', state.TASKS_TABLE, 'Description', 'Description', false, 'Description'],
    ['task_status', state.TASKS_TABLE, 'Status', 'Statut', true, 'Status'],
    ['task_priority', state.TASKS_TABLE, 'Priority', 'Priorité', true, 'Priority'],
    ['task_assignee', state.TASKS_TABLE, 'Assignee', 'Assigné à', false, 'Assignee'],
    ['task_group', state.TASKS_TABLE, 'Group_Name', 'Groupe', false, 'Group_Name'],
    ['task_start_date', state.TASKS_TABLE, 'Start_Date', 'Date début', false, 'Start_Date'],
    ['task_due_date', state.TASKS_TABLE, 'Due_Date', 'Échéance', false, 'Due_Date'],
    ['task_category', state.TASKS_TABLE, 'Category', 'Catégorie', false, 'Category'],
    ['task_tag', state.TASKS_TABLE, 'Tag', 'Tag', false, 'Tag'],
    ['task_recurrence', state.TASKS_TABLE, 'Recurrence', 'Récurrence', false, 'Recurrence'],
    ['task_estimated_hours', state.TASKS_TABLE, 'Estimated_Hours', 'Heures estimées', false, 'Estimated_Hours'],
    ['task_created_at', state.TASKS_TABLE, 'Created_At', 'Créé le', false, 'Created_At'],
    ['task_project_id', state.PROJECTS_TABLE, 'Project_Id', 'Projet', false, 'Project_Id'],
    ['user_name', state.USERS_TABLE, 'Name', 'Nom', true, 'Name'],
    ['user_email', state.USERS_TABLE, 'Email', 'Email', true, 'Email'],
    ['user_role', state.USERS_TABLE, 'Role', 'Rôle', false, 'Role'],
    ['user_group', state.USERS_TABLE, 'Group_Name', 'Groupe', false, 'Group_Name'],
    ['project_name', state.PROJECTS_TABLE, 'Name', 'Nom', true, 'Name'],
    ['project_description', state.PROJECTS_TABLE, 'Description', 'Description', false, 'Description'],
    ['project_color', state.PROJECTS_TABLE, 'Color', 'Couleur', false, 'Color'],
    ['project_status', state.PROJECTS_TABLE, 'Status', 'Statut', false, 'Status'],
    ['category_name', state.CATEGORIES_TABLE, 'Name', 'Nom', true, 'Name'],
    ['category_color', state.CATEGORIES_TABLE, 'Color', 'Couleur', false, 'Color'],
    ['category_order', state.CATEGORIES_TABLE, 'Order', 'Ordre', false, 'Order'],
    ['tag_name', state.TAGS_TABLE, 'Name', 'Nom', true, 'Name'],
    ['tag_color', state.TAGS_TABLE, 'Color', 'Couleur', false, 'Color']
  ];
  return defaultConfig.map(function(row) {
    return { Config_Key: row[0], Table_Name: row[1], Column_Name: row[2], Display_Label: row[3], Required: row[4], Default_Value: row[5] };
  });
}

export async function ensureConfigAndSettingsTables(existingTables) {
  existingTables = existingTables || await grist.docApi.listTables();
  if (existingTables.indexOf(state.CONFIG_TABLE) === -1) {
    await grist.docApi.applyUserActions([
      ['AddTable', state.CONFIG_TABLE, [
        { id: 'Config_Key', type: 'Text' },
        { id: 'Table_Name', type: 'Text' },
        { id: 'Column_Name', type: 'Text' },
        { id: 'Display_Label', type: 'Text' },
        { id: 'Required', type: 'Bool' },
        { id: 'Default_Value', type: 'Text' }
      ]]
    ]);
    var configRecords = buildDefaultConfigRecords();
    await grist.docApi.applyUserActions([
      ['BulkAddRecord', state.CONFIG_TABLE, configRecords.map(function() { return null; }), configRecords]
    ]);
  }
  existingTables = await grist.docApi.listTables();
  if (existingTables.indexOf(state.SETTINGS_TABLE) === -1) {
    await grist.docApi.applyUserActions([
      ['AddTable', state.SETTINGS_TABLE, [
        { id: 'Key', type: 'Text' },
        { id: 'Value', type: 'Text' }
      ]]
    ]);
  }
}

async function tableHasColumns(tableId, requiredColumns) {
  try {
    var data = await grist.docApi.fetchTable(tableId);
    var columns = Object.keys(data || {}).filter(function(key) { return key !== 'id'; });
    return requiredColumns.every(function(columnId) { return columns.indexOf(columnId) !== -1; });
  } catch (e) {
    return false;
  }
}

export async function hasValidMappedTaskTable(existingTables) {
  var configTables = [state.CONFIG_TABLE, CLIENT_TABLE_NAMES.config, 'PM_Config'];
  for (var c = 0; c < configTables.length; c++) {
    var configTable = configTables[c];
    if (existingTables.indexOf(configTable) === -1) continue;
    try {
      var configData = await grist.docApi.fetchTable(configTable);
      var rows = configData && configData.id ? configData.id : [];
      var taskTable = '';
      var requiredColumns = [];
      for (var i = 0; i < rows.length; i++) {
        var key = configData.Config_Key && configData.Config_Key[i];
        if (key === 'task_title') taskTable = configData.Table_Name[i] || taskTable;
        if (key === 'task_title' || key === 'task_status') {
          if (configData.Column_Name[i]) requiredColumns.push(configData.Column_Name[i]);
        }
      }
      if (!taskTable || existingTables.indexOf(taskTable) === -1) continue;
      if (requiredColumns.length < 2) continue;
      if (await tableHasColumns(taskTable, requiredColumns)) return true;
    } catch (e) {
      console.warn('Impossible de vérifier le mapping:', e.message);
    }
  }
  return false;
}

async function getInstallModeFromExistingSettings(existingTables) {
  var settingsTables = [state.SETTINGS_TABLE, CLIENT_TABLE_NAMES.settings, 'PM_Settings'];
  for (var i = 0; i < settingsTables.length; i++) {
    var settingsTable = settingsTables[i];
    if (existingTables.indexOf(settingsTable) === -1) continue;
    var previousSettingsTable = state.SETTINGS_TABLE;
    state.SETTINGS_TABLE = settingsTable;
    var installMode = await getRawSettingValue('install_mode');
    state.SETTINGS_TABLE = previousSettingsTable;
    if (installMode) return installMode;
  }
  return '';
}

async function hasUsableDefaultTaskTable(existingTables) {
  var candidates = [CLIENT_TABLE_NAMES.tasks, 'PM_Tasks'];
  for (var i = 0; i < candidates.length; i++) {
    var tableId = candidates[i];
    if (existingTables.indexOf(tableId) === -1) continue;
    if (await tableHasColumns(tableId, ['Title', 'Status'])) return true;
  }
  return false;
}

async function shouldShowClientSetup(existingTables) {
  existingTables = existingTables || await grist.docApi.listTables();
  if (hasFrenchClientTables(existingTables)) applyFrenchTableNames(true);

  // Installation automatique ou mapping déjà faits : on se base sur la structure réelle,
  // pas seulement sur un marqueur de réglage qui peut échouer selon les droits Grist.
  if (await hasUsableDefaultTaskTable(existingTables)) return false;
  if (await hasValidMappedTaskTable(existingTables)) return false;

  return true;
}

function showClientSetup() {
  var setup = document.getElementById('client-setup');
  if (setup) setup.classList.remove('hidden');
  var main = document.getElementById('main-content');
  if (main) main.classList.add('hidden');
}

function hideClientSetup() {
  var setup = document.getElementById('client-setup');
  if (setup) setup.classList.add('hidden');
  var main = document.getElementById('main-content');
  if (main) main.classList.remove('hidden');
}

export function formatAccessError(error) {
  var message = error && error.message ? error.message : String(error || '');
  if (/access not granted|access denied|permission|autorisation/i.test(message)) {
    return 'Accès complet non accordé. Dans le panneau du widget Grist, mettez le niveau d’accès sur “Accès complet au document”, puis réessayez.';
  }
  return message;
}

function writeSetupDiagnostic(lines, type) {
  var box = document.getElementById('client-setup-diagnostics');
  if (!box) return;
  box.className = 'client-setup-diagnostics ' + (type || '');
  box.innerHTML = lines.map(function(line) { return '<div>' + sanitize(String(line)) + '</div>'; }).join('');
}

async function runSetupDiagnostic() {
  var lines = ['Diagnostic v' + APP_VERSION];
  try {
    var tables = await grist.docApi.listTables();
    lines.push('Tables vues par le widget : ' + (tables.length ? tables.join(', ') : 'aucune'));
    var hasTaches = tables.indexOf(CLIENT_TABLE_NAMES.tasks) !== -1;
    var hasPmTasks = tables.indexOf('PM_Tasks') !== -1;
    lines.push('Table Taches détectée : ' + (hasTaches ? 'oui' : 'non'));
    lines.push('Table PM_Tasks détectée : ' + (hasPmTasks ? 'oui' : 'non'));
    lines.push('Structure utilisable : ' + ((await hasUsableDefaultTaskTable(tables)) ? 'oui' : 'non'));
    lines.push('Mapping utilisable : ' + ((await hasValidMappedTaskTable(tables)) ? 'oui' : 'non'));
    if (await shouldShowClientSetup(tables)) {
      lines.push('Conclusion : installation non reconnue, le choix création/mapping doit rester affiché.');
      writeSetupDiagnostic(lines, 'warning');
    } else {
      lines.push('Conclusion : installation reconnue. Ouverture du widget...');
      writeSetupDiagnostic(lines, 'success');
      hideClientSetup();
      setTimeout(function() { window.location.reload(); }, 600);
    }
  } catch (e) {
    lines.push('Erreur : ' + formatAccessError(e));
    writeSetupDiagnostic(lines, 'error');
  }
}

async function setupCreateFrenchTables() {
  try {
    applyFrenchTableNames(true);
    hideClientSetup();
    showToast('Création des tables en français...', 'info');
    await ensureTables();
    var tablesAfterCreate = await grist.docApi.listTables();
    if (!(await hasUsableDefaultTaskTable(tablesAfterCreate))) {
      throw new Error('La table Taches n’a pas pu être vérifiée après création. Vérifiez que le widget a un accès complet au document.');
    }
    await loadSettings();
    await saveSetting('install_mode', 'french_auto');
    showToast('Tables créées. Rechargement du widget...', 'success');
    setTimeout(function() { window.location.reload(); }, 700);
  } catch (e) {
    console.error('setupCreateFrenchTables:', e);
    showToast('Erreur pendant la création : ' + formatAccessError(e), 'error');
    showClientSetup();
  }
}

async function setupUseExistingTables() {
  try {
    applyFrenchTableNames(true);
    hideClientSetup();
    showToast('Préparation du mapping...', 'info');
    switchTab('settings');
    setTimeout(function() { openColumnMappingModal(); }, 250);
    showToast('Choisissez vos tables existantes dans le mapping.', 'success');
  } catch (e) {
    console.error('setupUseExistingTables:', e);
    showToast('Erreur pendant la préparation : ' + formatAccessError(e), 'error');
    showClientSetup();
  }
}

async function ensureTables() {
  try {
    var existingTables = await grist.docApi.listTables();
    if (hasFrenchClientTables(existingTables)) applyFrenchTableNames(true);
    var installMode = await getRawSettingValue('install_mode');
    var skipAutoCreateWorkTables = installMode === 'mapping' || installMode === 'mapping_started' || installMode === 'mapping_complete';

    // If PM_Config already exists load the mapping NOW so table vars reflect any
    // remapping the user has configured.  This prevents re-creating PM_Users etc.
    // when they have been remapped to existing user-owned tables.
    if (existingTables.indexOf(state.CONFIG_TABLE) !== -1) {
      await loadColumnMapping();
    }

    // Only auto-create a table when it (a) still has its default PM_* name
    // (meaning it has not been remapped) AND (b) does not yet exist.
    if (!skipAutoCreateWorkTables && (state.TASKS_TABLE === state.DEFAULT_TASKS_TABLE && existingTables.indexOf(state.TASKS_TABLE) === -1)) {
      await grist.docApi.applyUserActions([
        ['AddTable', state.TASKS_TABLE, [
          { id: 'Title', type: 'Text' },
          { id: 'Description', type: 'Text' },
          { id: 'Status', type: 'Choice', widgetOptions: JSON.stringify({ choices: ['todo', 'progress', 'done', 'archived'] }) },
          { id: 'Priority', type: 'Choice', widgetOptions: JSON.stringify({ choices: ['high', 'medium', 'low'] }) },
          { id: 'Assignee', type: 'Text' },
          { id: 'Group_Name', type: 'Text' },
          { id: 'Start_Date', type: 'Date' },
          { id: 'Due_Date', type: 'Date' },
          { id: 'Category', type: 'Text' },
          { id: 'Tag', type: 'Text' },
          { id: 'Recurrence', type: 'Choice', widgetOptions: JSON.stringify({ choices: ['none', 'daily', 'weekly', 'monthly'] }) },
          { id: 'Estimated_Hours', type: 'Numeric' },
          { id: 'Created_At', type: 'Date' }
        ]]
      ]);
    }

    if (!skipAutoCreateWorkTables && (state.USERS_TABLE === state.DEFAULT_USERS_TABLE && existingTables.indexOf(state.USERS_TABLE) === -1)) {
      await grist.docApi.applyUserActions([
        ['AddTable', state.USERS_TABLE, [
          { id: 'Name', type: 'Text' },
          { id: 'Email', type: 'Text' },
          { id: 'Role', type: 'Choice', widgetOptions: JSON.stringify({ choices: ['admin', 'member', 'viewer'] }) },
          { id: 'Group_Name', type: 'Text' }
        ]]
      ]);
    }

    if (!skipAutoCreateWorkTables && (existingTables.indexOf(state.GROUPS_TABLE) === -1)) {
      await grist.docApi.applyUserActions([
        ['AddTable', state.GROUPS_TABLE, [
          { id: 'Name', type: 'Text' },
          { id: 'Description', type: 'Text' }
        ]]
      ]);
    }

    if (!skipAutoCreateWorkTables && (existingTables.indexOf(state.TEMPLATES_TABLE) === -1)) {
      await grist.docApi.applyUserActions([
        ['AddTable', state.TEMPLATES_TABLE, [
          { id: 'Title', type: 'Text' },
          { id: 'Description', type: 'Text' },
          { id: 'Priority', type: 'Choice', widgetOptions: JSON.stringify({ choices: ['high', 'medium', 'low'] }) },
          { id: 'Category', type: 'Text' },
          { id: 'Estimated_Hours', type: 'Numeric' },
          { id: 'Group_Name', type: 'Text' },
          { id: 'Tag', type: 'Text' },
          { id: 'Recurrence', type: 'Text' },
          { id: 'Usage_Count', type: 'Int' },
          { id: 'Updated_At', type: 'Date' }
        ]]
      ]);
    }

    if (!skipAutoCreateWorkTables && (existingTables.indexOf(state.SUBTASKS_TABLE) === -1)) {
      await grist.docApi.applyUserActions([
        ['AddTable', state.SUBTASKS_TABLE, [
          { id: 'Parent_Task_Id', type: 'Int' },
          { id: 'Title', type: 'Text' },
          { id: 'Description', type: 'Text' },
          { id: 'Status', type: 'Choice', widgetOptions: JSON.stringify({ choices: ['todo', 'progress', 'done', 'archived'] }) },
          { id: 'Priority', type: 'Choice', widgetOptions: JSON.stringify({ choices: ['high', 'medium', 'low'] }) },
          { id: 'Assignee', type: 'Text' },
          { id: 'Due_Date', type: 'Date' },
          { id: 'Estimated_Hours', type: 'Numeric' },
          { id: 'Completed', type: 'Bool' },
          { id: 'Order', type: 'Int' },
          { id: 'Created_At', type: 'Date' }
        ]]
      ]);
    }

    if (!skipAutoCreateWorkTables && (existingTables.indexOf(state.DEPENDENCIES_TABLE) === -1)) {
      await grist.docApi.applyUserActions([
        ['AddTable', state.DEPENDENCIES_TABLE, [
          { id: 'Task_Id', type: 'Int' },
          { id: 'Depends_On_Task_Id', type: 'Int' },
          { id: 'Created_At', type: 'Date' }
        ]]
      ]);
    }

    if (!skipAutoCreateWorkTables && (existingTables.indexOf(state.COMMENTS_TABLE) === -1)) {
      await grist.docApi.applyUserActions([
        ['AddTable', state.COMMENTS_TABLE, [
          { id: 'Task_Id', type: 'Int' },
          { id: 'Author', type: 'Text' },
          { id: 'Content', type: 'Text' },
          { id: 'Created_At', type: 'Date' }
        ]]
      ]);
    }

    if (!skipAutoCreateWorkTables && (existingTables.indexOf(state.TIME_ENTRIES_TABLE) === -1)) {
      await grist.docApi.applyUserActions([
        ['AddTable', state.TIME_ENTRIES_TABLE, [
          { id: 'Task_Id', type: 'Int' },
          { id: 'User', type: 'Text' },
          { id: 'Start_Time', type: 'Date' },
          { id: 'End_Time', type: 'Date' },
          { id: 'Duration', type: 'Int' },
          { id: 'Description', type: 'Text' }
        ]]
      ]);
    }

    if (!skipAutoCreateWorkTables && (existingTables.indexOf(state.CUSTOM_FIELDS_TABLE) === -1)) {
      await grist.docApi.applyUserActions([
        ['AddTable', state.CUSTOM_FIELDS_TABLE, [
          { id: 'Name', type: 'Text' },
          { id: 'Type', type: 'Choice', widgetOptions: JSON.stringify({ choices: ['text', 'number', 'date', 'checkbox', 'select'] }) },
          { id: 'Options', type: 'Text' },
          { id: 'Order', type: 'Int' },
          { id: 'Created_At', type: 'Date' }
        ]]
      ]);
    }

    if (!skipAutoCreateWorkTables && (existingTables.indexOf(state.CUSTOM_FIELD_VALUES_TABLE) === -1)) {
      await grist.docApi.applyUserActions([
        ['AddTable', state.CUSTOM_FIELD_VALUES_TABLE, [
          { id: 'Task_Id', type: 'Int' },
          { id: 'Field_Id', type: 'Int' },
          { id: 'Value', type: 'Text' }
        ]]
      ]);
    }

    if (!skipAutoCreateWorkTables && (state.CATEGORIES_TABLE === state.DEFAULT_CATEGORIES_TABLE && existingTables.indexOf(state.CATEGORIES_TABLE) === -1)) {
      await grist.docApi.applyUserActions([
        ['AddTable', state.CATEGORIES_TABLE, [
          { id: 'Name', type: 'Text' },
          { id: 'Color', type: 'Text' },
          { id: 'Order', type: 'Int' }
        ]]
      ]);
    }

    if (!skipAutoCreateWorkTables && (state.TAGS_TABLE === state.DEFAULT_TAGS_TABLE && existingTables.indexOf(state.TAGS_TABLE) === -1)) {
      await grist.docApi.applyUserActions([
        ['AddTable', state.TAGS_TABLE, [
          { id: 'Name', type: 'Text' },
          { id: 'Color', type: 'Text' }
        ]]
      ]);
    }

    // D2 : table des pièces jointes (base64 dans une colonne texte File_Data)
    if (!skipAutoCreateWorkTables && (existingTables.indexOf(state.ATTACHMENTS_TABLE) === -1)) {
      await grist.docApi.applyUserActions([
        ['AddTable', state.ATTACHMENTS_TABLE, [
          { id: 'Task_Id', type: 'Int' },
          { id: 'File_Name', type: 'Text' },
          { id: 'File_Type', type: 'Text' },
          { id: 'File_Size', type: 'Int' },
          { id: 'File_Data', type: 'Text' },
          { id: 'Created_At', type: 'DateTime' }
        ]]
      ]);
    } else {
      // Migration : ajouter File_Data si la table existe déjà (ancienne version avec colonne Attachments)
      try {
        var attCols = Object.keys(await grist.docApi.fetchTable(state.ATTACHMENTS_TABLE));
        if (attCols.indexOf('File_Data') === -1) {
          await grist.docApi.applyUserActions([['AddColumn', state.ATTACHMENTS_TABLE, 'File_Data', { type: 'Text' }]]);
        }
      } catch (mig) {
        console.log('[GristPM] Migration File_Data ignorée :', mig.message);
      }
    }

    if (!skipAutoCreateWorkTables && (state.PROJECTS_TABLE === state.DEFAULT_PROJECTS_TABLE && existingTables.indexOf(state.PROJECTS_TABLE) === -1)) {
      await grist.docApi.applyUserActions([
        ['AddTable', state.PROJECTS_TABLE, [
          { id: 'Name', type: 'Text' },
          { id: 'Description', type: 'Text' },
          { id: 'Color', type: 'Text' },
          { id: 'Status', type: 'Choice', widgetOptions: JSON.stringify({ choices: ['active', 'archived', 'completed'] }) },
          { id: 'Start_Date', type: 'Date' },
          { id: 'End_Date', type: 'Date' },
          { id: 'Lead', type: 'Text' },
          { id: 'CreatedBy', type: 'Text' },
          { id: 'CreatedAt', type: 'Text' }
        ]]
      ]);
    }

    // Migration Project_Id : s'exécute APRÈS la création de la table des projets.
    // Séparé du bloc "existingTables" pour couvrir aussi les installations fraîches.
    try {
      var taskColsCheck = Object.keys(await grist.docApi.fetchTable(state.TASKS_TABLE));
      if (taskColsCheck.indexOf('Project_Id') === -1) {
        await grist.docApi.applyUserActions([
          ['AddColumn', state.TASKS_TABLE, 'Project_Id', { type: 'Ref:' + state.PROJECTS_TABLE }]
        ]);
        console.log('[GristPM] Project_Id ajouté à ' + state.TASKS_TABLE);
      } else {
        // Répare notamment les documents français créés avec Ref:PM_Projects.
        await grist.docApi.applyUserActions([
          ['ModifyColumn', state.TASKS_TABLE, 'Project_Id', { type: 'Ref:' + state.PROJECTS_TABLE }]
        ]);
      }
    } catch (e) {
      console.log('[GristPM] Migration Project_Id ignorée :', e.message);
    }

    // Migration Group_Name / Tag / Recurrence sur PM_Templates
    try {
      var tplCols = Object.keys(await grist.docApi.fetchTable(state.TEMPLATES_TABLE));
      var tplMig = [];
      if (tplCols.indexOf('Group_Name') === -1) tplMig.push(['AddColumn', state.TEMPLATES_TABLE, 'Group_Name', { type: 'Text' }]);
      if (tplCols.indexOf('Tag') === -1) tplMig.push(['AddColumn', state.TEMPLATES_TABLE, 'Tag', { type: 'Text' }]);
      if (tplCols.indexOf('Recurrence') === -1) tplMig.push(['AddColumn', state.TEMPLATES_TABLE, 'Recurrence', { type: 'Text' }]);
      if (tplMig.length) { await grist.docApi.applyUserActions(tplMig); console.log('[GristPM] Colonnes templates enrichies'); }
    } catch (e) {
      console.log('[GristPM] Migration templates ignorée :', e.message);
    }

    // Migration CreatedBy / CreatedAt sur PM_Projects (créateur du projet)
    try {
      var projCols = Object.keys(await grist.docApi.fetchTable(state.PROJECTS_TABLE));
      var projMig = [];
      if (projCols.indexOf('CreatedBy') === -1) projMig.push(['AddColumn', state.PROJECTS_TABLE, 'CreatedBy', { type: 'Text' }]);
      if (projCols.indexOf('CreatedAt') === -1) projMig.push(['AddColumn', state.PROJECTS_TABLE, 'CreatedAt', { type: 'Text' }]);
      if (projCols.indexOf('Lead') === -1) projMig.push(['AddColumn', state.PROJECTS_TABLE, 'Lead', { type: 'Text' }]);
      if (projMig.length) { await grist.docApi.applyUserActions(projMig); console.log('[GristPM] CreatedBy/CreatedAt ajoutés à PM_Projects'); }
    } catch (e) {
      console.log('[GristPM] Migration CreatedBy ignorée :', e.message);
    }

    // Create configuration/settings tables for column mapping configuration
    await ensureConfigAndSettingsTables(existingTables);
    existingTables = await grist.docApi.listTables();
    if (false && existingTables.indexOf(state.CONFIG_TABLE) === -1) {
      await grist.docApi.applyUserActions([
        ['AddTable', state.CONFIG_TABLE, [
          { id: 'Config_Key', type: 'Text' },
          { id: 'Table_Name', type: 'Text' },
          { id: 'Column_Name', type: 'Text' },
          { id: 'Display_Label', type: 'Text' },
          { id: 'Required', type: 'Bool' },
          { id: 'Default_Value', type: 'Text' }
        ]]
      ]);
      
      // Initialize with default mapping
      var defaultConfig = [
        // Tasks mapping
        ['task_title', state.TASKS_TABLE, 'Title', 'Titre', true, 'Title'],
        ['task_description', state.TASKS_TABLE, 'Description', 'Description', false, 'Description'],
        ['task_status', state.TASKS_TABLE, 'Status', 'Statut', true, 'Status'],
        ['task_priority', state.TASKS_TABLE, 'Priority', 'Priorité', true, 'Priority'],
        ['task_assignee', state.TASKS_TABLE, 'Assignee', 'Assigné à', false, 'Assignee'],
        ['task_group', state.TASKS_TABLE, 'Group_Name', 'Groupe', false, 'Group_Name'],
        ['task_start_date', state.TASKS_TABLE, 'Start_Date', 'Date début', false, 'Start_Date'],
        ['task_due_date', state.TASKS_TABLE, 'Due_Date', 'Échéance', false, 'Due_Date'],
        ['task_category', state.TASKS_TABLE, 'Category', 'Catégorie', false, 'Category'],
        ['task_tag', state.TASKS_TABLE, 'Tag', 'Tag', false, 'Tag'],
        ['task_recurrence', state.TASKS_TABLE, 'Recurrence', 'Récurrence', false, 'Recurrence'],
        ['task_estimated_hours', state.TASKS_TABLE, 'Estimated_Hours', 'Heures estimées', false, 'Estimated_Hours'],
        ['task_created_at', state.TASKS_TABLE, 'Created_At', 'Créé le', false, 'Created_At'],
        ['task_project_id', state.TASKS_TABLE, 'Project_Id', 'Projet', false, 'Project_Id'],
        // Users mapping
        ['user_name', state.USERS_TABLE, 'Name', 'Nom', true, 'Name'],
        ['user_email', state.USERS_TABLE, 'Email', 'Email', true, 'Email'],
        ['user_role', state.USERS_TABLE, 'Role', 'Rôle', false, 'Role'],
        ['user_group', state.USERS_TABLE, 'Group_Name', 'Groupe', false, 'Group_Name'],
        // Projects mapping
        ['project_name', state.PROJECTS_TABLE, 'Name', 'Nom', true, 'Name'],
        ['project_description', state.PROJECTS_TABLE, 'Description', 'Description', false, 'Description'],
        ['project_color', state.PROJECTS_TABLE, 'Color', 'Couleur', false, 'Color'],
        ['project_status', state.PROJECTS_TABLE, 'Status', 'Statut', false, 'Status'],
        // Categories mapping
        ['category_name', state.CATEGORIES_TABLE, 'Name', 'Nom', true, 'Name'],
        ['category_color', state.CATEGORIES_TABLE, 'Color', 'Couleur', false, 'Color'],
        ['category_order', state.CATEGORIES_TABLE, 'Order', 'Ordre', false, 'Order'],
        // Tags mapping
        ['tag_name', state.TAGS_TABLE, 'Name', 'Nom', true, 'Name'],
        ['tag_color', state.TAGS_TABLE, 'Color', 'Couleur', false, 'Color']
      ];
      
      var configRecords = [];
      for (var i = 0; i < defaultConfig.length; i++) {
        configRecords.push({
          Config_Key: defaultConfig[i][0],
          Table_Name: defaultConfig[i][1],
          Column_Name: defaultConfig[i][2],
          Display_Label: defaultConfig[i][3],
          Required: defaultConfig[i][4],
          Default_Value: defaultConfig[i][5]
        });
      }
      
      await grist.docApi.applyUserActions([
        ['BulkAddRecord', state.CONFIG_TABLE, configRecords.map(function() { return null; }), configRecords]
      ]);
    }

    // Create PM_Settings table for widget preferences (shared across users)
    if (existingTables.indexOf(state.SETTINGS_TABLE) === -1) {
      await grist.docApi.applyUserActions([
        ['AddTable', state.SETTINGS_TABLE, [
          { id: 'Key', type: 'Text' },
          { id: 'Value', type: 'Text' }
        ]]
      ]);
    }

    if (!skipAutoCreateWorkTables && (existingTables.indexOf(state.NOTIFICATIONS_TABLE) === -1)) {
      await grist.docApi.applyUserActions([
        ['AddTable', state.NOTIFICATIONS_TABLE, [
          { id: 'Task_Id', type: 'Int' },
          { id: 'User_Email', type: 'Text' },
          { id: 'Type', type: 'Text' },
          { id: 'Message', type: 'Text' },
          { id: 'Is_Read', type: 'Bool' },
          { id: 'Created_At', type: 'Date' },
          { id: 'Rule_Id', type: 'Text' }
        ]]
      ]);
    }

    if (!skipAutoCreateWorkTables && (existingTables.indexOf(state.ACTIVITY_LOG_TABLE) === -1)) {
      await grist.docApi.applyUserActions([
        ['AddTable', state.ACTIVITY_LOG_TABLE, [
          { id: 'Timestamp', type: 'Date' },
          { id: 'User_Email', type: 'Text' },
          { id: 'Action', type: 'Text' },
          { id: 'Task_Id', type: 'Int' },
          { id: 'Task_Title', type: 'Text' },
          { id: 'Details', type: 'Text' }
        ]]
      ]);
    }

    // Migration: Add missing columns to existing PM_Tasks table
    if (existingTables.indexOf(state.TASKS_TABLE) !== -1) {
      try {
        var tableInfo = await grist.docApi.fetchTable(state.TASKS_TABLE);
        var existingCols = Object.keys(tableInfo);
        
        if (existingCols.indexOf('Recurrence') === -1) {
          await grist.docApi.applyUserActions([
            ['AddColumn', state.TASKS_TABLE, 'Recurrence', { type: 'Choice', widgetOptions: JSON.stringify({ choices: ['none', 'daily', 'weekly', 'monthly'] }) }]
          ]);
        }
        if (existingCols.indexOf('Estimated_Hours') === -1) {
          await grist.docApi.applyUserActions([
            ['AddColumn', state.TASKS_TABLE, 'Estimated_Hours', { type: 'Numeric' }]
          ]);
        }
        if (existingCols.indexOf('Tag') === -1) {
          await grist.docApi.applyUserActions([
            ['AddColumn', state.TASKS_TABLE, 'Tag', { type: 'Text' }]
          ]);
        }
        // RACI columns
        var raciCols = ['Accountable', 'Consulted', 'Informed'];
        var raciActions = [];
        for (var rc = 0; rc < raciCols.length; rc++) {
          if (existingCols.indexOf(raciCols[rc]) === -1) {
            raciActions.push(['AddColumn', state.TASKS_TABLE, raciCols[rc], { type: 'Text' }]);
          }
        }
        if (raciActions.length > 0) {
          await grist.docApi.applyUserActions(raciActions);
        }
        // Extension columns
        if (existingCols.indexOf('Extension_Date') === -1) {
          await grist.docApi.applyUserActions([['AddColumn', state.TASKS_TABLE, 'Extension_Date', { type: 'Date' }]]);
        }
        if (existingCols.indexOf('Auto_Extend') === -1) {
          await grist.docApi.applyUserActions([['AddColumn', state.TASKS_TABLE, 'Auto_Extend', { type: 'Bool' }]]);
        }
      } catch (migrationErr) {
        console.log('Migration check completed or columns already exist');
      }
    }

    // Migration: Add Blocked_By_Subtask_Id, Assignee, Due_Date to PM_Subtasks
    if (existingTables.indexOf(state.SUBTASKS_TABLE) !== -1) {
      try {
        var stInfo = await grist.docApi.fetchTable(state.SUBTASKS_TABLE);
        var stCols = Object.keys(stInfo);
        var stActions = [];
        if (stCols.indexOf('Blocked_By_Subtask_Id') === -1) {
          stActions.push(['AddColumn', state.SUBTASKS_TABLE, 'Blocked_By_Subtask_Id', { type: 'Int' }]);
        }
        if (stCols.indexOf('Assignee') === -1) {
          stActions.push(['AddColumn', state.SUBTASKS_TABLE, 'Assignee', { type: 'Text' }]);
        }
        if (stCols.indexOf('Due_Date') === -1) {
          stActions.push(['AddColumn', state.SUBTASKS_TABLE, 'Due_Date', { type: 'Date' }]);
        }
        if (stCols.indexOf('Description') === -1) {
          stActions.push(['AddColumn', state.SUBTASKS_TABLE, 'Description', { type: 'Text' }]);
        }
        if (stCols.indexOf('Status') === -1) {
          stActions.push(['AddColumn', state.SUBTASKS_TABLE, 'Status', { type: 'Choice', widgetOptions: JSON.stringify({ choices: ['todo', 'progress', 'done', 'archived'] }) }]);
        }
        if (stCols.indexOf('Priority') === -1) {
          stActions.push(['AddColumn', state.SUBTASKS_TABLE, 'Priority', { type: 'Choice', widgetOptions: JSON.stringify({ choices: ['high', 'medium', 'low'] }) }]);
        }
        if (stCols.indexOf('Estimated_Hours') === -1) {
          stActions.push(['AddColumn', state.SUBTASKS_TABLE, 'Estimated_Hours', { type: 'Numeric' }]);
        }
        if (stCols.indexOf('Recurrence') === -1) {
          stActions.push(['AddColumn', state.SUBTASKS_TABLE, 'Recurrence', { type: 'Choice', widgetOptions: JSON.stringify({ choices: ['none', 'daily', 'weekly', 'monthly'] }) }]);
        }
        if (stCols.indexOf('Start_Date') === -1) {
          stActions.push(['AddColumn', state.SUBTASKS_TABLE, 'Start_Date', { type: 'Date' }]);
        }
        // B2 : type de sous-tâche (sous-tâche classique ou jalon)
        if (stCols.indexOf('Type') === -1) {
          stActions.push(['AddColumn', state.SUBTASKS_TABLE, 'Type', { type: 'Choice', widgetOptions: JSON.stringify({ choices: ['subtask', 'milestone'] }) }]);
        }
        if (stActions.length > 0) {
          await grist.docApi.applyUserActions(stActions);
        }
      } catch (e) {
        console.log('Subtask migration completed');
      }
    }

  } catch (e) {
    console.error('Error ensuring tables:', e);
  }
}

export function refreshAllViews() {
  if (typeof renderProjectSelector === 'function') renderProjectSelector();
  updateStats();
  updateArchiveButton();
  var activeTab = document.querySelector('.tab-btn.active');
  if (activeTab) {
    var tab = activeTab.getAttribute('data-tab');
    if (tab === 'calendar') renderCalendarView();
    if (tab === 'kanban') renderKanbanView();
    if (tab === 'table') renderTableView();
    if (tab === 'gantt') renderGanttView();
    if (tab === 'templates') renderTemplatesView();
    if (tab === 'stats') renderStatsView();
    if (tab === 'team') renderTeamView();
  }
  applyBusinessRoleRestrictions();
}

// =============================================================================
// KANBAN VIEW
// =============================================================================

function setKanbanGroupBy(value) {
  kanbanGroupBy = value;
  renderKanbanView();
}

function setKanbanSort(value) {
  kanbanSort = value;
  saveSetting('kanban_sort', value);
  renderKanbanView();
}

// A1 : tri des fiches d'une colonne Kanban
function sortKanbanTasks(list) {
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

function toggleKanbanCol(key) {
  collapsedKanbanCols[key] = !collapsedKanbanCols[key];
  renderKanbanView();
}

// A2 : déplier/replier le détail d'une tuile Kanban (clic simple sur le bouton)
function toggleCardExpand(taskId, ev) {
  if (ev) { ev.stopPropagation(); ev.preventDefault(); }
  if (expandedKanbanCards[taskId]) delete expandedKanbanCards[taskId];
  else expandedKanbanCards[taskId] = true;
  renderKanbanView();
}

function getTaskDateProgress(task) {
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

function openCardCommentsModal(taskId) {
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

function openCardAttachmentsModal(taskId) {
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

function renderTaskCard(task) {
  var cd = cardDisplaySettings;
  var overdueHtml = isOverdue(task) ? ' <span class="overdue-badge">' + t('overdue') + '</span>' : '';
  var taskSubtasks = getTaskSubtasks(task.id);
  var progressPct = getTaskProgress(task);
  var completedCount = taskSubtasks.filter(function(st) { return st.Completed; }).length;
  var blocked = isTaskBlocked(task.id);
  var taskComments = getTaskComments(task.id);
  var taskAttachments = getTaskAttachments(task.id);

  var priorityClass = 'priority-' + (task.Priority || 'medium');
  var projColor = getProjectColor(task.Project_Id);
  var projName = getProjectName(task.Project_Id);
  var html = '<div class="task-card ' + priorityClass + (blocked ? ' task-blocked' : '') + '" draggable="true" ondragstart="onDragStart(event, ' + task.id + ')" data-id="' + task.id + '" ondblclick="openEditTaskModal(' + task.id + ')" style="border-left:none;padding:0;overflow:visible;">';
  html += '<div class="task-card-body">';

  if (blocked) {
    var blockers = getTaskDependencies(task.id).filter(function(b) { return b && b.Status !== 'done'; });
    html += '<div class="blocked-badge">🔒 ' + t('blockedBy') + ' ' + blockers.map(function(b) { return sanitize(b.Title); }).join(', ') + '</div>';
  }

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

  if ((cd.category && task.Category) || (cd.tags && task.Tag)) {
    html += '<div class="task-card-row task-card-taxonomy">';
    if (cd.category && task.Category) {
      var catObj = state.categories.find(function(c) { return c.Name === task.Category; });
      var catColor = catObj ? catObj.Color : '#6366f1';
      html += '<span class="task-card-category" style="color:' + catColor + ';">' + sanitize(task.Category) + '</span>';
    }
    if (cd.tags && task.Tag) {
      var tagList = task.Tag.split(',').map(function(tg) { return tg.trim(); }).filter(Boolean);
      for (var ti = 0; ti < tagList.length; ti++) {
        var tagObj = state.tags.find(function(tg) { return tg.Name === tagList[ti]; });
        var tagColor = tagObj ? tagObj.Color : '#94a3b8';
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

async function archiveTask(taskId) {
  try {
    var statusCol = getColumnName('tasks', 'status');
    var task = state.tasks.find(function(t) { return t.id === taskId; });
    var oldStatus = task ? task.Status : '';
    await grist.docApi.applyUserActions([['UpdateRecord', state.TASKS_TABLE, taskId, { [statusCol]: 'archived' }]]);
    if (task) task.Status = 'archived';
    showToast(currentLang === 'fr' ? 'Tâche archivée' : 'Task archived', 'success');
    logActivity('task_archived', taskId, task ? task.Title : '', '');
    if (task && oldStatus !== 'archived') {
      await evaluateAutomationRules(Object.assign({}, task, { Status: 'archived' }), { status: { from: oldStatus, to: 'archived' } });
    }
    refreshAllViews();
  } catch (e) {
    showToast('Error: ' + e.message, 'error');
  }
}

async function restoreTask(taskId) {
  try {
    var statusCol = getColumnName('tasks', 'status');
    var task = state.tasks.find(function(t) { return t.id === taskId; });
    var oldStatus = task ? task.Status : '';
    await grist.docApi.applyUserActions([['UpdateRecord', state.TASKS_TABLE, taskId, { [statusCol]: 'todo' }]]);
    if (task) task.Status = 'todo';
    showToast(currentLang === 'fr' ? 'Tâche restaurée' : 'Task restored', 'success');
    logActivity('task_restored', taskId, task ? task.Title : '', '');
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

var draggedTaskId = null;

var _kanbanScrollInterval = null;
function onDragStart(e, taskId) {
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

function onDragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add('drag-over');
}

function onDragLeave(e) {
  e.currentTarget.classList.remove('drag-over');
}

async function onDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  var field = e.currentTarget.getAttribute('data-field') || 'Status';
  var newValue = e.currentTarget.getAttribute('data-value');
  if (draggedTaskId && newValue) {
    if (field === 'Status' && newValue === 'done' && isTaskBlocked(draggedTaskId)) {
      var blockers = getTaskDependencies(draggedTaskId).filter(function(b) { return b && b.Status !== 'done'; });
      var blockerNames = blockers.map(function(b) { return b.Title; }).join(', ');
      showToast((currentLang === 'fr' ? 'Impossible : tâche bloquée par ' : 'Cannot move: blocked by ') + blockerNames, 'error');
      draggedTaskId = null;
      return;
    }
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
	        logActivity('status_changed', draggedTaskId, draggedTask.Title, oldVal + ' → ' + newValue);
      }
      refreshAllViews();
    } catch (err) {
      console.error('Error moving task:', err);
    }
  }
  draggedTaskId = null;
}

// =============================================================================
// TABLE VIEW
// =============================================================================

// =============================================================================
// GANTT VIEW
// =============================================================================

// Sous-tâches du Gantt : on les affiche toutes. Celles sans date restent lisibles côté libellé.
function getGanttSubtasks(taskId) {
  return getTaskSubtasks(taskId);
}

// Construit la cellule de sous-tâche du Gantt : lisible, cochable, sans ouvrir la tâche parente.
function renderGanttSubtaskLabelCell(st, parentTaskId) {
  var completedClass = st.Completed ? ' completed' : '';
  var html = '<td class="gantt-task-label gantt-subtask-cell' + completedClass + '">';
  html += '<label class="gantt-subtask-label" onclick="event.stopPropagation()">';
  html += '<span class="gantt-subtask-arrow">' + (isMilestone(st) ? '◆' : '↳') + '</span>';
  html += '<input type="checkbox" class="gantt-subtask-checkbox" ' + (st.Completed ? 'checked' : '') + ' onchange="toggleGanttSubtask(' + st.id + ', this.checked)">';
  html += '<span class="gantt-subtask-title">' + sanitize(st.Title) + '</span>';
  html += '</label>';
  var stMeta = '';
  var stBlocker = getSubtaskBlocker(st);
  if (stBlocker) {
    var depColor = stBlocker.Completed ? '#94a3b8' : '#ef4444';
    stMeta += '<span style="color:' + depColor + ';" title="' + (currentLang === 'fr' ? 'Dépend de' : 'Depends on') + ' : ' + sanitize(stBlocker.Title) + '">🔗 ' + sanitize(stBlocker.Title).substring(0, 14) + '</span>';
  }
  if (st.Due_Date) stMeta += '<span>📅 ' + formatDate(st.Due_Date) + '</span>';
  else stMeta += '<span>' + (currentLang === 'fr' ? 'sans date' : 'no date') + '</span>';
  if (st.Assignee) stMeta += '<span>👤 ' + sanitize(st.Assignee).split(',')[0].trim().substring(0, 10) + '</span>';
  if (stMeta) html += '<div class="gantt-subtask-meta">' + stMeta + '</div>';
  html += '</td>';
  return html;
}

async function toggleGanttSubtask(subtaskId, completed) {
  try {
    await grist.docApi.applyUserActions([
      ['UpdateRecord', state.SUBTASKS_TABLE, subtaskId, { Completed: completed }]
    ]);
    for (var i = 0; i < state.subtasks.length; i++) {
      if (state.subtasks[i].id === subtaskId) { state.subtasks[i].Completed = completed; break; }
    }
    renderGanttView();
  } catch (e) {
    console.error('toggleGanttSubtask:', e);
    showToast((currentLang === 'fr' ? 'Impossible de modifier la sous-tâche : ' : 'Could not update subtask: ') + e.message, 'error');
  }
}

// Couleur de barre pour une sous-tâche (verte si complétée, sinon hérite du statut parent)
// B2 : un jalon reçoit en plus la classe gantt-bar-milestone (rendu losange, tous modes)
function ganttSubtaskBarClass(st, parentTask) {
  var base;
  if (st.Completed) base = 'gantt-bar-done';
  else if (parentTask.Status === 'progress') base = 'gantt-bar-progress';
  else base = 'gantt-bar-todo';
  return base + (isMilestone(st) ? ' gantt-bar-milestone' : '');
}

// Bornes de la sous-tâche. B2 : un jalon est une date unique (Due_Date) → start = end.
function getGanttSubtaskRange(st, parentTask) {
  if (!st.Start_Date && !st.Due_Date) {
    var far = new Date(8640000000000000);
    return { start: far, end: far };
  }
  var stEnd = st.Due_Date ? new Date(st.Due_Date * 1000) : (parentTask.Due_Date ? new Date(parentTask.Due_Date * 1000) : null);
  if (!stEnd) {
    var far2 = new Date(8640000000000000);
    return { start: far2, end: far2 };
  }
  var stStart;
  if (isMilestone(st)) {
    stStart = new Date(stEnd); // jalon : un seul jour
  } else {
    stStart = st.Start_Date ? new Date(st.Start_Date * 1000) : new Date(stEnd);
    if (stStart > stEnd) stStart = new Date(stEnd);
  }
  stStart.setHours(0, 0, 0, 0);
  stEnd.setHours(23, 59, 59, 999);
  return { start: stStart, end: stEnd };
}

function getTaskExtensionEnd(task) {
  if (task.Auto_Extend && task.Status !== 'done' && task.Status !== 'archived') {
    var now = new Date(); now.setHours(23, 59, 59, 999);
    var dueDate = task.Due_Date ? new Date(task.Due_Date * 1000) : null;
    if (dueDate && now > dueDate) return now;
  }
  if (task.Extension_Date) {
    var ext = new Date(task.Extension_Date * 1000);
    ext.setHours(23, 59, 59, 999);
    return ext;
  }
  return null;
}

function getExtensionBarColor(task) {
  var statuses = getKanbanStatuses();
  for (var si = 0; si < statuses.length; si++) {
    if (statuses[si].key === task.Status && statuses[si].color) return statuses[si].color;
  }
  if (task.Status === 'done') return '#22c55e';
  if (task.Status === 'progress') return '#f59e0b';
  return '#3b82f6';
}

function getGanttBarColor(task) {
  var statuses = getKanbanStatuses();
  for (var si = 0; si < statuses.length; si++) {
    if (statuses[si].key === task.Status && statuses[si].color) return statuses[si].color;
  }
  return '';
}

function getGanttBarClass(task) {
  if (isOverdue(task)) return 'gantt-bar-overdue';
  if (task.Status === 'done') return 'gantt-bar-done';
  if (task.Status === 'progress') return 'gantt-bar-progress';
  return 'gantt-bar-todo';
}

function ganttPriorityClass(priority) {
  if (priority === 'high') return 'gantt-priority-high';
  if (priority === 'low') return 'gantt-priority-low';
  return 'gantt-priority-medium';
}

function ganttTaskRowStart(task) {
  var selected = selectedGanttTaskId === task.id;
  return '<tr class="gantt-task-row' + (selected ? ' gantt-row-selected' : '') + '" data-gantt-task-id="' + task.id + '">';
}

function renderGanttTaskLabel(task) {
  var dotClass = task.Priority === 'high' ? 'dot-high' : (task.Priority === 'medium' ? 'dot-medium' : 'dot-low');
  var assigneeNames = task.Assignee ? task.Assignee.split(',').map(function(a) { return getUserDisplayName(a.trim()); }).join(', ') : '';
  var ganttProjColor = getProjectColor(task.Project_Id);
  var ganttProjName = getProjectName(task.Project_Id);
  var checked = selectedGanttTaskId === task.id ? ' checked' : '';
  var focusTitle = currentLang === 'fr' ? 'Afficher cette tâche dans le Gantt' : 'Show this task in the Gantt';
  var openTitle = currentLang === 'fr' ? 'Ouvrir la fiche de la tâche' : 'Open task details';
  var taskComments = getTaskComments(task.id);
  var taskAttachments = getTaskAttachments(task.id);

  var html = '<td class="gantt-task-label">';
  html += '<div class="task-name">';
  html += '<input type="checkbox" class="gantt-focus-checkbox"' + checked + ' title="' + focusTitle + '" onclick="event.stopPropagation()" onchange="focusGanttTask(' + task.id + ', this.checked)">';
  html += '<span class="priority-dot ' + dotClass + '" title="' + priorityLabel(task.Priority) + '"></span>';
  html += '<button type="button" class="gantt-task-title-btn" onclick="openEditTaskModal(' + task.id + ')" title="' + openTitle + '">' + sanitize(task.Title) + '</button>';
  html += ganttDepBadge(task) + '</div>';
  if (ganttProjName) {
    html += '<div class="gantt-project-line" style="--project-color:' + ganttProjColor + ';">' + sanitize(ganttProjName) + '</div>';
  }
  html += '<div class="task-info">';
  if (task.Priority) html += '<span class="gantt-priority-text ' + ganttPriorityClass(task.Priority) + '">' + priorityLabel(task.Priority) + '</span>';
  if (assigneeNames) html += ' 👤 ' + sanitize(assigneeNames);
  if (task.Due_Date) html += ' 📅 ' + formatDate(task.Due_Date);
  if (taskComments.length > 0) html += ' <button class="gantt-mini-btn" onclick="event.stopPropagation();openCardCommentsModal(' + task.id + ')" title="' + t('comments') + '">💬 ' + taskComments.length + '</button>';
  if (taskAttachments.length > 0) html += ' <button class="gantt-mini-btn" onclick="event.stopPropagation();openCardAttachmentsModal(' + task.id + ')" title="' + (currentLang === 'fr' ? 'Pièces jointes' : 'Attachments') + '">📎 ' + taskAttachments.length + '</button>';
  html += '</div></td>';
  return html;
}

function renderGanttView() {
  var yearSelect = document.getElementById('gantt-year');
  if (yearSelect.options.length === 0) {
    for (var y = 2020; y <= 2050; y++) {
      var opt = document.createElement('option');
      opt.value = y;
      opt.textContent = y;
      yearSelect.appendChild(opt);
    }
  }
  // Always sync select TO ganttYear (never overwrite ganttYear from select)
  yearSelect.value = ganttYear;

  document.querySelectorAll('[data-gantt-mode]').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-gantt-mode') === ganttMode);
  });

  var tasksWithDates = getFilteredTasks().filter(function(task) { return task.Start_Date || task.Due_Date; });
  // A8 : tri du Gantt
  var ganttSortSel = document.getElementById('gantt-sort');
  if (ganttSortSel && ganttSortSel.value !== ganttSort) ganttSortSel.value = ganttSort;
  if (ganttSort === 'priority') {
    var prioOrder = { high: 0, medium: 1, low: 2 };
    tasksWithDates.sort(function(a, b) {
      var pa = prioOrder[a.Priority] !== undefined ? prioOrder[a.Priority] : 3;
      var pb = prioOrder[b.Priority] !== undefined ? prioOrder[b.Priority] : 3;
      return pa - pb;
    });
  } else if (ganttSort === 'alpha') {
    tasksWithDates.sort(function(a, b) { return (a.Title || '').localeCompare(b.Title || ''); });
  } else if (ganttSort === 'due') {
    tasksWithDates.sort(function(a, b) {
      var da = a.Due_Date || a.Start_Date || 0, db = b.Due_Date || b.Start_Date || 0;
      return da - db;
    });
  }
  document.getElementById('gantt-task-count').textContent = '(' + tasksWithDates.length + ' ' + (currentLang === 'fr' ? 'tâches' : 'tasks') + ')';

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var dayNames = currentLang === 'fr'
    ? ['DIM.', 'LUN.', 'MAR.', 'MER.', 'JEU.', 'VEN.', 'SAM.']
    : ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  var monthNamesShort = currentLang === 'fr'
    ? ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var monthNames = currentLang === 'fr'
    ? ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var html = '<div class="gantt-container"><table class="gantt-table">';

  // ===== WEEKS MODE =====
  if (ganttMode === 'weeks') {
    var weekAnchor = (ganttYear === today.getFullYear() && ganttMonth === today.getMonth())
      ? new Date(today)
      : new Date(ganttYear, ganttMonth, 1);
    var startWeek = getISOWeek(weekAnchor);
    var numWeeks = 24;
    var weeks = [];
    for (var w = 0; w < numWeeks; w++) {
      var wn = startWeek + w;
      var yr = ganttYear;
      if (wn > 52) { wn -= 52; yr++; }
      var ws = getWeekStart(yr, wn);
      var we = new Date(ws);
      we.setDate(we.getDate() + 6);
      weeks.push({ num: wn, year: yr, start: ws, end: we });
    }

    // Header: week numbers with month subtitle
    html += '<thead><tr><th class="gantt-task-label" style="text-align:left;">' + t('colTaskName') + '</th>';
    for (var wi = 0; wi < weeks.length; wi++) {
      var wk = weeks[wi];
      var isCurrentWeek = getISOWeek(today) === wk.num && today.getFullYear() === wk.year;
      html += '<th style="min-width:80px;' + (isCurrentWeek ? 'background:#fef2f2;color:#ef4444;' : '') + '">';
      html += '<div style="font-size:11px;font-weight:800;">S' + wk.num + '</div>';
      html += '<div style="font-size:9px;font-weight:400;color:#94a3b8;">' + monthNamesShort[wk.start.getMonth()] + ' ' + String(wk.start.getFullYear()).substring(2) + '</div>';
      html += '</th>';
    }
    html += '</tr></thead><tbody>';

    // Task rows
    for (var ti = 0; ti < tasksWithDates.length; ti++) {
      var task = tasksWithDates[ti];
      var barClass = getGanttBarClass(task);
      var barCustomColor = getGanttBarColor(task);
      var barCustomStyle = barCustomColor ? 'background:' + barCustomColor + ';color:white;' : '';
      html += ganttTaskRowStart(task);
      html += renderGanttTaskLabel(task);

      var tStart = task.Start_Date ? new Date(task.Start_Date * 1000) : null;
      var tEnd = task.Due_Date ? new Date(task.Due_Date * 1000) : null;
      if (!tStart && tEnd) tStart = tEnd;
      if (!tEnd && tStart) tEnd = tStart;
      if (tStart) tStart.setHours(0, 0, 0, 0);
      if (tEnd) tEnd.setHours(23, 59, 59, 999);

      // Find first and last week index where bar should appear
      var barStartIdx = -1, barEndIdx = -1;
      for (var wi = 0; wi < weeks.length; wi++) {
        var wk = weeks[wi];
        if (tStart && tEnd && tStart <= wk.end && tEnd >= wk.start) {
          if (barStartIdx === -1) barStartIdx = wi;
          barEndIdx = wi;
        }
      }

      var extEnd = getTaskExtensionEnd(task);
      var extStartIdx = -1, extEndIdx = -1;
      if (extEnd && tEnd && extEnd > tEnd) {
        for (var ewi = 0; ewi < weeks.length; ewi++) {
          if (tEnd <= weeks[ewi].end && extEnd >= weeks[ewi].start) {
            if (extStartIdx === -1) extStartIdx = ewi;
            extEndIdx = ewi;
          }
        }
      }
      var extColor = getExtensionBarColor(task);

      for (var wi = 0; wi < weeks.length; wi++) {
        var isCurrentWeek = getISOWeek(today) === weeks[wi].num && today.getFullYear() === weeks[wi].year;
        html += '<td class="gantt-cell" style="position:relative;' + (isCurrentWeek ? 'background:#fef2f2;' : '') + '">';
        if (wi === barStartIdx) {
          var spanCols = barEndIdx - barStartIdx + 1;
          var widthPx = spanCols * 80;
          html += '<div class="gantt-bar ' + barClass + '" data-gantt-bar-task-id="' + task.id + '" style="left:2px;width:' + widthPx + 'px;cursor:pointer;' + barCustomStyle + '" title="' + sanitize(task.Title) + '" onclick="openEditTaskModal(' + task.id + ')">' + sanitize(task.Title) + '</div>';
        }
        if (wi === extStartIdx && extStartIdx >= 0) {
          var extSpan = extEndIdx - extStartIdx + 1;
          var extW = extSpan * 80;
          html += '<div class="gantt-bar-extension" title="' + t('extensionTooltip') + ' — ' + sanitize(task.Title) + '" style="left:2px;width:' + extW + 'px;border-color:' + extColor + ';background:' + extColor + '20;"></div>';
        }
        html += '</td>';
      }

      html += '</tr>';

      // === Lignes sous-tâches (mode Semaines) ===
      if (expandedGanttTasks[task.id]) {
        var sts = getGanttSubtasks(task.id);
        for (var sti = 0; sti < sts.length; sti++) {
          var st = sts[sti];
          var stRange = getGanttSubtaskRange(st, task);
          var stBarClass = ganttSubtaskBarClass(st, task);
          html += '<tr class="gantt-subtask-row">' + renderGanttSubtaskLabelCell(st, task.id);
          var stStartIdx = -1, stEndIdx = -1;
          for (var wi2 = 0; wi2 < weeks.length; wi2++) {
            if (stRange.start <= weeks[wi2].end && stRange.end >= weeks[wi2].start) {
              if (stStartIdx === -1) stStartIdx = wi2;
              stEndIdx = wi2;
            }
          }
          for (var wi2 = 0; wi2 < weeks.length; wi2++) {
            var isCW = getISOWeek(today) === weeks[wi2].num && today.getFullYear() === weeks[wi2].year;
            html += '<td class="gantt-cell" style="position:relative;' + (isCW ? 'background:#fef2f2;' : '') + '">';
            if (wi2 === stStartIdx) {
              var stSpan = stEndIdx - stStartIdx + 1;
              var stWidth = stSpan * 80;
              html += '<div class="gantt-bar gantt-bar-subtask ' + stBarClass + '" style="left:2px;width:' + stWidth + 'px;cursor:pointer;" title="' + sanitize(st.Title) + '" onclick="openEditTaskModal(' + task.id + ')"></div>';
            }
            html += '</td>';
          }
          html += '</tr>';
        }
      }
    }

    // Footer
    var viewStartMonth = monthNames[weeks[0].start.getMonth()];
    var viewEndMonth = monthNames[weeks[weeks.length - 1].start.getMonth()];
    html += '</tbody></table>';
    html += '<div class="gantt-footer">';
    html += '<span>🌟 ' + t('ganttFullYear') + ' • ' + t('ganttNavInfo') + ' • ' + tasksWithDates.length + ' ' + (currentLang === 'fr' ? 'tâches' : 'tasks') + '</span>';
    html += '<span>' + t('ganttViewRange') + ' ' + viewStartMonth + ' - ' + viewEndMonth + ' ' + ganttYear + '</span>';
    html += '</div></div>';

    document.getElementById('gantt-view').innerHTML = html;
    initGanttDragScroll();
    return;
  }

  // ===== YEAR / TWOYEARS MODE =====
  if (ganttMode === 'year' || ganttMode === 'twoyears') {
    var numYears = ganttMode === 'twoyears' ? 2 : 1;
    var totalMonths = numYears * 12;
    var startYr = ganttYear;
    var colWidth = ganttMode === 'twoyears' ? 50 : 70;

    var todayMonth = today.getMonth();
    var todayYear = today.getFullYear();

    html += '<thead>';
    if (ganttMode === 'twoyears') {
      html += '<tr><th class="gantt-task-label" style="text-align:left;" rowspan="2">' + t('colTaskName') + '</th>';
      html += '<th colspan="12" style="font-size:12px;font-weight:800;background:#f8fafc;">' + startYr + '</th>';
      html += '<th colspan="12" style="font-size:12px;font-weight:800;background:#f8fafc;">' + (startYr + 1) + '</th>';
      html += '</tr><tr>';
    } else {
      html += '<tr><th class="gantt-task-label" style="text-align:left;">' + t('colTaskName') + '</th>';
    }
    for (var ym = 0; ym < totalMonths; ym++) {
      var yr = startYr + Math.floor(ym / 12);
      var mo = ym % 12;
      var isCurrent = (yr === todayYear && mo === todayMonth);
      html += '<th style="min-width:' + colWidth + 'px;' + (isCurrent ? 'background:#fef2f2;color:#ef4444;' : '') + '">' + monthNamesShort[mo].substring(0, 3) + '</th>';
    }
    html += '</tr></thead><tbody>';

    for (var ti = 0; ti < tasksWithDates.length; ti++) {
      var task = tasksWithDates[ti];
      var barClass = getGanttBarClass(task);
      html += ganttTaskRowStart(task) + renderGanttTaskLabel(task);

      var yTStart = task.Start_Date ? new Date(task.Start_Date * 1000) : null;
      var yTEnd = task.Due_Date ? new Date(task.Due_Date * 1000) : null;
      if (!yTStart && yTEnd) yTStart = new Date(yTEnd);
      if (!yTEnd && yTStart) yTEnd = new Date(yTStart);
      if (yTStart) yTStart.setHours(0, 0, 0, 0);
      if (yTEnd) yTEnd.setHours(23, 59, 59, 999);

      var yBarStart = -1, yBarEnd = -1;
      for (var ym = 0; ym < totalMonths; ym++) {
        var yr = startYr + Math.floor(ym / 12);
        var mo = ym % 12;
        var ms = new Date(yr, mo, 1);
        var me = new Date(yr, mo + 1, 0, 23, 59, 59, 999);
        if (yTStart && yTEnd && yTStart <= me && yTEnd >= ms) {
          if (yBarStart === -1) yBarStart = ym;
          yBarEnd = ym;
        }
      }

      var yExtEnd = getTaskExtensionEnd(task);
      var yExtStart = -1, yExtEndIdx = -1;
      if (yExtEnd && yTEnd && yExtEnd > yTEnd) {
        for (var yme = 0; yme < totalMonths; yme++) {
          var yre = startYr + Math.floor(yme / 12); var moe = yme % 12;
          var mse = new Date(yre, moe, 1); var mee = new Date(yre, moe + 1, 0, 23, 59, 59, 999);
          // Démarrer la prolongation le mois SUIVANT la fin de tâche (évite le chevauchement)
          if (mse > yTEnd && yExtEnd >= mse) { if (yExtStart === -1) yExtStart = yme; yExtEndIdx = yme; }
        }
      }
      var yExtColor = getExtensionBarColor(task);

      for (var ym = 0; ym < totalMonths; ym++) {
        var yr2 = startYr + Math.floor(ym / 12);
        var mo2 = ym % 12;
        var isCurrent2 = (yr2 === todayYear && mo2 === todayMonth);
        html += '<td class="gantt-cell" style="position:relative;min-width:' + colWidth + 'px;' + (isCurrent2 ? 'background:#fef2f2;' : '') + '">';
        if (ym === yBarStart) {
          var yBarW = (yBarEnd - yBarStart + 1) * colWidth;
          html += '<div class="gantt-bar ' + barClass + '" data-gantt-bar-task-id="' + task.id + '" style="left:2px;width:' + yBarW + 'px;cursor:pointer;' + barCustomStyle + '" title="' + sanitize(task.Title) + '" onclick="openEditTaskModal(' + task.id + ')">' + sanitize(task.Title) + '</div>';
        }
        if (ym === yExtStart && yExtStart >= 0) {
          var yExtW = (yExtEndIdx - yExtStart + 1) * colWidth;
          html += '<div class="gantt-bar-extension" title="' + t('extensionTooltip') + ' — ' + sanitize(task.Title) + '" style="left:2px;width:' + yExtW + 'px;border-color:' + yExtColor + ';background:' + yExtColor + '20;"></div>';
        }
        html += '</td>';
      }
      html += '</tr>';

      if (expandedGanttTasks[task.id]) {
        var sts = getGanttSubtasks(task.id);
        for (var sti = 0; sti < sts.length; sti++) {
          var st = sts[sti];
          var stRange = getGanttSubtaskRange(st, task);
          var stBarClass = ganttSubtaskBarClass(st, task);
          html += '<tr class="gantt-subtask-row">' + renderGanttSubtaskLabelCell(st, task.id);
          var stYStart = -1, stYEnd = -1;
          for (var ym3 = 0; ym3 < totalMonths; ym3++) {
            var yr3 = startYr + Math.floor(ym3 / 12);
            var mo3 = ym3 % 12;
            var ms3 = new Date(yr3, mo3, 1);
            var me3 = new Date(yr3, mo3 + 1, 0, 23, 59, 59, 999);
            if (stRange.start <= me3 && stRange.end >= ms3) {
              if (stYStart === -1) stYStart = ym3;
              stYEnd = ym3;
            }
          }
          for (var ym3 = 0; ym3 < totalMonths; ym3++) {
            html += '<td class="gantt-cell" style="position:relative;min-width:' + colWidth + 'px;">';
            if (ym3 === stYStart) {
              var stYW = (stYEnd - stYStart + 1) * colWidth;
              html += '<div class="gantt-bar gantt-bar-subtask ' + stBarClass + '" style="left:2px;width:' + stYW + 'px;cursor:pointer;" title="' + sanitize(st.Title) + '" onclick="openEditTaskModal(' + task.id + ')"></div>';
            }
            html += '</td>';
          }
          html += '</tr>';
        }
      }
    }

    html += '</tbody></table>';
    html += '<div class="gantt-footer">';
    var rangeLabel = ganttMode === 'twoyears' ? (startYr + ' - ' + (startYr + 1)) : String(startYr);
    html += '<span>🌟 ' + t('ganttFullYear') + ' • ' + tasksWithDates.length + ' ' + (currentLang === 'fr' ? 'tâches' : 'tasks') + '</span>';
    html += '<span>' + t('ganttViewRange') + ' ' + rangeLabel + '</span>';
    html += '</div></div>';

    document.getElementById('gantt-view').innerHTML = html;
    initGanttDragScroll();
    return;
  }

  // ===== MONTHS MODE =====
  if (ganttMode === 'months') {
    var startDate = new Date(ganttYear, 0, 1);
    var endDate = new Date(ganttYear, 11, 31);

    var todayMonth = today.getMonth();
    var todayYear = today.getFullYear();
    var todayDayPct = (todayYear === ganttYear && todayMonth >= 0 && todayMonth < 12) ? Math.round((today.getDate() - 1) / new Date(ganttYear, todayMonth + 1, 0).getDate() * 100) : -1;

    html += '<thead><tr><th class="gantt-task-label" style="text-align:left;">' + t('colTaskName') + '</th>';
    for (var m = 0; m < 12; m++) {
      var isCurrentMonth = (ganttYear === todayYear && m === todayMonth);
      html += '<th colspan="1" style="' + (isCurrentMonth ? 'background:#fef2f2;color:#ef4444;' : '') + '">' + monthNames[m].substring(0, 3).toUpperCase() + '</th>';
    }
    html += '</tr></thead><tbody>';

    for (var ti = 0; ti < tasksWithDates.length; ti++) {
      var task = tasksWithDates[ti];
      var barClass = getGanttBarClass(task);
      var barCustomColor = getGanttBarColor(task);
      var barCustomStyle = barCustomColor ? 'background:' + barCustomColor + ';color:white;' : '';
      html += ganttTaskRowStart(task);
      html += renderGanttTaskLabel(task);

      var mTStart = task.Start_Date ? new Date(task.Start_Date * 1000) : null;
      var mTEnd = task.Due_Date ? new Date(task.Due_Date * 1000) : null;
      if (!mTStart && mTEnd) mTStart = new Date(mTEnd);
      if (!mTEnd && mTStart) mTEnd = new Date(mTStart);
      if (mTStart) mTStart.setHours(0, 0, 0, 0);
      if (mTEnd) mTEnd.setHours(23, 59, 59, 999);

      var mBarStartIdx = -1, mBarEndIdx = -1;
      for (var m = 0; m < 12; m++) {
        var ms = new Date(ganttYear, m, 1);
        var me = new Date(ganttYear, m + 1, 0, 23, 59, 59, 999);
        if (mTStart && mTEnd && mTStart <= me && mTEnd >= ms) {
          if (mBarStartIdx === -1) mBarStartIdx = m;
          mBarEndIdx = m;
        }
      }

      var mExtEnd = getTaskExtensionEnd(task);
      var mExtStart = -1, mExtEndI = -1;
      if (mExtEnd && mTEnd && mExtEnd > mTEnd) {
        for (var me2 = 0; me2 < 12; me2++) {
          var ms2 = new Date(ganttYear, me2, 1); var me2e = new Date(ganttYear, me2 + 1, 0, 23, 59, 59, 999);
          // Prolongation à partir du mois suivant la fin (évite le chevauchement)
          if (ms2 > mTEnd && mExtEnd >= ms2) { if (mExtStart === -1) mExtStart = me2; mExtEndI = me2; }
        }
      }
      var mExtColor = getExtensionBarColor(task);

      for (var m = 0; m < 12; m++) {
        var isTodayMonth = (ganttYear === todayYear && m === todayMonth);
        html += '<td class="gantt-cell" style="position:relative;min-width:80px;">';
        if (isTodayMonth && todayDayPct >= 0) {
          html += '<div style="position:absolute;top:0;bottom:0;left:' + todayDayPct + '%;width:2px;background:#ef4444;z-index:1;pointer-events:none;"></div>';
        }
        if (m === mBarStartIdx) {
          var mBarWidth = (mBarEndIdx - mBarStartIdx + 1) * 80;
          html += '<div class="gantt-bar ' + barClass + '" data-gantt-bar-task-id="' + task.id + '" style="left:2px;width:' + mBarWidth + 'px;cursor:pointer;' + barCustomStyle + '" title="' + sanitize(task.Title) + '" onclick="openEditTaskModal(' + task.id + ')">' + sanitize(task.Title) + '</div>';
        }
        if (m === mExtStart && mExtStart >= 0) {
          var mExtW = (mExtEndI - mExtStart + 1) * 80;
          html += '<div class="gantt-bar-extension" title="' + t('extensionTooltip') + ' — ' + sanitize(task.Title) + '" style="left:2px;width:' + mExtW + 'px;border-color:' + mExtColor + ';background:' + mExtColor + '20;"></div>';
        }
        html += '</td>';
      }
      html += '</tr>';

      // === Lignes sous-tâches (mode Mois) ===
      if (expandedGanttTasks[task.id]) {
        var sts = getGanttSubtasks(task.id);
        for (var sti = 0; sti < sts.length; sti++) {
          var st = sts[sti];
          var stRange = getGanttSubtaskRange(st, task);
          var stBarClass = ganttSubtaskBarClass(st, task);
          html += '<tr class="gantt-subtask-row">' + renderGanttSubtaskLabelCell(st, task.id);
          var stStartM = -1, stEndM = -1;
          for (var m2 = 0; m2 < 12; m2++) {
            var mStart = new Date(ganttYear, m2, 1);
            var mEnd = new Date(ganttYear, m2 + 1, 0, 23, 59, 59, 999);
            if (stRange.start <= mEnd && stRange.end >= mStart) {
              if (stStartM === -1) stStartM = m2;
              stEndM = m2;
            }
          }
          for (var m2 = 0; m2 < 12; m2++) {
            var isTodayMonth2 = (ganttYear === todayYear && m2 === todayMonth);
            html += '<td class="gantt-cell" style="position:relative;min-width:80px;">';
            if (isTodayMonth2 && todayDayPct >= 0) {
              html += '<div style="position:absolute;top:0;bottom:0;left:' + todayDayPct + '%;width:2px;background:#ef4444;z-index:1;pointer-events:none;"></div>';
            }
            if (m2 === stStartM) {
              var stBarW = (stEndM - stStartM + 1) * 80;
              html += '<div class="gantt-bar gantt-bar-subtask ' + stBarClass + '" style="left:2px;width:' + stBarW + 'px;cursor:pointer;" title="' + sanitize(st.Title) + '" onclick="openEditTaskModal(' + task.id + ')"></div>';
            }
            html += '</td>';
          }
          html += '</tr>';
        }
      }
    }

    html += '</tbody></table>';
    html += '<div class="gantt-footer">';
    html += '<span>🌟 ' + t('ganttFullYear') + ' • ' + t('ganttNavInfo') + ' • ' + tasksWithDates.length + ' ' + (currentLang === 'fr' ? 'tâches' : 'tasks') + '</span>';
    html += '<span>' + t('ganttViewRange') + ' ' + monthNames[0] + ' - ' + monthNames[11] + ' ' + ganttYear + '</span>';
    html += '</div></div>';

    document.getElementById('gantt-view').innerHTML = html;
    initGanttDragScroll();
    return;
  }

  // ===== DAYS MODE (et mode PERSONNALISÉ : mêmes colonnes-jours sur une plage libre) =====
  var startDate, endDate;
  if (ganttMode === 'custom' && ganttCustomStart && ganttCustomEnd) {
    startDate = new Date(ganttCustomStart + 'T00:00:00');
    endDate = new Date(ganttCustomEnd + 'T00:00:00');
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || endDate < startDate) {
      // Plage invalide → repli sur la fenêtre par défaut
      startDate = new Date(ganttYear, ganttMonth - 1, 1);
      endDate = new Date(ganttYear, ganttMonth + 2, 0);
    } else {
      // Limiter à ~400 jours pour éviter une grille démesurée
      var maxEnd = new Date(startDate); maxEnd.setDate(maxEnd.getDate() + 400);
      if (endDate > maxEnd) endDate = maxEnd;
    }
  } else {
    if (ganttYear === today.getFullYear() && ganttMonth === today.getMonth()) {
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 7);
      endDate = new Date(today);
      endDate.setDate(today.getDate() + 60);
    } else {
      startDate = new Date(ganttYear, ganttMonth, 1);
      endDate = new Date(ganttYear, ganttMonth + 2, 0);
    }
  }
  var days = [];
  var d = new Date(startDate);
  while (d <= endDate) {
    days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }

  // Month header row
  html += '<thead><tr><th class="gantt-task-label" style="text-align:left;" rowspan="2">' + t('colTaskName') + '</th>';
  var prevMonth = -1;
  for (var di0 = 0; di0 < days.length; di0++) {
    var dm = days[di0].getMonth();
    if (dm !== prevMonth) {
      var colspan = 0;
      for (var di1 = di0; di1 < days.length && days[di1].getMonth() === dm; di1++) colspan++;
      html += '<th colspan="' + colspan + '" style="font-size:11px;font-weight:700;color:#475569;background:#f8fafc;border-bottom:1px solid #e2e8f0;">' + monthNames[dm].toUpperCase() + '</th>';
      prevMonth = dm;
    }
  }
  html += '</tr><tr>';
  for (var di = 0; di < days.length; di++) {
    var dd = days[di];
    var isToday = dd.getTime() === today.getTime();
    var isWeekend = dd.getDay() === 0 || dd.getDay() === 6;
    html += '<th class="' + (isToday ? 'today' : '') + (isWeekend ? ' weekend' : '') + '">';
    html += '<div>' + dd.getDate() + '</div>';
    html += '<div style="font-size:8px;">' + dayNames[dd.getDay()] + '</div>';
    html += '</th>';
  }
  html += '</tr></thead><tbody>';

  for (var ti = 0; ti < tasksWithDates.length; ti++) {
    var task = tasksWithDates[ti];
    var barClass = getGanttBarClass(task);
    var barCustomColor = getGanttBarColor(task);
    var barCustomStyle = barCustomColor ? 'background:' + barCustomColor + ';color:white;' : '';
    html += ganttTaskRowStart(task);
    html += renderGanttTaskLabel(task);

    var tStart = task.Start_Date ? new Date(task.Start_Date * 1000) : null;
    var tEnd = task.Due_Date ? new Date(task.Due_Date * 1000) : null;
    if (!tStart && tEnd) tStart = tEnd;
    if (!tEnd && tStart) tEnd = tStart;
    if (tStart) tStart.setHours(0, 0, 0, 0);
    if (tEnd) tEnd.setHours(0, 0, 0, 0);

    var barStartIdx = -1, barEndIdx = -1;
    if (tStart && tEnd) {
      for (var di = 0; di < days.length; di++) {
        var dday = days[di];
        if (dday >= tStart && dday <= tEnd) {
          if (barStartIdx === -1) barStartIdx = di;
          barEndIdx = di;
        }
      }
      if (barStartIdx === -1 && tStart < days[0] && tEnd >= days[0]) {
        barStartIdx = 0;
        for (var di2 = 0; di2 < days.length; di2++) {
          if (days[di2] <= tEnd) barEndIdx = di2;
        }
      }
    }

    var dExtEnd = getTaskExtensionEnd(task);
    var dExtStartIdx = -1, dExtEndIdx = -1;
    if (dExtEnd && tEnd && dExtEnd > tEnd) {
      var dExtDay = new Date(dExtEnd); dExtDay.setHours(0, 0, 0, 0);
      for (var dei = 0; dei < days.length; dei++) {
        if (days[dei] >= tEnd && days[dei] <= dExtDay) {
          if (dExtStartIdx === -1) dExtStartIdx = dei;
          dExtEndIdx = dei;
        }
      }
    }
    var dExtColor = getExtensionBarColor(task);

    for (var di = 0; di < days.length; di++) {
      var dd = days[di];
      var isToday = dd.getTime() === today.getTime();
      var isWeekend = dd.getDay() === 0 || dd.getDay() === 6;
      var cellClass = (isToday ? 'today-col' : '') + (isWeekend ? ' weekend-col' : '');

      html += '<td class="gantt-cell ' + cellClass + '">';
      if (di === barStartIdx) {
        var spanDays = barEndIdx - barStartIdx + 1;
        var widthPx = spanDays * 36;
        html += '<div class="gantt-bar ' + barClass + '" data-gantt-bar-task-id="' + task.id + '" style="left:2px;width:' + widthPx + 'px;cursor:pointer;' + barCustomStyle + '" title="' + sanitize(task.Title) + '" onclick="openEditTaskModal(' + task.id + ')">' + sanitize(task.Title) + '</div>';
      }
      if (di === dExtStartIdx && dExtStartIdx >= 0) {
        var dExtW = (dExtEndIdx - dExtStartIdx + 1) * 36;
        html += '<div class="gantt-bar-extension" title="' + t('extensionTooltip') + ' — ' + sanitize(task.Title) + '" style="left:2px;width:' + dExtW + 'px;border-color:' + dExtColor + ';background:' + dExtColor + '20;"></div>';
      }
      html += '</td>';
    }

    html += '</tr>';

    // === Lignes sous-tâches (mode Jours) ===
    if (expandedGanttTasks[task.id]) {
      var sts = getGanttSubtasks(task.id);
      for (var sti = 0; sti < sts.length; sti++) {
        var st = sts[sti];
        var stRange = getGanttSubtaskRange(st, task);
        var stStartDay = new Date(stRange.start); stStartDay.setHours(0, 0, 0, 0);
        var stEndDay = new Date(stRange.end); stEndDay.setHours(0, 0, 0, 0);
        var stBarClass = ganttSubtaskBarClass(st, task);
        var stBarStartIdx = -1, stBarEndIdx = -1;
        for (var di2 = 0; di2 < days.length; di2++) {
          var dday2 = days[di2];
          if (dday2 >= stStartDay && dday2 <= stEndDay) {
            if (stBarStartIdx === -1) stBarStartIdx = di2;
            stBarEndIdx = di2;
          }
        }
        html += '<tr class="gantt-subtask-row">' + renderGanttSubtaskLabelCell(st, task.id);
        for (var di2 = 0; di2 < days.length; di2++) {
          var dd2 = days[di2];
          var isToday2 = dd2.getTime() === today.getTime();
          var isWeekend2 = dd2.getDay() === 0 || dd2.getDay() === 6;
          var cellClass2 = (isToday2 ? 'today-col' : '') + (isWeekend2 ? ' weekend-col' : '');
          html += '<td class="gantt-cell ' + cellClass2 + '">';
          if (di2 === stBarStartIdx) {
            var stSpanDays = stBarEndIdx - stBarStartIdx + 1;
            var stWidth = stSpanDays * 36;
            html += '<div class="gantt-bar gantt-bar-subtask ' + stBarClass + '" style="left:2px;width:' + stWidth + 'px;cursor:pointer;" title="' + sanitize(st.Title) + '" onclick="openEditTaskModal(' + task.id + ')"></div>';
          }
          html += '</td>';
        }
        html += '</tr>';
      }
    }
  }

  html += '</tbody></table>';
  var viewStart = monthNames[startDate.getMonth()];
  var viewEnd = monthNames[endDate.getMonth()];
  html += '<div class="gantt-footer">';
  html += '<span>🌟 ' + t('ganttFullYear') + ' • ' + t('ganttNavInfo') + ' • ' + tasksWithDates.length + ' ' + (currentLang === 'fr' ? 'tâches' : 'tasks') + '</span>';
  html += '<span>' + t('ganttViewRange') + ' ' + viewStart + ' - ' + viewEnd + ' ' + ganttYear + '</span>';
  html += '</div></div>';

  document.getElementById('gantt-view').innerHTML = html;
  initGanttDragScroll();
  scrollGanttToToday();
}

function initGanttDragScroll() {
  var container = document.querySelector('#gantt-view .gantt-container');
  if (!container) return;
  var isDown = false;
  var startX, scrollLeft, hasMoved;

  container.addEventListener('mousedown', function(e) {
    if (e.button !== 0) return;
    if (e.target.closest('button, a, select, input')) return;
    isDown = true;
    hasMoved = false;
    startX = e.clientX;
    scrollLeft = container.scrollLeft;
    container.style.cursor = 'grabbing';
    container.style.userSelect = 'none';
  });

  document.addEventListener('mouseup', function() {
    if (!isDown) return;
    isDown = false;
    container.style.cursor = '';
    container.style.userSelect = '';
  });

  document.addEventListener('mousemove', function(e) {
    if (!isDown) return;
    var dx = e.clientX - startX;
    if (Math.abs(dx) > 3) hasMoved = true;
    if (!hasMoved) return;
    e.preventDefault();
    container.scrollLeft = scrollLeft - dx;
  });

  container.addEventListener('click', function(e) {
    if (hasMoved) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, true);
}

function scrollGanttToToday() {
  if (ganttMode !== 'days') return;
  var container = document.querySelector('#gantt-view .gantt-container');
  var todayCell = container ? container.querySelector('.today-col') : null;
  if (!container || !todayCell) return;
  var left = todayCell.offsetLeft - Math.max(80, container.clientWidth * 0.38);
  container.scrollLeft = Math.max(0, left);
}

function scrollGanttToTask(taskId) {
  var container = document.querySelector('#gantt-view .gantt-container');
  var bar = container ? container.querySelector('[data-gantt-bar-task-id="' + taskId + '"]') : null;
  if (!container || !bar) return;
  var stickyLabel = container.querySelector('.gantt-task-label');
  var labelWidth = stickyLabel ? stickyLabel.offsetWidth : 260;
  var containerRect = container.getBoundingClientRect();
  var barRect = bar.getBoundingClientRect();
  var barContentLeft = container.scrollLeft + (barRect.left - containerRect.left);
  container.scrollLeft = Math.max(0, barContentLeft - labelWidth - 12);
}

function focusGanttTask(taskId, checked) {
  selectedGanttTaskId = checked ? taskId : null;
  document.querySelectorAll('#gantt-view .gantt-task-row').forEach(function(row) {
    var isSelected = checked && Number(row.getAttribute('data-gantt-task-id')) === Number(taskId);
    row.classList.toggle('gantt-row-selected', isSelected);
    var checkbox = row.querySelector('.gantt-focus-checkbox');
    if (checkbox) checkbox.checked = isSelected;
  });
  if (checked) requestAnimationFrame(function() { scrollGanttToTask(taskId); });
}

function setGanttYear(value) {
  ganttYear = Math.max(2020, Math.min(2050, parseInt(value)));
  renderGanttView();
}

function ganttNav(dir) {
  if (ganttMode === 'months' || ganttMode === 'year' || ganttMode === 'twoyears') {
    // Modes annuels : on navigue par année
    ganttYear += dir;
    ganttYear = Math.max(2020, Math.min(2050, ganttYear));
  } else if (ganttMode === 'weeks') {
    // Navigation par trimestre (3 mois)
    ganttMonth += dir * 3;
    if (ganttMonth > 11) { ganttMonth -= 12; ganttYear++; }
    if (ganttMonth < 0) { ganttMonth += 12; ganttYear--; }
    ganttYear = Math.max(2020, Math.min(2050, ganttYear));
  } else {
    // Mode jours (fenêtre de 3 mois) : on avance d'1 mois à la fois
    ganttMonth += dir;
    if (ganttMonth > 11) { ganttMonth -= 12; ganttYear++; }
    if (ganttMonth < 0) { ganttMonth += 12; ganttYear--; }
    ganttYear = Math.max(2020, Math.min(2050, ganttYear));
  }
  renderGanttView();
}

function ganttToday() {
  var today = new Date();
  ganttYear = today.getFullYear();
  ganttMonth = today.getMonth();
  renderGanttView();
}

function ganttExpandAll() {
  var tasksWithSubs = state.tasks.filter(function(t) { return getGanttSubtasks(t.id).length > 0; });
  tasksWithSubs.forEach(function(t) { expandedGanttTasks[t.id] = true; });
  renderGanttView();
}

function ganttCollapseAll() {
  expandedGanttTasks = {};
  renderGanttView();
}

function setGanttMode(mode) {
  ganttMode = mode;
  // A3 : afficher la zone de dates uniquement en mode personnalisé
  var rangeBox = document.getElementById('gantt-custom-range');
  if (rangeBox) rangeBox.style.display = (mode === 'custom') ? 'flex' : 'none';
  if (mode === 'custom') {
    // Pré-remplir une plage par défaut (mois précédent → 2 mois) si vide
    if (!ganttCustomStart || !ganttCustomEnd) {
      var ds = new Date(ganttYear, ganttMonth - 1, 1);
      var de = new Date(ganttYear, ganttMonth + 2, 0);
      ganttCustomStart = ds.toISOString().split('T')[0];
      ganttCustomEnd = de.toISOString().split('T')[0];
    }
    var sEl = document.getElementById('gantt-custom-start');
    var eEl = document.getElementById('gantt-custom-end');
    if (sEl) sEl.value = ganttCustomStart;
    if (eEl) eEl.value = ganttCustomEnd;
  }
  renderGanttView();
}

function setGanttCustomRange() {
  var sEl = document.getElementById('gantt-custom-start');
  var eEl = document.getElementById('gantt-custom-end');
  if (sEl) ganttCustomStart = sEl.value;
  if (eEl) ganttCustomEnd = eEl.value;
  renderGanttView();
}

function setGanttSort(value) {
  ganttSort = value;
  renderGanttView();
}

// A2 : export du Gantt complet en PDF (1 page à la taille réelle du diagramme)
async function exportGanttPdf() {
  var container = document.querySelector('#gantt-view .gantt-container');
  var table = container ? container.querySelector('.gantt-table') : null;
  if (!table) { showToast(currentLang === 'fr' ? 'Affichez d\'abord le Gantt' : 'Open the Gantt first', 'error'); return; }
  if (typeof html2canvas === 'undefined' || !window.jspdf) {
    showToast(currentLang === 'fr' ? 'Librairies PDF non chargées' : 'PDF libraries not loaded', 'error');
    return;
  }
  showToast(currentLang === 'fr' ? 'Génération du PDF...' : 'Generating PDF...', 'info');
  container.classList.add('gantt-exporting');
  try {
    var canvas = await html2canvas(table, { scale: 2, backgroundColor: '#ffffff', windowWidth: table.scrollWidth, windowHeight: table.scrollHeight });
    container.classList.remove('gantt-exporting');
    var imgData = canvas.toDataURL('image/png');
    var jsPDF = window.jspdf.jsPDF;
    var w = canvas.width, h = canvas.height;
    var pdf = new jsPDF({ orientation: w >= h ? 'landscape' : 'portrait', unit: 'px', format: [w, h], hotfixes: ['px_scaling'] });
    pdf.addImage(imgData, 'PNG', 0, 0, w, h);
    var dateStr = new Date().toISOString().split('T')[0];
    pdf.save('Gantt_' + dateStr + '.pdf');
    showToast(currentLang === 'fr' ? 'PDF exporté ✓' : 'PDF exported ✓', 'success');
  } catch (e) {
    container.classList.remove('gantt-exporting');
    console.error('exportGanttPdf:', e);
    showToast((currentLang === 'fr' ? 'Erreur export PDF : ' : 'PDF export error: ') + e.message, 'error');
  }
}

// A7 : mode plein écran du Gantt (utile quand la hauteur est insuffisante)
function toggleGanttFullscreen() {
  var el = document.getElementById('tab-gantt');
  var btn = document.getElementById('gantt-fullscreen-btn');
  if (!el) return;
  var on = el.classList.toggle('gantt-fullscreen');
  if (btn) {
    var label = on ? (currentLang === 'fr' ? 'Quitter le plein écran' : 'Exit fullscreen') : (currentLang === 'fr' ? 'Afficher le Gantt en plein écran' : 'Show Gantt fullscreen');
    btn.title = label;
    btn.setAttribute('aria-label', label);
    btn.setAttribute('data-tooltip', label);
  }
}

function toggleKanbanFullscreen() {
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

// =============================================================================
// TEAM VIEW (Users & Groups)
// =============================================================================

function renderTeamView() {
  renderUsersList();
  renderGroupsList();
  renderCategoriesList();
}

function renderUsersList() {
  var container = document.getElementById('users-list');
  if (!container) return;

  // Apply role filter so the Équipe tab respects the active role selection
  var displayedUsers = state.currentFilterRole
    ? state.users.filter(function(u) { return userMatchesRole(u, state.currentFilterRole); })
    : state.users;

  if (displayedUsers.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:30px;color:#94a3b8;">' + t('noUsers') + '</div>';
    return;
  }

  var html = '<table class="data-table"><thead><tr>';
  html += '<th>' + t('fieldName') + '</th>';
  html += '<th>' + t('fieldEmail') + '</th>';
  html += '<th>' + t('fieldRole') + '</th>';
  html += '<th>' + t('fieldGroup') + '</th>';
  html += '<th>' + t('colActions') + '</th>';
  html += '</tr></thead><tbody>';

  for (var i = 0; i < displayedUsers.length; i++) {
    var u = displayedUsers[i];
    var roleText = userRoleDisplay(u) ? userRoleDisplay(u).split(',').map(function(r) { return roleLabel(r.trim()); }).join(', ') : '';
    var firstRole = getUserRoles(u)[0] || 'member';
    var roleBg = firstRole === 'admin' ? '#fef2f2;color:#dc2626' : (firstRole === 'viewer' ? '#f1f5f9;color:#64748b' : '#eff6ff;color:#1e40af');

    html += '<tr>';
    html += '<td style="font-weight:700;">👤 ' + sanitize(u.Name) + '</td>';
    html += '<td>' + sanitize(u.Email) + '</td>';
    html += '<td><span style="padding:2px 10px;border-radius:20px;font-size:11px;font-weight:600;background:' + roleBg + '">' + sanitize(roleText) + '</span></td>';
    html += '<td>' + (u.Group_Name ? '<span class="assignee-chip">👥 ' + sanitize(u.Group_Name) + '</span>' : '--') + '</td>';
    html += '<td><button class="btn-icon" onclick="openEditUserModal(' + u.id + ')" title="' + t('edit') + '">✏️</button>';
    html += '<button class="btn-icon" onclick="deleteUser(' + u.id + ')">🗑️</button></td>';
    html += '</tr>';
  }

  html += '</tbody></table>';
  container.innerHTML = html;
}

function renderGroupsList() {
  var container = document.getElementById('groups-list');
  if (!container) return;

  if (state.groups.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:30px;color:#94a3b8;">' + t('noGroups') + '</div>';
    return;
  }

  var html = '';
  for (var i = 0; i < state.groups.length; i++) {
    var g = state.groups[i];
    var memberCount = state.users.filter(function(u) { return u.Group_Name === g.Name; }).length;
    var memberNames = state.users.filter(function(u) { return u.Group_Name === g.Name; }).map(function(u) { return u.Name || u.Email; });

    html += '<div class="template-card">';
    html += '<div class="template-card-info">';
    html += '<h4>👥 ' + sanitize(g.Name) + '</h4>';
    html += '<div class="template-meta">';
    html += memberCount + ' ' + t('members');
    if (g.Description) html += ' • ' + sanitize(g.Description);
    html += '</div>';
    if (memberNames.length > 0) {
      html += '<div style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap;">';
      for (var j = 0; j < memberNames.length; j++) {
        html += '<span class="assignee-chip">👤 ' + sanitize(memberNames[j]) + '</span>';
      }
      html += '</div>';
    }
    html += '</div>';
    html += '<button class="btn-icon" onclick="openEditGroupModal(' + g.id + ')" title="' + t('edit') + '">✏️</button>';
    html += '<button class="btn-icon" onclick="deleteGroup(' + g.id + ')">🗑️</button>';
    html += '</div>';
  }

  container.innerHTML = html;
}

function renderCategoriesList() {
  var container = document.getElementById('categories-list');
  if (!container) return;

  if (state.categories.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:20px;color:#94a3b8;">' + t('noCategories') + '</div>';
    return;
  }

  var html = '<div style="display:flex;flex-wrap:wrap;gap:8px;">';
  for (var i = 0; i < state.categories.length; i++) {
    var cat = state.categories[i];
    html += '<span class="category-chip" style="background:' + (cat.Color || '#6366f1') + '20;color:' + (cat.Color || '#6366f1') + ';border:1px solid ' + (cat.Color || '#6366f1') + '40;">';
    html += sanitize(cat.Name);
    html += '</span>';
  }
  html += '</div>';
  container.innerHTML = html;
}

function openCategoriesModal() {
  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal modal-cf" onclick="event.stopPropagation()">';
  html += '<div class="modal-header"><h3>🏷️ ' + t('manageCategories') + '</h3><button class="modal-close" onclick="closeModalForce()">✕</button></div>';
  html += '<div class="modal-body">';
  
  // Existing categories
  html += '<div class="cf-list">';
  if (state.categories.length === 0) {
    html += '<div class="cf-empty-modal">' + t('noCategories') + '</div>';
  } else {
    for (var i = 0; i < state.categories.length; i++) {
      var cat = state.categories[i];
      html += '<div class="cf-list-item">';
      html += '<span class="category-color-dot" style="background:' + (cat.Color || '#6366f1') + ';"></span>';
      html += '<span class="cf-list-name">' + sanitize(cat.Name) + '</span>';
      html += '<button class="cf-delete-btn" onclick="editCategory(' + cat.id + ',\'' + sanitize(cat.Name).replace(/'/g, "\\'") + '\',\'' + (cat.Color || '#6366f1') + '\')">✏️</button>';
      html += '<button class="cf-delete-btn" onclick="deleteCategory(' + cat.id + ')">🗑️</button>';
      html += '</div>';
    }
  }
  html += '</div>';
  
  // Add / edit category form
  html += '<div class="cf-add-form">';
  html += '<h4 id="cat-form-title">' + t('addCategory') + '</h4>';
  html += '<input type="hidden" id="edit-cat-id" value="" />';
  html += '<div class="cf-form-row">';
  html += '<input type="text" id="new-cat-name" placeholder="' + t('fieldName') + '" class="cf-form-input" />';
  html += '<input type="color" id="new-cat-color" value="#6366f1" style="width:40px;height:36px;border:none;cursor:pointer;" />';
  html += '<button class="btn btn-primary" onclick="saveCategory()">' + t('save') + '</button>';
  html += '</div>';
  html += '</div>';
  
  html += '</div></div></div>';
  
  document.getElementById('modal-container').innerHTML = html;
}

function editCategory(catId, name, color) {
  document.getElementById('edit-cat-id').value = catId;
  document.getElementById('new-cat-name').value = name;
  document.getElementById('new-cat-color').value = color;
  document.getElementById('cat-form-title').textContent = t('edit');
}

async function saveCategory() {
  var name = document.getElementById('new-cat-name').value.trim();
  var color = document.getElementById('new-cat-color').value;
  var editId = document.getElementById('edit-cat-id').value;

  if (!name) return;

  try {
    if (editId) {
      var updateRec = {};
      setField(updateRec, 'categories', 'name', name);
      setField(updateRec, 'categories', 'color', color);
      await grist.docApi.applyUserActions([['UpdateRecord', state.CATEGORIES_TABLE, parseInt(editId), updateRec]]);
      showToast(t('saved'), 'success');
    } else {
      var maxOrder = state.categories.length > 0 ? Math.max.apply(null, state.categories.map(function(c) { return c.Order || 0; })) : 0;
      var record = {};
      setField(record, 'categories', 'name', name);
      setField(record, 'categories', 'color', color);
      setField(record, 'categories', 'order', maxOrder + 1);
      await grist.docApi.applyUserActions([['AddRecord', state.CATEGORIES_TABLE, null, record]]);
      showToast(t('categoryCreated'), 'success');
    }
    closeModalForce();
    await loadAllData();
    refreshAllViews();
    renderSettingsCategoriesList();
  } catch (e) {
    console.error('Error adding category:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

async function deleteCategory(categoryId) {
  if (!state.isOwner) return;
  var confirmed = await showConfirmModal(currentLang === 'fr' ? 'Supprimer cette catégorie ?' : 'Delete this category?', currentLang === 'fr' ? 'Supprimer' : 'Delete');
  if (!confirmed) return;

  try {
    await grist.docApi.applyUserActions([
      ['RemoveRecord', state.CATEGORIES_TABLE, categoryId]
    ]);
    showToast(t('categoryDeleted'), 'info');
    closeModalForce();
    await loadAllData();
    refreshAllViews();
    renderSettingsCategoriesList();
  } catch (e) {
    console.error('Error deleting category:', e);
  }
}

async function getRoleChoicesFromGrist() {
  var roleSet = {};
  var hasGristChoices = false;

  // Try to get choices defined in Grist column metadata (source of truth)
  try {
    var roleColName = getColumnName('users', 'role');
    var tablesData = await grist.docApi.fetchTable('_grist_Tables');
    var columnsData = await grist.docApi.fetchTable('_grist_Tables_column');

    var tableRowId = null;
    if (tablesData && tablesData.id && tablesData.tableId) {
      for (var i = 0; i < tablesData.id.length; i++) {
        if (tablesData.tableId[i] === state.USERS_TABLE) { tableRowId = tablesData.id[i]; break; }
      }
    }

    if (tableRowId !== null && columnsData && columnsData.id) {
      for (var j = 0; j < columnsData.id.length; j++) {
        if (columnsData.parentId[j] === tableRowId && columnsData.colId[j] === roleColName) {
          var wo = columnsData.widgetOptions[j];
          if (wo) {
            try {
              var opts = JSON.parse(wo);
              if (opts.choices && Array.isArray(opts.choices) && opts.choices.length > 0) {
                opts.choices.forEach(function(c) { roleSet[c] = true; });
                hasGristChoices = true;
              }
            } catch (e) { /* ignore parse errors */ }
          }
          break;
        }
      }
    }
  } catch (e) {
    console.log('Could not fetch role choices from Grist metadata:', e);
  }

  // Add defaults only if no choices are defined yet (first-time setup)
  if (!hasGristChoices) {
    ['admin', 'member', 'viewer'].forEach(function(r) { roleSet[r] = true; });
  }

  // Always include roles currently assigned to users (so no user is orphaned)
  state.users.forEach(function(u) { getUserRoles(u).forEach(function(r) { if (r) roleSet[r] = true; }); });

  return Object.keys(roleSet).sort();
}

// In-memory state for the manage roles modal
var _manageRolesState = { choices: [] };

async function openManageRolesModal() {
  var choices = await getRoleChoicesFromGrist();
  _manageRolesState.choices = choices.slice();
  renderManageRolesModal();
}

function renderManageRolesModal() {
  var choices = _manageRolesState.choices;
  // Build usage map: role -> count of users (ChoiceList-safe)
  var usage = {};
  state.users.forEach(function(u) { getUserRoles(u).forEach(function(r) { if (r) usage[r] = (usage[r] || 0) + 1; }); });

  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal" onclick="event.stopPropagation()">';
  html += '<div class="modal-header"><h3>' + t('manageRolesTitle') + '</h3><button class="modal-close" onclick="closeModalForce()">✕</button></div>';
  html += '<div class="modal-body">';
  html += '<p style="color:#64748b;font-size:13px;margin:0 0 12px 0;">' + t('manageRolesSubtitle') + '</p>';

  // Existing roles list
  html += '<div class="settings-items">';
  if (choices.length === 0) {
    html += '<div style="text-align:center;color:#94a3b8;padding:20px;">--</div>';
  } else {
    for (var i = 0; i < choices.length; i++) {
      var r = choices[i];
      var count = usage[r] || 0;
      html += '<div class="settings-item">';
      html += '<div class="settings-item-info">';
      html += '<strong>' + sanitize(roleLabel(r)) + '</strong>';
      html += '<span class="settings-item-meta">' + count + ' ' + (currentLang === 'fr' ? 'utilisateur(s)' : 'user(s)') + '</span>';
      html += '</div>';
      html += '<div class="settings-item-actions">';
      html += '<button class="btn-icon" onclick="removeRoleChoice(' + i + ')" title="' + t('confirmDeleteRole') + '">🗑️</button>';
      html += '</div>';
      html += '</div>';
    }
  }
  html += '</div>';

  // Add new role
  html += '<div style="display:flex;gap:8px;margin-top:16px;">';
  html += '<input type="text" id="new-role-name" placeholder="' + t('newRolePlaceholder') + '" style="flex:1;" onkeydown="if(event.key===\'Enter\'){addRoleChoice();}" />';
  html += '<button class="btn btn-primary btn-sm" onclick="addRoleChoice()">+ ' + t('addRole') + '</button>';
  html += '</div>';

  html += '</div>';
  html += '<div class="modal-footer">';
  html += '<button class="btn btn-secondary" onclick="closeModalForce()">' + t('cancel') + '</button>';
  html += '<button class="btn btn-primary" onclick="saveRoleChoices()">' + t('save') + '</button>';
  html += '</div></div></div>';

  document.getElementById('modal-container').innerHTML = html;
}

function addRoleChoice() {
  var input = document.getElementById('new-role-name');
  var name = (input.value || '').trim();
  if (!name) return;
  if (_manageRolesState.choices.indexOf(name) !== -1) {
    showToast(currentLang === 'fr' ? 'Ce rôle existe déjà' : 'Role already exists', 'error');
    return;
  }
  _manageRolesState.choices.push(name);
  renderManageRolesModal();
}

function removeRoleChoice(index) {
  var role = _manageRolesState.choices[index];
  // Check if used
  var inUse = state.users.some(function(u) { return userMatchesRole(u, role); });
  if (inUse) {
    if (!confirm(t('cannotDeleteUsedRole') + '. ' + (currentLang === 'fr' ? 'Continuer ?' : 'Continue?'))) {
      return;
    }
  } else if (!confirm(t('confirmDeleteRole'))) {
    return;
  }
  _manageRolesState.choices.splice(index, 1);
  renderManageRolesModal();
}

async function saveRoleChoices() {
  try {
    var roleColName = getColumnName('users', 'role');
    var tablesData = await grist.docApi.fetchTable('_grist_Tables');
    var columnsData = await grist.docApi.fetchTable('_grist_Tables_column');

    // Find table row id
    var tableRowId = null;
    for (var i = 0; i < tablesData.id.length; i++) {
      if (tablesData.tableId[i] === state.USERS_TABLE) { tableRowId = tablesData.id[i]; break; }
    }
    if (tableRowId === null) throw new Error('Table not found');

    // Find Role column and existing widgetOptions
    var existingOpts = {};
    for (var j = 0; j < columnsData.id.length; j++) {
      if (columnsData.parentId[j] === tableRowId && columnsData.colId[j] === roleColName) {
        var wo = columnsData.widgetOptions[j];
        if (wo) {
          try { existingOpts = JSON.parse(wo); } catch (e) {}
        }
        break;
      }
    }

    // Update choices
    existingOpts.choices = _manageRolesState.choices;
    if (!existingOpts.widget) existingOpts.widget = 'TextBox';

    await grist.docApi.applyUserActions([
      ['ModifyColumn', state.USERS_TABLE, roleColName, { widgetOptions: JSON.stringify(existingOpts) }]
    ]);
    showToast(t('rolesUpdated'), 'success');
    closeModalForce();
  } catch (e) {
    console.error('Error saving roles:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

async function openEditUserModal(userId) {
  var user = state.users.find(function(u) { return u.id === userId; });
  if (!user) return;

  var groupOptions = '<option value="">--</option>';
  for (var i = 0; i < state.groups.length; i++) {
    var sel = state.groups[i].Name === user.Group_Name ? ' selected' : '';
    groupOptions += '<option value="' + sanitize(state.groups[i].Name) + '"' + sel + '>' + sanitize(state.groups[i].Name) + '</option>';
  }

  var roleChoices = await getRoleChoicesFromGrist();

  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal" onclick="event.stopPropagation()">';
  html += '<div class="modal-header"><h3>' + t('edit') + ' - ' + sanitize(user.Name) + '</h3><button class="modal-close" onclick="closeModalForce()">✕</button></div>';
  html += '<div class="modal-body">';
  html += '<div class="form-group"><label>' + t('fieldName') + '</label><input type="text" id="user-name" value="' + sanitize(user.Name) + '" /></div>';
  html += '<div class="form-group"><label>' + t('fieldEmail') + '</label><input type="email" id="user-email" value="' + sanitize(user.Email) + '" /></div>';
  html += '<div class="form-row">';
  html += '<div class="form-group"><label>' + t('fieldRole') + '</label><select id="user-role">';
  // Add current role first if it's not in the choices list
  if (user.Role && roleChoices.indexOf(user.Role) === -1) {
    html += '<option value="' + sanitize(user.Role) + '" selected>' + sanitize(roleLabel(user.Role)) + '</option>';
  }
  for (var i = 0; i < roleChoices.length; i++) {
    var r = roleChoices[i];
    var sel = (user.Role === r) ? ' selected' : '';
    html += '<option value="' + sanitize(r) + '"' + sel + '>' + sanitize(roleLabel(r)) + '</option>';
  }
  html += '</select></div>';
  html += '<div class="form-group"><label>' + t('fieldGroup') + '</label><select id="user-group">' + groupOptions + '</select></div>';
  html += '</div>';
  html += '</div>';
  html += '<div class="modal-footer">';
  html += '<button class="btn btn-secondary" onclick="closeModalForce()">' + t('cancel') + '</button>';
  html += '<button class="btn btn-primary" onclick="updateUser(' + userId + ')">' + t('save') + '</button>';
  html += '</div></div></div>';

  document.getElementById('modal-container').innerHTML = html;
}

function openEditGroupModal(groupId) {
  var group = state.groups.find(function(g) { return g.id === groupId; });
  if (!group) return;

  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal" onclick="event.stopPropagation()">';
  html += '<div class="modal-header"><h3>' + t('edit') + ' - ' + sanitize(group.Name) + '</h3><button class="modal-close" onclick="closeModalForce()">✕</button></div>';
  html += '<div class="modal-body">';
  html += '<div class="form-group"><label>' + t('fieldName') + '</label><input type="text" id="group-name" value="' + sanitize(group.Name) + '" /></div>';
  html += '<div class="form-group"><label>' + t('fieldDescription') + '</label><textarea id="group-desc">' + sanitize(group.Description || '') + '</textarea></div>';
  html += '</div>';
  html += '<div class="modal-footer">';
  html += '<button class="btn btn-secondary" onclick="closeModalForce()">' + t('cancel') + '</button>';
  html += '<button class="btn btn-primary" onclick="updateGroup(' + groupId + ')">' + t('save') + '</button>';
  html += '</div></div></div>';

  document.getElementById('modal-container').innerHTML = html;
}

async function updateUser(userId) {
  var name = document.getElementById('user-name').value.trim();
  if (!name) return;

  var record = {};
  record[getColumnName('users', 'name')] = name;
  record[getColumnName('users', 'email')] = document.getElementById('user-email').value.trim();
  record[getColumnName('users', 'role')] = document.getElementById('user-role').value;
  record[getColumnName('users', 'group')] = document.getElementById('user-group').value;

  try {
    await grist.docApi.applyUserActions([
      ['UpdateRecord', state.USERS_TABLE, userId, record]
    ]);
    showToast(t('taskUpdated'), 'success');
    closeModalForce();
    await loadAllData();
  } catch (e) {
    console.error('Error updating user:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

async function updateGroup(groupId) {
  var name = document.getElementById('group-name').value.trim();
  if (!name) return;

  try {
    await grist.docApi.applyUserActions([
      ['UpdateRecord', state.GROUPS_TABLE, groupId, {
        Name: name,
        Description: document.getElementById('group-desc').value.trim()
      }]
    ]);
    showToast(t('taskUpdated'), 'success');
    closeModalForce();
    await loadAllData();
  } catch (e) {
    console.error('Error updating group:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

async function openNewUserModal() {
  var groupOptions = '<option value="">--</option>';
  for (var i = 0; i < state.groups.length; i++) {
    groupOptions += '<option value="' + sanitize(state.groups[i].Name) + '">' + sanitize(state.groups[i].Name) + '</option>';
  }

  var roleChoices = await getRoleChoicesFromGrist();

  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal" onclick="event.stopPropagation()">';
  html += '<div class="modal-header"><h3>' + t('modalNewUser') + '</h3><button class="modal-close" onclick="closeModalForce()">✕</button></div>';
  html += '<div class="modal-body">';
  html += '<div class="form-group"><label>' + t('fieldName') + '</label><input type="text" id="user-name" /></div>';
  html += '<div class="form-group"><label>' + t('fieldEmail') + '</label><input type="email" id="user-email" /></div>';
  html += '<div class="form-row">';
  html += '<div class="form-group"><label>' + t('fieldRole') + '</label><select id="user-role">';
  for (var i = 0; i < roleChoices.length; i++) {
    var r = roleChoices[i];
    var sel = (r === 'member') ? ' selected' : '';
    html += '<option value="' + sanitize(r) + '"' + sel + '>' + sanitize(roleLabel(r)) + '</option>';
  }
  html += '</select></div>';
  html += '<div class="form-group"><label>' + t('fieldGroup') + '</label><select id="user-group">' + groupOptions + '</select></div>';
  html += '</div>';
  html += '</div>';
  html += '<div class="modal-footer">';
  html += '<button class="btn btn-secondary" onclick="closeModalForce()">' + t('cancel') + '</button>';
  html += '<button class="btn btn-primary" onclick="createUser()">' + t('save') + '</button>';
  html += '</div></div></div>';

  document.getElementById('modal-container').innerHTML = html;
}

function openNewGroupModal() {
  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal" onclick="event.stopPropagation()">';
  html += '<div class="modal-header"><h3>' + t('modalNewGroup') + '</h3><button class="modal-close" onclick="closeModalForce()">✕</button></div>';
  html += '<div class="modal-body">';
  html += '<div class="form-group"><label>' + t('fieldName') + '</label><input type="text" id="group-name" /></div>';
  html += '<div class="form-group"><label>' + t('fieldDescription') + '</label><textarea id="group-desc"></textarea></div>';
  html += '</div>';
  html += '<div class="modal-footer">';
  html += '<button class="btn btn-secondary" onclick="closeModalForce()">' + t('cancel') + '</button>';
  html += '<button class="btn btn-primary" onclick="createGroup()">' + t('save') + '</button>';
  html += '</div></div></div>';

  document.getElementById('modal-container').innerHTML = html;
}

async function createUser() {
  var name = document.getElementById('user-name').value.trim();
  if (!name) return;

  var record = {};
  record[getColumnName('users', 'name')] = name;
  record[getColumnName('users', 'email')] = document.getElementById('user-email').value.trim();
  record[getColumnName('users', 'role')] = document.getElementById('user-role').value;
  record[getColumnName('users', 'group')] = document.getElementById('user-group').value;

  try {
    await grist.docApi.applyUserActions([
      ['AddRecord', state.USERS_TABLE, null, record]
    ]);
    showToast(t('userCreated'), 'success');
    closeModalForce();
    await loadAllData();
  } catch (e) {
    console.error('Error creating user:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

async function createGroup() {
  var name = document.getElementById('group-name').value.trim();
  if (!name) return;

  var record = {
    Name: name,
    Description: document.getElementById('group-desc').value.trim()
  };

  try {
    await grist.docApi.applyUserActions([
      ['AddRecord', state.GROUPS_TABLE, null, record]
    ]);
    showToast(t('groupCreated'), 'success');
    closeModalForce();
    await loadAllData();
  } catch (e) {
    console.error('Error creating group:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

async function deleteUser(userId) {
  if (!state.isOwner) return;
  var confirmed = await showConfirmModal(t('confirmDeleteUser'), currentLang === 'fr' ? 'Supprimer l\'utilisateur' : 'Delete user');
  if (!confirmed) return;
  try {
    await grist.docApi.applyUserActions([
      ['RemoveRecord', state.USERS_TABLE, userId]
    ]);
    showToast(t('userDeleted'), 'info');
    await loadAllData();
  } catch (e) {
    console.error('Error deleting user:', e);
  }
}

async function deleteGroup(groupId) {
  if (!state.isOwner) return;
  var confirmed = await showConfirmModal(t('confirmDeleteGroup'), currentLang === 'fr' ? 'Supprimer le groupe' : 'Delete group');
  if (!confirmed) return;
  try {
    await grist.docApi.applyUserActions([
      ['RemoveRecord', state.GROUPS_TABLE, groupId]
    ]);
    showToast(t('groupDeleted'), 'info');
    await loadAllData();
  } catch (e) {
    console.error('Error deleting group:', e);
  }
}

// =============================================================================
// MODALS
// =============================================================================

function openNewTaskModal(defaultStatus) {
  if (!canEditWorkItems()) {
    showToast(currentLang === 'fr' ? 'Vous n’avez pas les droits pour créer une tâche.' : 'You do not have permission to create a task.', 'error');
    return;
  }
  return startNewTask(defaultStatus); // approche brouillon -> éditeur complet
  // --- ancien formulaire de création (désactivé, conservé pour référence) ---
  editAssignees = [];
  editAccountable = [];
  editConsulted = [];
  editInformed = [];

  var groupOptions = '<option value="">--</option>';
  for (var i = 0; i < state.groups.length; i++) {
    groupOptions += '<option value="' + sanitize(state.groups[i].Name) + '">' + sanitize(state.groups[i].Name) + '</option>';
  }

  var dotColor = '#f59e0b'; // default medium

  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal modal-detail" onclick="event.stopPropagation()">';

  // Top bar
  html += '<div class="modal-detail-top">';
  html += '<span class="group-dot" style="background:' + dotColor + '"></span>';
  html += '<span style="font-size:14px;font-weight:800;">' + t('modalNewTask') + '</span>';
  html += '<div style="flex:1;"></div>';
  html += '<button class="modal-close" onclick="closeModalForce()">✕</button>';
  html += '</div>';

  // Content: left only for creation (no right panel summary yet)
  html += '<div class="modal-detail-content" style="grid-template-columns:1fr;">';

  // === LEFT PANEL ===
  html += '<div class="modal-detail-left">';
  html += '<input class="detail-title-input" type="text" id="task-title" placeholder="' + t('fieldTitle') + '" />';

  // Description
  html += '<div class="detail-field">';
  html += '<div class="detail-field-value"><textarea id="task-desc" placeholder="' + t('fieldDescription') + '"></textarea></div>';
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
    html += '<div class="assignee-chips" id="assignee-chips"></div>';
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

  // Status + Priority
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">';
  html += '<div class="detail-field">';
  html += '<span class="detail-field-icon">📊</span>';
  html += '<span class="detail-field-label">' + t('fieldStatus') + '</span>';
  html += '<div class="detail-field-value"><select id="task-status">';
  var _statuses = getKanbanStatuses();
  for (var _si = 0; _si < _statuses.length; _si++) {
    var _s = _statuses[_si];
    var _sl = currentLang === 'fr' ? _s.label_fr : _s.label_en;
    html += '<option value="' + _s.key + '"' + ((defaultStatus === _s.key || (!defaultStatus && _si === 0)) ? ' selected' : '') + '>' + _sl + '</option>';
  }
  html += '</select></div></div>';

  html += '<div class="detail-field">';
  html += '<span class="detail-field-icon">🔥</span>';
  html += '<span class="detail-field-label">' + t('fieldPriority') + '</span>';
  html += '<div class="detail-field-value"><select id="task-priority">';
  html += '<option value="medium">' + t('priorityMedium') + '</option>';
  html += '<option value="high">' + t('priorityHigh') + '</option>';
  html += '<option value="low">' + t('priorityLow') + '</option>';
  html += '</select></div></div>';
  html += '</div>';

  // Group
  html += '<div class="detail-field">';
  html += '<span class="detail-field-icon">👥</span>';
  html += '<span class="detail-field-label">' + t('fieldGroup') + '</span>';
  html += '<div class="detail-field-value"><select id="task-group">' + groupOptions + '</select></div>';
  html += '</div>';

  // Dates
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">';
  html += '<div class="detail-field">';
  html += '<span class="detail-field-icon">📅</span>';
  html += '<span class="detail-field-label">' + t('fieldStartDate') + '</span>';
  html += '<div class="detail-field-value"><input type="date" id="task-start" /></div>';
  html += '</div>';

  html += '<div class="detail-field">';
  html += '<span class="detail-field-icon">⏰</span>';
  html += '<span class="detail-field-label">' + t('fieldDueDate') + '</span>';
  html += '<div class="detail-field-value"><input type="date" id="task-due" /></div>';
  html += '</div>';
  html += '</div>';

  // Project
  var projectOptions = '<option value="">' + t('noProject') + '</option>';
  for (var pi = 0; pi < state.projects.length; pi++) {
    var projSelected = state.currentProjectId === state.projects[pi].id ? ' selected' : '';
    projectOptions += '<option value="' + state.projects[pi].id + '"' + projSelected + '>' + sanitize(state.projects[pi].Name) + '</option>';
  }
  html += '<div class="detail-field">';
  html += '<span class="detail-field-icon">📂</span>';
  html += '<span class="detail-field-label">' + t('project') + '</span>';
  html += '<div class="detail-field-value"><select id="task-project">' + projectOptions + '</select></div>';
  html += '</div>';

  // Category
  var newCategoryOptions = '<option value="">--</option>';
  for (var nci = 0; nci < state.categories.length; nci++) {
    newCategoryOptions += '<option value="' + sanitize(state.categories[nci].Name) + '">' + sanitize(state.categories[nci].Name) + '</option>';
  }
  html += '<div class="detail-field">';
  html += '<span class="detail-field-icon">📁</span>';
  html += '<span class="detail-field-label">' + t('fieldCategory') + '</span>';
  html += '<div class="detail-field-value"><select id="task-category">' + newCategoryOptions + '</select></div>';
  html += '</div>';

  // Tag
  var newTagOptions = '<option value="">--</option>';
  for (var nti = 0; nti < state.tags.length; nti++) {
    newTagOptions += '<option value="' + sanitize(state.tags[nti].Name) + '">' + sanitize(state.tags[nti].Name) + '</option>';
  }
  html += '<div class="detail-field">';
  html += '<span class="detail-field-icon">🏷️</span>';
  html += '<span class="detail-field-label">' + t('tag') + '</span>';
  html += '<div class="detail-field-value"><select id="task-tag">' + newTagOptions + '</select></div>';
  html += '</div>';

  html += '</div>'; // end left
  html += '</div>'; // end content

  // Footer
  html += '<div class="modal-detail-footer">';
  html += '<div></div>';
  html += '<div style="display:flex;gap:8px;">';
  html += '<button class="btn btn-secondary" onclick="closeModalForce()">' + t('cancel') + '</button>';
  html += '<button class="btn btn-primary" onclick="createTask()">' + t('save') + '</button>';
  html += '</div></div>';

  html += '</div></div>'; // end modal + overlay

  document.getElementById('modal-container').innerHTML = html;
}

var editAssignees = [];
var editAccountable = [];
var editConsulted = [];
var editInformed = [];
var draftTaskId = null; // id de la tâche brouillon en cours de création (approche "créer puis éditer")

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
  if (prefill.tag) setField(record, 'tasks', 'tag', prefill.tag);
  if (prefill.recurrence && prefill.recurrence !== 'none') setField(record, 'tasks', 'recurrence', prefill.recurrence);
  if (prefill.estimatedHours) setField(record, 'tasks', 'estimatedHours', prefill.estimatedHours);
  if (editAssignees.length > 0) setField(record, 'tasks', 'assignee', editAssignees.join(', '));
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
  html += '<div class="detail-field-value"><select id="task-project" onchange="refreshDependencyTaskOptions(' + task.id + ', true)">' + projectOptions + '</select></div>';
  html += '</div>';

  // Category
  var categoryOptions = '<option value="">--</option>';
  for (var ci = 0; ci < state.categories.length; ci++) {
    var catSel = state.categories[ci].Name === task.Category ? ' selected' : '';
    categoryOptions += '<option value="' + sanitize(state.categories[ci].Name) + '"' + catSel + '>' + sanitize(state.categories[ci].Name) + '</option>';
  }
  html += '<div class="detail-field">';
  html += '<span class="detail-field-icon">📁</span>';
  html += '<span class="detail-field-label">' + t('fieldCategory') + '</span>';
  html += '<div class="detail-field-value"><select id="task-category">' + categoryOptions + '</select></div>';
  html += '</div>';

  // Tag
  var tagOptions = '<option value="">--</option>';
  for (var ti = 0; ti < state.tags.length; ti++) {
    var tagSel = state.tags[ti].Name === task.Tag ? ' selected' : '';
    tagOptions += '<option value="' + sanitize(state.tags[ti].Name) + '"' + tagSel + '>' + sanitize(state.tags[ti].Name) + '</option>';
  }
  html += '<div class="detail-field">';
  html += '<span class="detail-field-icon">🏷️</span>';
  html += '<span class="detail-field-label">' + t('tag') + '</span>';
  html += '<div class="detail-field-value"><select id="task-tag">' + tagOptions + '</select></div>';
  html += '</div>';

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

  // === DEPENDENCIES SECTION ===
  var taskDeps = getTaskDependencies(task.id);
  var taskBlocks = getTasksDependingOn(task.id);
  html += '<div class="dependencies-section">';
  html += '<div class="dependencies-header">';
  html += '<span class="detail-field-icon">🔗</span>';
  html += '<span class="detail-field-label">' + t('dependencies') + '</span>';
  html += '</div>';
  
  // Blocked by
  html += '<div class="dep-subsection">';
  html += '<div class="dep-label">' + t('blockedBy') + ':</div>';
  if (taskDeps.length === 0) {
    html += '<div class="dep-empty">' + t('noDependencies') + '</div>';
  } else {
    html += '<div class="dep-list">';
    for (var di = 0; di < taskDeps.length; di++) {
      var dep = taskDeps[di];
      var depDone = dep.Status === 'done';
      html += '<div class="dep-item' + (depDone ? ' dep-done' : '') + '">';
      html += '<span class="dep-status">' + (depDone ? '✅' : '⏳') + '</span>';
      html += '<span class="dep-title">' + sanitize(dep.Title) + '</span>';
      html += '<button class="dep-remove" onclick="removeDependency(' + task.id + ', ' + dep.id + ')">✕</button>';
      html += '</div>';
    }
    html += '</div>';
  }
  html += '</div>';
  
  // Blocks (tasks depending on this one)
  if (taskBlocks.length > 0) {
    html += '<div class="dep-subsection">';
    html += '<div class="dep-label">' + t('blocks') + ':</div>';
    html += '<div class="dep-list">';
    for (var bi = 0; bi < taskBlocks.length; bi++) {
      var blk = taskBlocks[bi];
      html += '<div class="dep-item dep-blocks">';
      html += '<span class="dep-title">' + sanitize(blk.Title) + '</span>';
      html += '</div>';
    }
    html += '</div>';
    html += '</div>';
  }
  
  // Add dependency
  html += '<div class="dep-add-row">';
  html += '<div class="dep-combobox" id="dep-combobox">';
  html += '<input type="search" id="dep-search" class="dep-search-input" role="combobox" aria-autocomplete="list" aria-controls="dep-options" aria-expanded="false" placeholder="' + (currentLang === 'fr' ? 'Sélectionner ou rechercher une tâche...' : 'Select or search for a task...') + '" onfocus="openDependencyTaskOptions(' + task.id + ')" oninput="clearDependencyTaskSelection();openDependencyTaskOptions(' + task.id + ')" onkeydown="if(event.key===\'Escape\')closeDependencyTaskOptions()" autocomplete="off" />';
  html += '<input type="hidden" id="dep-select" value="" />';
  html += '<button type="button" class="dep-toggle-btn" onclick="toggleDependencyTaskOptions(' + task.id + ')" title="' + (currentLang === 'fr' ? 'Afficher les tâches' : 'Show tasks') + '">⌄</button>';
  html += '<div id="dep-options" class="dep-options" role="listbox"></div>';
  html += '</div>';
  html += '<button type="button" class="dep-add-btn" onclick="addDependency(' + task.id + ')">+</button>';
  html += '</div>';
  html += '</div>';

  // === CUSTOM FIELDS SECTION ===
  if (state.customFields.length > 0) {
    html += '<div class="custom-fields-section">';
    html += '<div class="custom-fields-header">';
    html += '<span class="detail-field-icon">📋</span>';
    html += '<span class="detail-field-label">' + t('customFields') + '</span>';
    if (state.isOwner) html += '<button class="cf-manage-btn" onclick="openCustomFieldsModal()">⚙️</button>';
    html += '</div>';
    html += '<div class="custom-fields-list">';
    for (var cfi = 0; cfi < state.customFields.length; cfi++) {
      var cf = state.customFields[cfi];
      var cfValue = getTaskCustomFieldValue(task.id, cf.id);
      html += '<div class="custom-field-item">';
      html += '<label class="cf-label">' + sanitize(cf.Name) + '</label>';
      html += renderCustomFieldInput(cf, task.id, cfValue);
      html += '</div>';
    }
    html += '</div>';
    html += '</div>';
  } else if (state.isOwner) {
    html += '<div class="custom-fields-section">';
    html += '<div class="custom-fields-header">';
    html += '<span class="detail-field-icon">📋</span>';
    html += '<span class="detail-field-label">' + t('customFields') + '</span>';
    html += '<button class="cf-manage-btn" onclick="openCustomFieldsModal()">⚙️</button>';
    html += '</div>';
    html += '<div class="cf-empty">' + t('noCustomFields') + '</div>';
    html += '</div>';
  }

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
  refreshDependencyTaskOptions(task.id);
}

function saveTaskFromFooter(taskId, event) {
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

function getRaciArray(varName) {
  if (varName === 'editAssignees') return editAssignees;
  if (varName === 'editAccountable') return editAccountable;
  if (varName === 'editConsulted') return editConsulted;
  if (varName === 'editInformed') return editInformed;
  return [];
}

function renderRaciChips(varName) {
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

function renderRaciField(letter, label, selectSuffix, varName) {
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

function addRaciChip(varName, selectSuffix) {
  var sel = document.getElementById(selectSuffix + '-select');
  var arr = getRaciArray(varName);
  var val = sel.value;
  if (!val || arr.indexOf(val) !== -1) return;
  arr.push(val);
  var container = document.getElementById(selectSuffix + '-chips');
  if (container) container.innerHTML = renderRaciChips(varName);
  sel.value = '';
}

function removeRaciChip(varName, index, selectSuffix) {
  var arr = getRaciArray(varName);
  arr.splice(index, 1);
  var container = document.getElementById(selectSuffix + '-chips') || document.getElementById(varName.replace('edit', '').toLowerCase() + '-chips');
  if (container) container.innerHTML = renderRaciChips(varName);
}

async function quickAction(taskId, newStatus) {
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

async function addSubtask(parentTaskId) {
  var input = document.getElementById('new-subtask-input');
  var title = input.value.trim();
  if (!title) return;

  var formState = captureTaskFormState();
  var savedAssignees = editAssignees.slice();
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

function getModalScrollTop() {
  var modal = document.querySelector('#modal-container .modal');
  return modal ? modal.scrollTop : 0;
}

function restoreModalScrollTop(pos) {
  setTimeout(function() {
    var modal = document.querySelector('#modal-container .modal');
    if (modal) modal.scrollTop = pos;
  }, 50);
}

async function toggleSubtask(subtaskId, completed) {
  var savedAssignees = editAssignees.slice();
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

async function deleteSubtask(subtaskId, parentTaskId) {
  var confirmed = await showConfirmModal(
    currentLang === 'fr' ? 'Supprimer cette sous-tâche ?' : 'Delete this subtask?',
    currentLang === 'fr' ? 'Supprimer la sous-tâche' : 'Delete subtask'
  );
  if (!confirmed) return;
  var formState = captureTaskFormState();
  var savedAssignees = editAssignees.slice();
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
async function saveEditSubtask(subtaskId, parentTaskId) {
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
  var savedAssignees = editAssignees.slice();
  var savedAccountable = editAccountable.slice();
  var savedConsulted = editConsulted.slice();
  var savedInformed = editInformed.slice();
  try {
    await grist.docApi.applyUserActions([['UpdateRecord', state.SUBTASKS_TABLE, subtaskId, fields]]);
    showToast(t('subtaskSaved'), 'success');
    await loadAllData();
    editAssignees = savedAssignees;
    editAccountable = savedAccountable;
    editConsulted = savedConsulted;
    editInformed = savedInformed;
    openEditTaskModal(parentTaskId, true);
  } catch (e) {
    console.error('Error saving subtask:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

async function generateSubtaskOccurrences(subtaskId, parentTaskId) {
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
  var savedAccountable = editAccountable.slice();
  var savedConsulted = editConsulted.slice();
  var savedInformed = editInformed.slice();
    await loadAllData();
    editAssignees = savedAssignees;
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
// DEPENDENCIES CRUD
// =============================================================================

async function addDependency(taskId) {
  var select = document.getElementById('dep-select');
  var dependsOnId = parseInt(select.value);
  if (!dependsOnId) return;
  var projectEl = document.getElementById('task-project');
  var selectedProjectId = normalizeDependencyProjectId(projectEl ? projectEl.value : 0);
  var dependsOnTask = state.tasks.find(function(candidate) { return candidate.id === dependsOnId; });
  if (!dependsOnTask || normalizeDependencyProjectId(dependsOnTask.Project_Id) !== selectedProjectId) {
    showToast(currentLang === 'fr' ? 'La dépendance doit appartenir au même projet.' : 'The dependency must belong to the same project.', 'error');
    refreshDependencyTaskOptions(taskId);
    return;
  }
  var formState = captureTaskFormState();
  var savedAssignees = editAssignees.slice();
  var savedAccountable = editAccountable.slice();
  var savedConsulted = editConsulted.slice();
  var savedInformed = editInformed.slice();

  try {
    await grist.docApi.applyUserActions([
      ['AddRecord', state.DEPENDENCIES_TABLE, null, {
        Task_Id: taskId,
        Depends_On_Task_Id: dependsOnId,
        Created_At: Math.floor(Date.now() / 1000)
      }]
    ]);
    showToast(t('dependencyAdded'), 'success');
    await loadAllData();
    editAssignees = savedAssignees;
    editAccountable = savedAccountable;
    editConsulted = savedConsulted;
    editInformed = savedInformed;
    openEditTaskModal(taskId, true);
    restoreTaskFormState(formState);
    refreshDependencyTaskOptions(taskId);
  } catch (e) {
    console.error('Error adding dependency:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

async function removeDependency(taskId, dependsOnTaskId) {
  var dep = state.dependencies.find(function(d) {
    return d.Task_Id === taskId && d.Depends_On_Task_Id === dependsOnTaskId;
  });
  if (!dep) return;
  var confirmed = await showConfirmModal(
    currentLang === 'fr' ? 'Supprimer cette dépendance ?' : 'Delete this dependency?',
    currentLang === 'fr' ? 'Supprimer la dépendance' : 'Delete dependency'
  );
  if (!confirmed) return;
  var formState = captureTaskFormState();
  var savedAssignees = editAssignees.slice();
  var savedAccountable = editAccountable.slice();
  var savedConsulted = editConsulted.slice();
  var savedInformed = editInformed.slice();

  try {
    await grist.docApi.applyUserActions([
      ['RemoveRecord', state.DEPENDENCIES_TABLE, dep.id]
    ]);
    showToast(t('dependencyRemoved'), 'info');
    await loadAllData();
    editAssignees = savedAssignees;
    editAccountable = savedAccountable;
    editConsulted = savedConsulted;
    editInformed = savedInformed;
    openEditTaskModal(taskId, true);
    restoreTaskFormState(formState);
  } catch (e) {
    console.error('Error removing dependency:', e);
  }
}

// =============================================================================
// COMMENTS CRUD
// =============================================================================

async function addComment(taskId) {
  var textarea = document.getElementById('new-comment-input');
  var content = textarea.value.trim();
  if (!content) return;
  var formState = captureTaskFormState();
  var savedAssignees = editAssignees.slice();
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
    logActivity('comment_added', taskId, commentTask ? commentTask.Title : '', content.substring(0, 80));
    await loadAllData();
    editAssignees = savedAssignees;
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

async function deleteComment(commentId, taskId) {
  if (!state.isOwner) return;
  var confirmed = await showConfirmModal(
    currentLang === 'fr' ? 'Supprimer ce commentaire ?' : 'Delete this comment?',
    currentLang === 'fr' ? 'Supprimer le commentaire' : 'Delete comment'
  );
  if (!confirmed) return;
  var formState = captureTaskFormState();
  var savedAssignees = editAssignees.slice();
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
    editAccountable = savedAccountable;
    editConsulted = savedConsulted;
    editInformed = savedInformed;
    openEditTaskModal(taskId, true);
    restoreTaskFormState(formState);
  } catch (e) {
    console.error('Error deleting comment:', e);
  }
}

function closeModal(e) {
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

async function createTask() {
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
  setField(record, 'tasks', 'assignee', editAssignees.join(', '));
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
  // B4 : prolongation auto activée par défaut sur les nouvelles tâches (modifiable ensuite)
  if (state.TASKS_TABLE === state.DEFAULT_TASKS_TABLE) record.Auto_Extend = true;

  // Add Tag only if the element exists
  var tagEl = document.getElementById('task-tag');
  if (tagEl) {
    setField(record, 'tasks', 'tag', tagEl.value.trim());
  }

  try {
    record = await keepExistingTaskColumns(record);
    var createResult = await grist.docApi.applyUserActions([
      ['AddRecord', state.TASKS_TABLE, null, record]
    ]);
    var newTaskId = (createResult && createResult.retValues && createResult.retValues[0]) || null;
    showToast(t('taskCreated'), 'success');
    logActivity('task_created', newTaskId, title, '');
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

async function updateTask(taskId) {
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

  if (newStatus === 'done' && isTaskBlocked(taskId)) {
    var blockers = getTaskDependencies(taskId).filter(function(b) { return b && b.Status !== 'done'; });
    var blockerNames = blockers.map(function(b) { return b.Title; }).join(', ');
    showToast((currentLang === 'fr' ? 'Impossible : tâche bloquée par ' : 'Cannot complete: blocked by ') + blockerNames, 'error');
    return;
  }

  var recurrenceEl = document.getElementById('task-recurrence');
  var newRecurrence = recurrenceEl ? recurrenceEl.value : (task ? task.Recurrence : 'none');

  var projectEl = document.getElementById('task-project');
  var projectId = projectEl && projectEl.value ? parseInt(projectEl.value) : 0;

  var record = {};
  setField(record, 'tasks', 'title', title);
  setField(record, 'tasks', 'description', getInputValue('task-desc').trim());
  setField(record, 'tasks', 'status', newStatus);
  setField(record, 'tasks', 'priority', getInputValue('task-priority'));
  setField(record, 'tasks', 'assignee', editAssignees.join(', '));
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
  
  // Add Tag only if the element exists
  var tagEl = document.getElementById('task-tag');
  if (tagEl) {
    setField(record, 'tasks', 'tag', tagEl.value.trim());
  }

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
    var logDetails = [];
    var autoChanges = {};
    if (task) {
      if (task.Status !== newStatus) { autoChanges.status = { from: task.Status, to: newStatus }; logDetails.push(task.Status + ' → ' + newStatus); }
      var newPriority = document.getElementById('task-priority').value;
      if (task.Priority !== newPriority) autoChanges.priority = { from: task.Priority, to: newPriority };
      var newAssignee = editAssignees.join(', ');
      if (task.Assignee !== newAssignee) autoChanges.assignee = { from: task.Assignee, to: newAssignee };
    }
    if (Object.keys(autoChanges).length > 0) {
      await evaluateAutomationRules(Object.assign({}, task, record, { id: taskId }), autoChanges);
    }
    logActivity(autoChanges.status ? 'status_changed' : 'task_updated', taskId, title, logDetails.join(', '));

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

async function deleteTask(taskId) {
  if (!state.isOwner) return;
  var relatedSubtasks = state.subtasks.filter(function(st) { return st.Parent_Task_Id === taskId; });
  var confirmationMessage = currentLang === 'fr'
    ? 'Supprimer cette tâche et ses ' + relatedSubtasks.length + ' sous-tâche(s) ? Cette action est irréversible.'
    : 'Delete this task and its ' + relatedSubtasks.length + ' subtask(s)? This action cannot be undone.';
  var confirmed = await showConfirmModal(confirmationMessage, currentLang === 'fr' ? 'Supprimer la tâche' : 'Delete task');
  if (!confirmed) return;
  try {
    var deletedTask = state.tasks.find(function(t2) { return t2.id === taskId; });
    var deletedSubtaskIds = {};
    var actions = [];
    relatedSubtasks.forEach(function(st) { deletedSubtaskIds[st.id] = true; });

    state.subtasks.forEach(function(st) {
      if (st.Parent_Task_Id !== taskId && deletedSubtaskIds[st.Blocked_By_Subtask_Id]) {
        actions.push(['UpdateRecord', state.SUBTASKS_TABLE, st.id, { Blocked_By_Subtask_Id: null }]);
      }
    });
    state.dependencies.forEach(function(dep) {
      if (dep.Task_Id === taskId || dep.Depends_On_Task_Id === taskId) actions.push(['RemoveRecord', state.DEPENDENCIES_TABLE, dep.id]);
    });
    state.comments.forEach(function(comment) {
      if (comment.Task_Id === taskId) actions.push(['RemoveRecord', state.COMMENTS_TABLE, comment.id]);
    });
    state.timeEntries.forEach(function(entry) {
      if (entry.Task_Id === taskId) actions.push(['RemoveRecord', state.TIME_ENTRIES_TABLE, entry.id]);
    });
    state.customFieldValues.forEach(function(value) {
      if (value.Task_Id === taskId) actions.push(['RemoveRecord', state.CUSTOM_FIELD_VALUES_TABLE, value.id]);
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
    logActivity('task_deleted', taskId, deletedTask ? deletedTask.Title : '', '');
    await loadAllData();
  } catch (e) {
    console.error('Error deleting task:', e);
  }
}

// =============================================================================
// SETTINGS VIEW
// =============================================================================

function renderSettingsView() {
  renderSettingsProjectsList();
  renderSettingsCategoriesList();
  renderSettingsTagsList();
  renderCardDisplaySettings();
  renderKanbanStatusesList();
  renderRaciToggle();
  renderAutomationsSection();
  renderNotifyConcernedToggle();
  renderSecuritySection();
  renderUiLabelSettings();
  applyUiLabelsToSettingsHeadings();
}

var _statusDragIndex = null;
function renderKanbanStatusesList() {
  var container = document.getElementById('kanban-statuses-list');
  if (!container) return;
  var statuses = getKanbanStatuses();
  var html = '';
  for (var i = 0; i < statuses.length; i++) {
    var s = statuses[i];
    var label = currentLang === 'fr' ? s.label_fr : s.label_en;
    var c = s.color || '#94a3b8';
    html += '<div class="kanban-status-item" draggable="true" data-status-index="' + i + '" data-color="' + c + '" style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:white;border-radius:8px;margin-bottom:6px;border:1px solid #e2e8f0;border-left:3px solid transparent;">';
    html += '<span class="kanban-status-drag-handle" title="' + (currentLang === 'fr' ? 'Glisser pour réordonner' : 'Drag to reorder') + '">⠿</span>';
    html += '<span style="width:14px;height:14px;border-radius:50%;background:' + (s.color || '#94a3b8') + ';flex-shrink:0;"></span>';
    html += '<span style="flex:1;font-size:13px;font-weight:600;">' + sanitize(label) + '</span>';
    html += '<span style="font-size:10px;color:#94a3b8;font-family:monospace;">' + sanitize(s.key) + '</span>';
    html += '<button class="btn-icon" onclick="editKanbanStatus(' + i + ')" title="' + (currentLang === 'fr' ? 'Modifier' : 'Edit') + '">✏️</button>';
    if (statuses.length > 2) html += '<button class="btn-icon" onclick="removeKanbanStatus(' + i + ')" title="' + t('delete') + '">🗑️</button>';
    html += '</div>';
  }
  container.innerHTML = html;
  var items = container.querySelectorAll('.kanban-status-item');
  items.forEach(function(item) {
    var col = item.dataset.color;
    item.addEventListener('mouseenter', function() {
      item.style.background = col + '10';
      item.style.borderColor = col + '30';
      item.style.borderLeftColor = col;
    });
    item.addEventListener('mouseleave', function() {
      item.style.background = 'white';
      item.style.borderColor = '#e2e8f0';
      item.style.borderLeftColor = 'transparent';
    });
    item.addEventListener('dragstart', function(e) {
      _statusDragIndex = parseInt(item.dataset.statusIndex);
      item.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    item.addEventListener('dragend', function() {
      item.classList.remove('dragging');
      items.forEach(function(el) { el.classList.remove('drag-over-above', 'drag-over-below'); });
      _statusDragIndex = null;
    });
    item.addEventListener('dragover', function(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      var targetIndex = parseInt(item.dataset.statusIndex);
      if (targetIndex === _statusDragIndex) return;
      items.forEach(function(el) { el.classList.remove('drag-over-above', 'drag-over-below'); });
      item.classList.add(targetIndex < _statusDragIndex ? 'drag-over-above' : 'drag-over-below');
    });
    item.addEventListener('dragleave', function() {
      item.classList.remove('drag-over-above', 'drag-over-below');
    });
    item.addEventListener('drop', function(e) {
      e.preventDefault();
      items.forEach(function(el) { el.classList.remove('drag-over-above', 'drag-over-below'); });
      var targetIndex = parseInt(item.dataset.statusIndex);
      if (_statusDragIndex === null || targetIndex === _statusDragIndex) return;
      ensureCustomStatuses();
      var moved = customKanbanStatuses.splice(_statusDragIndex, 1)[0];
      customKanbanStatuses.splice(targetIndex, 0, moved);
      saveKanbanStatuses().then(function() {
        renderKanbanStatusesList();
        renderKanbanView();
      });
    });
  });
}

function ensureCustomStatuses() {
  if (!customKanbanStatuses) {
    customKanbanStatuses = JSON.parse(JSON.stringify(defaultKanbanStatuses));
  }
}

async function addKanbanStatus() {
  var result = await showPromptModal(
    currentLang === 'fr' ? 'Nouveau statut' : 'New status',
    [
      { label: currentLang === 'fr' ? 'Nom (FR)' : 'Name (FR)', placeholder: currentLang === 'fr' ? 'Ex: À valider' : 'Ex: In review' },
      { label: currentLang === 'fr' ? 'Nom (EN)' : 'Name (EN)', placeholder: currentLang === 'fr' ? 'Ex: To validate' : 'Ex: In review' },
      { label: 'Emoji', type: 'emoji', placeholder: currentLang === 'fr' ? 'Ex: ✅ 🔍 📋' : 'Ex: ✅ 🔍 📋' },
      { label: currentLang === 'fr' ? 'Couleur' : 'Color', type: 'color' }
    ],
    ['', '', '', '#8b5cf6']
  );
  if (!result || !result[0]) return;
  var labelFr = result[0].trim();
  var labelEn = (result[1] || '').trim() || labelFr;
  var emoji = (result[2] || '').trim();
  var color = result[3] || '#8b5cf6';
  var key = labelFr.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
  if (!key) return;
  var existing = getKanbanStatuses();
  if (existing.some(function(s) { return s.key === key; })) {
    showToast(currentLang === 'fr' ? 'Ce statut existe déjà' : 'This status already exists', 'error');
    return;
  }
  ensureCustomStatuses();
  customKanbanStatuses.push({ key: key, label_fr: labelFr, label_en: labelEn, color: color, emoji: emoji, cssClass: 'col-custom' });
  await saveKanbanStatuses();
  renderKanbanStatusesList();
  renderKanbanView();
  showToast(currentLang === 'fr' ? 'Statut ajouté' : 'Status added', 'success');
}

async function editKanbanStatus(index) {
  ensureCustomStatuses();
  var s = customKanbanStatuses[index];
  if (!s) return;
  var result = await showPromptModal(
    currentLang === 'fr' ? 'Modifier le statut' : 'Edit status',
    [
      { label: currentLang === 'fr' ? 'Nom (FR)' : 'Name (FR)' },
      { label: currentLang === 'fr' ? 'Nom (EN)' : 'Name (EN)' },
      { label: 'Emoji', type: 'emoji', placeholder: currentLang === 'fr' ? 'Ex: ✅ 🔍 📋' : 'Ex: ✅ 🔍 📋' },
      { label: currentLang === 'fr' ? 'Couleur' : 'Color', type: 'color' }
    ],
    [s.label_fr, s.label_en, s.emoji || '', s.color || '#94a3b8']
  );
  if (!result || !result[0]) return;
  customKanbanStatuses[index].label_fr = result[0].trim();
  customKanbanStatuses[index].label_en = (result[1] || '').trim() || result[0].trim();
  customKanbanStatuses[index].emoji = (result[2] || '').trim();
  customKanbanStatuses[index].color = result[3] || s.color;
  await saveKanbanStatuses();
  renderKanbanStatusesList();
  renderKanbanView();
}

async function removeKanbanStatus(index) {
  ensureCustomStatuses();
  if (customKanbanStatuses.length <= 2) return;
  var status = customKanbanStatuses[index];
  var confirmed = await showConfirmModal(
    currentLang === 'fr' ? 'Supprimer le statut « ' + status.label_fr + ' » ?' : 'Delete status "' + status.label_en + '"?',
    currentLang === 'fr' ? 'Supprimer le statut' : 'Delete status'
  );
  if (!confirmed) return;
  var removed = customKanbanStatuses.splice(index, 1)[0];
  await saveKanbanStatuses();
  renderKanbanStatusesList();
  renderKanbanView();
  showToast((currentLang === 'fr' ? 'Statut supprimé : ' : 'Status removed: ') + (currentLang === 'fr' ? removed.label_fr : removed.label_en), 'success');
}

function renderUiLabelSettings() {
  var container = document.getElementById('ui-label-settings');
  if (!container) return;
  var keys = ['projects', 'categories', 'tags', 'statuses', 'cardDisplay', 'raci', 'automations', 'notifications', 'security', 'mapping'];
  var html = '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;">';
  keys.forEach(function(key) {
    html += '<label style="display:flex;flex-direction:column;gap:4px;font-size:12px;font-weight:700;color:#271A79;">';
    html += '<span>' + sanitize(defaultUiLabels[key]) + '</span>';
    html += '<input type="text" data-ui-label-key="' + key + '" value="' + sanitize(uiLabel(key)) + '" style="padding:7px 9px;border:1px solid #cbd5e1;border-radius:8px;font-size:13px;">';
    html += '</label>';
  });
  html += '</div><button class="btn btn-primary btn-sm" style="margin-top:12px;" onclick="saveUiLabelSettings()">💾 Enregistrer les titres</button>';
  container.innerHTML = html;
}

async function saveUiLabelSettings() {
  var inputs = document.querySelectorAll('#ui-label-settings [data-ui-label-key]');
  inputs.forEach(function(inp) {
    var key = inp.getAttribute('data-ui-label-key');
    state.uiLabels[key] = (inp.value || defaultUiLabels[key] || key).trim();
  });
  await saveUiLabels();
  applyUiLabelsToSettingsHeadings();
  renderCardDisplaySettings();
  showToast('Titres enregistrés', 'success');
}

function applyUiLabelsToSettingsHeadings() {
  var map = {
    'settings-title-projects': 'projects',
    'settings-title-categories': 'categories',
    'settings-title-tags': 'tags',
    'settings-title-statuses': 'statuses',
    'settings-title-card-display': 'cardDisplay',
    'settings-title-raci': 'raci',
    'settings-title-automations': 'automations',
    'settings-title-notifications': 'notifications',
    'settings-title-security': 'security',
    'settings-title-mapping': 'mapping'
  };
  Object.keys(map).forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.textContent = uiLabel(map[id]);
  });
}

function renderCardDisplaySettings() {
  var container = document.getElementById('card-display-settings');
  if (!container) return;
  var fields = [
    { key: 'priority',    label: currentLang === 'fr' ? 'Priorité' : 'Priority' },
    { key: 'description', label: currentLang === 'fr' ? 'Description' : 'Description' },
    { key: 'date',        label: currentLang === 'fr' ? 'Date d\'échéance' : 'Due date' },
    { key: 'assignee',    label: currentLang === 'fr' ? 'Assigné à' : 'Assignee' },
    { key: 'tags',        label: uiLabel('tags') },
    { key: 'category',    label: uiLabel('categories') },
    { key: 'time',        label: currentLang === 'fr' ? 'Temps passé' : 'Time spent' },
    { key: 'subtasks',    label: currentLang === 'fr' ? 'Sous-tâches' : 'Subtasks' },
    { key: 'comments',    label: currentLang === 'fr' ? 'Commentaires' : 'Comments' }
  ];
  var html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">';
  for (var i = 0; i < fields.length; i++) {
    var f = fields[i];
    var checked = cardDisplaySettings[f.key] !== false;
    html += '<label style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:8px;cursor:pointer;background:' + (checked ? '#f0fdf4' : '#f8fafc') + ';border:1px solid ' + (checked ? '#bbf7d0' : '#e2e8f0') + ';font-size:12px;font-weight:500;">';
    html += '<input type="checkbox" ' + (checked ? 'checked' : '') + ' onchange="toggleCardDisplay(\'' + f.key + '\', this.checked)" style="accent-color:#22c55e;">';
    html += f.label + '</label>';
  }
  html += '</div>';
  container.innerHTML = html;
}

async function toggleCardDisplay(key, value) {
  cardDisplaySettings[key] = value;
  await saveCardDisplaySettings();
  renderCardDisplaySettings();
  renderKanbanView();
}

function renderRaciToggle() {
  var container = document.getElementById('raci-toggle-container');
  if (!container) return;
  var html = '<div style="display:flex;align-items:center;justify-content:space-between;padding:4px 0;">';
  html += '<div>';
  html += '<span style="font-size:13px;font-weight:600;">' + t(state.raciEnabled ? 'raciEnabled' : 'raciDisabled') + '</span>';
  html += '<p style="font-size:12px;color:#94a3b8;margin:2px 0 0;">' +
    (currentLang === 'fr'
      ? 'Responsable · Approbateur · Consulté · Informé'
      : 'Responsible · Accountable · Consulted · Informed') + '</p>';
  html += '</div>';
  html += '<label class="toggle-switch">';
  html += '<input type="checkbox" ' + (state.raciEnabled ? 'checked' : '') + ' onchange="toggleRaci(this.checked)">';
  html += '<span class="toggle-slider"></span>';
  html += '</label>';
  html += '</div>';
  container.innerHTML = html;
}

async function toggleRaci(enabled) {
  state.raciEnabled = enabled;
  await saveSetting('raci_enabled', enabled ? 'true' : 'false');
  renderRaciToggle();
  showToast(t(enabled ? 'raciEnabled' : 'raciDisabled'), 'success');
}

function renderNotifyConcernedToggle() {
  var container = document.getElementById('notify-concerned-toggle');
  if (!container) return;
  var L = currentLang === 'fr';
  var html = '<div style="display:flex;align-items:center;justify-content:space-between;padding:4px 0;">';
  html += '<div><span style="font-size:13px;font-weight:600;">' + (L ? 'Notifier les utilisateurs concernés' : 'Notify concerned users') + '</span>';
  html += '<p style="font-size:12px;color:#94a3b8;margin:2px 0 0;">' + (L ? 'À la création et à la modification d\'une tâche (R/A/C/I), une notification est créée pour chaque personne concernée.' : 'On task creation and update, a notification is created for each concerned person (R/A/C/I).') + '</p></div>';
  html += '<label class="toggle-switch"><input type="checkbox" ' + (state.notifyConcernedEnabled ? 'checked' : '') + ' onchange="toggleNotifyConcerned(this.checked)"><span class="toggle-slider"></span></label>';
  html += '</div>';
  container.innerHTML = html;
}
async function toggleNotifyConcerned(enabled) {
  state.notifyConcernedEnabled = enabled;
  await saveSetting('notify_concerned', enabled ? 'true' : 'false');
  renderNotifyConcernedToggle();
  showToast(currentLang === 'fr' ? (enabled ? 'Notifications activées' : 'Notifications désactivées') : (enabled ? 'Notifications enabled' : 'Notifications disabled'), 'success');
}

// --- Automations Settings UI ---

var TRIGGER_LABELS = {
  status_change: 'triggerStatusChange',
  priority_change: 'triggerPriorityChange',
  assignment_change: 'triggerAssignmentChange',
  overdue: 'triggerOverdue',
  approaching_deadline: 'triggerApproachingDeadline'
};

var ACTION_LABELS = {
  notify_assignee: 'actionNotifyAssignee',
  notify_project_lead: 'actionNotifyProjectLead',
  notify_specific: 'actionNotifySpecific',
  notify_all: 'actionNotifyAll'
};

function renderAutomationsSection() {
  var container = document.getElementById('automation-rules-list');
  if (!container) return;
  if (!state.isOwner) {
    container.innerHTML = '<div style="text-align:center;color:#94a3b8;padding:12px;font-size:13px;">' +
      (currentLang === 'fr' ? 'Seuls les owners peuvent gérer les automatisations' : 'Only owners can manage automations') + '</div>';
    return;
  }

  if (!state.automationRules || state.automationRules.length === 0) {
    container.innerHTML = '<div style="text-align:center;color:#94a3b8;padding:20px;font-size:13px;">' +
      '<p>' + t('noRules') + '</p>' +
      '<button class="btn btn-secondary btn-sm" onclick="addDefaultAutomationRules()" style="margin-top:8px;">' + t('defaultRules') + '</button></div>';
    return;
  }

  var html = '';
  for (var i = 0; i < state.automationRules.length; i++) {
    var rule = state.automationRules[i];
    var trigLabel = t(TRIGGER_LABELS[rule.trigger] || rule.trigger);
    var actLabel = t(ACTION_LABELS[rule.action] || rule.action);
    var condText = '';
    if (rule.condition) {
      if (rule.condition.from) condText += t('conditionFrom') + ': ' + rule.condition.from + ' ';
      if (rule.condition.to) condText += t('conditionTo') + ': ' + rule.condition.to;
    }

    html += '<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:white;border-radius:8px;margin-bottom:6px;border:1px solid #e2e8f0;">';
    html += '<div style="flex:1;">';
    html += '<div style="font-size:13px;font-weight:600;">⚡ ' + trigLabel;
    if (condText) html += ' <span style="font-size:11px;color:#64748b;font-weight:400;">(' + condText.trim() + ')</span>';
    html += '</div>';
    html += '<div style="font-size:11px;color:#64748b;">→ ' + actLabel;
    if (rule.action_target) html += ' (' + sanitize(rule.action_target) + ')';
    html += '</div>';
    html += '</div>';
    html += '<label class="toggle-switch">';
    html += '<input type="checkbox" ' + (rule.enabled ? 'checked' : '') + ' onchange="toggleAutomationRule(' + i + ', this.checked)">';
    html += '<span class="toggle-slider"></span></label>';
    html += '<button class="btn-icon" onclick="openEditAutomationRuleModal(' + i + ')">✏️</button>';
    html += '<button class="btn-icon" onclick="deleteAutomationRule(' + i + ')">🗑️</button>';
    html += '</div>';
  }
  container.innerHTML = html;
}

var _editingRuleIndex = null;

function openAddAutomationRuleModal() {
  _editingRuleIndex = null;
  document.getElementById('automation-modal-title').textContent = '⚡ ' + t('addRule');
  document.getElementById('auto-trigger').value = 'status_change';
  document.getElementById('auto-action').value = 'notify_assignee';
  document.getElementById('auto-target').value = '';
  document.getElementById('auto-msg-fr').value = '';
  document.getElementById('auto-msg-en').value = '';
  onAutoTriggerChange();
  onAutoActionChange();
  document.getElementById('automation-modal').style.display = 'flex';
}

function openEditAutomationRuleModal(index) {
  _editingRuleIndex = index;
  var rule = state.automationRules[index];
  document.getElementById('automation-modal-title').textContent = '⚡ ' + t('addRule');
  document.getElementById('auto-trigger').value = rule.trigger;
  document.getElementById('auto-action').value = rule.action;
  document.getElementById('auto-target').value = rule.action_target || '';
  document.getElementById('auto-msg-fr').value = rule.message_fr || '';
  document.getElementById('auto-msg-en').value = rule.message_en || '';
  onAutoTriggerChange();
  onAutoActionChange();
  if (rule.condition) {
    if (rule.condition.from) document.getElementById('auto-from').value = rule.condition.from;
    if (rule.condition.to) document.getElementById('auto-to').value = rule.condition.to;
  }
  document.getElementById('automation-modal').style.display = 'flex';
}

function closeAutomationModal() {
  document.getElementById('automation-modal').style.display = 'none';
}

function onAutoTriggerChange() {
  var trigger = document.getElementById('auto-trigger').value;
  var condDiv = document.getElementById('auto-conditions');
  if (trigger === 'overdue' || trigger === 'approaching_deadline' || trigger === 'assignment_change') {
    condDiv.style.display = 'none';
  } else {
    condDiv.style.display = 'flex';
    var fromSel = document.getElementById('auto-from');
    var toSel = document.getElementById('auto-to');
    var anyLabel = t('conditionAny');
    var options = [];
    if (trigger === 'status_change') {
      var statuses = getKanbanStatuses();
      options = statuses.map(function(s) { return { value: s.key, label: currentLang === 'fr' ? s.label_fr : s.label_en }; });
    } else if (trigger === 'priority_change') {
      options = [
        { value: 'high', label: currentLang === 'fr' ? 'Haute' : 'High' },
        { value: 'medium', label: currentLang === 'fr' ? 'Moyenne' : 'Medium' },
        { value: 'low', label: currentLang === 'fr' ? 'Basse' : 'Low' }
      ];
    }
    var optHtml = '<option value="">' + anyLabel + '</option>';
    for (var o = 0; o < options.length; o++) {
      optHtml += '<option value="' + options[o].value + '">' + options[o].label + '</option>';
    }
    fromSel.innerHTML = optHtml;
    toSel.innerHTML = optHtml;
  }
}

function onAutoActionChange() {
  var action = document.getElementById('auto-action').value;
  document.getElementById('auto-target-wrap').style.display = action === 'notify_specific' ? 'block' : 'none';
}

async function saveAutomationRuleFromModal() {
  var rule = {
    id: (_editingRuleIndex !== null && state.automationRules[_editingRuleIndex]) ? state.automationRules[_editingRuleIndex].id : 'rule_' + Date.now(),
    enabled: (_editingRuleIndex !== null && state.automationRules[_editingRuleIndex]) ? state.automationRules[_editingRuleIndex].enabled : true,
    trigger: document.getElementById('auto-trigger').value,
    condition: {},
    action: document.getElementById('auto-action').value,
    action_target: document.getElementById('auto-target').value.trim(),
    message_fr: document.getElementById('auto-msg-fr').value.trim(),
    message_en: document.getElementById('auto-msg-en').value.trim()
  };
  var fromVal = document.getElementById('auto-from').value;
  var toVal = document.getElementById('auto-to').value;
  if (fromVal) rule.condition.from = fromVal;
  if (toVal) rule.condition.to = toVal;

  if (!rule.message_fr && !rule.message_en) {
    rule.message_fr = 'La tâche "{title}" a changé';
    rule.message_en = 'Task "{title}" changed';
  }

  if (_editingRuleIndex !== null) {
    state.automationRules[_editingRuleIndex] = rule;
  } else {
    state.automationRules.push(rule);
  }
  await saveSetting('automation_rules', JSON.stringify(state.automationRules));
  closeAutomationModal();
  renderAutomationsSection();
  showToast(t(_editingRuleIndex !== null ? 'ruleSaved' : 'ruleCreated'), 'success');
}

async function deleteAutomationRule(index) {
  var confirmed = await showConfirmModal(
    currentLang === 'fr' ? 'Supprimer cette règle d’automatisation ?' : 'Delete this automation rule?',
    currentLang === 'fr' ? 'Supprimer la règle' : 'Delete rule'
  );
  if (!confirmed) return;
  state.automationRules.splice(index, 1);
  await saveSetting('automation_rules', JSON.stringify(state.automationRules));
  renderAutomationsSection();
  showToast(t('ruleDeleted'), 'info');
}

async function toggleAutomationRule(index, enabled) {
  state.automationRules[index].enabled = enabled;
  await saveSetting('automation_rules', JSON.stringify(state.automationRules));
  renderAutomationsSection();
}

async function addDefaultAutomationRules() {
  state.automationRules = [
    {
      id: 'rule_default_1', enabled: true, trigger: 'status_change',
      condition: { to: 'done' }, action: 'notify_assignee',
      message_fr: 'La tâche "{title}" est terminée', message_en: 'Task "{title}" is completed'
    },
    {
      id: 'rule_default_2', enabled: true, trigger: 'priority_change',
      condition: { to: 'high' }, action: 'notify_project_lead',
      message_fr: 'La tâche "{title}" est passée en priorité haute', message_en: 'Task "{title}" priority changed to high'
    },
    {
      id: 'rule_default_3', enabled: true, trigger: 'overdue',
      condition: {}, action: 'notify_assignee',
      message_fr: 'La tâche "{title}" est en retard !', message_en: 'Task "{title}" is overdue!'
    }
  ];
  await saveSetting('automation_rules', JSON.stringify(state.automationRules));
  renderAutomationsSection();
  showToast(t('ruleCreated'), 'success');
}

export async function renderSecuritySection() {
  var container = document.getElementById('security-status');
  if (!container) return;
  if (!state.isOwner) {
    container.innerHTML = '<div style="text-align:center;color:#94a3b8;padding:12px;font-size:13px;">' +
      (currentLang === 'fr' ? 'Seuls les owners peuvent gérer la sécurité' : 'Only owners can manage security') + '</div>';
    return;
  }

  container.innerHTML = '<div style="text-align:center;padding:12px;color:#94a3b8;">' +
    (currentLang === 'fr' ? 'Vérification...' : 'Checking...') + '</div>';

  var results = await checkSecurityStatus();
  if (!results) {
    container.innerHTML = '<div class="security-error">' +
      (currentLang === 'fr' ? 'Impossible de lire les règles d\'accès' : 'Cannot read access rules') + '</div>';
    return;
  }

  if (results.length === 0) {
    container.innerHTML = '<div style="text-align:center;color:#94a3b8;padding:12px;font-size:13px;">' +
      (currentLang === 'fr' ? 'Aucune table du widget détectée' : 'No widget tables detected') + '</div>';
    return;
  }

  var securedCount = results.filter(function(r) { return r.secured; }).length;
  var totalCount = results.length;
  var allSecured = securedCount === totalCount;

  var html = '<div class="security-summary ' + (allSecured ? 'security-ok' : 'security-warn') + '">';
  html += '<span class="security-icon">' + (allSecured ? '🔒' : '🔓') + '</span>';
  html += '<span>' + (allSecured
    ? (currentLang === 'fr' ? 'Document sécurisé' : 'Document secured')
    : (currentLang === 'fr' ? securedCount + '/' + totalCount + ' tables protégées' : securedCount + '/' + totalCount + ' tables protected')
  ) + '</span>';
  html += '</div>';

  html += '<div class="security-table-list">';
  for (var i = 0; i < results.length; i++) {
    var r = results[i];
    var readOnly = r.editorPerms.indexOf('-CUD') !== -1 || (r.editorPerms.indexOf('-C') !== -1 && r.editorPerms.indexOf('-D') !== -1);
    var permLabel = readOnly
      ? (currentLang === 'fr' ? 'Lecture seule' : 'Read only')
      : (currentLang === 'fr' ? 'Créer / Modifier' : 'Create / Edit');

    html += '<div class="security-table-row">';
    html += '<span class="security-table-icon">' + (r.secured ? '✅' : '⚠️') + '</span>';
    html += '<span class="security-table-name">' + sanitize(r.tableId) + '</span>';
    html += '<span class="security-table-perm ' + (readOnly ? 'perm-readonly' : 'perm-readwrite') + '">' + permLabel + '</span>';
    html += '<span class="security-table-status ' + (r.secured ? 'status-ok' : 'status-warn') + '">' +
      (r.secured ? (currentLang === 'fr' ? 'Protégée' : 'Protected') : (currentLang === 'fr' ? 'Non protégée' : 'Unprotected')) + '</span>';
    html += '</div>';
  }
  html += '</div>';

  html += '<div class="security-actions">';
  if (!allSecured) {
    html += '<button class="btn btn-primary btn-sm" onclick="applySecurityRules()">' +
      (currentLang === 'fr' ? '🔒 Sécuriser le document' : '🔒 Secure document') + '</button>';
  }
  if (securedCount > 0) {
    html += '<button class="btn btn-secondary btn-sm" onclick="removeSecurityRules()" style="color:#ef4444;">' +
      (currentLang === 'fr' ? 'Retirer la sécurité' : 'Remove security') + '</button>';
  }
  html += '</div>';

  container.innerHTML = html;
}

var _settingsProjectSearch = '';

var SETTINGS_PROJ_LIMIT = 5;

function renderSettingsProjectsList(searchOverride) {
  var container = document.getElementById('projects-list');
  if (!container) return;
  if (searchOverride !== undefined) _settingsProjectSearch = searchOverride;
  var q = (_settingsProjectSearch || '').trim().toLowerCase();
  var filtered = q
    ? state.projects.filter(function(p) { return (p.Name || '').toLowerCase().indexOf(q) !== -1; })
    : state.projects;
  var displayed = q ? filtered : filtered.slice(0, SETTINGS_PROJ_LIMIT);
  var extraCount = q ? 0 : Math.max(0, filtered.length - SETTINGS_PROJ_LIMIT);

  var html = '<div style="margin-bottom:10px;">';
  html += '<input type="text" id="settings-proj-search" class="settings-search-input"';
  html += ' placeholder="' + (currentLang === 'fr' ? 'Rechercher un projet...' : 'Search a project...') + '"';
  html += ' value="' + sanitize(_settingsProjectSearch) + '" oninput="renderSettingsProjectsList(this.value)"';
  html += ' autocomplete="off">';
  html += '</div>';

  if (displayed.length === 0) {
    html += '<div style="text-align:center;color:#94a3b8;padding:20px;">' + t('noProject') + '</div>';
  } else {
    html += '<div class="settings-items">';
    var allTasks = state.tasks;
    displayed.forEach(function(proj) {
      var taskCount = allTasks.filter(function(tk) { return tk.Project_Id === proj.id; }).length;
      var dotColor = proj.Color || '#6366f1';
      html += '<div class="settings-item">';
      html += '<span class="settings-item-dot" style="background:' + dotColor + ';"></span>';
      html += '<div class="settings-item-info">';
      html += '<strong>' + sanitize(proj.Name) + '</strong>';
      html += '<span class="settings-item-meta">' + taskCount + ' ' + (currentLang === 'fr' ? 'tâches' : 'tasks') + '</span>';
      html += '</div>';
      html += '<div class="settings-item-actions">';
      html += '<button class="btn-icon" onclick="openProjectModalForEdit(' + proj.id + ')" title="' + t('editProject') + '">✏️</button>';
      if (state.isOwner) html += '<button class="btn-icon" onclick="deleteProject(' + proj.id + ')" title="' + t('deleteProject') + '">🗑️</button>';
      html += '</div>';
      html += '</div>';
    });
    if (extraCount > 0) {
      html += '<div class="settings-more-hint">+ ' + extraCount + ' ' + (currentLang === 'fr' ? 'autres — tapez pour chercher' : 'more — type to search') + '</div>';
    }
    html += '</div>';
  }
  container.innerHTML = html;
  // Restore cursor position in search input
  var inp = document.getElementById('settings-proj-search');
  if (inp && searchOverride !== undefined) { var l = inp.value.length; inp.setSelectionRange(l, l); inp.focus(); }
}

function openProjectModalForEdit(projectId) {
  var proj = state.projects.find(function(p) { return p.id === projectId; });
  if (!proj) return;

  var statusOptions = ['active', 'archived', 'completed'];
  var statusLabels = { active: currentLang === 'fr' ? 'Actif' : 'Active', archived: currentLang === 'fr' ? 'Archivé' : 'Archived', completed: currentLang === 'fr' ? 'Terminé' : 'Completed' };

  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal" style="max-width:420px;" onclick="event.stopPropagation()">';
  html += '<div class="modal-header"><h3>✏️ ' + (currentLang === 'fr' ? 'Modifier le projet' : 'Edit project') + '</h3>';
  html += '<button class="modal-close" onclick="closeModalForce()">✕</button></div>';
  html += '<div class="modal-body">';
  html += '<div class="form-group"><label>' + (currentLang === 'fr' ? 'Nom' : 'Name') + '</label>';
  html += '<input type="text" id="inline-proj-name" class="form-input" value="' + sanitize(proj.Name || '') + '"></div>';
  html += '<div class="form-group"><label>' + (currentLang === 'fr' ? 'Description' : 'Description') + '</label>';
  html += '<textarea id="inline-proj-desc" class="form-input" rows="2">' + sanitize(proj.Description || '') + '</textarea></div>';
  html += '<div style="display:flex;gap:12px;">';
  html += '<div class="form-group" style="flex:1"><label>' + (currentLang === 'fr' ? 'Couleur' : 'Color') + '</label>';
  html += '<input type="color" id="inline-proj-color" value="' + (proj.Color || '#6366f1') + '" style="width:48px;height:36px;border:none;cursor:pointer;"></div>';
  html += '<div class="form-group" style="flex:2"><label>' + (currentLang === 'fr' ? 'Statut' : 'Status') + '</label>';
  html += '<select id="inline-proj-status" class="form-input">';
  statusOptions.forEach(function(s) {
    html += '<option value="' + s + '"' + (proj.Status === s ? ' selected' : '') + '>' + (statusLabels[s] || s) + '</option>';
  });
  html += '</select></div></div>';
  html += '</div>';
  html += '<div class="modal-footer">';
  html += '<button class="btn btn-secondary" onclick="closeModalForce()">' + (currentLang === 'fr' ? 'Annuler' : 'Cancel') + '</button>';
  html += '<button class="btn btn-primary" onclick="saveInlineProjectEdit(' + projectId + ')">' + (currentLang === 'fr' ? '💾 Enregistrer' : '💾 Save') + '</button>';
  html += '</div></div></div>';
  document.getElementById('modal-container').innerHTML = html;
  document.getElementById('inline-proj-name').focus();
}

async function saveInlineProjectEdit(projectId) {
  var name = (document.getElementById('inline-proj-name').value || '').trim();
  if (!name) { showToast(currentLang === 'fr' ? 'Le nom est requis' : 'Name is required', 'error'); return; }
  var record = {};
  setField(record, 'projects', 'name', name);
  setField(record, 'projects', 'description', document.getElementById('inline-proj-desc').value || '');
  setField(record, 'projects', 'color', document.getElementById('inline-proj-color').value || '#6366f1');
  setField(record, 'projects', 'status', document.getElementById('inline-proj-status').value || 'active');
  try {
    await grist.docApi.applyUserActions([['UpdateRecord', state.PROJECTS_TABLE, projectId, record]]);
    showToast((currentLang === 'fr' ? 'Projet modifié' : 'Project updated') + ' ✓', 'success');
    closeModalForce();
    await loadAllData();
    renderSettingsProjectsList();
    renderProjectSelector();
    refreshAllViews();
  } catch (e) {
    showToast('Error: ' + e.message, 'error');
  }
}

function renderSettingsCategoriesList() {
  var container = document.getElementById('categories-list');
  if (!container) return;
  
  var html = '';
  if (state.categories.length === 0) {
    html = '<div style="text-align:center;color:#94a3b8;padding:20px;">' + (currentLang === 'fr' ? 'Aucune catégorie' : 'No categories') + '</div>';
  } else {
    html = '<div class="settings-chips">';
    state.categories.forEach(function(cat) {
      html += '<span class="settings-chip" style="background:' + (cat.Color || '#6366f1') + ';color:white;">' + sanitize(cat.Name) + '</span>';
    });
    html += '</div>';
  }
  container.innerHTML = html;
}

function renderSettingsTagsList() {
  var container = document.getElementById('tags-list');
  if (!container) return;
  
  var html = '';
  if (state.tags.length === 0) {
    html = '<div style="text-align:center;color:#94a3b8;padding:20px;">' + (currentLang === 'fr' ? 'Aucun tag' : 'No tags') + '</div>';
  } else {
    html = '<div class="settings-chips">';
    state.tags.forEach(function(tag) {
      html += '<span class="settings-chip" style="background:' + (tag.Color || '#6366f1') + ';color:white;">' + sanitize(tag.Name) + '</span>';
    });
    html += '</div>';
  }
  container.innerHTML = html;
}

function openTagsModal() {
  document.getElementById('tags-modal').style.display = 'flex';
  document.getElementById('edit-tag-id').value = '';
  document.getElementById('tag-name').value = '';
  document.getElementById('tag-color').value = '#6366f1';
  document.getElementById('tag-form-title').textContent = t('addTag');
  renderTagsModalList();
}

function closeTagsModal() {
  document.getElementById('tags-modal').style.display = 'none';
}

function renderTagsModalList() {
  var html = '';
  if (state.tags.length === 0) {
    html = '<div style="text-align:center;color:#94a3b8;padding:20px;">' + (currentLang === 'fr' ? 'Aucun tag' : 'No tags') + '</div>';
  } else {
    html = '<div class="project-items">';
    state.tags.forEach(function(tag) {
      html += '<div class="project-item" style="border-left: 4px solid ' + (tag.Color || '#6366f1') + ';">';
      html += '<div class="project-item-info">';
      html += '<strong>' + sanitize(tag.Name) + '</strong>';
      html += '</div>';
      html += '<div class="project-item-actions">';
      html += '<button class="btn-icon" onclick="editTag(' + tag.id + ')" title="' + t('edit') + '">✏️</button>';
      html += '<button class="btn-icon" onclick="deleteTag(' + tag.id + ')" title="' + t('delete') + '">🗑️</button>';
      html += '</div>';
      html += '</div>';
    });
    html += '</div>';
  }
  document.getElementById('tags-modal-list').innerHTML = html;
}

function editTag(tagId) {
  var tag = state.tags.find(function(t) { return t.id === tagId; });
  if (!tag) return;
  
  document.getElementById('edit-tag-id').value = tag.id;
  document.getElementById('tag-name').value = tag.Name || '';
  document.getElementById('tag-color').value = tag.Color || '#6366f1';
  document.getElementById('tag-form-title').textContent = currentLang === 'fr' ? 'Modifier le tag' : 'Edit tag';
}

async function saveTag() {
  var tagId = document.getElementById('edit-tag-id').value;
  var name = document.getElementById('tag-name').value.trim();
  var color = document.getElementById('tag-color').value;

  if (!name) {
    showToast((currentLang === 'fr' ? 'Nom du tag requis' : 'Tag name required'), 'error');
    return;
  }

  try {
    var record = {};
    setField(record, 'tags', 'name', name);
    setField(record, 'tags', 'color', color);
    
    if (tagId) {
      await grist.docApi.applyUserActions([
        ['UpdateRecord', state.TAGS_TABLE, parseInt(tagId), record]
      ]);
      showToast((currentLang === 'fr' ? 'Tag modifié' : 'Tag updated') + ' ✓', 'success');
    } else {
      await grist.docApi.applyUserActions([
        ['AddRecord', state.TAGS_TABLE, null, record]
      ]);
      showToast((currentLang === 'fr' ? 'Tag ajouté' : 'Tag added') + ' ✓', 'success');
    }
    closeTagsModal();
    await loadAllData();
    refreshAllViews();
    renderSettingsTagsList();
    document.getElementById('edit-tag-id').value = '';
    document.getElementById('tag-name').value = '';
    document.getElementById('tag-color').value = '#6366f1';
    document.getElementById('tag-form-title').textContent = t('addTag');
  } catch (e) {
    console.error('Error saving tag:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

async function deleteTag(tagId) {
  var confirmed = await showConfirmModal(currentLang === 'fr' ? 'Supprimer ce tag ?' : 'Delete this tag?', currentLang === 'fr' ? 'Supprimer le tag' : 'Delete tag');
  if (!confirmed) return;
  
  try {
    await grist.docApi.applyUserActions([
      ['RemoveRecord', state.TAGS_TABLE, tagId]
    ]);
    showToast((currentLang === 'fr' ? 'Tag supprimé' : 'Tag deleted') + ' ✓', 'success');
    await loadAllData();
    refreshAllViews();
    renderTagsModalList();
    renderSettingsTagsList();
  } catch (e) {
    console.error('Error deleting tag:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

// =============================================================================
// INIT
// =============================================================================

if (!isInsideGrist()) {
  var setupScreen = document.getElementById('client-setup');
  if (setupScreen) setupScreen.classList.add('hidden');
  document.getElementById('not-in-grist').classList.remove('hidden');
  document.getElementById('main-content').classList.add('hidden');
} else {
  (async function() {
    await grist.ready({ requiredAccess: 'full' });

    var setupTables = await grist.docApi.listTables();
    if (hasFrenchClientTables(setupTables)) applyFrenchTableNames(true);
    if (await shouldShowClientSetup(setupTables)) {
      showClientSetup();
      return;
    }
    hideClientSetup();

    // --- Role detection (Owner / Editor / Viewer) ---
    var bootTables = await grist.docApi.listTables();
    if (hasFrenchClientTables(bootTables)) applyFrenchTableNames(true);
    var helperWriteSucceeded = false;

    // Step 1: Ensure helper table with trigger formula user.Email
    try {
      var tables = await grist.docApi.listTables();
      if (tables.indexOf(state.USER_INFO_TABLE) === -1) {
        await grist.docApi.applyUserActions([
          ['AddTable', state.USER_INFO_TABLE, [
            { id: 'UserEmail', fields: { type: 'Text', label: 'UserEmail' } }
          ]]
        ]);
        await grist.docApi.applyUserActions([
          ['ModifyColumn', state.USER_INFO_TABLE, 'UserEmail', {
            isFormula: false,
            formula: 'user.Email',
            recalcWhen: 2,
            recalcDeps: null
          }]
        ]);
      }
    } catch (e) {
      console.warn('Could not create helper table:', e.message);
    }

    // Step 2: Read current user email via REST API (respects "View As")
    try {
      try {
        var existingData = await grist.docApi.fetchTable(state.USER_INFO_TABLE);
        var rowIds = (existingData && existingData.id) ? existingData.id : [];
        var actions = [];
        for (var r = 0; r < rowIds.length; r++) {
          actions.push(['RemoveRecord', state.USER_INFO_TABLE, rowIds[r]]);
        }
        actions.push(['AddRecord', state.USER_INFO_TABLE, null, {}]);
        await grist.docApi.applyUserActions(actions);
        helperWriteSucceeded = true;
      } catch (writeErr) {
        console.log('Could not refresh row (read-only?):', writeErr.message);
      }

      var tokenInfo = await grist.docApi.getAccessToken({ readOnly: true });
      var tableResp = await fetch(tokenInfo.baseUrl + '/tables/' + state.USER_INFO_TABLE + '/records?auth=' + tokenInfo.token);
      if (tableResp.ok) {
        var tableData = await tableResp.json();
        if (tableData.records && tableData.records.length > 0) {
          state.currentUserEmail = tableData.records[0].fields.UserEmail || '';
        }
      } else {
        var userInfoData = await grist.docApi.fetchTable(state.USER_INFO_TABLE);
        if (userInfoData && userInfoData.UserEmail && userInfoData.UserEmail.length > 0) {
          state.currentUserEmail = userInfoData.UserEmail[0] || '';
        }
      }
    } catch (e) {
      console.warn('Could not read helper table:', e.message);
    }

    // Step 3: Determine role — structure modify test
    var roleDetected = false;
    try {
      await grist.docApi.applyUserActions([
        ['ModifyColumn', state.USER_INFO_TABLE, 'UserEmail', {
          isFormula: false,
          formula: 'user.Email',
          recalcWhen: 2,
          recalcDeps: null
        }]
      ]);
      state.isOwner = true; state.isEditor = false; roleDetected = true;
    } catch (structErr) {
      if (helperWriteSucceeded) {
        state.isOwner = false; state.isEditor = true; roleDetected = true;
      } else {
        state.isOwner = false; state.isEditor = false; roleDetected = true;
      }
    }

    if (!roleDetected) {
      if (helperWriteSucceeded) {
        state.isOwner = false; state.isEditor = true;
      } else {
        state.isOwner = false; state.isEditor = false;
      }
    }
    console.log('Role detection — isOwner:', state.isOwner, 'isEditor:', state.isEditor, 'email:', state.currentUserEmail);

    if (state.isOwner) await registerWidget();
    await loadWidgetPermissions();
    applyOwnerRestrictions();
    await ensureTables();
    var postSetupTables = await grist.docApi.listTables();
    if (await shouldShowClientSetup(postSetupTables)) {
      showClientSetup();
      return;
    }
    hideClientSetup();
    await loadSettings();
    await loadAllData();
    applyRoleVisibilityDefaults();
    renderProjectSelector();
    refreshAllViews();
    updateNotificationBadge();
    await checkTimeBasedAutomations();
    await cleanupOldNotifications();
    updateNotificationBadge();
    restoreFilters(); // conserver les filtres en changeant de page / au rechargement
    try { var _sp = localStorage.getItem('pm-current-project'); if (_sp) state.currentProjectId = parseInt(_sp) || null; } catch (e) {}
    applyRoleVisibilityDefaults();
    renderProjectSelector();
    refreshAllViews();
    restoreActiveTab();
    // Synchronise les choix de la colonne Status des sous-tâches avec les statuts personnalisés
    if (state.isOwner) syncSubtaskStatusChoices();

    // A6 : synchro live — recharge si la table liée change (édition directe dans Grist,
    // autre utilisateur). Debounce + on ne perturbe pas une saisie (modale ouverte).
    if (typeof grist.onRecords === 'function') {
      var _liveReloadTimer = null;
      grist.onRecords(function() {
        if (_liveReloadTimer) clearTimeout(_liveReloadTimer);
        _liveReloadTimer = setTimeout(function() {
          var modal = document.getElementById('modal-container');
          if (modal && modal.innerHTML.trim() !== '') return;
          loadAllData();
        }, 500);
      });
    }
  })();
}
