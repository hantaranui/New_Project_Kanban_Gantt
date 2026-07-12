import { state } from './store.js';

// Noms de table côté client francophone (utilisés pour détecter/renommer les
// tables PM_* en français). Purement statique, jamais réassigné.
export const CLIENT_TABLE_NAMES = {
  tasks: 'Taches',
  users: 'Utilisateurs',
  groups: 'Equipes',
  subtasks: 'Sous_taches',
  comments: 'Commentaires',
  timeEntries: 'Suivi_temps',
  projects: 'Projets',
  config: 'Configuration_widget',
  settings: 'Parametres_widget',
  notifications: 'Notifications',
  attachments: 'Pieces_jointes',
  userInfo: 'Infos_utilisateurs'
};

// Libellés UI par défaut (personnalisables via les Paramètres). Statique,
// jamais réassigné : les overrides persistés vivent dans state.uiLabels.
export const defaultUiLabels = {
  projects: 'Projets',
  categories: 'Catégories',
  tags: 'Tags',
  statuses: 'Colonnes Kanban',
  cardDisplay: 'Affichage des cartes',
  raci: 'Mode RACI',
  automations: 'Automatisations',
  notifications: 'Notifications',
  security: 'Sécurité du document',
  mapping: 'Configuration avancée'
};

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
      }

      // Also update table names if they differ
      if (key === 'task_title') state.TASKS_TABLE = tableName;
      else if (key === 'user_name') state.USERS_TABLE = tableName;
      else if (key === 'project_name') state.PROJECTS_TABLE = tableName;
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
