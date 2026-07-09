// Noms de table côté client francophone (utilisés pour détecter/renommer les
// tables PM_* en français). Purement statique, jamais réassigné.
export const CLIENT_TABLE_NAMES = {
  tasks: 'Taches',
  users: 'Utilisateurs',
  groups: 'Equipes',
  templates: 'Modeles',
  subtasks: 'Sous_taches',
  dependencies: 'Dependances',
  comments: 'Commentaires',
  timeEntries: 'Suivi_temps',
  customFields: 'Champs_personnalises',
  customFieldValues: 'Valeurs_champs_personnalises',
  categories: 'Categories',
  tags: 'Etiquettes',
  projects: 'Projets',
  config: 'Configuration_widget',
  settings: 'Parametres_widget',
  notifications: 'Notifications',
  activityLog: 'Journal_activite',
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
  notifications: 'Notifications & e-mail',
  security: 'Sécurité du document',
  mapping: 'Configuration avancée'
};
