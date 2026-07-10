import { t, currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { priorityLabel } from '../utils/labels.js';
import { formatDate } from '../utils/dates.js';
import { state } from '../store.js';
import { showToast } from '../ui/toast.js';
import { showConfirmModal } from '../ui/confirm-modal.js';
import { loadAllData } from './data-loader.js';
// Temporary backwards imports: closeModalForce/startNewTask aren't extracted yet (task-modal domain).
import { closeModalForce, startNewTask } from '../main.js';

export function renderTemplatesView() {
  var search = (document.getElementById('template-search').value || '').toLowerCase();
  var filterPriority = document.getElementById('filter-template-priority').value;

  var filtered = state.templates.filter(function(tpl) {
    if (filterPriority && tpl.Priority !== filterPriority) return false;
    if (search) {
      var text = (tpl.Title + ' ' + tpl.Description + ' ' + tpl.Category).toLowerCase();
      if (text.indexOf(search) === -1) return false;
    }
    return true;
  });

  var html = '';
  for (var i = 0; i < filtered.length; i++) {
    var tpl = filtered[i];
    var dotClass = tpl.Priority === 'high' ? 'dot-high' : (tpl.Priority === 'medium' ? 'dot-medium' : 'dot-low');

    html += '<div class="template-card">';
    html += '<div class="template-card-info">';
    html += '<h4>' + sanitize(tpl.Title) + '</h4>';
    html += '<div class="template-meta">';
    if (tpl.Category) html += '🏷️ ' + sanitize(tpl.Category);
    html += ' <span class="priority-dot ' + dotClass + '"></span> ' + priorityLabel(tpl.Priority);
    if (tpl.Estimated_Hours) html += ' ⏱️ ' + tpl.Estimated_Hours + 'h';
    html += ' 📊 ' + (tpl.Usage_Count || 0) + ' ' + (currentLang === 'fr' ? 'utilisations' : 'uses');
    if (tpl.Updated_At) html += ' • ' + (currentLang === 'fr' ? 'Mis à jour le ' : 'Updated ') + formatDate(tpl.Updated_At);
    html += '</div></div>';
    html += '<div style="display:flex;gap:4px;">';
    html += '<button class="btn btn-primary btn-sm" onclick="useTemplate(' + tpl.id + ')">' + t('useTemplate') + '</button>';
    if (state.isOwner) html += '<button class="btn-icon" onclick="openNewTemplateModal(' + tpl.id + ')" title="' + t('editTemplate') + '">✏️</button>';
    if (state.isOwner) html += '<button class="btn-icon" onclick="deleteTemplate(' + tpl.id + ')">🗑️</button>';
    html += '</div>';
    html += '</div>';
  }

  if (filtered.length === 0) {
    html = '<div style="text-align:center;padding:40px;color:#94a3b8;">' + t('noTasks') + '</div>';
  }

  document.getElementById('templates-list').innerHTML = html;
}

export function openNewTemplateModal(tplId) {
  var editing = tplId != null;
  var tpl = editing ? state.templates.find(function(x) { return x.id === tplId; }) : null;
  if (editing && !tpl) return;

  var title = editing ? sanitize(tpl.Title || '') : '';
  var desc = editing ? sanitize(tpl.Description || '') : '';
  var priority = editing ? (tpl.Priority || 'medium') : 'medium';
  var category = editing ? (tpl.Category || '') : '';
  var hours = editing ? (tpl.Estimated_Hours || '') : '';
  var tplGroup = editing ? (tpl.Group_Name || '') : '';
  var tplTag = editing ? (tpl.Tag || '') : '';
  var tplRecur = editing ? (tpl.Recurrence || 'none') : 'none';

  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal" onclick="event.stopPropagation()">';
  html += '<div class="modal-header"><h3>' + t(editing ? 'modalEditTemplate' : 'modalNewTemplate') + '</h3><button class="modal-close" onclick="closeModalForce()">✕</button></div>';
  html += '<div class="modal-body">';
  html += '<div class="form-group"><label>' + t('fieldTitle') + '</label><input type="text" id="tpl-title" value="' + title + '" /></div>';
  html += '<div class="form-group"><label>' + t('fieldDescription') + '</label><textarea id="tpl-desc">' + desc + '</textarea></div>';
  html += '<div class="form-row">';
  html += '<div class="form-group"><label>' + t('fieldPriority') + '</label><select id="tpl-priority">';
  html += '<option value="medium"' + (priority === 'medium' ? ' selected' : '') + '>' + t('priorityMedium') + '</option>';
  html += '<option value="high"' + (priority === 'high' ? ' selected' : '') + '>' + t('priorityHigh') + '</option>';
  html += '<option value="low"' + (priority === 'low' ? ' selected' : '') + '>' + t('priorityLow') + '</option>';
  html += '</select></div>';
  var tplCatOptions = '<option value=""' + (!category ? ' selected' : '') + '>--</option>';
  for (var tci = 0; tci < state.categories.length; tci++) {
    var catName = state.categories[tci].Name;
    tplCatOptions += '<option value="' + sanitize(catName) + '"' + (catName === category ? ' selected' : '') + '>' + sanitize(catName) + '</option>';
  }
  html += '<div class="form-group"><label>' + t('fieldCategory') + '</label><select id="tpl-category">' + tplCatOptions + '</select></div>';
  html += '</div>';
  html += '<div class="form-group"><label>' + t('fieldEstimatedTime') + '</label><input type="number" id="tpl-hours" step="0.5" min="0" value="' + hours + '" /></div>';
  // Groupe + Tag
  html += '<div class="form-row">';
  var tplGroupOpts = '<option value="">--</option>';
  for (var tgi = 0; tgi < state.groups.length; tgi++) tplGroupOpts += '<option value="' + sanitize(state.groups[tgi].Name) + '"' + (state.groups[tgi].Name === tplGroup ? ' selected' : '') + '>' + sanitize(state.groups[tgi].Name) + '</option>';
  html += '<div class="form-group"><label>' + t('fieldGroup') + '</label><select id="tpl-group">' + tplGroupOpts + '</select></div>';
  var tplTagOpts = '<option value="">--</option>';
  for (var tti = 0; tti < state.tags.length; tti++) tplTagOpts += '<option value="' + sanitize(state.tags[tti].Name) + '"' + (state.tags[tti].Name === tplTag ? ' selected' : '') + '>' + sanitize(state.tags[tti].Name) + '</option>';
  html += '<div class="form-group"><label>' + t('tag') + '</label><select id="tpl-tag">' + tplTagOpts + '</select></div>';
  html += '</div>';
  // Récurrence
  var recurKeys = ['none', 'daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'yearly'];
  var recurLabels = { none: 'recurrenceNone', daily: 'recurrenceDaily', weekly: 'recurrenceWeekly', biweekly: 'recurrenceBiweekly', monthly: 'recurrenceMonthly', quarterly: 'recurrenceQuarterly', yearly: 'recurrenceYearly' };
  var tplRecurOpts = recurKeys.map(function (k) { return '<option value="' + k + '"' + (tplRecur === k ? ' selected' : '') + '>' + t(recurLabels[k]) + '</option>'; }).join('');
  html += '<div class="form-group"><label>🔁 ' + (currentLang === 'fr' ? 'Récurrence' : 'Recurrence') + '</label><select id="tpl-recurrence">' + tplRecurOpts + '</select></div>';
  html += '</div>';
  html += '<div class="modal-footer">';
  html += '<button class="btn btn-secondary" onclick="closeModalForce()">' + t('cancel') + '</button>';
  if (editing) {
    html += '<button class="btn btn-primary" onclick="updateTemplate(' + tplId + ')">' + t('save') + '</button>';
  } else {
    html += '<button class="btn btn-primary" onclick="createTemplate()">' + t('save') + '</button>';
  }
  html += '</div></div></div>';

  document.getElementById('modal-container').innerHTML = html;
}

export async function createTemplate() {
  var title = document.getElementById('tpl-title').value.trim();
  if (!title) return;

  var record = {
    Title: title,
    Description: document.getElementById('tpl-desc').value.trim(),
    Priority: document.getElementById('tpl-priority').value,
    Category: document.getElementById('tpl-category').value.trim(),
    Estimated_Hours: parseFloat(document.getElementById('tpl-hours').value) || 0,
    Group_Name: (document.getElementById('tpl-group') || {}).value || '',
    Tag: (document.getElementById('tpl-tag') || {}).value || '',
    Recurrence: (document.getElementById('tpl-recurrence') || {}).value || 'none',
    Usage_Count: 0,
    Updated_At: Math.floor(Date.now() / 1000)
  };

  try {
    await grist.docApi.applyUserActions([
      ['AddRecord', state.TEMPLATES_TABLE, null, record]
    ]);
    showToast(t('templateCreated'), 'success');
    closeModalForce();
    await loadAllData();
  } catch (e) {
    console.error('Error creating template:', e);
  }
}

export async function updateTemplate(tplId) {
  var title = document.getElementById('tpl-title').value.trim();
  if (!title) return;

  var record = {
    Title: title,
    Description: document.getElementById('tpl-desc').value.trim(),
    Priority: document.getElementById('tpl-priority').value,
    Category: document.getElementById('tpl-category').value.trim(),
    Estimated_Hours: parseFloat(document.getElementById('tpl-hours').value) || 0,
    Group_Name: (document.getElementById('tpl-group') || {}).value || '',
    Tag: (document.getElementById('tpl-tag') || {}).value || '',
    Recurrence: (document.getElementById('tpl-recurrence') || {}).value || 'none',
    Updated_At: Math.floor(Date.now() / 1000)
  };

  try {
    await grist.docApi.applyUserActions([
      ['UpdateRecord', state.TEMPLATES_TABLE, tplId, record]
    ]);
    showToast(t('templateUpdated'), 'success');
    closeModalForce();
    await loadAllData();
  } catch (e) {
    console.error('Error updating template:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

export async function deleteTemplate(tplId) {
  if (!state.isOwner) return;
  var confirmed = await showConfirmModal(t('confirmDeleteTemplate'), currentLang === 'fr' ? 'Supprimer le modèle' : 'Delete template');
  if (!confirmed) return;
  try {
    await grist.docApi.applyUserActions([
      ['RemoveRecord', state.TEMPLATES_TABLE, tplId]
    ]);
    showToast(t('templateDeleted'), 'info');
    await loadAllData();
  } catch (e) {
    console.error('Error deleting template:', e);
  }
}

export async function useTemplate(tplId) {
  var tpl = state.templates.find(function(t) { return t.id === tplId; });
  if (!tpl) return;

  // Increment usage count
  try {
    await grist.docApi.applyUserActions([
      ['UpdateRecord', state.TEMPLATES_TABLE, tplId, { Usage_Count: (tpl.Usage_Count || 0) + 1 }]
    ]);
  } catch (e) {}

  // Crée un brouillon pré-rempli depuis le modèle, puis ouvre l'éditeur COMPLET
  startNewTask('todo', null, {
    title: tpl.Title || '',
    description: tpl.Description || '',
    priority: tpl.Priority || 'medium',
    category: tpl.Category || '',
    group: tpl.Group_Name || '',
    tag: tpl.Tag || '',
    recurrence: tpl.Recurrence || 'none',
    estimatedHours: tpl.Estimated_Hours || 0
  });
}
