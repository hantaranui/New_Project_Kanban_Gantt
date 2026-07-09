import { t, currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { state } from '../store.js';
import { showToast } from '../ui/toast.js';
import { showConfirmModal } from '../ui/confirm-modal.js';
// Temporary backwards imports: loadAllData/closeModalForce aren't extracted yet.
import { loadAllData, closeModalForce } from '../main.js';

export function getTaskCustomFieldValue(taskId, fieldId) {
  var cfv = state.customFieldValues.find(function(v) {
    return v.Task_Id === taskId && v.Field_Id === fieldId;
  });
  return cfv ? cfv.Value : '';
}

// B3 : concatène toutes les valeurs de champs personnalisés d'une tâche (pour la recherche)
export function getTaskCustomFieldsText(taskId) {
  return state.customFieldValues
    .filter(function(v) { return v.Task_Id === taskId && v.Value; })
    .map(function(v) { return String(v.Value); })
    .join(' ');
}

export function getCustomFieldTypeLabel(type) {
  switch (type) {
    case 'text': return t('typeText');
    case 'number': return t('typeNumber');
    case 'date': return t('typeDate');
    case 'checkbox': return t('typeCheckbox');
    case 'select': return t('typeSelect');
    default: return type;
  }
}

// =============================================================================
// CUSTOM FIELDS
// =============================================================================

export function renderCustomFieldInput(field, taskId, value) {
  var inputId = 'cf-' + field.id;
  var html = '';
  
  switch (field.Type) {
    case 'text':
      html = '<input type="text" id="' + inputId + '" class="cf-input" value="' + sanitize(value) + '" onchange="updateCustomFieldValue(' + taskId + ', ' + field.id + ', this.value)" />';
      break;
    case 'number':
      html = '<input type="number" id="' + inputId + '" class="cf-input cf-number" value="' + sanitize(value) + '" onchange="updateCustomFieldValue(' + taskId + ', ' + field.id + ', this.value)" />';
      break;
    case 'date':
      var dateVal = value ? new Date(parseInt(value) * 1000).toISOString().split('T')[0] : '';
      html = '<input type="date" id="' + inputId + '" class="cf-input cf-date" value="' + dateVal + '" onchange="updateCustomFieldValue(' + taskId + ', ' + field.id + ', this.value ? Math.floor(new Date(this.value).getTime()/1000) : \'\')" />';
      break;
    case 'checkbox':
      var checked = value === 'true' || value === '1';
      html = '<input type="checkbox" id="' + inputId + '" class="cf-checkbox" ' + (checked ? 'checked' : '') + ' onchange="updateCustomFieldValue(' + taskId + ', ' + field.id + ', this.checked ? \'true\' : \'false\')" />';
      break;
    case 'select':
      var options = field.Options ? field.Options.split(',').map(function(o) { return o.trim(); }) : [];
      html = '<select id="' + inputId + '" class="cf-select" onchange="updateCustomFieldValue(' + taskId + ', ' + field.id + ', this.value)">';
      html += '<option value="">--</option>';
      for (var oi = 0; oi < options.length; oi++) {
        html += '<option value="' + sanitize(options[oi]) + '"' + (value === options[oi] ? ' selected' : '') + '>' + sanitize(options[oi]) + '</option>';
      }
      html += '</select>';
      break;
    default:
      html = '<input type="text" id="' + inputId + '" class="cf-input" value="' + sanitize(value) + '" />';
  }
  return html;
}

export async function updateCustomFieldValue(taskId, fieldId, value) {
  var existing = state.customFieldValues.find(function(v) {
    return v.Task_Id === taskId && v.Field_Id === fieldId;
  });
  
  try {
    if (existing) {
      await grist.docApi.applyUserActions([
        ['UpdateRecord', state.CUSTOM_FIELD_VALUES_TABLE, existing.id, { Value: String(value) }]
      ]);
      existing.Value = String(value);
    } else {
      await grist.docApi.applyUserActions([
        ['AddRecord', state.CUSTOM_FIELD_VALUES_TABLE, null, {
          Task_Id: taskId,
          Field_Id: fieldId,
          Value: String(value)
        }]
      ]);
      await loadAllData();
    }
  } catch (e) {
    console.error('Error updating custom field value:', e);
  }
}

export function openCustomFieldsModal() {
  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal modal-cf" onclick="event.stopPropagation()">';
  html += '<div class="modal-header"><h3>🏷️ ' + t('manageCustomFields') + '</h3><button class="modal-close" onclick="closeModalForce()">✕</button></div>';
  html += '<div class="modal-body">';
  
  // Existing fields
  html += '<div class="cf-list">';
  if (state.customFields.length === 0) {
    html += '<div class="cf-empty-modal">' + t('noCustomFields') + '</div>';
  } else {
    for (var i = 0; i < state.customFields.length; i++) {
      var cf = state.customFields[i];
      html += '<div class="cf-list-item">';
      html += '<span class="cf-list-name">' + sanitize(cf.Name) + '</span>';
      html += '<span class="cf-list-type">' + getCustomFieldTypeLabel(cf.Type) + '</span>';
      html += '<button class="cf-delete-btn" onclick="deleteCustomField(' + cf.id + ')">🗑️</button>';
      html += '</div>';
    }
  }
  html += '</div>';
  
  // Add new field form
  html += '<div class="cf-add-form">';
  html += '<h4>' + t('addCustomField') + '</h4>';
  html += '<div class="cf-form-row">';
  html += '<input type="text" id="new-cf-name" placeholder="' + t('customFieldName') + '" class="cf-form-input" />';
  html += '<select id="new-cf-type" class="cf-form-select" onchange="toggleCfOptions()">';
  html += '<option value="text">' + t('typeText') + '</option>';
  html += '<option value="number">' + t('typeNumber') + '</option>';
  html += '<option value="date">' + t('typeDate') + '</option>';
  html += '<option value="checkbox">' + t('typeCheckbox') + '</option>';
  html += '<option value="select">' + t('typeSelect') + '</option>';
  html += '</select>';
  html += '</div>';
  html += '<div id="cf-options-row" class="cf-form-row" style="display:none;">';
  html += '<input type="text" id="new-cf-options" placeholder="' + t('fieldOptions') + '" class="cf-form-input" />';
  html += '</div>';
  html += '<button class="btn btn-primary" onclick="addCustomField()">' + t('addCustomField') + '</button>';
  html += '</div>';
  
  html += '</div></div></div>';
  
  document.getElementById('modal-container').innerHTML = html;
}

export function toggleCfOptions() {
  var type = document.getElementById('new-cf-type').value;
  document.getElementById('cf-options-row').style.display = type === 'select' ? 'flex' : 'none';
}

export async function addCustomField() {
  var name = document.getElementById('new-cf-name').value.trim();
  var type = document.getElementById('new-cf-type').value;
  var options = document.getElementById('new-cf-options').value.trim();
  
  if (!name) return;
  
  var maxOrder = state.customFields.length > 0 ? Math.max.apply(null, state.customFields.map(function(cf) { return cf.Order || 0; })) : 0;
  
  try {
    await grist.docApi.applyUserActions([
      ['AddRecord', state.CUSTOM_FIELDS_TABLE, null, {
        Name: name,
        Type: type,
        Options: type === 'select' ? options : '',
        Order: maxOrder + 1,
        Created_At: Math.floor(Date.now() / 1000)
      }]
    ]);
    showToast(t('customFieldCreated'), 'success');
    await loadAllData();
    openCustomFieldsModal();
  } catch (e) {
    console.error('Error adding custom field:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

export async function deleteCustomField(fieldId) {
  if (!state.isOwner) return;
  var confirmed = await showConfirmModal(
    currentLang === 'fr' ? 'Supprimer ce champ personnalisé et toutes ses valeurs ?' : 'Delete this custom field and all its values?',
    currentLang === 'fr' ? 'Supprimer le champ' : 'Delete field'
  );
  if (!confirmed) return;
  
  try {
    // Delete field values first
    var valuesToDelete = state.customFieldValues.filter(function(v) { return v.Field_Id === fieldId; });
    for (var i = 0; i < valuesToDelete.length; i++) {
      await grist.docApi.applyUserActions([
        ['RemoveRecord', state.CUSTOM_FIELD_VALUES_TABLE, valuesToDelete[i].id]
      ]);
    }
    // Delete field
    await grist.docApi.applyUserActions([
      ['RemoveRecord', state.CUSTOM_FIELDS_TABLE, fieldId]
    ]);
    showToast(t('customFieldDeleted'), 'info');
    await loadAllData();
    openCustomFieldsModal();
  } catch (e) {
    console.error('Error deleting custom field:', e);
  }
}
