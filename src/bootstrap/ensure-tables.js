import { t, currentLang, APP_VERSION } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { state } from '../store.js';
import { CLIENT_TABLE_NAMES, loadColumnMapping } from '../config.js';
import { showToast } from '../ui/toast.js';
import { openColumnMappingModal } from '../domains/column-mapping-ui.js';
import { saveSetting } from '../domains/settings.js';
import { switchTab } from '../ui/tabs.js';
// Temporary backwards import: loadSettings stays in main.js since it
// reassigns kanbanSort/cardDisplaySettings/customKanbanStatuses.
import { loadSettings } from '../main.js';

export function applyFrenchTableNames(updateDefaults) {
  state.TASKS_TABLE = CLIENT_TABLE_NAMES.tasks;
  state.USERS_TABLE = CLIENT_TABLE_NAMES.users;
  state.GROUPS_TABLE = CLIENT_TABLE_NAMES.groups;
  state.SUBTASKS_TABLE = CLIENT_TABLE_NAMES.subtasks;
  state.COMMENTS_TABLE = CLIENT_TABLE_NAMES.comments;
  state.TIME_ENTRIES_TABLE = CLIENT_TABLE_NAMES.timeEntries;
  state.PROJECTS_TABLE = CLIENT_TABLE_NAMES.projects;
  state.CONFIG_TABLE = CLIENT_TABLE_NAMES.config;
  state.SETTINGS_TABLE = CLIENT_TABLE_NAMES.settings;
  state.NOTIFICATIONS_TABLE = CLIENT_TABLE_NAMES.notifications;
  state.ATTACHMENTS_TABLE = CLIENT_TABLE_NAMES.attachments;
  state.USER_INFO_TABLE = CLIENT_TABLE_NAMES.userInfo;
  if (updateDefaults) {
    state.DEFAULT_TASKS_TABLE = CLIENT_TABLE_NAMES.tasks;
    state.DEFAULT_USERS_TABLE = CLIENT_TABLE_NAMES.users;
    state.DEFAULT_PROJECTS_TABLE = CLIENT_TABLE_NAMES.projects;
  }
}

export function hasFrenchClientTables(tableIds) {
  return tableIds.indexOf(CLIENT_TABLE_NAMES.config) !== -1 || tableIds.indexOf(CLIENT_TABLE_NAMES.tasks) !== -1;
}

export function isInsideGrist() {
  try { return window.frameElement !== null || window !== window.parent; }
  catch (e) { return true; }
}


export async function getRawSettingValue(key) {
  try {
    var data = await grist.docApi.fetchTable(state.SETTINGS_TABLE);
    if (!data || !data.Key) return null;
    for (var i = 0; i < data.Key.length; i++) {
      if (data.Key[i] === key) return data.Value[i];
    }
  } catch (e) {}
  return null;
}

export function buildDefaultConfigRecords() {
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
    ['project_status', state.PROJECTS_TABLE, 'Status', 'Statut', false, 'Status']
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

export async function tableHasColumns(tableId, requiredColumns) {
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

export async function getInstallModeFromExistingSettings(existingTables) {
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

export async function hasUsableDefaultTaskTable(existingTables) {
  var candidates = [CLIENT_TABLE_NAMES.tasks, 'PM_Tasks'];
  for (var i = 0; i < candidates.length; i++) {
    var tableId = candidates[i];
    if (existingTables.indexOf(tableId) === -1) continue;
    if (await tableHasColumns(tableId, ['Title', 'Status'])) return true;
  }
  return false;
}

export async function shouldShowClientSetup(existingTables) {
  existingTables = existingTables || await grist.docApi.listTables();
  if (hasFrenchClientTables(existingTables)) applyFrenchTableNames(true);

  // Installation automatique ou mapping déjà faits : on se base sur la structure réelle,
  // pas seulement sur un marqueur de réglage qui peut échouer selon les droits Grist.
  if (await hasUsableDefaultTaskTable(existingTables)) return false;
  if (await hasValidMappedTaskTable(existingTables)) return false;

  return true;
}

export function showClientSetup() {
  var setup = document.getElementById('client-setup');
  if (setup) setup.classList.remove('hidden');
  var main = document.getElementById('main-content');
  if (main) main.classList.add('hidden');
}

export function hideClientSetup() {
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

export function writeSetupDiagnostic(lines, type) {
  var box = document.getElementById('client-setup-diagnostics');
  if (!box) return;
  box.className = 'client-setup-diagnostics ' + (type || '');
  box.innerHTML = lines.map(function(line) { return '<div>' + sanitize(String(line)) + '</div>'; }).join('');
}

export async function runSetupDiagnostic() {
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

export async function setupCreateFrenchTables() {
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

export async function setupUseExistingTables() {
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

export async function ensureTables() {
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

    // Créée après USERS_TABLE : Assignee référence directement la table des
    // utilisateurs (Reference List, plusieurs assignés possibles). Category/Tag
    // natifs (Choice/Choice List) dès la création - pas de table séparée.
    if (!skipAutoCreateWorkTables && (state.TASKS_TABLE === state.DEFAULT_TASKS_TABLE && existingTables.indexOf(state.TASKS_TABLE) === -1)) {
      await grist.docApi.applyUserActions([
        ['AddTable', state.TASKS_TABLE, [
          { id: 'Title', type: 'Text' },
          { id: 'Description', type: 'Text' },
          { id: 'Status', type: 'Choice', widgetOptions: JSON.stringify({ choices: ['todo', 'progress', 'done', 'archived'] }) },
          { id: 'Priority', type: 'Choice', widgetOptions: JSON.stringify({ choices: ['high', 'medium', 'low'] }) },
          { id: 'Assignee', type: 'RefList:' + state.USERS_TABLE },
          { id: 'Group_Name', type: 'Text' },
          { id: 'Start_Date', type: 'Date' },
          { id: 'Due_Date', type: 'Date' },
          { id: 'Category', type: 'Choice' },
          { id: 'Tag', type: 'ChoiceList' },
          { id: 'Recurrence', type: 'Choice', widgetOptions: JSON.stringify({ choices: ['none', 'daily', 'weekly', 'monthly'] }) },
          { id: 'Estimated_Hours', type: 'Numeric' },
          { id: 'Created_At', type: 'Date' }
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
          { id: 'Created_At', type: 'Date' },
          { id: 'Rule_Id', type: 'Text' }
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
            ['AddColumn', state.TASKS_TABLE, 'Tag', { type: 'ChoiceList' }]
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

