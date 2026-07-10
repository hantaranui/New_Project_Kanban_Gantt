import { t, currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { state } from '../store.js';
import { defaultUiLabels, setField } from '../config.js';
import { showToast } from '../ui/toast.js';
import { showConfirmModal, showPromptModal } from '../ui/confirm-modal.js';
import { checkSecurityStatus } from './permissions.js';
import { renderProjectSelector } from './filters.js';
import { loadAllData } from './data-loader.js';
import { getKanbanStatuses, renderKanbanView } from './kanban.js';
import { closeModalForce } from './task-modal.js';
import { refreshAllViews } from '../ui/tabs.js';
import { renderSettingsCategoriesList } from './categories.js';
import { renderSettingsTagsList } from './tags.js';
// Temporary backwards imports: none of these are extracted yet
// (renderKanbanStatusesList -> kanban domain but stays in main.js since it
// reassigns customKanbanStatuses like loadSettings() does,
// defaultCardDisplay/cardDisplaySettings -> stay in main.js because
// loadSettings() reassigns cardDisplaySettings and can't move until
// bootstrap/ensure-tables.js is extracted).
import {
  renderKanbanStatusesList,
  defaultCardDisplay, cardDisplaySettings
} from '../main.js';

export async function saveCardDisplaySettings() {
  await saveSetting('card_display', JSON.stringify(cardDisplaySettings));
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

export function uiLabel(key) { return state.uiLabels[key] || defaultUiLabels[key] || key; }
export async function saveUiLabels() { await saveSetting('ui_labels', JSON.stringify(state.uiLabels)); }

export function renderSettingsView() {
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

export function renderUiLabelSettings() {
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

export async function saveUiLabelSettings() {
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

export function applyUiLabelsToSettingsHeadings() {
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

export function renderCardDisplaySettings() {
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

export async function toggleCardDisplay(key, value) {
  cardDisplaySettings[key] = value;
  await saveCardDisplaySettings();
  renderCardDisplaySettings();
  renderKanbanView();
}

export function renderRaciToggle() {
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

export async function toggleRaci(enabled) {
  state.raciEnabled = enabled;
  await saveSetting('raci_enabled', enabled ? 'true' : 'false');
  renderRaciToggle();
  showToast(t(enabled ? 'raciEnabled' : 'raciDisabled'), 'success');
}

export function renderNotifyConcernedToggle() {
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
export async function toggleNotifyConcerned(enabled) {
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

export function renderAutomationsSection() {
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

export function openAddAutomationRuleModal() {
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

export function openEditAutomationRuleModal(index) {
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

export function closeAutomationModal() {
  document.getElementById('automation-modal').style.display = 'none';
}

export function onAutoTriggerChange() {
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

export function onAutoActionChange() {
  var action = document.getElementById('auto-action').value;
  document.getElementById('auto-target-wrap').style.display = action === 'notify_specific' ? 'block' : 'none';
}

export async function saveAutomationRuleFromModal() {
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

export async function deleteAutomationRule(index) {
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

export async function toggleAutomationRule(index, enabled) {
  state.automationRules[index].enabled = enabled;
  await saveSetting('automation_rules', JSON.stringify(state.automationRules));
  renderAutomationsSection();
}

export async function addDefaultAutomationRules() {
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

export function renderSettingsProjectsList(searchOverride) {
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

export function openProjectModalForEdit(projectId) {
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

export async function saveInlineProjectEdit(projectId) {
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

