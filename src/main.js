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
import {
  renderGanttView, toggleGanttSubtask, focusGanttTask, setGanttYear, ganttNav, ganttToday,
  ganttExpandAll, ganttCollapseAll, setGanttMode, setGanttCustomRange, setGanttSort,
  exportGanttPdf, toggleGanttFullscreen
} from './domains/gantt.js';

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
