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
import {
  renderTeamView, renderUsersList, renderGroupsList, getRoleChoicesFromGrist, openManageRolesModal,
  renderManageRolesModal, addRoleChoice, removeRoleChoice, saveRoleChoices, openEditUserModal,
  openEditGroupModal, updateUser, updateGroup, openNewUserModal, openNewGroupModal, createUser,
  createGroup, deleteUser, deleteGroup
} from './domains/team.js';
import {
  saveCardDisplaySettings, saveSetting, uiLabel, saveUiLabels, renderSettingsView,
  renderUiLabelSettings, saveUiLabelSettings, applyUiLabelsToSettingsHeadings,
  renderCardDisplaySettings, toggleCardDisplay, renderRaciToggle, toggleRaci,
  renderNotifyConcernedToggle, toggleNotifyConcerned, renderAutomationsSection,
  openAddAutomationRuleModal, openEditAutomationRuleModal, closeAutomationModal,
  onAutoTriggerChange, onAutoActionChange, saveAutomationRuleFromModal, deleteAutomationRule,
  toggleAutomationRule, addDefaultAutomationRules, renderSecuritySection, renderSettingsProjectsList,
  openProjectModalForEdit, saveInlineProjectEdit, renderSettingsCategoriesList, renderSettingsTagsList,
  openTagsModal, closeTagsModal, renderTagsModalList, editTag, saveTag, deleteTag
} from './domains/settings.js';
import {
  getKanbanStatuses, saveKanbanStatuses, syncSubtaskStatusChoices, getStatusLabel,
  renderKanbanView, defaultKanbanStatuses, setKanbanGroupBy, toggleKanbanCol, toggleCardExpand,
  openCardSubtasksModal, openCardCommentsModal, openCardAttachmentsModal, archiveTask, restoreTask,
  onDragStart, onDragOver, onDragLeave, onDrop, toggleKanbanFullscreen
} from './domains/kanban.js';
import {
  openNewTaskModal, openEditTaskModal, saveTaskFromFooter, addRaciChip, removeRaciChip,
  quickAction, addSubtask, toggleSubtask, deleteSubtask, saveEditSubtask, generateSubtaskOccurrences,
  addDependency, removeDependency, addComment, deleteComment, closeModal, closeModalForce,
  createTask, updateTask, deleteTask
} from './domains/task-modal.js';

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
  closeConfirmModal, closeDependencyTaskOptions, closeModal, closeModalForce, closeNotifications, closeProjectModal, closePromptModal,
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
export var kanbanSort = 'manual'; // 'manual' | 'alpha' | 'alpha-desc' | 'due'

export var defaultCardDisplay = { description: true, priority: true, date: true, assignee: true, tags: true, category: true, time: true, subtasks: true, comments: true };
export var cardDisplaySettings = Object.assign({}, defaultCardDisplay);

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


function setKanbanSort(value) {
  kanbanSort = value;
  saveSetting('kanban_sort', value);
  renderKanbanView();
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


export function renderCategoriesList() {
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


// =============================================================================
// MODALS
// =============================================================================


// =============================================================================
// KANBAN STATUS SETTINGS (stays here until domains/kanban.js exists - these
// functions reassign customKanbanStatuses, which loadSettings() also
// reassigns; the settings-tab UI for everything else moved to
// domains/settings.js)
// =============================================================================

var _statusDragIndex = null;
export function renderKanbanStatusesList() {
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
