import { sanitize } from '../utils/sanitize.js';
import { state } from '../store.js';
import { showToast } from '../ui/toast.js';
import { loadAllData } from './data-loader.js';
import { saveSetting } from './settings.js';
import { closeModalForce } from './task-modal.js';
import {
  ensureConfigAndSettingsTables, hasValidMappedTaskTable, formatAccessError
} from '../bootstrap/ensure-tables.js';
import { refreshAllViews } from '../ui/tabs.js';
import { getColumnName, loadColumnMapping } from '../config.js';
// Temporary backwards import: loadSettings stays in main.js since it
// reassigns kanbanSort/cardDisplaySettings/customKanbanStatuses.
import { loadSettings } from '../main.js';

export async function openColumnMappingModal() {
  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal" style="max-width:800px;" onclick="event.stopPropagation()">';
  html += '<div class="modal-header">';
  html += '<h3>🔧 Configuration du mapping des colonnes</h3>';
  html += '<button class="modal-close" onclick="closeModalForce()">✕</button>';
  html += '</div>';
  html += '<div class="modal-body" style="max-height:600px;overflow-y:auto;">';
  
  html += '<div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:12px;margin-bottom:20px;">';
  html += '<p style="margin:0;font-size:13px;color:#0c4a6e;">';
  html += '💡 <strong>Info :</strong> Cette configuration permet de mapper vos propres tables et colonnes Grist existantes. ';
  html += 'Utile si vous avez déjà des données et souhaitez les réutiliser avec ce widget.';
  html += '</p></div>';
  
  // Get available tables
  var availableTables = [];
  try {
    availableTables = await grist.docApi.listTables();
  } catch (e) {
    console.error('Error listing tables:', e);
  }
  
  // Tasks mapping section
  html += '<div class="form-section" style="margin-bottom:25px;">';
  html += '<h4 style="margin-bottom:15px;color:#1e293b;">📋 Table des Tâches</h4>';
  html += '<div class="form-group">';
  html += '<label>Nom de la table</label>';
  html += '<select id="mapping-tasks-table" onchange="detectTaskColumns()">';
  for (var i = 0; i < availableTables.length; i++) {
    var selected = availableTables[i] === state.TASKS_TABLE ? ' selected' : '';
    html += '<option value="' + sanitize(availableTables[i]) + '"' + selected + '>' + sanitize(availableTables[i]) + '</option>';
  }
  html += '</select>';
  html += '</div>';
  html += '<div id="tasks-columns-mapping"></div>';
  html += '</div>';
  
  // Users mapping section
  html += '<div class="form-section" style="margin-bottom:25px;">';
  html += '<h4 style="margin-bottom:15px;color:#1e293b;">👥 Table des Utilisateurs</h4>';
  html += '<div class="form-group">';
  html += '<label>Nom de la table</label>';
  html += '<select id="mapping-users-table" onchange="detectUserColumns()">';
  for (var i = 0; i < availableTables.length; i++) {
    var selected = availableTables[i] === state.USERS_TABLE ? ' selected' : '';
    html += '<option value="' + sanitize(availableTables[i]) + '"' + selected + '>' + sanitize(availableTables[i]) + '</option>';
  }
  html += '</select>';
  html += '</div>';
  html += '<div id="users-columns-mapping"></div>';
  html += '</div>';
  
  // Projects mapping section
  html += '<div class="form-section" style="margin-bottom:25px;">';
  html += '<h4 style="margin-bottom:15px;color:#1e293b;">📂 Table des Projets</h4>';
  html += '<div class="form-group">';
  html += '<label>Nom de la table</label>';
  html += '<select id="mapping-projects-table" onchange="detectProjectColumns()">';
  for (var i = 0; i < availableTables.length; i++) {
    var selected = availableTables[i] === state.PROJECTS_TABLE ? ' selected' : '';
    html += '<option value="' + sanitize(availableTables[i]) + '"' + selected + '>' + sanitize(availableTables[i]) + '</option>';
  }
  html += '</select>';
  html += '</div>';
  html += '<div id="projects-columns-mapping"></div>';
  html += '</div>';
  
  html += '</div>';
  html += '<div class="modal-footer">';
  html += '<button class="btn btn-secondary" onclick="closeModalForce()">Annuler</button>';
  html += '<button class="btn btn-primary" onclick="saveColumnMapping()">💾 Enregistrer la configuration</button>';
  html += '</div>';
  html += '</div></div>';
  
  document.getElementById('modal-container').innerHTML = html;
  
  // Load current column mappings
  await detectTaskColumns();
  await detectUserColumns();
  await detectProjectColumns();
}

export async function detectTaskColumns() {
  var tableName = document.getElementById('mapping-tasks-table').value;
  var html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px;">';
  
  try {
    var tableData = await grist.docApi.fetchTable(tableName);
    var columns = Object.keys(tableData).filter(function(k) { return k !== 'id'; });
    
    var fields = [
      { key: 'title', label: 'Titre', required: true },
      { key: 'description', label: 'Description', required: false },
      { key: 'status', label: 'Statut', required: true },
      { key: 'priority', label: 'Priorité', required: true },
      { key: 'assignee', label: 'Assigné à', required: false },
      { key: 'group', label: 'Groupe', required: false },
      { key: 'startDate', label: 'Date début', required: false },
      { key: 'dueDate', label: 'Échéance', required: false },
      { key: 'category', label: 'Catégorie', required: false },
      { key: 'tag', label: 'Tag', required: false },
      { key: 'recurrence', label: 'Récurrence', required: false },
      { key: 'estimatedHours', label: 'Heures estimées', required: false },
      { key: 'createdAt', label: 'Créé le', required: false },
      { key: 'projectId', label: 'Projet', required: false }
    ];
    
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      var currentCol = getColumnName('tasks', field.key);
      html += '<div class="form-group">';
      html += '<label>' + field.label + (field.required ? ' <span style="color:#ef4444;">*</span>' : '') + '</label>';
      html += '<select id="map-task-' + field.key + '">';
      html += '<option value="">-- Non mappé --</option>';
      for (var j = 0; j < columns.length; j++) {
        var selected = columns[j] === currentCol ? ' selected' : '';
        html += '<option value="' + sanitize(columns[j]) + '"' + selected + '>' + sanitize(columns[j]) + '</option>';
      }
      html += '</select>';
      html += '</div>';
    }
  } catch (e) {
    html += '<p style="color:#ef4444;">Erreur lors du chargement des colonnes</p>';
  }
  
  html += '</div>';
  document.getElementById('tasks-columns-mapping').innerHTML = html;
}

export async function detectUserColumns() {
  var tableName = document.getElementById('mapping-users-table').value;
  var html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px;">';
  
  try {
    var tableData = await grist.docApi.fetchTable(tableName);
    var columns = Object.keys(tableData).filter(function(k) { return k !== 'id'; });
    
    var fields = [
      { key: 'name', label: 'Nom', required: true },
      { key: 'email', label: 'Email', required: true },
      { key: 'role', label: 'Rôle', required: false },
      { key: 'group', label: 'Groupe', required: false }
    ];
    
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      var currentCol = getColumnName('users', field.key);
      html += '<div class="form-group">';
      html += '<label>' + field.label + (field.required ? ' <span style="color:#ef4444;">*</span>' : '') + '</label>';
      html += '<select id="map-user-' + field.key + '">';
      html += '<option value="">-- Non mappé --</option>';
      for (var j = 0; j < columns.length; j++) {
        var selected = columns[j] === currentCol ? ' selected' : '';
        html += '<option value="' + sanitize(columns[j]) + '"' + selected + '>' + sanitize(columns[j]) + '</option>';
      }
      html += '</select>';
      html += '</div>';
    }
  } catch (e) {
    html += '<p style="color:#ef4444;">Erreur lors du chargement des colonnes</p>';
  }
  
  html += '</div>';
  document.getElementById('users-columns-mapping').innerHTML = html;
}

export async function detectProjectColumns() {
  var tableName = document.getElementById('mapping-projects-table').value;
  var html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px;">';
  
  try {
    var tableData = await grist.docApi.fetchTable(tableName);
    var columns = Object.keys(tableData).filter(function(k) { return k !== 'id'; });
    
    var fields = [
      { key: 'name', label: 'Nom', required: true },
      { key: 'description', label: 'Description', required: false },
      { key: 'color', label: 'Couleur', required: false },
      { key: 'status', label: 'Statut', required: false }
    ];
    
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      var currentCol = getColumnName('projects', field.key);
      html += '<div class="form-group">';
      html += '<label>' + field.label + (field.required ? ' <span style="color:#ef4444;">*</span>' : '') + '</label>';
      html += '<select id="map-project-' + field.key + '">';
      html += '<option value="">-- Non mappé --</option>';
      for (var j = 0; j < columns.length; j++) {
        var selected = columns[j] === currentCol ? ' selected' : '';
        html += '<option value="' + sanitize(columns[j]) + '"' + selected + '>' + sanitize(columns[j]) + '</option>';
      }
      html += '</select>';
      html += '</div>';
    }
  } catch (e) {
    html += '<p style="color:#ef4444;">Erreur lors du chargement des colonnes</p>';
  }
  
  html += '</div>';
  document.getElementById('projects-columns-mapping').innerHTML = html;
}

export async function saveColumnMapping() {
  try {
    // Collect all mappings
    var updates = [];
    
    // Tasks mappings
    var tasksTable = document.getElementById('mapping-tasks-table').value;
    var taskFields = ['title', 'description', 'status', 'priority', 'assignee', 'group', 'startDate', 'dueDate', 'category', 'tag', 'recurrence', 'estimatedHours', 'createdAt', 'projectId'];
    for (var i = 0; i < taskFields.length; i++) {
      var field = taskFields[i];
      var el = document.getElementById('map-task-' + field);
      if (el && el.value) {
        var configKey = 'task_' + field.replace(/([A-Z])/g, '_$1').toLowerCase();
        updates.push({ key: configKey, table: tasksTable, column: el.value });
      }
    }
    
    // Users mappings
    var usersTable = document.getElementById('mapping-users-table').value;
    var userFields = ['name', 'email', 'role', 'group'];
    for (var i = 0; i < userFields.length; i++) {
      var field = userFields[i];
      var el = document.getElementById('map-user-' + field);
      if (el && el.value) {
        var configKey = 'user_' + field;
        updates.push({ key: configKey, table: usersTable, column: el.value });
      }
    }
    
    // Projects mappings
    var projectsTable = document.getElementById('mapping-projects-table').value;
    var projectFields = ['name', 'description', 'color', 'status'];
    for (var i = 0; i < projectFields.length; i++) {
      var field = projectFields[i];
      var el = document.getElementById('map-project-' + field);
      if (el && el.value) {
        var configKey = 'project_' + field;
        updates.push({ key: configKey, table: projectsTable, column: el.value });
      }
    }
    
    // Crée seulement maintenant les tables de configuration nécessaires au mapping.
    try {
      await ensureConfigAndSettingsTables(await grist.docApi.listTables());
      await loadSettings();
    } catch (accessError) {
      showToast(formatAccessError(accessError), 'error');
      return;
    }

    // Update configuration table (update existing, add missing)
    var configData = await grist.docApi.fetchTable(state.CONFIG_TABLE);
    var actions = [];
    for (var i = 0; i < updates.length; i++) {
      var update = updates[i];
      var recordId = null;

      for (var j = 0; j < configData.Config_Key.length; j++) {
        if (configData.Config_Key[j] === update.key) {
          recordId = configData.id[j];
          break;
        }
      }

      if (recordId) {
        actions.push(['UpdateRecord', state.CONFIG_TABLE, recordId, {
          Table_Name: update.table,
          Column_Name: update.column
        }]);
      } else {
        actions.push(['AddRecord', state.CONFIG_TABLE, null, {
          Config_Key: update.key,
          Table_Name: update.table,
          Column_Name: update.column
        }]);
      }
    }
    if (actions.length > 0) await grist.docApi.applyUserActions(actions);
    await loadColumnMapping();
    var tablesAfterMapping = await grist.docApi.listTables();
    if (await hasValidMappedTaskTable(tablesAfterMapping)) {
      await saveSetting('install_mode', 'mapping_complete');
    } else {
      await saveSetting('install_mode', 'mapping_started');
      showToast('Mapping incomplet : vérifiez au minimum la table des tâches, le titre et le statut.', 'error');
      return;
    }
    
    showToast('✓ Configuration sauvegardée', 'success');
    closeModalForce();
    
    // Reload data with new mapping
    await loadAllData();
    refreshAllViews();
  } catch (e) {
    console.error('Error saving column mapping:', e);
    showToast('Erreur lors de la sauvegarde: ' + formatAccessError(e), 'error');
  }
}
