import { t, currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { state } from '../store.js';
import { showToast } from '../ui/toast.js';
import { showConfirmModal } from '../ui/confirm-modal.js';
import { myAssigneeValue, myProjectIdSet } from './filters.js';
import { renderSecuritySection } from './settings.js';
import { switchTab } from '../ui/tabs.js';

// ChoiceList-safe role helpers
// Grist ChoiceList is serialized as:
//   - array: ["L", "role1", "role2"]  (first element is always "L" marker)
//   - string: "L,role1,role2"          (same but joined)
//   - plain string: "role1"            (Choice column, single value)
export function getUserRoles(u) {
  if (!u || !u.Role) return [];
  var raw = u.Role;
  if (Array.isArray(raw)) {
    // Drop the Grist "L" marker if present
    var arr = (raw.length > 0 && raw[0] === 'L') ? raw.slice(1) : raw;
    return arr.filter(function(r) { return r && r !== 'L'; });
  }
  var s = String(raw).trim();
  if (!s) return [];
  // String serialized ChoiceList: starts with "L,"
  if (s.length > 1 && s[0] === 'L' && s[1] === ',') {
    return s.slice(2).split(',').map(function(r) { return r.trim(); }).filter(Boolean);
  }
  // Single choice value
  return [s];
}
export function userMatchesRole(u, role) {
  return getUserRoles(u).indexOf(role) !== -1;
}
export function userRoleDisplay(u) {
  var roles = getUserRoles(u);
  return roles.length ? roles.join(', ') : '';
}

export function getCurrentUserRecord() {
  var em = (state.currentUserEmail || '').toLowerCase().trim();
  if (!em) return null;
  return state.users.find(function(u) {
    return (u.Email || '').toLowerCase().trim() === em;
  }) || null;
}

export function getCurrentBusinessRoles() {
  var u = getCurrentUserRecord();
  return u ? getUserRoles(u) : [];
}

export function hasCurrentBusinessRole(role) {
  return getCurrentBusinessRoles().indexOf(role) !== -1;
}

export function canSeeAllProjects() {
  var roles = getCurrentBusinessRoles();
  if (roles.length > 0) return roles.indexOf('admin') !== -1;
  return state.isOwner;
}

export function shouldLimitToMyProjects() {
  if (canSeeAllProjects()) return false;
  var roles = getCurrentBusinessRoles();
  return roles.indexOf('member') !== -1 || roles.indexOf('viewer') !== -1;
}

export function canEditWorkItems() {
  return (state.isOwner || state.isEditor) && !hasCurrentBusinessRole('viewer');
}

export function taskConcernsCurrentUser(task) {
  var mine = myAssigneeValue();
  var em = (state.currentUserEmail || '').toLowerCase().trim();
  if (!task) return false;
  if (mine) {
    var assignees = (task.Assignee || '').split(',').map(function(s) { return s.trim(); }).filter(Boolean);
    if (assignees.indexOf(mine) !== -1) return true;
  }
  if (em && (task.Created_By || '').toLowerCase().trim() === em) return true;
  return false;
}

export function applyRoleVisibilityDefaults() {
  if (shouldLimitToMyProjects()) {
    state.mineOnly = true;
    state.currentFilterRole = null;
    state.currentFilterAssignee = null;
    if (state.currentProjectId) {
      var myIds = myProjectIdSet();
      if (!myIds[state.currentProjectId]) state.currentProjectId = null;
    }
  }
}

export function applyBusinessRoleRestrictions() {
  var canEdit = canEditWorkItems();
  document.querySelectorAll('.btn-new-task, .btn-new-project, .kanban-add-btn, .col-add').forEach(function(el) {
    el.style.display = canEdit ? '' : 'none';
  });
}

// WIDGET PERMISSIONS (centralized via Widget_Registry + Widget_Permissions)
// =============================================================================

export let WIDGET_ID = 'grist-project-manager';
export let WIDGET_NAME = 'Gestion de Projet';
export let WIDGET_TABS = [
  { id: 'kanban',    label_fr: 'Kanban',       label_en: 'Kanban' },
  { id: 'gantt',     label_fr: 'Gantt',        label_en: 'Gantt' },
  { id: 'team',      label_fr: 'Équipe',       label_en: 'Team' },
  { id: 'settings',  label_fr: 'Paramètres',   label_en: 'Settings' }
];

export let userAllowedTabs = [];

export async function registerWidget() {
  try {
    var tables = await grist.docApi.listTables();
    if (tables.indexOf('Widget_Registry') === -1) return;

    var data = await grist.docApi.fetchTable('Widget_Registry');
    var existingRow = -1;
    if (data && data.id) {
      for (var i = 0; i < data.id.length; i++) {
        if (data.WidgetId[i] === WIDGET_ID) { existingRow = data.id[i]; break; }
      }
    }
    var tabsJson = JSON.stringify(WIDGET_TABS);
    if (existingRow !== -1) {
      await grist.docApi.applyUserActions([
        ['UpdateRecord', 'Widget_Registry', existingRow, { WidgetName: WIDGET_NAME, AvailableTabs: tabsJson }]
      ]);
    } else {
      await grist.docApi.applyUserActions([
        ['AddRecord', 'Widget_Registry', null, { WidgetId: WIDGET_ID, WidgetName: WIDGET_NAME, AvailableTabs: tabsJson }]
      ]);
    }
  } catch (e) {
    console.log('Widget registration skipped:', e.message);
  }
}

export async function loadWidgetPermissions() {
  userAllowedTabs = [];
  if (!state.currentUserEmail) return;
  try {
    var tables = await grist.docApi.listTables();
    if (tables.indexOf('Widget_Permissions') === -1) return;

    var data = await grist.docApi.fetchTable('Widget_Permissions');
    if (!data || !data.id) return;
    var email = state.currentUserEmail.toLowerCase().trim();
    for (var i = 0; i < data.id.length; i++) {
      if (data.WidgetId[i] === WIDGET_ID && (data.Email[i] || '').toLowerCase().trim() === email) {
        userAllowedTabs = (data.AllowedTabs[i] || '').split(',').map(function(x) { return x.trim().toLowerCase(); }).filter(Boolean);
        break;
      }
    }
  } catch (e) {
    console.log('Widget permissions load skipped:', e.message);
  }
}

export function isTabAllowed(tabId) {
  if (userAllowedTabs.length > 0) return userAllowedTabs.indexOf(tabId) !== -1;
  return ['kanban', 'gantt', 'team', 'settings'].indexOf(tabId) !== -1;
}

export function applyOwnerRestrictions() {
  var allTabs = ['kanban', 'gantt', 'team', 'settings'];
  allTabs.forEach(function(tab) {
    var el = document.querySelector('[data-tab="' + tab + '"]');
    if (el) el.style.display = isTabAllowed(tab) ? '' : 'none';
  });
  var activeBtn = document.querySelector('.tab-btn.active');
  if (activeBtn && !isTabAllowed(activeBtn.getAttribute('data-tab'))) {
    switchTab('kanban');
  }
}

// SECURITY — ACL RULES FOR PM_* TABLES
// =============================================================================

export function getAclRules() {
  return [
    { tableId: state.SETTINGS_TABLE,        ownerPerms: '+CRUDS', editorPerms: '+R-CUD' },
    { tableId: state.CONFIG_TABLE,          ownerPerms: '+CRUDS', editorPerms: '+R-CUD' },
    { tableId: state.TASKS_TABLE,           ownerPerms: '+CRUDS', editorPerms: '+RCU-D' },
    { tableId: state.SUBTASKS_TABLE,        ownerPerms: '+CRUDS', editorPerms: '+RCU-D' },
    { tableId: state.COMMENTS_TABLE,        ownerPerms: '+CRUDS', editorPerms: '+RCU-D' },
    { tableId: state.TIME_ENTRIES_TABLE,    ownerPerms: '+CRUDS', editorPerms: '+RCU-D' },
    { tableId: state.USERS_TABLE,           ownerPerms: '+CRUDS', editorPerms: '+R-CUD' },
    { tableId: state.GROUPS_TABLE,          ownerPerms: '+CRUDS', editorPerms: '+R-CUD' },
    { tableId: state.PROJECTS_TABLE,        ownerPerms: '+CRUDS', editorPerms: '+R-CUD' },
    { tableId: state.USER_INFO_TABLE,       ownerPerms: '+CRUDS', editorPerms: '+RCUD' },
    { tableId: state.NOTIFICATIONS_TABLE,   ownerPerms: '+CRUDS', editorPerms: '+RCUD' },
    { tableId: state.ATTACHMENTS_TABLE,     ownerPerms: '+CRUDS', editorPerms: '+RCU-D' }
  ].filter(function(rule, index, arr) {
    return rule.tableId && arr.findIndex(function(r) { return r.tableId === rule.tableId; }) === index;
  });
}

export async function checkSecurityStatus() {
  try {
    var rulesData = await grist.docApi.fetchTable('_grist_ACLRules');
    var resourcesData = await grist.docApi.fetchTable('_grist_ACLResources');

    var resourceMap = {};
    if (resourcesData.id) {
      for (var i = 0; i < resourcesData.id.length; i++) {
        resourceMap[resourcesData.id[i]] = {
          tableId: resourcesData.tableId[i],
          colIds: resourcesData.colIds[i]
        };
      }
    }

    var existingTables = await grist.docApi.listTables();

    var results = [];
    var aclRules = getAclRules();
    for (var r = 0; r < aclRules.length; r++) {
      var rule = aclRules[r];
      var tableExists = existingTables.indexOf(rule.tableId) !== -1;
      if (!tableExists) continue;

      var hasOwnerRule = false;
      var hasEditorRule = false;

      if (rulesData.id) {
        for (var j = 0; j < rulesData.id.length; j++) {
          var res = resourceMap[rulesData.resource[j]];
          if (!res || res.tableId !== rule.tableId || res.colIds !== '*') continue;
          var formula = rulesData.aclFormula ? rulesData.aclFormula[j] || '' : '';
          var perms = rulesData.permissionsText ? rulesData.permissionsText[j] || '' : '';
          if (formula.indexOf('user.Access') !== -1 && formula.indexOf('OWNER') !== -1) hasOwnerRule = true;
          if (formula === '' && perms !== '') hasEditorRule = true;
          if (formula.indexOf('user.Access') !== -1 && (formula.indexOf('EDITOR') !== -1 || formula.indexOf('not') !== -1 || formula.indexOf('!=') !== -1)) hasEditorRule = true;
        }
      }

      results.push({
        tableId: rule.tableId,
        secured: hasOwnerRule || hasEditorRule,
        ownerPerms: rule.ownerPerms,
        editorPerms: rule.editorPerms
      });
    }
    return results;
  } catch (e) {
    console.error('[GristPM] Error checking security:', e);
    return null;
  }
}

export async function applySecurityRules() {
  var container = document.getElementById('security-status');
  if (!container) return;

  var confirmed = await showConfirmModal(
    currentLang === 'fr'
      ? 'Cela va créer des règles d\'accès (ACL) pour protéger les tables du widget. Les owners garderont tous les droits. Les éditeurs pourront créer et modifier les tâches mais pas les supprimer ni modifier les paramètres. Le document sera rechargé automatiquement.'
      : 'This will create access rules (ACL) to protect widget tables. Owners keep full rights. Editors can create and edit tasks but cannot delete them or modify settings. The document will reload automatically.',
    currentLang === 'fr' ? 'Sécuriser le document' : 'Secure document',
    currentLang === 'fr' ? 'Confirmer' : 'Confirm'
  );
  if (!confirmed) return;

  container.innerHTML = '<div style="text-align:center;padding:20px;color:#6366f1;"><div class="spinner" style="margin:0 auto 10px;"></div>' +
    (currentLang === 'fr' ? 'Application des règles en cours...' : 'Applying rules...') + '</div>';

  try {
    var existingTables = await grist.docApi.listTables();
    var resourcesData = await grist.docApi.fetchTable('_grist_ACLResources');
    var rulesData = await grist.docApi.fetchTable('_grist_ACLRules');

    var resourceMap = {};
    if (resourcesData.id) {
      for (var i = 0; i < resourcesData.id.length; i++) {
        resourceMap[resourcesData.tableId[i] + ':' + resourcesData.colIds[i]] = resourcesData.id[i];
      }
    }

    var existingRuleResources = {};
    if (rulesData.id) {
      for (var j = 0; j < rulesData.id.length; j++) {
        var resId = rulesData.resource[j];
        if (!existingRuleResources[resId]) existingRuleResources[resId] = [];
        existingRuleResources[resId].push({
          aclFormula: rulesData.aclFormula ? rulesData.aclFormula[j] || '' : '',
          permissionsText: rulesData.permissionsText ? rulesData.permissionsText[j] || '' : ''
        });
      }
    }

    var actions = [];
    var tempResourceId = -1;

    var aclRules = getAclRules();
    for (var r = 0; r < aclRules.length; r++) {
      var rule = aclRules[r];
      if (existingTables.indexOf(rule.tableId) === -1) continue;

      var resKey = rule.tableId + ':*';
      var resourceId = resourceMap[resKey];

      var alreadyHasRules = false;
      if (resourceId && existingRuleResources[resourceId]) {
        var existing = existingRuleResources[resourceId];
        for (var k = 0; k < existing.length; k++) {
          if (existing[k].aclFormula.indexOf('user.Access') !== -1) {
            alreadyHasRules = true;
            break;
          }
        }
      }
      if (alreadyHasRules) continue;

      if (!resourceId) {
        resourceId = tempResourceId;
        actions.push(['AddRecord', '_grist_ACLResources', tempResourceId, { tableId: rule.tableId, colIds: '*' }]);
        tempResourceId--;
      }

      actions.push(['AddRecord', '_grist_ACLRules', null, {
        resource: resourceId,
        aclFormula: 'user.Access in [OWNER]',
        permissionsText: rule.ownerPerms,
        memo: 'PM Widget - Owner'
      }]);
      actions.push(['AddRecord', '_grist_ACLRules', null, {
        resource: resourceId,
        aclFormula: '',
        permissionsText: rule.editorPerms,
        memo: 'PM Widget - Default'
      }]);
    }

    if (actions.length === 0) {
      showToast(currentLang === 'fr' ? 'Toutes les tables sont déjà sécurisées' : 'All tables are already secured', 'success');
      renderSecuritySection();
      return;
    }

    await grist.docApi.applyUserActions(actions);
    showToast(currentLang === 'fr' ? 'Règles de sécurité appliquées ✓' : 'Security rules applied ✓', 'success');
  } catch (e) {
    console.error('[GristPM] Error applying security rules:', e);
    container.innerHTML = '<div class="security-error">' +
      (currentLang === 'fr' ? 'Erreur : ' : 'Error: ') + sanitize(e.message) +
      '<br><small>' + (currentLang === 'fr' ? 'Seul un Owner du document peut appliquer les règles d\'accès.' : 'Only a document Owner can apply access rules.') + '</small></div>';
  }
}

export async function removeSecurityRules() {
  var confirmed = await showConfirmModal(
    currentLang === 'fr'
      ? 'Cela va supprimer toutes les règles d\'accès créées par le widget sur ses tables. Le document sera rechargé automatiquement.'
      : 'This will remove all access rules created by the widget on its tables. The document will reload automatically.',
    currentLang === 'fr' ? 'Retirer la sécurité' : 'Remove security',
    currentLang === 'fr' ? 'Confirmer' : 'Confirm'
  );
  if (!confirmed) return;

  try {
    var rulesData = await grist.docApi.fetchTable('_grist_ACLRules');
    var resourcesData = await grist.docApi.fetchTable('_grist_ACLResources');

    var pmResourceIds = {};
    if (resourcesData.id) {
      for (var i = 0; i < resourcesData.id.length; i++) {
        if (resourcesData.tableId[i] && resourcesData.tableId[i].indexOf('PM_') === 0 && resourcesData.colIds[i] === '*') {
          pmResourceIds[resourcesData.id[i]] = true;
        }
      }
    }

    var actions = [];
    if (rulesData.id) {
      for (var j = 0; j < rulesData.id.length; j++) {
        if (pmResourceIds[rulesData.resource[j]]) {
          var memo = rulesData.memo ? rulesData.memo[j] || '' : '';
          if (memo.indexOf('PM Widget') !== -1) {
            actions.push(['RemoveRecord', '_grist_ACLRules', rulesData.id[j]]);
          }
        }
      }
    }

    if (actions.length === 0) {
      showToast(currentLang === 'fr' ? 'Aucune règle PM Widget à supprimer' : 'No PM Widget rules to remove', 'info');
      return;
    }

    await grist.docApi.applyUserActions(actions);
    showToast(currentLang === 'fr' ? 'Règles supprimées ✓' : 'Rules removed ✓', 'success');
  } catch (e) {
    console.error('[GristPM] Error removing security rules:', e);
    showToast((currentLang === 'fr' ? 'Erreur : ' : 'Error: ') + e.message, 'error');
  }
}
