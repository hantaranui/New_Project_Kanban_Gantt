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
import {
  applyFrenchTableNames, hasFrenchClientTables, isInsideGrist, shouldShowClientSetup,
  showClientSetup, hideClientSetup, ensureTables, runSetupDiagnostic,
  setupCreateFrenchTables, setupUseExistingTables
} from './bootstrap/ensure-tables.js';

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
export var customKanbanStatuses = null;

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




// Default table names — used to detect remapping: if a table var differs from
// its default it means the user mapped it to an existing table, so we must NOT
// auto-create the default PM_* table.

// Configuration mapping object

// =============================================================================
// UTILS
// =============================================================================


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
