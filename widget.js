(() => {
  // src/i18n.js
  var APP_VERSION = "166";
  var currentLang = "fr";
  var i18n = {
    fr: {
      notInGrist: "Ce widget doit \xEAtre utilis\xE9 dans Grist.",
      tabKanban: "Kanban",
      tabGantt: "Gantt",
      newTask: "Nouvelle t\xE2che",
      newProject: "Nouveau projet",
      statTotal: "Total",
      statTodo: "\xC0 faire",
      statProgress: "En cours",
      statDone: "Termin\xE9es",
      colTodo: "\xC0 faire",
      colProgress: "En cours",
      colDone: "Termin\xE9",
      noTasks: "Aucune t\xE2che",
      addTask: "+ Ajouter une t\xE2che",
      searchPlaceholder: "Rechercher une t\xE2che...",
      allStatuses: "Tous les statuts",
      allPriorities: "Toutes priorit\xE9s",
      colTaskName: "T\xE2che",
      colActions: "Actions",
      ganttTitle: "Diagramme de Gantt",
      ganttYear: "Ann\xE9e :",
      ganttToday: "Aujourd'hui",
      ganttDays: "Jours",
      ganttWeeks: "Semaines",
      ganttMonths: "Mois",
      ganttYear2: "Ann\xE9e",
      ganttTwoYears: "2 Ans",
      ganttSortLabel: "Trier :",
      ganttSortDefault: "D\xE9faut",
      ganttSortPriority: "Priorit\xE9",
      ganttSortAlpha: "A \u2192 Z",
      ganttSortDue: "\xC9ch\xE9ance",
      ganttCustom: "Personnalis\xE9",
      ganttRangeFrom: "Du :",
      ganttRangeTo: "au :",
      extensionDate: "Date de prolongation",
      extensionTooltip: "Prolongation : d\xE9passement de l'\xE9ch\xE9ance",
      autoExtendHint: "Prolonge automatiquement jusqu'\xE0 la date du jour tant que la t\xE2che n'est pas termin\xE9e",
      ganttFullYear: "Ann\xE9e compl\xE8te",
      ganttNavInfo: "Navigation infinie vers autres ann\xE9es",
      ganttViewRange: "Vue :",
      modalNewTask: "Nouvelle t\xE2che",
      fieldTitle: "Titre *",
      fieldDescription: "Description",
      fieldStatus: "Statut",
      fieldPriority: "Priorit\xE9",
      fieldAssignee: "Assign\xE9 \xE0",
      fieldGroup: "Groupe",
      fieldStartDate: "Date de d\xE9but",
      fieldDueDate: "\xC9ch\xE9ance",
      fieldCategory: "Cat\xE9gorie",
      priorityHigh: "Haute",
      priorityMedium: "Moyenne",
      priorityLow: "Basse",
      statusTodo: "\xC0 faire",
      statusProgress: "En cours",
      statusDone: "Termin\xE9",
      save: "Enregistrer",
      cancel: "Annuler",
      delete: "Supprimer",
      taskCreated: "T\xE2che cr\xE9\xE9e !",
      taskUpdated: "T\xE2che mise \xE0 jour !",
      taskDeleted: "T\xE2che supprim\xE9e.",
      taskMoved: "T\xE2che d\xE9plac\xE9e.",
      overdue: "En retard",
      notifications: "Alertes",
      overdueTasksAlert: "t\xE2che(s) en retard",
      upcomingTasksAlert: "t\xE2che(s) \xE0 venir (3j)",
      noAlerts: "Aucune alerte",
      markAllRead: "Tout effacer",
      markAsRead: "Effacer",
      automationSubtitle: "Actions automatiques quand les t\xE2ches changent",
      addRule: "Ajouter une r\xE8gle",
      triggerLabel: "D\xE9clencheur",
      triggerStatusChange: "Changement de statut",
      triggerPriorityChange: "Changement de priorit\xE9",
      triggerAssignmentChange: "Changement d'assignation",
      triggerOverdue: "T\xE2che en retard",
      triggerApproachingDeadline: "\xC9ch\xE9ance proche (3j)",
      conditionFrom: "De",
      conditionTo: "Vers",
      conditionAny: "N'importe quel",
      actionLabel: "Action",
      actionNotifyAssignee: "Notifier l'assign\xE9",
      actionNotifyProjectLead: "Notifier le responsable",
      actionNotifySpecific: "Notifier une personne",
      actionNotifyAll: "Notifier tout le monde",
      noRules: "Aucune r\xE8gle configur\xE9e",
      ruleCreated: "R\xE8gle cr\xE9\xE9e",
      ruleDeleted: "R\xE8gle supprim\xE9e",
      ruleSaved: "R\xE8gle sauvegard\xE9e",
      messageTemplate: "Message",
      defaultRules: "Ajouter les r\xE8gles par d\xE9faut",
      exportPdf: "Export PDF",
      searchPlaceholder: "Rechercher...",
      tags: "Tags",
      addTag: "Ajouter tag",
      totalTime: "Temps total",
      manageProjects: "G\xE9rer les projets",
      project: "Projet",
      projectName: "Nom du projet",
      projectLead: "Responsable",
      projectDescription: "Description",
      projectColor: "Couleur",
      projectStatus: "Statut",
      addProject: "Ajouter un projet",
      editProject: "Modifier le projet",
      deleteProject: "Supprimer le projet",
      noProject: "Sans projet",
      projectSearchPlaceholder: "Rechercher un projet...",
      tabSettings: "Param\xE8tres",
      settingsSubtitle: "Configurez vos projets, cat\xE9gories et autres options",
      projectsSubtitle: "G\xE9rez vos projets",
      categoriesSubtitle: "G\xE9rez les cat\xE9gories de t\xE2ches",
      tagsSubtitle: "G\xE9rez les tags pour vos t\xE2ches",
      addCategory: "Ajouter",
      categories: "Cat\xE9gories",
      tabTeam: "\xC9quipe",
      teamUsersTitle: "Utilisateurs",
      teamUsersSubtitle: "G\xE9rez les membres de votre \xE9quipe",
      manageRoles: "R\xF4les",
      manageRolesTitle: "G\xE9rer les r\xF4les",
      manageRolesSubtitle: "Ajoutez ou supprimez des r\xF4les utilis\xE9s dans votre \xE9quipe",
      addRole: "Ajouter un r\xF4le",
      newRolePlaceholder: "Nom du nouveau r\xF4le",
      rolesUpdated: "R\xF4les mis \xE0 jour !",
      confirmDeleteRole: "Supprimer ce r\xF4le ?",
      cannotDeleteUsedRole: "Ce r\xF4le est utilis\xE9 par des utilisateurs",
      teamGroupsTitle: "Groupes",
      teamGroupsSubtitle: "Organisez vos utilisateurs en groupes",
      addUser: "Ajouter",
      addGroup: "Ajouter",
      modalNewUser: "Nouvel utilisateur",
      modalNewGroup: "Nouveau groupe",
      fieldName: "Nom *",
      fieldEmail: "Email",
      fieldRole: "R\xF4le",
      roleAdmin: "Administrateur",
      roleMember: "Membre",
      roleViewer: "Lecteur",
      userCreated: "Utilisateur ajout\xE9 !",
      userDeleted: "Utilisateur supprim\xE9.",
      groupCreated: "Groupe cr\xE9\xE9 !",
      groupDeleted: "Groupe supprim\xE9.",
      confirmDeleteUser: "Supprimer cet utilisateur ?",
      confirmDeleteGroup: "Supprimer ce groupe ?",
      noUsers: "Aucun utilisateur",
      noGroups: "Aucun groupe",
      members: "membres",
      progression: "Progression",
      advancement: "Avancement",
      startLabel: "D\xE9but :",
      dueLabel: "\xC9ch\xE9ance :",
      quickActions: "Actions rapides",
      reopenTask: "Rouvrir la t\xE2che",
      startTask: "D\xE9marrer la t\xE2che",
      completeTask: "Terminer la t\xE2che",
      taskSummary: "R\xE9sum\xE9 de la t\xE2che",
      addAssignee: "Ajouter",
      searchAssignee: "Rechercher des noms...",
      subtasks: "Sous-t\xE2ches",
      addSubtask: "Ajouter une sous-t\xE2che",
      subtaskPlaceholder: "Nouvelle sous-t\xE2che...",
      noSubtasks: "Aucune sous-t\xE2che",
      subtaskCompleted: "Sous-t\xE2che termin\xE9e",
      subtaskDeleted: "Sous-t\xE2che supprim\xE9e",
      subtaskSaved: "Sous-t\xE2che modifi\xE9e",
      editSubtask: "Modifier la sous-t\xE2che",
      subtaskAssignee: "Responsable",
      dependencies: "D\xE9pendances",
      blockedBy: "Bloqu\xE9 par",
      noDependencies: "Aucune d\xE9pendance",
      dependencyAdded: "D\xE9pendance ajout\xE9e",
      comments: "Commentaires",
      addComment: "Ajouter un commentaire",
      commentPlaceholder: "\xC9crire un commentaire...",
      noComments: "Aucun commentaire",
      commentAdded: "Commentaire ajout\xE9",
      commentDeleted: "Commentaire supprim\xE9",
      justNow: "\xC0 l'instant",
      minutesAgo: "il y a {n} min",
      hoursAgo: "il y a {n}h",
      daysAgo: "il y a {n}j",
      timeTracking: "Suivi du temps",
      startTimer: "D\xE9marrer",
      stopTimer: "Arr\xEAter",
      timerRunning: "En cours...",
      totalTime: "Temps total",
      estimatedTime: "Temps estim\xE9",
      timeEntries: "Entr\xE9es de temps",
      timeEntryAdded: "Temps enregistr\xE9",
      hours: "h",
      minutes: "min",
      recurrence: "R\xE9currence",
      recurrenceNone: "Aucune",
      recurrenceDaily: "Quotidienne",
      recurrenceWeekly: "Hebdomadaire",
      recurrenceBiweekly: "Toutes les 2 semaines",
      recurrenceMonthly: "Mensuelle",
      recurrenceQuarterly: "Trimestrielle",
      recurrenceYearly: "Annuelle",
      nextOccurrence: "Prochaine occurrence cr\xE9\xE9e",
      recurrenceExplain: 'Quand cette t\xE2che est marqu\xE9e "Termin\xE9e", une nouvelle occurrence est automatiquement cr\xE9\xE9e avec les dates d\xE9cal\xE9es.',
      generateMonth: "G\xE9n\xE9rer pour le mois",
      generateYear: "G\xE9n\xE9rer pour l'ann\xE9e",
      occurrencesGenerated: "occurrences g\xE9n\xE9r\xE9es",
      fieldName: "Nom",
      categories: "Cat\xE9gories",
      addCategory: "Ajouter",
      edit: "Modifier",
      required: "requis",
      tag: "Tag",
      manageRolesTitle: "G\xE9rer les r\xF4les",
      mappingSubtitle: "Mappez vos propres tables et colonnes Grist",
      configureMapping: "Configurer le mapping",
      mappingDescription: "Vous pouvez cr\xE9er les tables en fran\xE7ais ou mapper vos propres tables existantes pour r\xE9utiliser vos donn\xE9es.",
      mappingGuide: "Consulter le guide complet du syst\xE8me de mapping",
      securitySubtitle: "Prot\xE9gez les tables du widget avec des r\xE8gles d'acc\xE8s Grist (ACL)",
      raciSubtitle: "Activez la matrice RACI pour d\xE9finir les r\xF4les sur chaque t\xE2che",
      raciResponsible: "Responsable (R)",
      raciAccountable: "Approbateur (A)",
      raciConsulted: "Consult\xE9 (C)",
      raciInformed: "Inform\xE9 (I)",
      raciEnabled: "Mode RACI activ\xE9",
      raciDisabled: "Mode RACI d\xE9sactiv\xE9",
      projectActive: "Actif",
      projectCompleted: "Termin\xE9",
      projectArchived: "Archiv\xE9"
    }
  };
  function t(key) {
    return i18n[currentLang] && i18n[currentLang][key] || i18n.fr[key] || key;
  }

  // src/utils/dates.js
  function formatDate(d) {
    if (!d) return "";
    var date = new Date(d * 1e3);
    if (isNaN(date.getTime())) {
      date = new Date(d);
      if (isNaN(date.getTime())) return "";
    }
    return date.toLocaleDateString(currentLang === "fr" ? "fr-FR" : "en-US", { day: "2-digit", month: "2-digit", year: "numeric" });
  }
  function toEpoch(dateStr) {
    if (!dateStr) return null;
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    return Math.floor(d.getTime() / 1e3);
  }
  function fromEpoch(ts) {
    if (!ts) return "";
    var d = new Date(ts * 1e3);
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }
  function getISOWeek(date) {
    var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 864e5 + 1) / 7);
  }
  function getWeekStart(year, weekNum) {
    var jan4 = new Date(year, 0, 4);
    var dayOfWeek = jan4.getDay() || 7;
    var monday = new Date(jan4);
    monday.setDate(jan4.getDate() - dayOfWeek + 1 + (weekNum - 1) * 7);
    return monday;
  }
  function formatTimeAgo(timestamp) {
    if (!timestamp) return "";
    var now = Math.floor(Date.now() / 1e3);
    var diff = now - timestamp;
    if (diff < 60) return t("justNow");
    if (diff < 3600) return t("minutesAgo").replace("{n}", Math.floor(diff / 60));
    if (diff < 86400) return t("hoursAgo").replace("{n}", Math.floor(diff / 3600));
    return t("daysAgo").replace("{n}", Math.floor(diff / 86400));
  }

  // src/utils/labels.js
  function priorityLabel(p) {
    if (p === "high") return t("priorityHigh");
    if (p === "medium") return t("priorityMedium");
    if (p === "low") return t("priorityLow");
    return p || "";
  }
  function isMilestone(st) {
    return st && st.Type === "milestone";
  }
  function recurrenceSymbol(rec) {
    var map = { daily: "\u{1F504} J", weekly: "\u{1F504} S", biweekly: "\u{1F504} 2S", monthly: "\u{1F504} M", quarterly: "\u{1F504} T", yearly: "\u{1F504} A" };
    return map[rec] || "\u{1F504}";
  }

  // src/store.js
  var state = {
    tasks: [],
    users: [],
    groups: [],
    subtasks: [],
    comments: [],
    timeEntries: [],
    projects: [],
    currentProjectId: null,
    currentFilterRole: null,
    currentFilterAssignee: null,
    currentFilterCategory: null,
    currentFilterTag: null,
    mineOnly: false,
    activeTimers: {},
    raciEnabled: false,
    automationRules: [],
    notifyConcernedEnabled: true,
    pmNotifications: [],
    _settingsCache: {},
    TASKS_TABLE: "PM_Tasks",
    USERS_TABLE: "PM_Users",
    GROUPS_TABLE: "PM_Groups",
    SUBTASKS_TABLE: "PM_Subtasks",
    COMMENTS_TABLE: "PM_Comments",
    TIME_ENTRIES_TABLE: "PM_TimeEntries",
    PROJECTS_TABLE: "PM_Projects",
    CONFIG_TABLE: "PM_Config",
    SETTINGS_TABLE: "PM_Settings",
    NOTIFICATIONS_TABLE: "PM_Notifications",
    ATTACHMENTS_TABLE: "PM_Attachments",
    USER_INFO_TABLE: "PM_UserInfo",
    attachments: [],
    uiLabels: Object.assign({}, defaultUiLabels),
    DEFAULT_TASKS_TABLE: "PM_Tasks",
    DEFAULT_USERS_TABLE: "PM_Users",
    DEFAULT_PROJECTS_TABLE: "PM_Projects",
    taskTableColumns: null,
    columnMapping: {
      tasks: {
        title: "Title",
        description: "Description",
        status: "Status",
        priority: "Priority",
        assignee: "Assignee",
        group: "Group_Name",
        startDate: "Start_Date",
        dueDate: "Due_Date",
        category: "Category",
        tag: "Tag",
        recurrence: "Recurrence",
        estimatedHours: "Estimated_Hours",
        createdAt: "Created_At",
        projectId: "Project_Id"
      },
      users: {
        name: "Name",
        email: "Email",
        role: "Role",
        group: "Group_Name"
      },
      projects: {
        name: "Name",
        description: "Description",
        color: "Color",
        status: "Status",
        lead: "Lead"
      }
    },
    isOwner: false,
    isEditor: false,
    currentUserEmail: ""
  };

  // src/config.js
  var CLIENT_TABLE_NAMES = {
    tasks: "Taches",
    users: "Utilisateurs",
    groups: "Equipes",
    subtasks: "Sous_taches",
    comments: "Commentaires",
    timeEntries: "Suivi_temps",
    projects: "Projets",
    config: "Configuration_widget",
    settings: "Parametres_widget",
    notifications: "Notifications",
    attachments: "Pieces_jointes",
    userInfo: "Infos_utilisateurs"
  };
  var defaultUiLabels = {
    projects: "Projets",
    categories: "Cat\xE9gories",
    tags: "Tags",
    statuses: "Colonnes Kanban",
    cardDisplay: "Affichage des cartes",
    raci: "Mode RACI",
    automations: "Automatisations",
    notifications: "Notifications",
    security: "S\xE9curit\xE9 du document",
    mapping: "Configuration avanc\xE9e"
  };
  async function loadColumnMapping() {
    try {
      var configData = await grist.docApi.fetchTable(state.CONFIG_TABLE);
      if (!configData || !configData.Config_Key) return;
      for (var i = 0; i < configData.Config_Key.length; i++) {
        var key = configData.Config_Key[i];
        var tableName = configData.Table_Name[i];
        var columnName = configData.Column_Name[i];
        var toCamel = function(s) {
          return s.replace(/_([a-z])/g, function(_, c) {
            return c.toUpperCase();
          });
        };
        if (key.startsWith("task_")) {
          var field = toCamel(key.slice(5));
          if (state.columnMapping.tasks[field] !== void 0) {
            state.columnMapping.tasks[field] = columnName;
          }
        } else if (key.startsWith("user_")) {
          var field = toCamel(key.slice(5));
          if (state.columnMapping.users[field] !== void 0) {
            state.columnMapping.users[field] = columnName;
          }
        } else if (key.startsWith("project_")) {
          var field = toCamel(key.slice(8));
          if (state.columnMapping.projects[field] !== void 0) {
            state.columnMapping.projects[field] = columnName;
          }
        }
        if (key === "task_title") state.TASKS_TABLE = tableName;
        else if (key === "user_name") state.USERS_TABLE = tableName;
        else if (key === "project_name") state.PROJECTS_TABLE = tableName;
      }
    } catch (e) {
      console.log("Column mapping not loaded, using defaults:", e);
    }
  }
  function setField(record, entity, field, value) {
    if (!record || !state.columnMapping[entity]) return;
    var columnName = state.columnMapping[entity][field];
    if (columnName) {
      record[columnName] = value;
    }
  }
  function getColumnName(entity, field) {
    if (!state.columnMapping[entity]) return field;
    return state.columnMapping[entity][field] || field;
  }

  // src/utils/sanitize.js
  function sanitize(str) {
    if (!str) return "";
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // src/ui/confirm-modal.js
  var confirmResolve = null;
  function showConfirmModal(message, title, okLabel) {
    return new Promise(function(resolve) {
      confirmResolve = resolve;
      document.getElementById("confirm-modal-title").textContent = title || (currentLang === "fr" ? "Confirmation" : "Confirmation");
      document.getElementById("confirm-modal-message").textContent = message;
      var okBtn = document.getElementById("confirm-modal-ok");
      if (okBtn) okBtn.textContent = okLabel || (currentLang === "fr" ? "Supprimer" : "Delete");
      document.getElementById("confirm-modal").style.display = "flex";
    });
  }
  function closeConfirmModal(result) {
    document.getElementById("confirm-modal").style.display = "none";
    if (confirmResolve) {
      confirmResolve(result);
      confirmResolve = null;
    }
  }
  var promptResolve = null;
  function showPromptModal(title, fields, defaults) {
    return new Promise(function(resolve) {
      promptResolve = resolve;
      document.getElementById("prompt-modal-title").textContent = title;
      var body = "";
      for (var i = 0; i < fields.length; i++) {
        var f = fields[i];
        var val = defaults && defaults[i] !== void 0 ? defaults[i] : "";
        body += "<label>" + f.label + "</label>";
        if (f.type === "color") {
          body += '<input type="color" id="prompt-field-' + i + '" value="' + (val || "#3b82f6") + '">';
        } else if (f.type === "emoji") {
          body += '<div class="emoji-field-wrap">';
          body += '<input type="text" id="prompt-field-' + i + '" value="' + sanitize(val) + '" placeholder="' + (f.placeholder || "") + '" class="emoji-field-input">';
          body += '<button type="button" class="emoji-picker-btn" onclick="toggleEmojiPicker(' + i + ')">\u{1F600}</button>';
          body += "</div>";
          body += '<div class="emoji-picker-grid" id="emoji-picker-' + i + '" style="display:none;"></div>';
        } else {
          body += '<input type="text" id="prompt-field-' + i + '" value="' + sanitize(val) + '" placeholder="' + (f.placeholder || "") + '">';
        }
      }
      document.getElementById("prompt-modal-body").innerHTML = body;
      document.getElementById("prompt-modal").style.display = "flex";
      var firstInput = document.getElementById("prompt-field-0");
      if (firstInput) setTimeout(function() {
        firstInput.focus();
        firstInput.select();
      }, 50);
      document.getElementById("prompt-modal")._fieldCount = fields.length;
      document.getElementById("prompt-modal").onkeydown = function(e) {
        if (e.key === "Enter") submitPromptModal();
        if (e.key === "Escape") closePromptModal();
      };
    });
  }
  function submitPromptModal() {
    var count = document.getElementById("prompt-modal")._fieldCount || 1;
    var values = [];
    for (var i = 0; i < count; i++) {
      var el = document.getElementById("prompt-field-" + i);
      values.push(el ? el.value : "");
    }
    document.getElementById("prompt-modal").style.display = "none";
    if (promptResolve) {
      promptResolve(values);
      promptResolve = null;
    }
  }
  var EMOJI_CATEGORIES = [
    { icon: "\u{1F600}", label: "Smileys", emojis: [
      "\u{1F600}",
      "\u{1F603}",
      "\u{1F604}",
      "\u{1F601}",
      "\u{1F606}",
      "\u{1F605}",
      "\u{1F923}",
      "\u{1F602}",
      "\u{1F642}",
      "\u{1F60A}",
      "\u{1F607}",
      "\u{1F970}",
      "\u{1F60D}",
      "\u{1F929}",
      "\u{1F618}",
      "\u{1F617}",
      "\u{1F60B}",
      "\u{1F61B}",
      "\u{1F61C}",
      "\u{1F92A}",
      "\u{1F60E}",
      "\u{1F913}",
      "\u{1F9D0}",
      "\u{1F60F}",
      "\u{1F612}",
      "\u{1F61E}",
      "\u{1F614}",
      "\u{1F61F}",
      "\u{1F615}",
      "\u{1F641}",
      "\u{1F623}",
      "\u{1F616}",
      "\u{1F62B}",
      "\u{1F629}",
      "\u{1F97A}",
      "\u{1F622}",
      "\u{1F62D}",
      "\u{1F624}",
      "\u{1F620}",
      "\u{1F621}",
      "\u{1F92C}",
      "\u{1F608}",
      "\u{1F47F}",
      "\u{1F480}",
      "\u2620\uFE0F",
      "\u{1F4A9}",
      "\u{1F921}",
      "\u{1F479}",
      "\u{1F47A}",
      "\u{1F47B}",
      "\u{1F47D}",
      "\u{1F916}",
      "\u{1F63A}",
      "\u{1F638}",
      "\u{1F639}",
      "\u{1F63B}",
      "\u{1F63C}",
      "\u{1F63D}",
      "\u{1F640}",
      "\u{1F63F}",
      "\u{1F63E}"
    ] },
    { icon: "\u{1F44B}", label: "Gestes", emojis: [
      "\u{1F44B}",
      "\u{1F91A}",
      "\u{1F590}\uFE0F",
      "\u270B",
      "\u{1F596}",
      "\u{1F44C}",
      "\u{1F90C}",
      "\u{1F90F}",
      "\u270C\uFE0F",
      "\u{1F91E}",
      "\u{1F91F}",
      "\u{1F918}",
      "\u{1F919}",
      "\u{1F448}",
      "\u{1F449}",
      "\u{1F446}",
      "\u{1F595}",
      "\u{1F447}",
      "\u261D\uFE0F",
      "\u{1F44D}",
      "\u{1F44E}",
      "\u270A",
      "\u{1F44A}",
      "\u{1F91B}",
      "\u{1F91C}",
      "\u{1F44F}",
      "\u{1F64C}",
      "\u{1F450}",
      "\u{1F932}",
      "\u{1F91D}",
      "\u{1F64F}",
      "\u270D\uFE0F",
      "\u{1F485}",
      "\u{1F933}",
      "\u{1F4AA}",
      "\u{1F9BE}",
      "\u{1F440}",
      "\u{1F441}\uFE0F",
      "\u{1F464}",
      "\u{1F465}"
    ] },
    { icon: "\u{1F43E}", label: "Animaux", emojis: [
      "\u{1F436}",
      "\u{1F431}",
      "\u{1F42D}",
      "\u{1F439}",
      "\u{1F430}",
      "\u{1F98A}",
      "\u{1F43B}",
      "\u{1F43C}",
      "\u{1F428}",
      "\u{1F42F}",
      "\u{1F981}",
      "\u{1F42E}",
      "\u{1F437}",
      "\u{1F438}",
      "\u{1F435}",
      "\u{1F648}",
      "\u{1F649}",
      "\u{1F64A}",
      "\u{1F412}",
      "\u{1F414}",
      "\u{1F427}",
      "\u{1F426}",
      "\u{1F424}",
      "\u{1F986}",
      "\u{1F985}",
      "\u{1F989}",
      "\u{1F987}",
      "\u{1F43A}",
      "\u{1F417}",
      "\u{1F434}",
      "\u{1F984}",
      "\u{1F41D}",
      "\u{1F41B}",
      "\u{1F98B}",
      "\u{1F40C}",
      "\u{1F41E}",
      "\u{1F41C}",
      "\u{1FAB2}",
      "\u{1F422}",
      "\u{1F40D}",
      "\u{1F98E}",
      "\u{1F419}",
      "\u{1F980}",
      "\u{1F420}",
      "\u{1F41F}",
      "\u{1F42C}",
      "\u{1F433}",
      "\u{1F40B}",
      "\u{1F988}",
      "\u{1F40A}"
    ] },
    { icon: "\u{1F33F}", label: "Nature", emojis: [
      "\u{1F338}",
      "\u{1F490}",
      "\u{1F337}",
      "\u{1F339}",
      "\u{1F940}",
      "\u{1F33A}",
      "\u{1F33B}",
      "\u{1F33C}",
      "\u{1F331}",
      "\u{1F332}",
      "\u{1F333}",
      "\u{1F334}",
      "\u{1F335}",
      "\u{1F340}",
      "\u2618\uFE0F",
      "\u{1F341}",
      "\u{1F342}",
      "\u{1F343}",
      "\u{1FAB4}",
      "\u{1F30D}",
      "\u{1F30E}",
      "\u{1F30F}",
      "\u{1F311}",
      "\u{1F312}",
      "\u{1F313}",
      "\u{1F314}",
      "\u{1F315}",
      "\u{1F319}",
      "\u2B50",
      "\u{1F31F}",
      "\u2728",
      "\u26A1",
      "\u2600\uFE0F",
      "\u{1F324}\uFE0F",
      "\u26C5",
      "\u{1F327}\uFE0F",
      "\u{1F308}",
      "\u2744\uFE0F",
      "\u{1F525}",
      "\u{1F4A7}"
    ] },
    { icon: "\u{1F355}", label: "Nourriture", emojis: [
      "\u{1F34E}",
      "\u{1F350}",
      "\u{1F34A}",
      "\u{1F34B}",
      "\u{1F34C}",
      "\u{1F349}",
      "\u{1F347}",
      "\u{1F353}",
      "\u{1FAD0}",
      "\u{1F352}",
      "\u{1F351}",
      "\u{1F96D}",
      "\u{1F34D}",
      "\u{1F965}",
      "\u{1F95D}",
      "\u{1F345}",
      "\u{1F951}",
      "\u{1F346}",
      "\u{1F954}",
      "\u{1F955}",
      "\u{1F33D}",
      "\u{1F336}\uFE0F",
      "\u{1FAD1}",
      "\u{1F952}",
      "\u{1F96C}",
      "\u{1F966}",
      "\u{1F9C4}",
      "\u{1F9C5}",
      "\u{1F344}",
      "\u{1F95C}",
      "\u{1F35E}",
      "\u{1F950}",
      "\u{1F956}",
      "\u{1F9C0}",
      "\u{1F356}",
      "\u{1F357}",
      "\u{1F969}",
      "\u{1F32D}",
      "\u{1F354}",
      "\u{1F35F}",
      "\u{1F355}",
      "\u{1F32E}",
      "\u{1F363}",
      "\u{1F369}",
      "\u{1F36A}",
      "\u{1F382}",
      "\u{1F370}",
      "\u2615",
      "\u{1F375}",
      "\u{1F9C3}"
    ] },
    { icon: "\u26BD", label: "Activit\xE9s", emojis: [
      "\u26BD",
      "\u{1F3C0}",
      "\u{1F3C8}",
      "\u26BE",
      "\u{1F94E}",
      "\u{1F3BE}",
      "\u{1F3D0}",
      "\u{1F3C9}",
      "\u{1F94F}",
      "\u{1F3B1}",
      "\u{1F3D3}",
      "\u{1F3F8}",
      "\u{1F3D2}",
      "\u{1F945}",
      "\u26F3",
      "\u{1F3F9}",
      "\u{1F3A3}",
      "\u{1F93F}",
      "\u{1F94A}",
      "\u{1F94B}",
      "\u{1F3CB}\uFE0F",
      "\u{1F938}",
      "\u26F7\uFE0F",
      "\u{1F3C2}",
      "\u{1F3C4}",
      "\u{1F6B4}",
      "\u{1F3C7}",
      "\u{1F9D7}",
      "\u{1F3AA}",
      "\u{1F3AD}",
      "\u{1F3A8}",
      "\u{1F3AC}",
      "\u{1F3A4}",
      "\u{1F3A7}",
      "\u{1F3BC}",
      "\u{1F3B9}",
      "\u{1F941}",
      "\u{1F3B7}",
      "\u{1F3BA}",
      "\u{1F3B8}",
      "\u{1F3AE}",
      "\u{1F3B2}",
      "\u265F\uFE0F",
      "\u{1F9E9}",
      "\u{1F3AF}",
      "\u{1F3B3}",
      "\u{1F3B0}",
      "\u{1F3C6}",
      "\u{1F947}",
      "\u{1F389}"
    ] },
    { icon: "\u{1F697}", label: "Voyages", emojis: [
      "\u{1F697}",
      "\u{1F695}",
      "\u{1F699}",
      "\u{1F68C}",
      "\u{1F68E}",
      "\u{1F3CE}\uFE0F",
      "\u{1F693}",
      "\u{1F691}",
      "\u{1F692}",
      "\u{1F690}",
      "\u{1F6FB}",
      "\u{1F69A}",
      "\u{1F69B}",
      "\u{1F69C}",
      "\u{1F6F5}",
      "\u{1F3CD}\uFE0F",
      "\u{1F6B2}",
      "\u{1F6F4}",
      "\u{1F682}",
      "\u{1F686}",
      "\u{1F687}",
      "\u{1F68A}",
      "\u{1F681}",
      "\u{1F6E9}\uFE0F",
      "\u2708\uFE0F",
      "\u{1F680}",
      "\u{1F6F8}",
      "\u{1F6A2}",
      "\u26F5",
      "\u{1F6E5}\uFE0F",
      "\u{1F3E0}",
      "\u{1F3E1}",
      "\u{1F3E2}",
      "\u{1F3E3}",
      "\u{1F3E5}",
      "\u{1F3E6}",
      "\u{1F3D7}\uFE0F",
      "\u{1F3DB}\uFE0F",
      "\u26EA",
      "\u{1F54C}",
      "\u{1F5FC}",
      "\u{1F5FD}",
      "\u26F2",
      "\u{1F3A1}",
      "\u{1F3A2}",
      "\u{1F3D5}\uFE0F",
      "\u{1F30B}",
      "\u{1F3D4}\uFE0F",
      "\u{1F5FB}",
      "\u{1F3D6}\uFE0F"
    ] },
    { icon: "\u{1F4A1}", label: "Objets", emojis: [
      "\u231A",
      "\u{1F4F1}",
      "\u{1F4BB}",
      "\u2328\uFE0F",
      "\u{1F5A5}\uFE0F",
      "\u{1F5A8}\uFE0F",
      "\u{1F5B1}\uFE0F",
      "\u{1F4BE}",
      "\u{1F4BF}",
      "\u{1F4F7}",
      "\u{1F4F9}",
      "\u{1F3A5}",
      "\u{1F4FA}",
      "\u{1F4FB}",
      "\u23F0",
      "\u{1F514}",
      "\u{1F4E2}",
      "\u{1F4E3}",
      "\u{1F50A}",
      "\u{1F507}",
      "\u{1F4A1}",
      "\u{1F526}",
      "\u{1F56F}\uFE0F",
      "\u{1F4D6}",
      "\u{1F4DA}",
      "\u{1F4DD}",
      "\u270F\uFE0F",
      "\u{1F58A}\uFE0F",
      "\u{1F58B}\uFE0F",
      "\u{1F4CC}",
      "\u{1F4CE}",
      "\u{1F517}",
      "\u{1F4D0}",
      "\u{1F4CF}",
      "\u2702\uFE0F",
      "\u{1F5C3}\uFE0F",
      "\u{1F5C2}\uFE0F",
      "\u{1F4C1}",
      "\u{1F4C2}",
      "\u{1F4C5}",
      "\u{1F4CA}",
      "\u{1F4C8}",
      "\u{1F4C9}",
      "\u{1F4CB}",
      "\u{1F4D1}",
      "\u{1F512}",
      "\u{1F513}",
      "\u{1F511}",
      "\u{1F527}",
      "\u{1F528}",
      "\u{1F6E0}\uFE0F",
      "\u2699\uFE0F",
      "\u{1F9F2}",
      "\u{1F48A}",
      "\u{1FA7A}",
      "\u{1F9EA}",
      "\u{1F52C}",
      "\u{1F52D}",
      "\u{1F4E1}",
      "\u{1F489}",
      "\u{1F3F7}\uFE0F",
      "\u{1F4E6}",
      "\u{1F4EE}",
      "\u{1F4E7}",
      "\u{1F4E9}",
      "\u2709\uFE0F",
      "\u{1F48C}",
      "\u{1F4B0}",
      "\u{1F4B3}",
      "\u{1F48E}"
    ] },
    { icon: "\u2764\uFE0F", label: "Symboles", emojis: [
      "\u2764\uFE0F",
      "\u{1F9E1}",
      "\u{1F49B}",
      "\u{1F49A}",
      "\u{1F499}",
      "\u{1F49C}",
      "\u{1F5A4}",
      "\u{1F90D}",
      "\u{1F90E}",
      "\u{1F494}",
      "\u2763\uFE0F",
      "\u{1F495}",
      "\u{1F49E}",
      "\u{1F493}",
      "\u{1F497}",
      "\u{1F496}",
      "\u{1F498}",
      "\u{1F49D}",
      "\u{1F49F}",
      "\u262E\uFE0F",
      "\u271D\uFE0F",
      "\u262A\uFE0F",
      "\u{1F549}\uFE0F",
      "\u2638\uFE0F",
      "\u2721\uFE0F",
      "\u{1F52F}",
      "\u{1F54E}",
      "\u262F\uFE0F",
      "\u2626\uFE0F",
      "\u{1F6D0}",
      "\u2648",
      "\u2649",
      "\u264A",
      "\u264B",
      "\u264C",
      "\u264D",
      "\u264E",
      "\u264F",
      "\u2650",
      "\u2651",
      "\u2652",
      "\u2653",
      "\u26CE",
      "\u{1F500}",
      "\u25B6\uFE0F",
      "\u23F8\uFE0F",
      "\u23F9\uFE0F",
      "\u23FA\uFE0F",
      "\u23ED\uFE0F",
      "\u23EE\uFE0F",
      "\u2705",
      "\u274C",
      "\u2753",
      "\u2757",
      "\u203C\uFE0F",
      "\u26A0\uFE0F",
      "\u{1F6AB}",
      "\u2B55",
      "\u{1F534}",
      "\u{1F7E0}",
      "\u{1F7E1}",
      "\u{1F7E2}",
      "\u{1F535}",
      "\u{1F7E3}",
      "\u{1F7E4}",
      "\u26AB",
      "\u26AA",
      "\u{1F536}",
      "\u{1F537}",
      "\u2660\uFE0F",
      "\u2665\uFE0F",
      "\u2666\uFE0F",
      "\u2663\uFE0F",
      "\u{1F3C1}",
      "\u{1F6A9}",
      "\u{1F38C}",
      "\u{1F3F4}",
      "\u{1F3F3}\uFE0F",
      "\u{1F3F3}\uFE0F\u200D\u{1F308}",
      "\u{1F1EB}\u{1F1F7}"
    ] }
  ];
  var _emojiPickerFieldIndex = null;
  function toggleEmojiPicker(fieldIndex) {
    var picker = document.getElementById("emoji-picker-" + fieldIndex);
    if (!picker) return;
    if (picker.style.display !== "none") {
      picker.style.display = "none";
      return;
    }
    _emojiPickerFieldIndex = fieldIndex;
    renderEmojiPicker(fieldIndex, 0, "");
    picker.style.display = "block";
  }
  function renderEmojiPicker(fieldIndex, catIndex, search) {
    var picker = document.getElementById("emoji-picker-" + fieldIndex);
    if (!picker) return;
    var html = '<div class="emoji-picker-search">';
    html += '<input type="text" class="emoji-search-input" placeholder="' + (currentLang === "fr" ? "Rechercher..." : "Search...") + '" value="' + sanitize(search) + '" oninput="renderEmojiPicker(' + fieldIndex + "," + catIndex + ',this.value)">';
    html += "</div>";
    html += '<div class="emoji-picker-tabs">';
    for (var c = 0; c < EMOJI_CATEGORIES.length; c++) {
      html += '<button type="button" class="emoji-tab' + (c === catIndex && !search ? " emoji-tab-active" : "") + '" onclick="renderEmojiPicker(' + fieldIndex + "," + c + `,'')" title="` + EMOJI_CATEGORIES[c].label + '">' + EMOJI_CATEGORIES[c].icon + "</button>";
    }
    html += "</div>";
    html += '<div class="emoji-picker-items">';
    if (search) {
      var q = search.toLowerCase();
      for (var ci = 0; ci < EMOJI_CATEGORIES.length; ci++) {
        var cat = EMOJI_CATEGORIES[ci];
        var matched = cat.emojis.filter(function(e) {
          return cat.label.toLowerCase().indexOf(q) !== -1 || e.indexOf(q) !== -1;
        });
        if (matched.length > 0) {
          html += '<div class="emoji-cat-label">' + cat.label + "</div>";
          html += '<div class="emoji-cat-grid">';
          for (var m = 0; m < matched.length; m++) {
            html += '<button type="button" class="emoji-pick-item" onclick="selectEmoji(' + fieldIndex + ',this.textContent)">' + matched[m] + "</button>";
          }
          html += "</div>";
        }
      }
    } else {
      var cat = EMOJI_CATEGORIES[catIndex];
      html += '<div class="emoji-cat-grid">';
      for (var ei = 0; ei < cat.emojis.length; ei++) {
        html += '<button type="button" class="emoji-pick-item" onclick="selectEmoji(' + fieldIndex + ',this.textContent)">' + cat.emojis[ei] + "</button>";
      }
      html += "</div>";
    }
    html += "</div>";
    picker.innerHTML = html;
    if (search) {
      var inp = picker.querySelector(".emoji-search-input");
      if (inp) {
        inp.focus();
        var l = inp.value.length;
        inp.setSelectionRange(l, l);
      }
    }
  }
  function selectEmoji(fieldIndex, emoji) {
    var input = document.getElementById("prompt-field-" + fieldIndex);
    if (input) input.value = emoji;
    var picker = document.getElementById("emoji-picker-" + fieldIndex);
    if (picker) picker.style.display = "none";
  }
  function closePromptModal() {
    document.getElementById("prompt-modal").style.display = "none";
    if (promptResolve) {
      promptResolve(null);
      promptResolve = null;
    }
  }

  // src/ui/toast.js
  function showToast(msg, type) {
    var container = document.getElementById("toast-container");
    var toast = document.createElement("div");
    toast.className = "toast toast-" + (type || "info");
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(function() {
      toast.remove();
    }, 3e3);
  }

  // src/domains/comments.js
  function getTaskComments(taskId) {
    return state.comments.filter(function(c) {
      return c.Task_Id === taskId;
    }).sort(function(a, b) {
      return (b.Created_At || 0) - (a.Created_At || 0);
    });
  }

  // src/domains/time-tracking.js
  function getTaskTimeEntries(taskId) {
    return state.timeEntries.filter(function(te) {
      return te.Task_Id === taskId;
    }).sort(function(a, b) {
      return (b.Start_Time || 0) - (a.Start_Time || 0);
    });
  }
  function getTaskTotalTime(taskId) {
    var entries = getTaskTimeEntries(taskId);
    var total = 0;
    for (var i = 0; i < entries.length; i++) {
      total += entries[i].Duration || 0;
    }
    if (state.activeTimers[taskId]) {
      total += Math.floor(Date.now() / 1e3) - state.activeTimers[taskId];
    }
    return total;
  }
  function formatDuration(seconds) {
    if (!seconds || seconds < 0) return "0" + t("minutes");
    var hours = Math.floor(seconds / 3600);
    var mins = Math.floor(seconds % 3600 / 60);
    if (hours > 0) {
      return hours + t("hours") + " " + mins + t("minutes");
    }
    return mins + t("minutes");
  }
  function formatDurationShort(seconds) {
    if (!seconds || seconds < 0) return "0m";
    var hours = Math.floor(seconds / 3600);
    var mins = Math.floor(seconds % 3600 / 60);
    if (hours > 0) {
      return hours + "h" + (mins > 0 ? mins + "m" : "");
    }
    return mins + "m";
  }
  async function startTimer(taskId) {
    if (state.activeTimers[taskId]) return;
    var now = Math.floor(Date.now() / 1e3);
    try {
      await grist.docApi.applyUserActions([
        ["AddRecord", state.TIME_ENTRIES_TABLE, null, {
          Task_Id: taskId,
          User: state.currentUserEmail || "Utilisateur",
          Start_Time: now,
          End_Time: null,
          Duration: 0,
          Description: currentLang === "fr" ? "Timer en cours" : "Running timer"
        }]
      ]);
      state.activeTimers[taskId] = now;
      await loadAllData();
      openEditTaskModal(taskId);
    } catch (e) {
      console.error("Error starting timer:", e);
      showToast("Error: " + e.message, "error");
    }
  }
  async function stopTimer(taskId) {
    if (!state.activeTimers[taskId]) return;
    var startTime = state.activeTimers[taskId];
    var endTime = Math.floor(Date.now() / 1e3);
    var duration = endTime - startTime;
    var openEntry = state.timeEntries.find(function(te) {
      return te.Task_Id === taskId && te.Start_Time === startTime && !te.End_Time;
    });
    try {
      if (openEntry) {
        await grist.docApi.applyUserActions([
          ["UpdateRecord", state.TIME_ENTRIES_TABLE, openEntry.id, {
            End_Time: endTime,
            Duration: duration,
            Description: ""
          }]
        ]);
      } else {
        await grist.docApi.applyUserActions([
          ["AddRecord", state.TIME_ENTRIES_TABLE, null, {
            Task_Id: taskId,
            User: state.currentUserEmail || "Utilisateur",
            Start_Time: startTime,
            End_Time: endTime,
            Duration: duration,
            Description: ""
          }]
        ]);
      }
      delete state.activeTimers[taskId];
      showToast(t("timeEntryAdded"), "success");
      await loadAllData();
      openEditTaskModal(taskId);
    } catch (e) {
      console.error("Error stopping timer:", e);
      showToast("Error: " + e.message, "error");
    }
  }
  async function pauseTimer(taskId) {
    await stopTimer(taskId);
  }
  async function addManualTimeEntry(taskId) {
    var hours = parseInt(document.getElementById("manual-hours").value) || 0;
    var minutes = parseInt(document.getElementById("manual-minutes").value) || 0;
    var duration = hours * 3600 + minutes * 60;
    if (duration <= 0) {
      showToast(currentLang === "fr" ? "Entrez une dur\xE9e valide" : "Enter a valid duration", "error");
      return;
    }
    var now = Math.floor(Date.now() / 1e3);
    try {
      await grist.docApi.applyUserActions([
        ["AddRecord", state.TIME_ENTRIES_TABLE, null, {
          Task_Id: taskId,
          User: state.currentUserEmail || "Utilisateur",
          Start_Time: now - duration,
          End_Time: now,
          Duration: duration,
          Description: currentLang === "fr" ? "Saisie manuelle" : "Manual entry"
        }]
      ]);
      showToast(t("timeEntryAdded"), "success");
      await loadAllData();
      openEditTaskModal(taskId);
    } catch (e) {
      console.error("Error adding manual time entry:", e);
      showToast("Error: " + e.message, "error");
    }
  }

  // src/domains/recurrence.js
  function resolveRecurrenceAssigneeIds(assigneeStr) {
    var names = (assigneeStr || "").split(",").map(function(a) {
      return a.trim();
    }).filter(Boolean);
    var ids = [];
    names.forEach(function(val) {
      var u = state.users.find(function(usr) {
        return usr.Email === val || usr.Name === val;
      });
      if (u && ids.indexOf(u.id) === -1) ids.push(u.id);
    });
    return ids;
  }
  async function generateOccurrences(taskId, period) {
    var task = state.tasks.find(function(t2) {
      return t2.id === taskId;
    });
    if (!task || !task.Recurrence || task.Recurrence === "none") return;
    var now = Math.floor(Date.now() / 1e3);
    var periodEnd;
    if (period === "month") {
      var endOfMonth = /* @__PURE__ */ new Date();
      endOfMonth.setDate(1);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      endOfMonth.setDate(0);
      endOfMonth.setHours(23, 59, 59);
      periodEnd = Math.floor(endOfMonth.getTime() / 1e3);
    } else {
      var endOfYear = new Date((/* @__PURE__ */ new Date()).getFullYear(), 11, 31, 23, 59, 59);
      periodEnd = Math.floor(endOfYear.getTime() / 1e3);
    }
    var stepSeconds = task.Recurrence === "daily" ? 86400 : task.Recurrence === "weekly" ? 604800 : 2592e3;
    var existingDates = state.tasks.filter(function(t2) {
      return t2.Title === task.Title && t2.Due_Date;
    }).map(function(t2) {
      return t2.Due_Date;
    });
    var cursor = existingDates.length > 0 ? Math.max.apply(null, existingDates) : task.Due_Date || now;
    var actions = [];
    var count = 0;
    var safety = 0;
    while (cursor + stepSeconds <= periodEnd && safety < 100) {
      cursor += stepSeconds;
      safety++;
      var alreadyExists = state.tasks.some(function(t2) {
        return t2.Title === task.Title && t2.Due_Date && Math.abs(t2.Due_Date - cursor) < 43200;
      });
      if (alreadyExists) continue;
      var record = {};
      setField(record, "tasks", "title", task.Title);
      setField(record, "tasks", "description", task.Description);
      setField(record, "tasks", "status", "todo");
      setField(record, "tasks", "priority", task.Priority);
      setField(record, "tasks", "assignee", ["L"].concat(resolveRecurrenceAssigneeIds(task.Assignee)));
      setField(record, "tasks", "group", task.Group_Name);
      var startOffset = task.Start_Date && task.Due_Date ? task.Due_Date - task.Start_Date : 0;
      setField(record, "tasks", "startDate", cursor - startOffset);
      setField(record, "tasks", "dueDate", cursor);
      setField(record, "tasks", "category", task.Category);
      setField(record, "tasks", "tag", ["L"].concat(Array.isArray(task.Tag) ? task.Tag : []));
      setField(record, "tasks", "recurrence", task.Recurrence);
      setField(record, "tasks", "estimatedHours", task.Estimated_Hours);
      setField(record, "tasks", "projectId", task.Project_Id);
      setField(record, "tasks", "createdAt", now);
      actions.push(["AddRecord", state.TASKS_TABLE, null, record]);
      count++;
    }
    if (actions.length === 0) {
      showToast("Aucune occurrence \xE0 g\xE9n\xE9rer pour cette p\xE9riode", "info");
      return;
    }
    try {
      await grist.docApi.applyUserActions(actions);
      showToast(count + " " + t("occurrencesGenerated"), "success");
      await loadAllData();
    } catch (e) {
      console.error("Error generating occurrences:", e);
      showToast("Erreur : " + e.message, "error");
    }
  }
  function addRecurrenceToEpoch(epoch, rec) {
    if (!epoch) return null;
    var d = new Date(epoch * 1e3);
    switch (rec) {
      case "daily":
        d.setDate(d.getDate() + 1);
        break;
      case "weekly":
        d.setDate(d.getDate() + 7);
        break;
      case "biweekly":
        d.setDate(d.getDate() + 14);
        break;
      case "monthly":
        d.setMonth(d.getMonth() + 1);
        break;
      case "quarterly":
        d.setMonth(d.getMonth() + 3);
        break;
      case "yearly":
        d.setFullYear(d.getFullYear() + 1);
        break;
      default:
        return epoch;
    }
    return Math.floor(d.getTime() / 1e3);
  }
  async function createNextOccurrence(task) {
    if (!task.Recurrence || task.Recurrence === "none") return;
    var newStartDate = addRecurrenceToEpoch(task.Start_Date, task.Recurrence);
    var newDueDate = addRecurrenceToEpoch(task.Due_Date, task.Recurrence);
    var now = Math.floor(Date.now() / 1e3);
    try {
      var record = {};
      setField(record, "tasks", "title", task.Title);
      setField(record, "tasks", "description", task.Description);
      setField(record, "tasks", "status", "todo");
      setField(record, "tasks", "priority", task.Priority);
      setField(record, "tasks", "assignee", ["L"].concat(resolveRecurrenceAssigneeIds(task.Assignee)));
      setField(record, "tasks", "group", task.Group_Name);
      setField(record, "tasks", "startDate", newStartDate);
      setField(record, "tasks", "dueDate", newDueDate);
      setField(record, "tasks", "category", task.Category);
      setField(record, "tasks", "tag", ["L"].concat(Array.isArray(task.Tag) ? task.Tag : []));
      setField(record, "tasks", "recurrence", task.Recurrence);
      setField(record, "tasks", "estimatedHours", task.Estimated_Hours);
      setField(record, "tasks", "createdAt", now);
      await grist.docApi.applyUserActions([
        ["AddRecord", state.TASKS_TABLE, null, record]
      ]);
      showToast(t("nextOccurrence"), "success");
    } catch (e) {
      console.error("Error creating next occurrence:", e);
    }
  }

  // src/domains/notifications.js
  function getOverdueTasks() {
    var now = Math.floor(Date.now() / 1e3);
    return getFilteredTasks().filter(function(t2) {
      return t2.Due_Date && t2.Due_Date < now && t2.Status !== "done" && t2.Status !== "archived";
    });
  }
  function getUpcomingTasks() {
    var now = Math.floor(Date.now() / 1e3);
    var threeDays = now + 3 * 24 * 60 * 60;
    return getFilteredTasks().filter(function(t2) {
      return t2.Due_Date && t2.Due_Date >= now && t2.Due_Date <= threeDays && t2.Status !== "done" && t2.Status !== "archived";
    });
  }
  function getMyNotifications() {
    var email = (state.currentUserEmail || "").toLowerCase().trim();
    if (!email) return [];
    return state.pmNotifications.filter(function(n) {
      return (n.User_Email || "").toLowerCase().trim() === email;
    }).sort(function(a, b) {
      return (b.Created_At || 0) - (a.Created_At || 0);
    });
  }
  function getUnreadCount() {
    return getMyNotifications().length;
  }
  function updateNotificationBadge() {
    var pending = getUnreadCount();
    var hasOverdueRule = state.automationRules.some(function(r) {
      return r.enabled && r.trigger === "overdue";
    });
    var hasApproachingRule = state.automationRules.some(function(r) {
      return r.enabled && r.trigger === "approaching_deadline";
    });
    var computed = 0;
    if (!hasOverdueRule) computed += getOverdueTasks().length;
    if (!hasApproachingRule) computed += getUpcomingTasks().length;
    var total = pending + computed;
    var badge = document.getElementById("notif-badge");
    if (badge) {
      badge.textContent = total;
      badge.classList.toggle("show", total > 0);
    }
  }
  function showNotifications() {
    var myNotifs = getMyNotifications();
    var hasOverdueRule = state.automationRules.some(function(r) {
      return r.enabled && r.trigger === "overdue";
    });
    var hasApproachingRule = state.automationRules.some(function(r) {
      return r.enabled && r.trigger === "approaching_deadline";
    });
    var overdue = !hasOverdueRule ? getOverdueTasks() : [];
    var upcoming = !hasApproachingRule ? getUpcomingTasks() : [];
    var html = '<div class="notif-dropdown" id="notif-dropdown">';
    html += '<div class="notif-header" style="display:flex;justify-content:space-between;align-items:center;">';
    html += "<span>\u{1F514} " + t("notifications") + "</span>";
    if (myNotifs.length > 0) {
      html += '<button onclick="event.stopPropagation();dismissAllNotifications();" style="background:#3b82f6;color:white;border:none;border-radius:4px;font-size:10px;padding:3px 8px;cursor:pointer;">' + t("markAllRead") + "</button>";
    }
    html += "</div>";
    if (myNotifs.length > 0) {
      for (var ui = 0; ui < myNotifs.length; ui++) {
        var n = myNotifs[ui];
        html += '<div class="notif-item" style="display:flex;align-items:center;gap:6px;font-weight:600;" onclick="openNotification(' + n.id + ", " + n.Task_Id + ');">';
        html += '<div style="flex:1;">';
        html += '<div class="notif-item-title">' + sanitize(n.Message) + "</div>";
        html += '<div class="notif-item-date">' + formatDate(n.Created_At) + "</div>";
        html += "</div>";
        html += '<button onclick="event.stopPropagation();dismissNotification(' + n.id + ');" style="background:none;border:none;color:#3b82f6;cursor:pointer;font-size:14px;" title="' + t("markAsRead") + '">\u2713</button>';
        html += "</div>";
      }
    }
    if (overdue.length > 0) {
      html += '<div style="padding:6px 16px;font-size:10px;color:#ef4444;font-weight:700;">\u26A0\uFE0F ' + overdue.length + " " + t("overdueTasksAlert") + "</div>";
      for (var oi = 0; oi < overdue.length; oi++) {
        html += '<div class="notif-item overdue" onclick="openEditTaskModal(' + overdue[oi].id + '); closeNotifications();">';
        html += '<div class="notif-item-title">' + sanitize(overdue[oi].Title) + "</div>";
        html += '<div class="notif-item-date">\u{1F4C5} ' + formatDate(overdue[oi].Due_Date) + "</div>";
        html += "</div>";
      }
    }
    if (upcoming.length > 0) {
      html += '<div style="padding:6px 16px;font-size:10px;color:#f59e0b;font-weight:700;">\u{1F4C5} ' + upcoming.length + " " + t("upcomingTasksAlert") + "</div>";
      for (var upi = 0; upi < upcoming.length; upi++) {
        html += '<div class="notif-item upcoming" onclick="openEditTaskModal(' + upcoming[upi].id + '); closeNotifications();">';
        html += '<div class="notif-item-title">' + sanitize(upcoming[upi].Title) + "</div>";
        html += '<div class="notif-item-date">\u{1F4C5} ' + formatDate(upcoming[upi].Due_Date) + "</div>";
        html += "</div>";
      }
    }
    if (myNotifs.length === 0 && overdue.length === 0 && upcoming.length === 0) {
      html += '<div class="notif-empty">' + t("noAlerts") + "</div>";
    }
    html += "</div>";
    closeNotifications();
    var btn = document.getElementById("notifications-btn");
    btn.style.position = "relative";
    btn.insertAdjacentHTML("beforeend", html);
    setTimeout(function() {
      document.addEventListener("click", closeNotificationsOnOutsideClick);
    }, 10);
  }
  function closeNotifications() {
    var dropdown = document.getElementById("notif-dropdown");
    if (dropdown) dropdown.remove();
    document.removeEventListener("click", closeNotificationsOnOutsideClick);
  }
  function closeNotificationsOnOutsideClick(e) {
    if (!e.target.closest("#notifications-btn")) {
      closeNotifications();
    }
  }
  async function openNotification(notifId, taskId) {
    closeNotifications();
    await dismissNotification(notifId, false);
    openEditTaskModal(taskId);
  }
  async function dismissNotification(notifId, reopenDropdown) {
    try {
      await grist.docApi.applyUserActions([["RemoveRecord", state.NOTIFICATIONS_TABLE, notifId]]);
      state.pmNotifications = state.pmNotifications.filter(function(n) {
        return n.id !== notifId;
      });
      updateNotificationBadge();
      if (reopenDropdown !== false) showNotifications();
    } catch (e) {
      console.error("[GristPM] Error dismissing notification:", e);
    }
  }
  async function dismissAllNotifications() {
    var mine = getMyNotifications();
    if (mine.length === 0) return;
    try {
      var ids = mine.map(function(n) {
        return n.id;
      });
      var actions = ids.map(function(id) {
        return ["RemoveRecord", state.NOTIFICATIONS_TABLE, id];
      });
      await grist.docApi.applyUserActions(actions);
      state.pmNotifications = state.pmNotifications.filter(function(n) {
        return ids.indexOf(n.id) === -1;
      });
      updateNotificationBadge();
      showNotifications();
    } catch (e) {
      console.error("[GristPM] Error dismissing all notifications:", e);
    }
  }
  async function createNotification(taskId, userEmail, type, message, ruleId) {
    try {
      var resolvedEmail = resolveUserEmail(userEmail);
      if (!resolvedEmail || resolvedEmail.toLowerCase() === (state.currentUserEmail || "").toLowerCase().trim()) return;
      var record = {
        Task_Id: taskId,
        User_Email: resolvedEmail,
        Type: type,
        Message: message,
        Created_At: Math.floor(Date.now() / 1e3),
        Rule_Id: ruleId || ""
      };
      await grist.docApi.applyUserActions([["AddRecord", state.NOTIFICATIONS_TABLE, null, record]]);
      record.id = state.pmNotifications.length > 0 ? Math.max.apply(null, state.pmNotifications.map(function(n) {
        return n.id;
      })) + 1 : 1;
      state.pmNotifications.push(record);
    } catch (e) {
      console.error("[GristPM] Error creating notification:", e);
    }
  }
  function splitRecipientValues(value) {
    if (Array.isArray(value)) return value;
    return String(value || "").split(",").map(function(item) {
      return item.trim();
    }).filter(Boolean);
  }
  function resolveUserEmail(value) {
    var raw = String(value || "").trim();
    if (!raw) return "";
    var key = raw.toLowerCase();
    var user = state.users.find(function(candidate) {
      return String(candidate.Email || "").trim().toLowerCase() === key || String(candidate.Name || "").trim().toLowerCase() === key;
    });
    if (user && user.Email) return String(user.Email).trim();
    return raw.indexOf("@") > 0 ? raw : "";
  }
  function getProjectLead(task) {
    var projectId = Number(task && task.Project_Id || 0);
    var project = state.projects.find(function(item) {
      return Number(item.id) === projectId;
    });
    return project ? resolveUserEmail(project.Lead) : "";
  }
  async function notifyTaskCompleted(task) {
    if (!task) return;
    var lead = getProjectLead(task);
    if (!lead) return;
    await notifyConcernedUsers(task.id, [lead], "task_completed", task.Title || "");
  }
  async function notifyConcernedUsers(taskId, emails, eventType, title) {
    if (!state.notifyConcernedEnabled) return;
    var me = (state.currentUserEmail || "").toLowerCase().trim();
    var seen = {}, recipients = [];
    (emails || []).forEach(function(e) {
      var v = resolveUserEmail(e);
      var k = v.toLowerCase();
      if (v && k !== me && !seen[k]) {
        seen[k] = 1;
        recipients.push(v);
      }
    });
    if (!recipients.length) return;
    var messages = {
      task_assigned: currentLang === "fr" ? "Une t\xE2che vous a \xE9t\xE9 assign\xE9e : " : "A task was assigned to you: ",
      task_completed: currentLang === "fr" ? "T\xE2che termin\xE9e : " : "Task completed: ",
      task_updated: currentLang === "fr" ? "T\xE2che modifi\xE9e : " : "Task updated: ",
      comment_added: currentLang === "fr" ? "Nouveau commentaire sur : " : "New comment on: "
    };
    var msg = (messages[eventType] || messages.task_updated) + title;
    var now = Math.floor(Date.now() / 1e3);
    var actions = recipients.map(function(email) {
      return ["AddRecord", state.NOTIFICATIONS_TABLE, null, { Task_Id: taskId, User_Email: email, Type: eventType, Message: msg, Created_At: now, Rule_Id: "builtin" }];
    });
    try {
      await grist.docApi.applyUserActions(actions);
    } catch (e) {
      console.error("[GristPM] notifyConcernedUsers", e);
    }
  }
  function resolveRecipients(action, actionTarget, task) {
    if (action === "notify_assignee") {
      return splitRecipientValues(task.Assignee).map(resolveUserEmail).filter(Boolean);
    }
    if (action === "notify_project_lead") {
      var lead = getProjectLead(task);
      return lead ? [lead] : [];
    }
    if (action === "notify_specific" && actionTarget) {
      return [actionTarget];
    }
    if (action === "notify_all") {
      return state.users.map(function(u) {
        return u.Email;
      }).filter(Boolean);
    }
    return [];
  }
  function renderAutoMessage(template, task) {
    var statusLabel2 = "";
    var statuses = getKanbanStatuses();
    for (var si = 0; si < statuses.length; si++) {
      if (statuses[si].key === task.Status) {
        statusLabel2 = currentLang === "fr" ? statuses[si].label_fr : statuses[si].label_en;
        break;
      }
    }
    return (template || "").replace(/\{title\}/g, task.Title || "").replace(/\{status\}/g, statusLabel2 || task.Status || "").replace(/\{priority\}/g, task.Priority || "").replace(/\{assignee\}/g, task.Assignee || "");
  }
  async function evaluateAutomationRules(task, changes) {
    if (!state.automationRules || state.automationRules.length === 0) return;
    for (var i = 0; i < state.automationRules.length; i++) {
      var rule = state.automationRules[i];
      if (!rule.enabled) continue;
      var triggered = false;
      if (rule.trigger === "status_change" && changes.status) {
        var mf = !rule.condition || !rule.condition.from || rule.condition.from === changes.status.from;
        var mt = !rule.condition || !rule.condition.to || rule.condition.to === changes.status.to;
        triggered = mf && mt;
      } else if (rule.trigger === "priority_change" && changes.priority) {
        var mf2 = !rule.condition || !rule.condition.from || rule.condition.from === changes.priority.from;
        var mt2 = !rule.condition || !rule.condition.to || rule.condition.to === changes.priority.to;
        triggered = mf2 && mt2;
      } else if (rule.trigger === "assignment_change" && changes.assignee) {
        triggered = true;
      }
      if (triggered) {
        var msgTpl = currentLang === "fr" ? rule.message_fr || rule.message_en || "" : rule.message_en || rule.message_fr || "";
        var message = renderAutoMessage(msgTpl, task);
        var recipients = resolveRecipients(rule.action, rule.action_target, task);
        for (var r = 0; r < recipients.length; r++) {
          await createNotification(task.id, recipients[r], rule.trigger, message, rule.id);
        }
      }
    }
    updateNotificationBadge();
  }
  async function checkTimeBasedAutomations() {
    if (!state.automationRules || state.automationRules.length === 0) return;
    var now = Math.floor(Date.now() / 1e3);
    var todayStart = now - now % 86400;
    var threeDays = now + 3 * 24 * 60 * 60;
    for (var i = 0; i < state.automationRules.length; i++) {
      var rule = state.automationRules[i];
      if (!rule.enabled) continue;
      if (rule.trigger !== "overdue" && rule.trigger !== "approaching_deadline") continue;
      var matching = state.tasks.filter(function(t2) {
        if (t2.Status === "done" || t2.Status === "archived" || !t2.Due_Date) return false;
        if (rule.trigger === "overdue") return t2.Due_Date < now;
        return t2.Due_Date >= now && t2.Due_Date <= threeDays;
      });
      for (var j = 0; j < matching.length; j++) {
        var task = matching[j];
        var recipients = resolveRecipients(rule.action, rule.action_target, task);
        for (var r = 0; r < recipients.length; r++) {
          var already = state.pmNotifications.some(function(n) {
            return n.Rule_Id === rule.id && n.Task_Id === task.id && n.User_Email === recipients[r] && n.Created_At >= todayStart;
          });
          if (already) continue;
          var msgTpl = currentLang === "fr" ? rule.message_fr || rule.message_en || "" : rule.message_en || rule.message_fr || "";
          var message = renderAutoMessage(msgTpl, task);
          await createNotification(task.id, recipients[r], rule.trigger, message, rule.id);
        }
      }
    }
    updateNotificationBadge();
  }

  // src/domains/categories.js
  var customCategories = [];
  function getCategories() {
    return customCategories;
  }
  function setCategoriesFromSettings(raw) {
    var parsed = [];
    try {
      parsed = JSON.parse(raw) || [];
    } catch (e) {
    }
    customCategories.length = 0;
    Array.prototype.push.apply(customCategories, parsed);
  }
  async function saveCategories() {
    await saveSetting("categories", JSON.stringify(customCategories));
    await syncCategoryChoices();
  }
  async function syncCategoryChoices() {
    try {
      var choices = customCategories.map(function(c) {
        return c.name;
      });
      var choiceOptions = {};
      customCategories.forEach(function(c) {
        if (c.color) choiceOptions[c.name] = { fillColor: c.color, textColor: "#ffffff" };
      });
      var categoryCol = getColumnName("tasks", "category");
      await grist.docApi.applyUserActions([
        ["ModifyColumn", state.TASKS_TABLE, categoryCol, { widgetOptions: JSON.stringify({ choices, choiceOptions }) }]
      ]);
      state.taskTableColumns = null;
    } catch (e) {
      console.log("syncCategoryChoices:", e.message);
    }
  }
  function renderCategoriesList() {
    var container = document.getElementById("categories-list");
    if (!container) return;
    if (customCategories.length === 0) {
      container.innerHTML = '<div style="text-align:center;color:#94a3b8;padding:20px;">' + (currentLang === "fr" ? "Aucune cat\xE9gorie" : "No categories") + "</div>";
      return;
    }
    var html = '<div class="settings-items">';
    customCategories.forEach(function(cat, i) {
      html += '<div class="settings-item">';
      html += '<span class="settings-item-dot" style="background:' + (cat.color || "#6366f1") + ';"></span>';
      html += '<div class="settings-item-info"><strong>' + sanitize(cat.name) + "</strong></div>";
      html += '<div class="settings-item-actions">';
      html += '<button class="btn-icon" onclick="editCategorySetting(' + i + ')" title="' + (currentLang === "fr" ? "Modifier" : "Edit") + '">\u270F\uFE0F</button>';
      if (state.isOwner) html += '<button class="btn-icon" onclick="removeCategorySetting(' + i + ')" title="' + t("delete") + '">\u{1F5D1}\uFE0F</button>';
      html += "</div>";
      html += "</div>";
    });
    html += "</div>";
    container.innerHTML = html;
  }
  async function addCategorySetting() {
    var result = await showPromptModal(
      currentLang === "fr" ? "Nouvelle cat\xE9gorie" : "New category",
      [
        { label: currentLang === "fr" ? "Nom" : "Name", placeholder: currentLang === "fr" ? "Ex: Discovery" : "Ex: Discovery" },
        { label: currentLang === "fr" ? "Couleur" : "Color", type: "color" }
      ],
      ["", "#6366f1"]
    );
    if (!result || !result[0]) return;
    var name = result[0].trim();
    if (!name) return;
    if (customCategories.some(function(c) {
      return c.name === name;
    })) {
      showToast(currentLang === "fr" ? "Cette cat\xE9gorie existe d\xE9j\xE0" : "This category already exists", "error");
      return;
    }
    customCategories.push({ name, color: result[1] || "#6366f1" });
    await saveCategories();
    renderCategoriesList();
    refreshAllViews();
    showToast(currentLang === "fr" ? "Cat\xE9gorie ajout\xE9e" : "Category added", "success");
  }
  async function editCategorySetting(index) {
    var cat = customCategories[index];
    if (!cat) return;
    var result = await showPromptModal(
      currentLang === "fr" ? "Modifier la cat\xE9gorie" : "Edit category",
      [
        { label: currentLang === "fr" ? "Nom" : "Name" },
        { label: currentLang === "fr" ? "Couleur" : "Color", type: "color" }
      ],
      [cat.name, cat.color || "#6366f1"]
    );
    if (!result || !result[0]) return;
    var oldName = cat.name;
    cat.name = result[0].trim();
    cat.color = result[1] || cat.color;
    if (oldName !== cat.name) {
      var categoryCol = getColumnName("tasks", "category");
      var affected = state.tasks.filter(function(tsk) {
        return tsk.Category === oldName;
      });
      if (affected.length > 0) {
        var actions = affected.map(function(tsk) {
          return ["UpdateRecord", state.TASKS_TABLE, tsk.id, { [categoryCol]: cat.name }];
        });
        try {
          await grist.docApi.applyUserActions(actions);
        } catch (e) {
          console.log("rename category on tasks:", e.message);
        }
      }
    }
    await saveCategories();
    renderCategoriesList();
    refreshAllViews();
  }
  async function removeCategorySetting(index) {
    var cat = customCategories[index];
    if (!cat) return;
    var confirmed = await showConfirmModal(
      currentLang === "fr" ? "Supprimer la cat\xE9gorie \xAB " + cat.name + " \xBB ?" : 'Delete category "' + cat.name + '"?',
      currentLang === "fr" ? "Supprimer" : "Delete"
    );
    if (!confirmed) return;
    customCategories.splice(index, 1);
    await saveCategories();
    renderCategoriesList();
    refreshAllViews();
    showToast(currentLang === "fr" ? "Cat\xE9gorie supprim\xE9e" : "Category removed", "info");
  }

  // src/domains/team.js
  function getUserDisplayName(emailOrName) {
    if (!emailOrName) return "";
    var user = state.users.find(function(u) {
      return u.Email === emailOrName || u.Name === emailOrName;
    });
    if (user && user.Name) return user.Name;
    if (emailOrName.indexOf("@") !== -1) {
      return emailOrName.split("@")[0];
    }
    return emailOrName;
  }
  function renderTeamView() {
    renderUsersList();
    renderGroupsList();
    renderCategoriesList();
  }
  function renderUsersList() {
    var container = document.getElementById("users-list");
    if (!container) return;
    var displayedUsers = state.currentFilterRole ? state.users.filter(function(u2) {
      return userMatchesRole(u2, state.currentFilterRole);
    }) : state.users;
    if (displayedUsers.length === 0) {
      container.innerHTML = '<div style="text-align:center;padding:30px;color:#94a3b8;">' + t("noUsers") + "</div>";
      return;
    }
    var html = '<table class="data-table"><thead><tr>';
    html += "<th>" + t("fieldName") + "</th>";
    html += "<th>" + t("fieldEmail") + "</th>";
    html += "<th>" + t("fieldRole") + "</th>";
    html += "<th>" + t("fieldGroup") + "</th>";
    html += "<th>" + t("colActions") + "</th>";
    html += "</tr></thead><tbody>";
    for (var i = 0; i < displayedUsers.length; i++) {
      var u = displayedUsers[i];
      var roleText = userRoleDisplay(u) ? userRoleDisplay(u).split(",").map(function(r) {
        return roleLabel(r.trim());
      }).join(", ") : "";
      var firstRole = getUserRoles(u)[0] || "member";
      var roleBg = firstRole === "admin" ? "#fef2f2;color:#dc2626" : firstRole === "viewer" ? "#f1f5f9;color:#64748b" : "#eff6ff;color:#1e40af";
      html += "<tr>";
      html += '<td style="font-weight:700;">\u{1F464} ' + sanitize(u.Name) + "</td>";
      html += "<td>" + sanitize(u.Email) + "</td>";
      html += '<td><span style="padding:2px 10px;border-radius:20px;font-size:11px;font-weight:600;background:' + roleBg + '">' + sanitize(roleText) + "</span></td>";
      html += "<td>" + (u.Group_Name ? '<span class="assignee-chip">\u{1F465} ' + sanitize(u.Group_Name) + "</span>" : "--") + "</td>";
      html += '<td><button class="btn-icon" onclick="openEditUserModal(' + u.id + ')" title="' + t("edit") + '">\u270F\uFE0F</button>';
      html += '<button class="btn-icon" onclick="deleteUser(' + u.id + ')">\u{1F5D1}\uFE0F</button></td>';
      html += "</tr>";
    }
    html += "</tbody></table>";
    container.innerHTML = html;
  }
  function renderGroupsList() {
    var container = document.getElementById("groups-list");
    if (!container) return;
    if (state.groups.length === 0) {
      container.innerHTML = '<div style="text-align:center;padding:30px;color:#94a3b8;">' + t("noGroups") + "</div>";
      return;
    }
    var html = "";
    for (var i = 0; i < state.groups.length; i++) {
      var g = state.groups[i];
      var memberCount = state.users.filter(function(u) {
        return u.Group_Name === g.Name;
      }).length;
      var memberNames = state.users.filter(function(u) {
        return u.Group_Name === g.Name;
      }).map(function(u) {
        return u.Name || u.Email;
      });
      html += '<div class="template-card">';
      html += '<div class="template-card-info">';
      html += "<h4>\u{1F465} " + sanitize(g.Name) + "</h4>";
      html += '<div class="template-meta">';
      html += memberCount + " " + t("members");
      if (g.Description) html += " \u2022 " + sanitize(g.Description);
      html += "</div>";
      if (memberNames.length > 0) {
        html += '<div style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap;">';
        for (var j = 0; j < memberNames.length; j++) {
          html += '<span class="assignee-chip">\u{1F464} ' + sanitize(memberNames[j]) + "</span>";
        }
        html += "</div>";
      }
      html += "</div>";
      html += '<button class="btn-icon" onclick="openEditGroupModal(' + g.id + ')" title="' + t("edit") + '">\u270F\uFE0F</button>';
      html += '<button class="btn-icon" onclick="deleteGroup(' + g.id + ')">\u{1F5D1}\uFE0F</button>';
      html += "</div>";
    }
    container.innerHTML = html;
  }
  async function getRoleChoicesFromGrist() {
    var roleSet = {};
    var hasGristChoices = false;
    try {
      var roleColName = getColumnName("users", "role");
      var tablesData = await grist.docApi.fetchTable("_grist_Tables");
      var columnsData = await grist.docApi.fetchTable("_grist_Tables_column");
      var tableRowId = null;
      if (tablesData && tablesData.id && tablesData.tableId) {
        for (var i = 0; i < tablesData.id.length; i++) {
          if (tablesData.tableId[i] === state.USERS_TABLE) {
            tableRowId = tablesData.id[i];
            break;
          }
        }
      }
      if (tableRowId !== null && columnsData && columnsData.id) {
        for (var j = 0; j < columnsData.id.length; j++) {
          if (columnsData.parentId[j] === tableRowId && columnsData.colId[j] === roleColName) {
            var wo = columnsData.widgetOptions[j];
            if (wo) {
              try {
                var opts = JSON.parse(wo);
                if (opts.choices && Array.isArray(opts.choices) && opts.choices.length > 0) {
                  opts.choices.forEach(function(c) {
                    roleSet[c] = true;
                  });
                  hasGristChoices = true;
                }
              } catch (e) {
              }
            }
            break;
          }
        }
      }
    } catch (e) {
      console.log("Could not fetch role choices from Grist metadata:", e);
    }
    if (!hasGristChoices) {
      ["admin", "member", "viewer"].forEach(function(r) {
        roleSet[r] = true;
      });
    }
    state.users.forEach(function(u) {
      getUserRoles(u).forEach(function(r) {
        if (r) roleSet[r] = true;
      });
    });
    return Object.keys(roleSet).sort();
  }
  var _manageRolesState = { choices: [] };
  async function openManageRolesModal() {
    var choices = await getRoleChoicesFromGrist();
    _manageRolesState.choices = choices.slice();
    renderManageRolesModal();
  }
  function renderManageRolesModal() {
    var choices = _manageRolesState.choices;
    var usage = {};
    state.users.forEach(function(u) {
      getUserRoles(u).forEach(function(r2) {
        if (r2) usage[r2] = (usage[r2] || 0) + 1;
      });
    });
    var html = '<div class="modal-overlay" onclick="closeModal(event)">';
    html += '<div class="modal" onclick="event.stopPropagation()">';
    html += '<div class="modal-header"><h3>' + t("manageRolesTitle") + '</h3><button class="modal-close" onclick="closeModalForce()">\u2715</button></div>';
    html += '<div class="modal-body">';
    html += '<p style="color:#64748b;font-size:13px;margin:0 0 12px 0;">' + t("manageRolesSubtitle") + "</p>";
    html += '<div class="settings-items">';
    if (choices.length === 0) {
      html += '<div style="text-align:center;color:#94a3b8;padding:20px;">--</div>';
    } else {
      for (var i = 0; i < choices.length; i++) {
        var r = choices[i];
        var count = usage[r] || 0;
        html += '<div class="settings-item">';
        html += '<div class="settings-item-info">';
        html += "<strong>" + sanitize(roleLabel(r)) + "</strong>";
        html += '<span class="settings-item-meta">' + count + " " + (currentLang === "fr" ? "utilisateur(s)" : "user(s)") + "</span>";
        html += "</div>";
        html += '<div class="settings-item-actions">';
        html += '<button class="btn-icon" onclick="removeRoleChoice(' + i + ')" title="' + t("confirmDeleteRole") + '">\u{1F5D1}\uFE0F</button>';
        html += "</div>";
        html += "</div>";
      }
    }
    html += "</div>";
    html += '<div style="display:flex;gap:8px;margin-top:16px;">';
    html += '<input type="text" id="new-role-name" placeholder="' + t("newRolePlaceholder") + `" style="flex:1;" onkeydown="if(event.key==='Enter'){addRoleChoice();}" />`;
    html += '<button class="btn btn-primary btn-sm" onclick="addRoleChoice()">+ ' + t("addRole") + "</button>";
    html += "</div>";
    html += "</div>";
    html += '<div class="modal-footer">';
    html += '<button class="btn btn-secondary" onclick="closeModalForce()">' + t("cancel") + "</button>";
    html += '<button class="btn btn-primary" onclick="saveRoleChoices()">' + t("save") + "</button>";
    html += "</div></div></div>";
    document.getElementById("modal-container").innerHTML = html;
  }
  function addRoleChoice() {
    var input = document.getElementById("new-role-name");
    var name = (input.value || "").trim();
    if (!name) return;
    if (_manageRolesState.choices.indexOf(name) !== -1) {
      showToast(currentLang === "fr" ? "Ce r\xF4le existe d\xE9j\xE0" : "Role already exists", "error");
      return;
    }
    _manageRolesState.choices.push(name);
    renderManageRolesModal();
  }
  function removeRoleChoice(index) {
    var role = _manageRolesState.choices[index];
    var inUse = state.users.some(function(u) {
      return userMatchesRole(u, role);
    });
    if (inUse) {
      if (!confirm(t("cannotDeleteUsedRole") + ". " + (currentLang === "fr" ? "Continuer ?" : "Continue?"))) {
        return;
      }
    } else if (!confirm(t("confirmDeleteRole"))) {
      return;
    }
    _manageRolesState.choices.splice(index, 1);
    renderManageRolesModal();
  }
  async function saveRoleChoices() {
    try {
      var roleColName = getColumnName("users", "role");
      var tablesData = await grist.docApi.fetchTable("_grist_Tables");
      var columnsData = await grist.docApi.fetchTable("_grist_Tables_column");
      var tableRowId = null;
      for (var i = 0; i < tablesData.id.length; i++) {
        if (tablesData.tableId[i] === state.USERS_TABLE) {
          tableRowId = tablesData.id[i];
          break;
        }
      }
      if (tableRowId === null) throw new Error("Table not found");
      var existingOpts = {};
      for (var j = 0; j < columnsData.id.length; j++) {
        if (columnsData.parentId[j] === tableRowId && columnsData.colId[j] === roleColName) {
          var wo = columnsData.widgetOptions[j];
          if (wo) {
            try {
              existingOpts = JSON.parse(wo);
            } catch (e) {
            }
          }
          break;
        }
      }
      existingOpts.choices = _manageRolesState.choices;
      if (!existingOpts.widget) existingOpts.widget = "TextBox";
      await grist.docApi.applyUserActions([
        ["ModifyColumn", state.USERS_TABLE, roleColName, { widgetOptions: JSON.stringify(existingOpts) }]
      ]);
      showToast(t("rolesUpdated"), "success");
      closeModalForce();
    } catch (e) {
      console.error("Error saving roles:", e);
      showToast("Error: " + e.message, "error");
    }
  }
  async function openEditUserModal(userId) {
    var user = state.users.find(function(u) {
      return u.id === userId;
    });
    if (!user) return;
    var groupOptions = '<option value="">--</option>';
    for (var i = 0; i < state.groups.length; i++) {
      var sel = state.groups[i].Name === user.Group_Name ? " selected" : "";
      groupOptions += '<option value="' + sanitize(state.groups[i].Name) + '"' + sel + ">" + sanitize(state.groups[i].Name) + "</option>";
    }
    var roleChoices = await getRoleChoicesFromGrist();
    var html = '<div class="modal-overlay" onclick="closeModal(event)">';
    html += '<div class="modal" onclick="event.stopPropagation()">';
    html += '<div class="modal-header"><h3>' + t("edit") + " - " + sanitize(user.Name) + '</h3><button class="modal-close" onclick="closeModalForce()">\u2715</button></div>';
    html += '<div class="modal-body">';
    html += '<div class="form-group"><label>' + t("fieldName") + '</label><input type="text" id="user-name" value="' + sanitize(user.Name) + '" /></div>';
    html += '<div class="form-group"><label>' + t("fieldEmail") + '</label><input type="email" id="user-email" value="' + sanitize(user.Email) + '" /></div>';
    html += '<div class="form-row">';
    html += '<div class="form-group"><label>' + t("fieldRole") + '</label><select id="user-role">';
    if (user.Role && roleChoices.indexOf(user.Role) === -1) {
      html += '<option value="' + sanitize(user.Role) + '" selected>' + sanitize(roleLabel(user.Role)) + "</option>";
    }
    for (var i = 0; i < roleChoices.length; i++) {
      var r = roleChoices[i];
      var sel = user.Role === r ? " selected" : "";
      html += '<option value="' + sanitize(r) + '"' + sel + ">" + sanitize(roleLabel(r)) + "</option>";
    }
    html += "</select></div>";
    html += '<div class="form-group"><label>' + t("fieldGroup") + '</label><select id="user-group">' + groupOptions + "</select></div>";
    html += "</div>";
    html += "</div>";
    html += '<div class="modal-footer">';
    html += '<button class="btn btn-secondary" onclick="closeModalForce()">' + t("cancel") + "</button>";
    html += '<button class="btn btn-primary" onclick="updateUser(' + userId + ')">' + t("save") + "</button>";
    html += "</div></div></div>";
    document.getElementById("modal-container").innerHTML = html;
  }
  function openEditGroupModal(groupId) {
    var group = state.groups.find(function(g) {
      return g.id === groupId;
    });
    if (!group) return;
    var html = '<div class="modal-overlay" onclick="closeModal(event)">';
    html += '<div class="modal" onclick="event.stopPropagation()">';
    html += '<div class="modal-header"><h3>' + t("edit") + " - " + sanitize(group.Name) + '</h3><button class="modal-close" onclick="closeModalForce()">\u2715</button></div>';
    html += '<div class="modal-body">';
    html += '<div class="form-group"><label>' + t("fieldName") + '</label><input type="text" id="group-name" value="' + sanitize(group.Name) + '" /></div>';
    html += '<div class="form-group"><label>' + t("fieldDescription") + '</label><textarea id="group-desc">' + sanitize(group.Description || "") + "</textarea></div>";
    html += "</div>";
    html += '<div class="modal-footer">';
    html += '<button class="btn btn-secondary" onclick="closeModalForce()">' + t("cancel") + "</button>";
    html += '<button class="btn btn-primary" onclick="updateGroup(' + groupId + ')">' + t("save") + "</button>";
    html += "</div></div></div>";
    document.getElementById("modal-container").innerHTML = html;
  }
  async function updateUser(userId) {
    var name = document.getElementById("user-name").value.trim();
    if (!name) return;
    var record = {};
    record[getColumnName("users", "name")] = name;
    record[getColumnName("users", "email")] = document.getElementById("user-email").value.trim();
    record[getColumnName("users", "role")] = document.getElementById("user-role").value;
    record[getColumnName("users", "group")] = document.getElementById("user-group").value;
    try {
      await grist.docApi.applyUserActions([
        ["UpdateRecord", state.USERS_TABLE, userId, record]
      ]);
      showToast(t("taskUpdated"), "success");
      closeModalForce();
      await loadAllData();
    } catch (e) {
      console.error("Error updating user:", e);
      showToast("Error: " + e.message, "error");
    }
  }
  async function updateGroup(groupId) {
    var name = document.getElementById("group-name").value.trim();
    if (!name) return;
    try {
      await grist.docApi.applyUserActions([
        ["UpdateRecord", state.GROUPS_TABLE, groupId, {
          Name: name,
          Description: document.getElementById("group-desc").value.trim()
        }]
      ]);
      showToast(t("taskUpdated"), "success");
      closeModalForce();
      await loadAllData();
    } catch (e) {
      console.error("Error updating group:", e);
      showToast("Error: " + e.message, "error");
    }
  }
  async function openNewUserModal() {
    var groupOptions = '<option value="">--</option>';
    for (var i = 0; i < state.groups.length; i++) {
      groupOptions += '<option value="' + sanitize(state.groups[i].Name) + '">' + sanitize(state.groups[i].Name) + "</option>";
    }
    var roleChoices = await getRoleChoicesFromGrist();
    var html = '<div class="modal-overlay" onclick="closeModal(event)">';
    html += '<div class="modal" onclick="event.stopPropagation()">';
    html += '<div class="modal-header"><h3>' + t("modalNewUser") + '</h3><button class="modal-close" onclick="closeModalForce()">\u2715</button></div>';
    html += '<div class="modal-body">';
    html += '<div class="form-group"><label>' + t("fieldName") + '</label><input type="text" id="user-name" /></div>';
    html += '<div class="form-group"><label>' + t("fieldEmail") + '</label><input type="email" id="user-email" /></div>';
    html += '<div class="form-row">';
    html += '<div class="form-group"><label>' + t("fieldRole") + '</label><select id="user-role">';
    for (var i = 0; i < roleChoices.length; i++) {
      var r = roleChoices[i];
      var sel = r === "member" ? " selected" : "";
      html += '<option value="' + sanitize(r) + '"' + sel + ">" + sanitize(roleLabel(r)) + "</option>";
    }
    html += "</select></div>";
    html += '<div class="form-group"><label>' + t("fieldGroup") + '</label><select id="user-group">' + groupOptions + "</select></div>";
    html += "</div>";
    html += "</div>";
    html += '<div class="modal-footer">';
    html += '<button class="btn btn-secondary" onclick="closeModalForce()">' + t("cancel") + "</button>";
    html += '<button class="btn btn-primary" onclick="createUser()">' + t("save") + "</button>";
    html += "</div></div></div>";
    document.getElementById("modal-container").innerHTML = html;
  }
  function openNewGroupModal() {
    var html = '<div class="modal-overlay" onclick="closeModal(event)">';
    html += '<div class="modal" onclick="event.stopPropagation()">';
    html += '<div class="modal-header"><h3>' + t("modalNewGroup") + '</h3><button class="modal-close" onclick="closeModalForce()">\u2715</button></div>';
    html += '<div class="modal-body">';
    html += '<div class="form-group"><label>' + t("fieldName") + '</label><input type="text" id="group-name" /></div>';
    html += '<div class="form-group"><label>' + t("fieldDescription") + '</label><textarea id="group-desc"></textarea></div>';
    html += "</div>";
    html += '<div class="modal-footer">';
    html += '<button class="btn btn-secondary" onclick="closeModalForce()">' + t("cancel") + "</button>";
    html += '<button class="btn btn-primary" onclick="createGroup()">' + t("save") + "</button>";
    html += "</div></div></div>";
    document.getElementById("modal-container").innerHTML = html;
  }
  async function createUser() {
    var name = document.getElementById("user-name").value.trim();
    if (!name) return;
    var record = {};
    record[getColumnName("users", "name")] = name;
    record[getColumnName("users", "email")] = document.getElementById("user-email").value.trim();
    record[getColumnName("users", "role")] = document.getElementById("user-role").value;
    record[getColumnName("users", "group")] = document.getElementById("user-group").value;
    try {
      await grist.docApi.applyUserActions([
        ["AddRecord", state.USERS_TABLE, null, record]
      ]);
      showToast(t("userCreated"), "success");
      closeModalForce();
      await loadAllData();
    } catch (e) {
      console.error("Error creating user:", e);
      showToast("Error: " + e.message, "error");
    }
  }
  async function createGroup() {
    var name = document.getElementById("group-name").value.trim();
    if (!name) return;
    var record = {
      Name: name,
      Description: document.getElementById("group-desc").value.trim()
    };
    try {
      await grist.docApi.applyUserActions([
        ["AddRecord", state.GROUPS_TABLE, null, record]
      ]);
      showToast(t("groupCreated"), "success");
      closeModalForce();
      await loadAllData();
    } catch (e) {
      console.error("Error creating group:", e);
      showToast("Error: " + e.message, "error");
    }
  }
  async function deleteUser(userId) {
    if (!state.isOwner) return;
    var confirmed = await showConfirmModal(t("confirmDeleteUser"), currentLang === "fr" ? "Supprimer l'utilisateur" : "Delete user");
    if (!confirmed) return;
    try {
      await grist.docApi.applyUserActions([
        ["RemoveRecord", state.USERS_TABLE, userId]
      ]);
      showToast(t("userDeleted"), "info");
      await loadAllData();
    } catch (e) {
      console.error("Error deleting user:", e);
    }
  }
  async function deleteGroup(groupId) {
    if (!state.isOwner) return;
    var confirmed = await showConfirmModal(t("confirmDeleteGroup"), currentLang === "fr" ? "Supprimer le groupe" : "Delete group");
    if (!confirmed) return;
    try {
      await grist.docApi.applyUserActions([
        ["RemoveRecord", state.GROUPS_TABLE, groupId]
      ]);
      showToast(t("groupDeleted"), "info");
      await loadAllData();
    } catch (e) {
      console.error("Error deleting group:", e);
    }
  }

  // src/domains/tasks.js
  function isOverdue(task) {
    if (!task.Due_Date || task.Status === "done") return false;
    var now = Math.floor(Date.now() / 1e3);
    return task.Due_Date < now;
  }
  function statusLabel(s) {
    return getStatusLabel(s) || s || "";
  }

  // src/domains/gantt.js
  var ganttMode = "days";
  var ganttSort = "default";
  var ganttCustomStart = "";
  var ganttCustomEnd = "";
  var ganttYear = (/* @__PURE__ */ new Date()).getFullYear();
  var ganttMonth = (/* @__PURE__ */ new Date()).getMonth();
  var expandedGanttTasks = {};
  var selectedGanttTaskId = null;
  function getGanttSubtasks(taskId) {
    return getTaskSubtasks(taskId);
  }
  function renderGanttSubtaskLabelCell(st, parentTaskId) {
    var completedClass = st.Completed ? " completed" : "";
    var html = '<td class="gantt-task-label gantt-subtask-cell' + completedClass + '">';
    html += '<label class="gantt-subtask-label" onclick="event.stopPropagation()">';
    html += '<span class="gantt-subtask-arrow">' + (isMilestone(st) ? "\u25C6" : "\u21B3") + "</span>";
    html += '<input type="checkbox" class="gantt-subtask-checkbox" ' + (st.Completed ? "checked" : "") + ' onchange="toggleGanttSubtask(' + st.id + ', this.checked)">';
    html += '<span class="gantt-subtask-title">' + sanitize(st.Title) + "</span>";
    html += "</label>";
    var stMeta = "";
    var stBlocker = getSubtaskBlocker(st);
    if (stBlocker) {
      var depColor = stBlocker.Completed ? "#94a3b8" : "#ef4444";
      stMeta += '<span style="color:' + depColor + ';" title="' + (currentLang === "fr" ? "D\xE9pend de" : "Depends on") + " : " + sanitize(stBlocker.Title) + '">\u{1F517} ' + sanitize(stBlocker.Title).substring(0, 14) + "</span>";
    }
    if (st.Due_Date) stMeta += "<span>\u{1F4C5} " + formatDate(st.Due_Date) + "</span>";
    else stMeta += "<span>" + (currentLang === "fr" ? "sans date" : "no date") + "</span>";
    if (st.Assignee) stMeta += "<span>\u{1F464} " + sanitize(st.Assignee).split(",")[0].trim().substring(0, 10) + "</span>";
    if (stMeta) html += '<div class="gantt-subtask-meta">' + stMeta + "</div>";
    html += "</td>";
    return html;
  }
  async function toggleGanttSubtask(subtaskId, completed) {
    try {
      await grist.docApi.applyUserActions([
        ["UpdateRecord", state.SUBTASKS_TABLE, subtaskId, { Completed: completed }]
      ]);
      for (var i = 0; i < state.subtasks.length; i++) {
        if (state.subtasks[i].id === subtaskId) {
          state.subtasks[i].Completed = completed;
          break;
        }
      }
      renderGanttView();
    } catch (e) {
      console.error("toggleGanttSubtask:", e);
      showToast((currentLang === "fr" ? "Impossible de modifier la sous-t\xE2che : " : "Could not update subtask: ") + e.message, "error");
    }
  }
  function ganttSubtaskBarClass(st, parentTask) {
    var base;
    if (st.Completed) base = "gantt-bar-done";
    else if (parentTask.Status === "progress") base = "gantt-bar-progress";
    else base = "gantt-bar-todo";
    return base + (isMilestone(st) ? " gantt-bar-milestone" : "");
  }
  function getGanttSubtaskRange(st, parentTask) {
    if (!st.Start_Date && !st.Due_Date) {
      var far = /* @__PURE__ */ new Date(864e13);
      return { start: far, end: far };
    }
    var stEnd = st.Due_Date ? new Date(st.Due_Date * 1e3) : parentTask.Due_Date ? new Date(parentTask.Due_Date * 1e3) : null;
    if (!stEnd) {
      var far2 = /* @__PURE__ */ new Date(864e13);
      return { start: far2, end: far2 };
    }
    var stStart;
    if (isMilestone(st)) {
      stStart = new Date(stEnd);
    } else {
      stStart = st.Start_Date ? new Date(st.Start_Date * 1e3) : new Date(stEnd);
      if (stStart > stEnd) stStart = new Date(stEnd);
    }
    stStart.setHours(0, 0, 0, 0);
    stEnd.setHours(23, 59, 59, 999);
    return { start: stStart, end: stEnd };
  }
  function getTaskExtensionEnd(task) {
    if (task.Auto_Extend && task.Status !== "done" && task.Status !== "archived") {
      var now = /* @__PURE__ */ new Date();
      now.setHours(23, 59, 59, 999);
      var dueDate = task.Due_Date ? new Date(task.Due_Date * 1e3) : null;
      if (dueDate && now > dueDate) return now;
    }
    if (task.Extension_Date) {
      var ext = new Date(task.Extension_Date * 1e3);
      ext.setHours(23, 59, 59, 999);
      return ext;
    }
    return null;
  }
  function getExtensionBarColor(task) {
    var statuses = getKanbanStatuses();
    for (var si = 0; si < statuses.length; si++) {
      if (statuses[si].key === task.Status && statuses[si].color) return statuses[si].color;
    }
    if (task.Status === "done") return "#22c55e";
    if (task.Status === "progress") return "#f59e0b";
    return "#3b82f6";
  }
  function getGanttBarColor(task) {
    var statuses = getKanbanStatuses();
    for (var si = 0; si < statuses.length; si++) {
      if (statuses[si].key === task.Status && statuses[si].color) return statuses[si].color;
    }
    return "";
  }
  function getGanttBarClass(task) {
    if (isOverdue(task)) return "gantt-bar-overdue";
    if (task.Status === "done") return "gantt-bar-done";
    if (task.Status === "progress") return "gantt-bar-progress";
    return "gantt-bar-todo";
  }
  function ganttPriorityClass(priority) {
    if (priority === "high") return "gantt-priority-high";
    if (priority === "low") return "gantt-priority-low";
    return "gantt-priority-medium";
  }
  function ganttTaskRowStart(task) {
    var selected = selectedGanttTaskId === task.id;
    return '<tr class="gantt-task-row' + (selected ? " gantt-row-selected" : "") + '" data-gantt-task-id="' + task.id + '">';
  }
  function renderGanttTaskLabel(task) {
    var dotClass = task.Priority === "high" ? "dot-high" : task.Priority === "medium" ? "dot-medium" : "dot-low";
    var assigneeNames = task.Assignee ? task.Assignee.split(",").map(function(a) {
      return getUserDisplayName(a.trim());
    }).join(", ") : "";
    var ganttProjColor = getProjectColor(task.Project_Id);
    var ganttProjName = getProjectName(task.Project_Id);
    var checked = selectedGanttTaskId === task.id ? " checked" : "";
    var focusTitle = currentLang === "fr" ? "Afficher cette t\xE2che dans le Gantt" : "Show this task in the Gantt";
    var openTitle = currentLang === "fr" ? "Ouvrir la fiche de la t\xE2che" : "Open task details";
    var taskComments = getTaskComments(task.id);
    var taskAttachments = getTaskAttachments(task.id);
    var html = '<td class="gantt-task-label">';
    html += '<div class="task-name">';
    html += '<input type="checkbox" class="gantt-focus-checkbox"' + checked + ' title="' + focusTitle + '" onclick="event.stopPropagation()" onchange="focusGanttTask(' + task.id + ', this.checked)">';
    html += '<span class="priority-dot ' + dotClass + '" title="' + priorityLabel(task.Priority) + '"></span>';
    html += '<button type="button" class="gantt-task-title-btn" onclick="openEditTaskModal(' + task.id + ')" title="' + openTitle + '">' + sanitize(task.Title) + "</button>";
    html += "</div>";
    if (ganttProjName) {
      html += '<div class="gantt-project-line" style="--project-color:' + ganttProjColor + ';">' + sanitize(ganttProjName) + "</div>";
    }
    html += '<div class="task-info">';
    if (task.Priority) html += '<span class="gantt-priority-text ' + ganttPriorityClass(task.Priority) + '">' + priorityLabel(task.Priority) + "</span>";
    if (assigneeNames) html += " \u{1F464} " + sanitize(assigneeNames);
    if (task.Due_Date) html += " \u{1F4C5} " + formatDate(task.Due_Date);
    if (taskComments.length > 0) html += ' <button class="gantt-mini-btn" onclick="event.stopPropagation();openCardCommentsModal(' + task.id + ')" title="' + t("comments") + '">\u{1F4AC} ' + taskComments.length + "</button>";
    if (taskAttachments.length > 0) html += ' <button class="gantt-mini-btn" onclick="event.stopPropagation();openCardAttachmentsModal(' + task.id + ')" title="' + (currentLang === "fr" ? "Pi\xE8ces jointes" : "Attachments") + '">\u{1F4CE} ' + taskAttachments.length + "</button>";
    html += "</div></td>";
    return html;
  }
  function renderGanttView() {
    var yearSelect = document.getElementById("gantt-year");
    if (yearSelect.options.length === 0) {
      for (var y = 2020; y <= 2050; y++) {
        var opt = document.createElement("option");
        opt.value = y;
        opt.textContent = y;
        yearSelect.appendChild(opt);
      }
    }
    yearSelect.value = ganttYear;
    document.querySelectorAll("[data-gantt-mode]").forEach(function(btn) {
      btn.classList.toggle("active", btn.getAttribute("data-gantt-mode") === ganttMode);
    });
    var tasksWithDates = getFilteredTasks().filter(function(task2) {
      return task2.Start_Date || task2.Due_Date;
    });
    var ganttSortSel = document.getElementById("gantt-sort");
    if (ganttSortSel && ganttSortSel.value !== ganttSort) ganttSortSel.value = ganttSort;
    if (ganttSort === "priority") {
      var prioOrder = { high: 0, medium: 1, low: 2 };
      tasksWithDates.sort(function(a, b) {
        var pa = prioOrder[a.Priority] !== void 0 ? prioOrder[a.Priority] : 3;
        var pb = prioOrder[b.Priority] !== void 0 ? prioOrder[b.Priority] : 3;
        return pa - pb;
      });
    } else if (ganttSort === "alpha") {
      tasksWithDates.sort(function(a, b) {
        return (a.Title || "").localeCompare(b.Title || "");
      });
    } else if (ganttSort === "due") {
      tasksWithDates.sort(function(a, b) {
        var da = a.Due_Date || a.Start_Date || 0, db = b.Due_Date || b.Start_Date || 0;
        return da - db;
      });
    }
    document.getElementById("gantt-task-count").textContent = "(" + tasksWithDates.length + " " + (currentLang === "fr" ? "t\xE2ches" : "tasks") + ")";
    var today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    var dayNames = currentLang === "fr" ? ["DIM.", "LUN.", "MAR.", "MER.", "JEU.", "VEN.", "SAM."] : ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    var monthNamesShort = currentLang === "fr" ? ["janv.", "f\xE9vr.", "mars", "avr.", "mai", "juin", "juil.", "ao\xFBt", "sept.", "oct.", "nov.", "d\xE9c."] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var monthNames = currentLang === "fr" ? ["janvier", "f\xE9vrier", "mars", "avril", "mai", "juin", "juillet", "ao\xFBt", "septembre", "octobre", "novembre", "d\xE9cembre"] : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var html = '<div class="gantt-container"><table class="gantt-table">';
    if (ganttMode === "weeks") {
      var weekAnchor = ganttYear === today.getFullYear() && ganttMonth === today.getMonth() ? new Date(today) : new Date(ganttYear, ganttMonth, 1);
      var startWeek = getISOWeek(weekAnchor);
      var numWeeks = 24;
      var weeks = [];
      for (var w = 0; w < numWeeks; w++) {
        var wn = startWeek + w;
        var yr = ganttYear;
        if (wn > 52) {
          wn -= 52;
          yr++;
        }
        var ws = getWeekStart(yr, wn);
        var we = new Date(ws);
        we.setDate(we.getDate() + 6);
        weeks.push({ num: wn, year: yr, start: ws, end: we });
      }
      html += '<thead><tr><th class="gantt-task-label" style="text-align:left;">' + t("colTaskName") + "</th>";
      for (var wi = 0; wi < weeks.length; wi++) {
        var wk = weeks[wi];
        var isCurrentWeek = getISOWeek(today) === wk.num && today.getFullYear() === wk.year;
        html += '<th style="min-width:80px;' + (isCurrentWeek ? "background:#fef2f2;color:#ef4444;" : "") + '">';
        html += '<div style="font-size:11px;font-weight:800;">S' + wk.num + "</div>";
        html += '<div style="font-size:9px;font-weight:400;color:#94a3b8;">' + monthNamesShort[wk.start.getMonth()] + " " + String(wk.start.getFullYear()).substring(2) + "</div>";
        html += "</th>";
      }
      html += "</tr></thead><tbody>";
      for (var ti = 0; ti < tasksWithDates.length; ti++) {
        var task = tasksWithDates[ti];
        var barClass = getGanttBarClass(task);
        var barCustomColor = getGanttBarColor(task);
        var barCustomStyle = barCustomColor ? "background:" + barCustomColor + ";color:white;" : "";
        html += ganttTaskRowStart(task);
        html += renderGanttTaskLabel(task);
        var tStart = task.Start_Date ? new Date(task.Start_Date * 1e3) : null;
        var tEnd = task.Due_Date ? new Date(task.Due_Date * 1e3) : null;
        if (!tStart && tEnd) tStart = tEnd;
        if (!tEnd && tStart) tEnd = tStart;
        if (tStart) tStart.setHours(0, 0, 0, 0);
        if (tEnd) tEnd.setHours(23, 59, 59, 999);
        var barStartIdx = -1, barEndIdx = -1;
        for (var wi = 0; wi < weeks.length; wi++) {
          var wk = weeks[wi];
          if (tStart && tEnd && tStart <= wk.end && tEnd >= wk.start) {
            if (barStartIdx === -1) barStartIdx = wi;
            barEndIdx = wi;
          }
        }
        var extEnd = getTaskExtensionEnd(task);
        var extStartIdx = -1, extEndIdx = -1;
        if (extEnd && tEnd && extEnd > tEnd) {
          for (var ewi = 0; ewi < weeks.length; ewi++) {
            if (tEnd <= weeks[ewi].end && extEnd >= weeks[ewi].start) {
              if (extStartIdx === -1) extStartIdx = ewi;
              extEndIdx = ewi;
            }
          }
        }
        var extColor = getExtensionBarColor(task);
        for (var wi = 0; wi < weeks.length; wi++) {
          var isCurrentWeek = getISOWeek(today) === weeks[wi].num && today.getFullYear() === weeks[wi].year;
          html += '<td class="gantt-cell" style="position:relative;' + (isCurrentWeek ? "background:#fef2f2;" : "") + '">';
          if (wi === barStartIdx) {
            var spanCols = barEndIdx - barStartIdx + 1;
            var widthPx = spanCols * 80;
            html += '<div class="gantt-bar ' + barClass + '" data-gantt-bar-task-id="' + task.id + '" style="left:2px;width:' + widthPx + "px;cursor:pointer;" + barCustomStyle + '" title="' + sanitize(task.Title) + '" onclick="openEditTaskModal(' + task.id + ')">' + sanitize(task.Title) + "</div>";
          }
          if (wi === extStartIdx && extStartIdx >= 0) {
            var extSpan = extEndIdx - extStartIdx + 1;
            var extW = extSpan * 80;
            html += '<div class="gantt-bar-extension" title="' + t("extensionTooltip") + " \u2014 " + sanitize(task.Title) + '" style="left:2px;width:' + extW + "px;border-color:" + extColor + ";background:" + extColor + '20;"></div>';
          }
          html += "</td>";
        }
        html += "</tr>";
        if (expandedGanttTasks[task.id]) {
          var sts = getGanttSubtasks(task.id);
          for (var sti = 0; sti < sts.length; sti++) {
            var st = sts[sti];
            var stRange = getGanttSubtaskRange(st, task);
            var stBarClass = ganttSubtaskBarClass(st, task);
            html += '<tr class="gantt-subtask-row">' + renderGanttSubtaskLabelCell(st, task.id);
            var stStartIdx = -1, stEndIdx = -1;
            for (var wi2 = 0; wi2 < weeks.length; wi2++) {
              if (stRange.start <= weeks[wi2].end && stRange.end >= weeks[wi2].start) {
                if (stStartIdx === -1) stStartIdx = wi2;
                stEndIdx = wi2;
              }
            }
            for (var wi2 = 0; wi2 < weeks.length; wi2++) {
              var isCW = getISOWeek(today) === weeks[wi2].num && today.getFullYear() === weeks[wi2].year;
              html += '<td class="gantt-cell" style="position:relative;' + (isCW ? "background:#fef2f2;" : "") + '">';
              if (wi2 === stStartIdx) {
                var stSpan = stEndIdx - stStartIdx + 1;
                var stWidth = stSpan * 80;
                html += '<div class="gantt-bar gantt-bar-subtask ' + stBarClass + '" style="left:2px;width:' + stWidth + 'px;cursor:pointer;" title="' + sanitize(st.Title) + '" onclick="openEditTaskModal(' + task.id + ')"></div>';
              }
              html += "</td>";
            }
            html += "</tr>";
          }
        }
      }
      var viewStartMonth = monthNames[weeks[0].start.getMonth()];
      var viewEndMonth = monthNames[weeks[weeks.length - 1].start.getMonth()];
      html += "</tbody></table>";
      html += '<div class="gantt-footer">';
      html += "<span>\u{1F31F} " + t("ganttFullYear") + " \u2022 " + t("ganttNavInfo") + " \u2022 " + tasksWithDates.length + " " + (currentLang === "fr" ? "t\xE2ches" : "tasks") + "</span>";
      html += "<span>" + t("ganttViewRange") + " " + viewStartMonth + " - " + viewEndMonth + " " + ganttYear + "</span>";
      html += "</div></div>";
      document.getElementById("gantt-view").innerHTML = html;
      initGanttDragScroll();
      return;
    }
    if (ganttMode === "year" || ganttMode === "twoyears") {
      var numYears = ganttMode === "twoyears" ? 2 : 1;
      var totalMonths = numYears * 12;
      var startYr = ganttYear;
      var colWidth = ganttMode === "twoyears" ? 50 : 70;
      var todayMonth = today.getMonth();
      var todayYear = today.getFullYear();
      html += "<thead>";
      if (ganttMode === "twoyears") {
        html += '<tr><th class="gantt-task-label" style="text-align:left;" rowspan="2">' + t("colTaskName") + "</th>";
        html += '<th colspan="12" style="font-size:12px;font-weight:800;background:#f8fafc;">' + startYr + "</th>";
        html += '<th colspan="12" style="font-size:12px;font-weight:800;background:#f8fafc;">' + (startYr + 1) + "</th>";
        html += "</tr><tr>";
      } else {
        html += '<tr><th class="gantt-task-label" style="text-align:left;">' + t("colTaskName") + "</th>";
      }
      for (var ym = 0; ym < totalMonths; ym++) {
        var yr = startYr + Math.floor(ym / 12);
        var mo = ym % 12;
        var isCurrent = yr === todayYear && mo === todayMonth;
        html += '<th style="min-width:' + colWidth + "px;" + (isCurrent ? "background:#fef2f2;color:#ef4444;" : "") + '">' + monthNamesShort[mo].substring(0, 3) + "</th>";
      }
      html += "</tr></thead><tbody>";
      for (var ti = 0; ti < tasksWithDates.length; ti++) {
        var task = tasksWithDates[ti];
        var barClass = getGanttBarClass(task);
        html += ganttTaskRowStart(task) + renderGanttTaskLabel(task);
        var yTStart = task.Start_Date ? new Date(task.Start_Date * 1e3) : null;
        var yTEnd = task.Due_Date ? new Date(task.Due_Date * 1e3) : null;
        if (!yTStart && yTEnd) yTStart = new Date(yTEnd);
        if (!yTEnd && yTStart) yTEnd = new Date(yTStart);
        if (yTStart) yTStart.setHours(0, 0, 0, 0);
        if (yTEnd) yTEnd.setHours(23, 59, 59, 999);
        var yBarStart = -1, yBarEnd = -1;
        for (var ym = 0; ym < totalMonths; ym++) {
          var yr = startYr + Math.floor(ym / 12);
          var mo = ym % 12;
          var ms = new Date(yr, mo, 1);
          var me = new Date(yr, mo + 1, 0, 23, 59, 59, 999);
          if (yTStart && yTEnd && yTStart <= me && yTEnd >= ms) {
            if (yBarStart === -1) yBarStart = ym;
            yBarEnd = ym;
          }
        }
        var yExtEnd = getTaskExtensionEnd(task);
        var yExtStart = -1, yExtEndIdx = -1;
        if (yExtEnd && yTEnd && yExtEnd > yTEnd) {
          for (var yme = 0; yme < totalMonths; yme++) {
            var yre = startYr + Math.floor(yme / 12);
            var moe = yme % 12;
            var mse = new Date(yre, moe, 1);
            var mee = new Date(yre, moe + 1, 0, 23, 59, 59, 999);
            if (mse > yTEnd && yExtEnd >= mse) {
              if (yExtStart === -1) yExtStart = yme;
              yExtEndIdx = yme;
            }
          }
        }
        var yExtColor = getExtensionBarColor(task);
        for (var ym = 0; ym < totalMonths; ym++) {
          var yr2 = startYr + Math.floor(ym / 12);
          var mo2 = ym % 12;
          var isCurrent2 = yr2 === todayYear && mo2 === todayMonth;
          html += '<td class="gantt-cell" style="position:relative;min-width:' + colWidth + "px;" + (isCurrent2 ? "background:#fef2f2;" : "") + '">';
          if (ym === yBarStart) {
            var yBarW = (yBarEnd - yBarStart + 1) * colWidth;
            html += '<div class="gantt-bar ' + barClass + '" data-gantt-bar-task-id="' + task.id + '" style="left:2px;width:' + yBarW + "px;cursor:pointer;" + barCustomStyle + '" title="' + sanitize(task.Title) + '" onclick="openEditTaskModal(' + task.id + ')">' + sanitize(task.Title) + "</div>";
          }
          if (ym === yExtStart && yExtStart >= 0) {
            var yExtW = (yExtEndIdx - yExtStart + 1) * colWidth;
            html += '<div class="gantt-bar-extension" title="' + t("extensionTooltip") + " \u2014 " + sanitize(task.Title) + '" style="left:2px;width:' + yExtW + "px;border-color:" + yExtColor + ";background:" + yExtColor + '20;"></div>';
          }
          html += "</td>";
        }
        html += "</tr>";
        if (expandedGanttTasks[task.id]) {
          var sts = getGanttSubtasks(task.id);
          for (var sti = 0; sti < sts.length; sti++) {
            var st = sts[sti];
            var stRange = getGanttSubtaskRange(st, task);
            var stBarClass = ganttSubtaskBarClass(st, task);
            html += '<tr class="gantt-subtask-row">' + renderGanttSubtaskLabelCell(st, task.id);
            var stYStart = -1, stYEnd = -1;
            for (var ym3 = 0; ym3 < totalMonths; ym3++) {
              var yr3 = startYr + Math.floor(ym3 / 12);
              var mo3 = ym3 % 12;
              var ms3 = new Date(yr3, mo3, 1);
              var me3 = new Date(yr3, mo3 + 1, 0, 23, 59, 59, 999);
              if (stRange.start <= me3 && stRange.end >= ms3) {
                if (stYStart === -1) stYStart = ym3;
                stYEnd = ym3;
              }
            }
            for (var ym3 = 0; ym3 < totalMonths; ym3++) {
              html += '<td class="gantt-cell" style="position:relative;min-width:' + colWidth + 'px;">';
              if (ym3 === stYStart) {
                var stYW = (stYEnd - stYStart + 1) * colWidth;
                html += '<div class="gantt-bar gantt-bar-subtask ' + stBarClass + '" style="left:2px;width:' + stYW + 'px;cursor:pointer;" title="' + sanitize(st.Title) + '" onclick="openEditTaskModal(' + task.id + ')"></div>';
              }
              html += "</td>";
            }
            html += "</tr>";
          }
        }
      }
      html += "</tbody></table>";
      html += '<div class="gantt-footer">';
      var rangeLabel = ganttMode === "twoyears" ? startYr + " - " + (startYr + 1) : String(startYr);
      html += "<span>\u{1F31F} " + t("ganttFullYear") + " \u2022 " + tasksWithDates.length + " " + (currentLang === "fr" ? "t\xE2ches" : "tasks") + "</span>";
      html += "<span>" + t("ganttViewRange") + " " + rangeLabel + "</span>";
      html += "</div></div>";
      document.getElementById("gantt-view").innerHTML = html;
      initGanttDragScroll();
      return;
    }
    if (ganttMode === "months") {
      var startDate = new Date(ganttYear, 0, 1);
      var endDate = new Date(ganttYear, 11, 31);
      var todayMonth = today.getMonth();
      var todayYear = today.getFullYear();
      var todayDayPct = todayYear === ganttYear && todayMonth >= 0 && todayMonth < 12 ? Math.round((today.getDate() - 1) / new Date(ganttYear, todayMonth + 1, 0).getDate() * 100) : -1;
      html += '<thead><tr><th class="gantt-task-label" style="text-align:left;">' + t("colTaskName") + "</th>";
      for (var m = 0; m < 12; m++) {
        var isCurrentMonth = ganttYear === todayYear && m === todayMonth;
        html += '<th colspan="1" style="' + (isCurrentMonth ? "background:#fef2f2;color:#ef4444;" : "") + '">' + monthNames[m].substring(0, 3).toUpperCase() + "</th>";
      }
      html += "</tr></thead><tbody>";
      for (var ti = 0; ti < tasksWithDates.length; ti++) {
        var task = tasksWithDates[ti];
        var barClass = getGanttBarClass(task);
        var barCustomColor = getGanttBarColor(task);
        var barCustomStyle = barCustomColor ? "background:" + barCustomColor + ";color:white;" : "";
        html += ganttTaskRowStart(task);
        html += renderGanttTaskLabel(task);
        var mTStart = task.Start_Date ? new Date(task.Start_Date * 1e3) : null;
        var mTEnd = task.Due_Date ? new Date(task.Due_Date * 1e3) : null;
        if (!mTStart && mTEnd) mTStart = new Date(mTEnd);
        if (!mTEnd && mTStart) mTEnd = new Date(mTStart);
        if (mTStart) mTStart.setHours(0, 0, 0, 0);
        if (mTEnd) mTEnd.setHours(23, 59, 59, 999);
        var mBarStartIdx = -1, mBarEndIdx = -1;
        for (var m = 0; m < 12; m++) {
          var ms = new Date(ganttYear, m, 1);
          var me = new Date(ganttYear, m + 1, 0, 23, 59, 59, 999);
          if (mTStart && mTEnd && mTStart <= me && mTEnd >= ms) {
            if (mBarStartIdx === -1) mBarStartIdx = m;
            mBarEndIdx = m;
          }
        }
        var mExtEnd = getTaskExtensionEnd(task);
        var mExtStart = -1, mExtEndI = -1;
        if (mExtEnd && mTEnd && mExtEnd > mTEnd) {
          for (var me2 = 0; me2 < 12; me2++) {
            var ms2 = new Date(ganttYear, me2, 1);
            var me2e = new Date(ganttYear, me2 + 1, 0, 23, 59, 59, 999);
            if (ms2 > mTEnd && mExtEnd >= ms2) {
              if (mExtStart === -1) mExtStart = me2;
              mExtEndI = me2;
            }
          }
        }
        var mExtColor = getExtensionBarColor(task);
        for (var m = 0; m < 12; m++) {
          var isTodayMonth = ganttYear === todayYear && m === todayMonth;
          html += '<td class="gantt-cell" style="position:relative;min-width:80px;">';
          if (isTodayMonth && todayDayPct >= 0) {
            html += '<div style="position:absolute;top:0;bottom:0;left:' + todayDayPct + '%;width:2px;background:#ef4444;z-index:1;pointer-events:none;"></div>';
          }
          if (m === mBarStartIdx) {
            var mBarWidth = (mBarEndIdx - mBarStartIdx + 1) * 80;
            html += '<div class="gantt-bar ' + barClass + '" data-gantt-bar-task-id="' + task.id + '" style="left:2px;width:' + mBarWidth + "px;cursor:pointer;" + barCustomStyle + '" title="' + sanitize(task.Title) + '" onclick="openEditTaskModal(' + task.id + ')">' + sanitize(task.Title) + "</div>";
          }
          if (m === mExtStart && mExtStart >= 0) {
            var mExtW = (mExtEndI - mExtStart + 1) * 80;
            html += '<div class="gantt-bar-extension" title="' + t("extensionTooltip") + " \u2014 " + sanitize(task.Title) + '" style="left:2px;width:' + mExtW + "px;border-color:" + mExtColor + ";background:" + mExtColor + '20;"></div>';
          }
          html += "</td>";
        }
        html += "</tr>";
        if (expandedGanttTasks[task.id]) {
          var sts = getGanttSubtasks(task.id);
          for (var sti = 0; sti < sts.length; sti++) {
            var st = sts[sti];
            var stRange = getGanttSubtaskRange(st, task);
            var stBarClass = ganttSubtaskBarClass(st, task);
            html += '<tr class="gantt-subtask-row">' + renderGanttSubtaskLabelCell(st, task.id);
            var stStartM = -1, stEndM = -1;
            for (var m2 = 0; m2 < 12; m2++) {
              var mStart = new Date(ganttYear, m2, 1);
              var mEnd = new Date(ganttYear, m2 + 1, 0, 23, 59, 59, 999);
              if (stRange.start <= mEnd && stRange.end >= mStart) {
                if (stStartM === -1) stStartM = m2;
                stEndM = m2;
              }
            }
            for (var m2 = 0; m2 < 12; m2++) {
              var isTodayMonth2 = ganttYear === todayYear && m2 === todayMonth;
              html += '<td class="gantt-cell" style="position:relative;min-width:80px;">';
              if (isTodayMonth2 && todayDayPct >= 0) {
                html += '<div style="position:absolute;top:0;bottom:0;left:' + todayDayPct + '%;width:2px;background:#ef4444;z-index:1;pointer-events:none;"></div>';
              }
              if (m2 === stStartM) {
                var stBarW = (stEndM - stStartM + 1) * 80;
                html += '<div class="gantt-bar gantt-bar-subtask ' + stBarClass + '" style="left:2px;width:' + stBarW + 'px;cursor:pointer;" title="' + sanitize(st.Title) + '" onclick="openEditTaskModal(' + task.id + ')"></div>';
              }
              html += "</td>";
            }
            html += "</tr>";
          }
        }
      }
      html += "</tbody></table>";
      html += '<div class="gantt-footer">';
      html += "<span>\u{1F31F} " + t("ganttFullYear") + " \u2022 " + t("ganttNavInfo") + " \u2022 " + tasksWithDates.length + " " + (currentLang === "fr" ? "t\xE2ches" : "tasks") + "</span>";
      html += "<span>" + t("ganttViewRange") + " " + monthNames[0] + " - " + monthNames[11] + " " + ganttYear + "</span>";
      html += "</div></div>";
      document.getElementById("gantt-view").innerHTML = html;
      initGanttDragScroll();
      return;
    }
    var startDate, endDate;
    if (ganttMode === "custom" && ganttCustomStart && ganttCustomEnd) {
      startDate = /* @__PURE__ */ new Date(ganttCustomStart + "T00:00:00");
      endDate = /* @__PURE__ */ new Date(ganttCustomEnd + "T00:00:00");
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || endDate < startDate) {
        startDate = new Date(ganttYear, ganttMonth - 1, 1);
        endDate = new Date(ganttYear, ganttMonth + 2, 0);
      } else {
        var maxEnd = new Date(startDate);
        maxEnd.setDate(maxEnd.getDate() + 400);
        if (endDate > maxEnd) endDate = maxEnd;
      }
    } else {
      if (ganttYear === today.getFullYear() && ganttMonth === today.getMonth()) {
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        endDate = new Date(today);
        endDate.setDate(today.getDate() + 60);
      } else {
        startDate = new Date(ganttYear, ganttMonth, 1);
        endDate = new Date(ganttYear, ganttMonth + 2, 0);
      }
    }
    var days = [];
    var d = new Date(startDate);
    while (d <= endDate) {
      days.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    html += '<thead><tr><th class="gantt-task-label" style="text-align:left;" rowspan="2">' + t("colTaskName") + "</th>";
    var prevMonth = -1;
    for (var di0 = 0; di0 < days.length; di0++) {
      var dm = days[di0].getMonth();
      if (dm !== prevMonth) {
        var colspan = 0;
        for (var di1 = di0; di1 < days.length && days[di1].getMonth() === dm; di1++) colspan++;
        html += '<th colspan="' + colspan + '" style="font-size:11px;font-weight:700;color:#475569;background:#f8fafc;border-bottom:1px solid #e2e8f0;">' + monthNames[dm].toUpperCase() + "</th>";
        prevMonth = dm;
      }
    }
    html += "</tr><tr>";
    for (var di = 0; di < days.length; di++) {
      var dd = days[di];
      var isToday = dd.getTime() === today.getTime();
      var isWeekend = dd.getDay() === 0 || dd.getDay() === 6;
      html += '<th class="' + (isToday ? "today" : "") + (isWeekend ? " weekend" : "") + '">';
      html += "<div>" + dd.getDate() + "</div>";
      html += '<div style="font-size:8px;">' + dayNames[dd.getDay()] + "</div>";
      html += "</th>";
    }
    html += "</tr></thead><tbody>";
    for (var ti = 0; ti < tasksWithDates.length; ti++) {
      var task = tasksWithDates[ti];
      var barClass = getGanttBarClass(task);
      var barCustomColor = getGanttBarColor(task);
      var barCustomStyle = barCustomColor ? "background:" + barCustomColor + ";color:white;" : "";
      html += ganttTaskRowStart(task);
      html += renderGanttTaskLabel(task);
      var tStart = task.Start_Date ? new Date(task.Start_Date * 1e3) : null;
      var tEnd = task.Due_Date ? new Date(task.Due_Date * 1e3) : null;
      if (!tStart && tEnd) tStart = tEnd;
      if (!tEnd && tStart) tEnd = tStart;
      if (tStart) tStart.setHours(0, 0, 0, 0);
      if (tEnd) tEnd.setHours(0, 0, 0, 0);
      var barStartIdx = -1, barEndIdx = -1;
      if (tStart && tEnd) {
        for (var di = 0; di < days.length; di++) {
          var dday = days[di];
          if (dday >= tStart && dday <= tEnd) {
            if (barStartIdx === -1) barStartIdx = di;
            barEndIdx = di;
          }
        }
        if (barStartIdx === -1 && tStart < days[0] && tEnd >= days[0]) {
          barStartIdx = 0;
          for (var di2 = 0; di2 < days.length; di2++) {
            if (days[di2] <= tEnd) barEndIdx = di2;
          }
        }
      }
      var dExtEnd = getTaskExtensionEnd(task);
      var dExtStartIdx = -1, dExtEndIdx = -1;
      if (dExtEnd && tEnd && dExtEnd > tEnd) {
        var dExtDay = new Date(dExtEnd);
        dExtDay.setHours(0, 0, 0, 0);
        for (var dei = 0; dei < days.length; dei++) {
          if (days[dei] >= tEnd && days[dei] <= dExtDay) {
            if (dExtStartIdx === -1) dExtStartIdx = dei;
            dExtEndIdx = dei;
          }
        }
      }
      var dExtColor = getExtensionBarColor(task);
      for (var di = 0; di < days.length; di++) {
        var dd = days[di];
        var isToday = dd.getTime() === today.getTime();
        var isWeekend = dd.getDay() === 0 || dd.getDay() === 6;
        var cellClass = (isToday ? "today-col" : "") + (isWeekend ? " weekend-col" : "");
        html += '<td class="gantt-cell ' + cellClass + '">';
        if (di === barStartIdx) {
          var spanDays = barEndIdx - barStartIdx + 1;
          var widthPx = spanDays * 36;
          html += '<div class="gantt-bar ' + barClass + '" data-gantt-bar-task-id="' + task.id + '" style="left:2px;width:' + widthPx + "px;cursor:pointer;" + barCustomStyle + '" title="' + sanitize(task.Title) + '" onclick="openEditTaskModal(' + task.id + ')">' + sanitize(task.Title) + "</div>";
        }
        if (di === dExtStartIdx && dExtStartIdx >= 0) {
          var dExtW = (dExtEndIdx - dExtStartIdx + 1) * 36;
          html += '<div class="gantt-bar-extension" title="' + t("extensionTooltip") + " \u2014 " + sanitize(task.Title) + '" style="left:2px;width:' + dExtW + "px;border-color:" + dExtColor + ";background:" + dExtColor + '20;"></div>';
        }
        html += "</td>";
      }
      html += "</tr>";
      if (expandedGanttTasks[task.id]) {
        var sts = getGanttSubtasks(task.id);
        for (var sti = 0; sti < sts.length; sti++) {
          var st = sts[sti];
          var stRange = getGanttSubtaskRange(st, task);
          var stStartDay = new Date(stRange.start);
          stStartDay.setHours(0, 0, 0, 0);
          var stEndDay = new Date(stRange.end);
          stEndDay.setHours(0, 0, 0, 0);
          var stBarClass = ganttSubtaskBarClass(st, task);
          var stBarStartIdx = -1, stBarEndIdx = -1;
          for (var di2 = 0; di2 < days.length; di2++) {
            var dday2 = days[di2];
            if (dday2 >= stStartDay && dday2 <= stEndDay) {
              if (stBarStartIdx === -1) stBarStartIdx = di2;
              stBarEndIdx = di2;
            }
          }
          html += '<tr class="gantt-subtask-row">' + renderGanttSubtaskLabelCell(st, task.id);
          for (var di2 = 0; di2 < days.length; di2++) {
            var dd2 = days[di2];
            var isToday2 = dd2.getTime() === today.getTime();
            var isWeekend2 = dd2.getDay() === 0 || dd2.getDay() === 6;
            var cellClass2 = (isToday2 ? "today-col" : "") + (isWeekend2 ? " weekend-col" : "");
            html += '<td class="gantt-cell ' + cellClass2 + '">';
            if (di2 === stBarStartIdx) {
              var stSpanDays = stBarEndIdx - stBarStartIdx + 1;
              var stWidth = stSpanDays * 36;
              html += '<div class="gantt-bar gantt-bar-subtask ' + stBarClass + '" style="left:2px;width:' + stWidth + 'px;cursor:pointer;" title="' + sanitize(st.Title) + '" onclick="openEditTaskModal(' + task.id + ')"></div>';
            }
            html += "</td>";
          }
          html += "</tr>";
        }
      }
    }
    html += "</tbody></table>";
    var viewStart = monthNames[startDate.getMonth()];
    var viewEnd = monthNames[endDate.getMonth()];
    html += '<div class="gantt-footer">';
    html += "<span>\u{1F31F} " + t("ganttFullYear") + " \u2022 " + t("ganttNavInfo") + " \u2022 " + tasksWithDates.length + " " + (currentLang === "fr" ? "t\xE2ches" : "tasks") + "</span>";
    html += "<span>" + t("ganttViewRange") + " " + viewStart + " - " + viewEnd + " " + ganttYear + "</span>";
    html += "</div></div>";
    document.getElementById("gantt-view").innerHTML = html;
    initGanttDragScroll();
    scrollGanttToToday();
  }
  function initGanttDragScroll() {
    var container = document.querySelector("#gantt-view .gantt-container");
    if (!container) return;
    var isDown = false;
    var startX, scrollLeft, hasMoved;
    container.addEventListener("mousedown", function(e) {
      if (e.button !== 0) return;
      if (e.target.closest("button, a, select, input")) return;
      isDown = true;
      hasMoved = false;
      startX = e.clientX;
      scrollLeft = container.scrollLeft;
      container.style.cursor = "grabbing";
      container.style.userSelect = "none";
    });
    document.addEventListener("mouseup", function() {
      if (!isDown) return;
      isDown = false;
      container.style.cursor = "";
      container.style.userSelect = "";
    });
    document.addEventListener("mousemove", function(e) {
      if (!isDown) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 3) hasMoved = true;
      if (!hasMoved) return;
      e.preventDefault();
      container.scrollLeft = scrollLeft - dx;
    });
    container.addEventListener("click", function(e) {
      if (hasMoved) {
        e.stopPropagation();
        e.preventDefault();
      }
    }, true);
  }
  function scrollGanttToToday() {
    if (ganttMode !== "days") return;
    var container = document.querySelector("#gantt-view .gantt-container");
    var todayCell = container ? container.querySelector(".today-col") : null;
    if (!container || !todayCell) return;
    var left = todayCell.offsetLeft - Math.max(80, container.clientWidth * 0.38);
    container.scrollLeft = Math.max(0, left);
  }
  function scrollGanttToTask(taskId) {
    var container = document.querySelector("#gantt-view .gantt-container");
    var bar = container ? container.querySelector('[data-gantt-bar-task-id="' + taskId + '"]') : null;
    if (!container || !bar) return;
    var stickyLabel = container.querySelector(".gantt-task-label");
    var labelWidth = stickyLabel ? stickyLabel.offsetWidth : 260;
    var containerRect = container.getBoundingClientRect();
    var barRect = bar.getBoundingClientRect();
    var barContentLeft = container.scrollLeft + (barRect.left - containerRect.left);
    container.scrollLeft = Math.max(0, barContentLeft - labelWidth - 12);
  }
  function focusGanttTask(taskId, checked) {
    selectedGanttTaskId = checked ? taskId : null;
    document.querySelectorAll("#gantt-view .gantt-task-row").forEach(function(row) {
      var isSelected = checked && Number(row.getAttribute("data-gantt-task-id")) === Number(taskId);
      row.classList.toggle("gantt-row-selected", isSelected);
      var checkbox = row.querySelector(".gantt-focus-checkbox");
      if (checkbox) checkbox.checked = isSelected;
    });
    if (checked) requestAnimationFrame(function() {
      scrollGanttToTask(taskId);
    });
  }
  function setGanttYear(value) {
    ganttYear = Math.max(2020, Math.min(2050, parseInt(value)));
    renderGanttView();
  }
  function ganttNav(dir) {
    if (ganttMode === "months" || ganttMode === "year" || ganttMode === "twoyears") {
      ganttYear += dir;
      ganttYear = Math.max(2020, Math.min(2050, ganttYear));
    } else if (ganttMode === "weeks") {
      ganttMonth += dir * 3;
      if (ganttMonth > 11) {
        ganttMonth -= 12;
        ganttYear++;
      }
      if (ganttMonth < 0) {
        ganttMonth += 12;
        ganttYear--;
      }
      ganttYear = Math.max(2020, Math.min(2050, ganttYear));
    } else {
      ganttMonth += dir;
      if (ganttMonth > 11) {
        ganttMonth -= 12;
        ganttYear++;
      }
      if (ganttMonth < 0) {
        ganttMonth += 12;
        ganttYear--;
      }
      ganttYear = Math.max(2020, Math.min(2050, ganttYear));
    }
    renderGanttView();
  }
  function ganttToday() {
    var today = /* @__PURE__ */ new Date();
    ganttYear = today.getFullYear();
    ganttMonth = today.getMonth();
    renderGanttView();
  }
  function ganttExpandAll() {
    var tasksWithSubs = state.tasks.filter(function(t2) {
      return getGanttSubtasks(t2.id).length > 0;
    });
    tasksWithSubs.forEach(function(t2) {
      expandedGanttTasks[t2.id] = true;
    });
    renderGanttView();
  }
  function ganttCollapseAll() {
    expandedGanttTasks = {};
    renderGanttView();
  }
  function setGanttMode(mode) {
    ganttMode = mode;
    var rangeBox = document.getElementById("gantt-custom-range");
    if (rangeBox) rangeBox.style.display = mode === "custom" ? "flex" : "none";
    if (mode === "custom") {
      if (!ganttCustomStart || !ganttCustomEnd) {
        var ds = new Date(ganttYear, ganttMonth - 1, 1);
        var de = new Date(ganttYear, ganttMonth + 2, 0);
        ganttCustomStart = ds.toISOString().split("T")[0];
        ganttCustomEnd = de.toISOString().split("T")[0];
      }
      var sEl = document.getElementById("gantt-custom-start");
      var eEl = document.getElementById("gantt-custom-end");
      if (sEl) sEl.value = ganttCustomStart;
      if (eEl) eEl.value = ganttCustomEnd;
    }
    renderGanttView();
  }
  function setGanttCustomRange() {
    var sEl = document.getElementById("gantt-custom-start");
    var eEl = document.getElementById("gantt-custom-end");
    if (sEl) ganttCustomStart = sEl.value;
    if (eEl) ganttCustomEnd = eEl.value;
    renderGanttView();
  }
  function setGanttSort(value) {
    ganttSort = value;
    renderGanttView();
  }
  async function exportGanttPdf() {
    var container = document.querySelector("#gantt-view .gantt-container");
    var table = container ? container.querySelector(".gantt-table") : null;
    if (!table) {
      showToast(currentLang === "fr" ? "Affichez d'abord le Gantt" : "Open the Gantt first", "error");
      return;
    }
    if (typeof html2canvas === "undefined" || !window.jspdf) {
      showToast(currentLang === "fr" ? "Librairies PDF non charg\xE9es" : "PDF libraries not loaded", "error");
      return;
    }
    showToast(currentLang === "fr" ? "G\xE9n\xE9ration du PDF..." : "Generating PDF...", "info");
    container.classList.add("gantt-exporting");
    try {
      var canvas = await html2canvas(table, { scale: 2, backgroundColor: "#ffffff", windowWidth: table.scrollWidth, windowHeight: table.scrollHeight });
      container.classList.remove("gantt-exporting");
      var imgData = canvas.toDataURL("image/png");
      var jsPDF = window.jspdf.jsPDF;
      var w = canvas.width, h = canvas.height;
      var pdf = new jsPDF({ orientation: w >= h ? "landscape" : "portrait", unit: "px", format: [w, h], hotfixes: ["px_scaling"] });
      pdf.addImage(imgData, "PNG", 0, 0, w, h);
      var dateStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      pdf.save("Gantt_" + dateStr + ".pdf");
      showToast(currentLang === "fr" ? "PDF export\xE9 \u2713" : "PDF exported \u2713", "success");
    } catch (e) {
      container.classList.remove("gantt-exporting");
      console.error("exportGanttPdf:", e);
      showToast((currentLang === "fr" ? "Erreur export PDF : " : "PDF export error: ") + e.message, "error");
    }
  }
  function toggleGanttFullscreen() {
    var el = document.getElementById("tab-gantt");
    var btn = document.getElementById("gantt-fullscreen-btn");
    if (!el) return;
    var on = el.classList.toggle("gantt-fullscreen");
    if (btn) {
      var label = on ? currentLang === "fr" ? "Quitter le plein \xE9cran" : "Exit fullscreen" : currentLang === "fr" ? "Afficher le Gantt en plein \xE9cran" : "Show Gantt fullscreen";
      btn.title = label;
      btn.setAttribute("aria-label", label);
      btn.setAttribute("data-tooltip", label);
    }
  }

  // src/domains/stats.js
  function updateStats() {
    var container = document.getElementById("stats-row");
    if (!container) return;
    var filteredTasks = getFilteredTasks();
    var total = filteredTasks.length;
    var html = "";
    if (showArchivedTasks) {
      html += '<div class="stat-card stat-total"><div><div class="stat-label">' + (currentLang === "fr" ? "Archiv\xE9es" : "Archived") + '</div><div class="stat-value">' + total + '</div></div><div class="stat-icon"><span class="suite-stat-mark"></span></div></div>';
    } else {
      html += '<div class="stat-card stat-total"><div><div class="stat-label">Total</div><div class="stat-value">' + total + '</div></div><div class="stat-icon"><span class="suite-stat-mark"></span></div></div>';
      var statuses = getKanbanStatuses();
      for (var i = 0; i < statuses.length; i++) {
        var s = statuses[i];
        var count = filteredTasks.filter(function(t2) {
          return t2.Status === s.key;
        }).length;
        var label = currentLang === "fr" ? s.label_fr : s.label_en;
        var color = s.color || "#94a3b8";
        var icon = s.emoji && s.emoji.trim() ? s.emoji.trim() : '<span style="display:inline-block;width:16px;height:16px;border-radius:50%;background:' + color + ';"></span>';
        html += '<div class="stat-card"><div><div class="stat-label">' + sanitize(label) + '</div><div class="stat-value" style="color:' + color + '">' + count + '</div></div><div class="stat-icon">' + icon + "</div></div>";
      }
    }
    container.innerHTML = html;
  }

  // src/ui/tabs.js
  function switchTab(tabId) {
    document.querySelectorAll(".tab-btn").forEach(function(btn) {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
    });
    document.querySelectorAll(".tab-content").forEach(function(tc) {
      tc.classList.toggle("active", tc.id === "tab-" + tabId);
    });
    localStorage.setItem("pm-active-tab", tabId);
    if (tabId === "kanban") renderKanbanView();
    if (tabId === "gantt") renderGanttView();
    if (tabId === "team") renderTeamView();
    if (tabId === "settings") renderSettingsView();
  }
  function restoreActiveTab() {
    var savedTab = localStorage.getItem("pm-active-tab");
    var allowedTabs = ["kanban", "gantt", "team", "settings"];
    if (savedTab && allowedTabs.indexOf(savedTab) !== -1) {
      switchTab(savedTab);
    } else {
      switchTab("kanban");
    }
  }
  function refreshAllViews() {
    if (typeof renderProjectSelector === "function") renderProjectSelector();
    updateStats();
    updateArchiveButton();
    var activeTab = document.querySelector(".tab-btn.active");
    if (activeTab) {
      var tab = activeTab.getAttribute("data-tab");
      if (tab === "kanban") renderKanbanView();
      if (tab === "gantt") renderGanttView();
      if (tab === "team") renderTeamView();
    }
    applyBusinessRoleRestrictions();
  }

  // src/domains/tags.js
  var customTags = [];
  function getTags() {
    return customTags;
  }
  function setTagsFromSettings(raw) {
    var parsed = [];
    try {
      parsed = JSON.parse(raw) || [];
    } catch (e) {
    }
    customTags.length = 0;
    Array.prototype.push.apply(customTags, parsed);
  }
  async function saveTags() {
    await saveSetting("tags", JSON.stringify(customTags));
    await syncTagChoices();
  }
  async function syncTagChoices() {
    try {
      var choices = customTags.map(function(tg) {
        return tg.name;
      });
      var choiceOptions = {};
      customTags.forEach(function(tg) {
        if (tg.color) choiceOptions[tg.name] = { fillColor: tg.color, textColor: "#ffffff" };
      });
      var tagCol = getColumnName("tasks", "tag");
      await grist.docApi.applyUserActions([
        ["ModifyColumn", state.TASKS_TABLE, tagCol, { widgetOptions: JSON.stringify({ choices, choiceOptions }) }]
      ]);
      state.taskTableColumns = null;
    } catch (e) {
      console.log("syncTagChoices:", e.message);
    }
  }
  function renderTagsList() {
    var container = document.getElementById("tags-list");
    if (!container) return;
    if (customTags.length === 0) {
      container.innerHTML = '<div style="text-align:center;color:#94a3b8;padding:20px;">' + (currentLang === "fr" ? "Aucun tag" : "No tags") + "</div>";
      return;
    }
    var html = '<div class="settings-items">';
    customTags.forEach(function(tg, i) {
      html += '<div class="settings-item">';
      html += '<span class="settings-item-dot" style="background:' + (tg.color || "#6366f1") + ';"></span>';
      html += '<div class="settings-item-info"><strong>' + sanitize(tg.name) + "</strong></div>";
      html += '<div class="settings-item-actions">';
      html += '<button class="btn-icon" onclick="editTagSetting(' + i + ')" title="' + (currentLang === "fr" ? "Modifier" : "Edit") + '">\u270F\uFE0F</button>';
      if (state.isOwner) html += '<button class="btn-icon" onclick="removeTagSetting(' + i + ')" title="' + t("delete") + '">\u{1F5D1}\uFE0F</button>';
      html += "</div>";
      html += "</div>";
    });
    html += "</div>";
    container.innerHTML = html;
  }
  async function addTagSetting() {
    var result = await showPromptModal(
      currentLang === "fr" ? "Nouveau tag" : "New tag",
      [
        { label: currentLang === "fr" ? "Nom" : "Name", placeholder: currentLang === "fr" ? "Ex: Urgent" : "Ex: Urgent" },
        { label: currentLang === "fr" ? "Couleur" : "Color", type: "color" }
      ],
      ["", "#6366f1"]
    );
    if (!result || !result[0]) return;
    var name = result[0].trim();
    if (!name) return;
    if (customTags.some(function(tg) {
      return tg.name === name;
    })) {
      showToast(currentLang === "fr" ? "Ce tag existe d\xE9j\xE0" : "This tag already exists", "error");
      return;
    }
    customTags.push({ name, color: result[1] || "#6366f1" });
    await saveTags();
    renderTagsList();
    refreshAllViews();
    showToast(currentLang === "fr" ? "Tag ajout\xE9" : "Tag added", "success");
  }
  async function editTagSetting(index) {
    var tg = customTags[index];
    if (!tg) return;
    var result = await showPromptModal(
      currentLang === "fr" ? "Modifier le tag" : "Edit tag",
      [
        { label: currentLang === "fr" ? "Nom" : "Name" },
        { label: currentLang === "fr" ? "Couleur" : "Color", type: "color" }
      ],
      [tg.name, tg.color || "#6366f1"]
    );
    if (!result || !result[0]) return;
    var oldName = tg.name;
    tg.name = result[0].trim();
    tg.color = result[1] || tg.color;
    if (oldName !== tg.name) {
      var tagCol = getColumnName("tasks", "tag");
      var actions = [];
      state.tasks.forEach(function(tsk) {
        var list = Array.isArray(tsk.Tag) ? tsk.Tag : [];
        var idx = list.indexOf(oldName);
        if (idx !== -1) {
          var updated = list.slice();
          updated[idx] = tg.name;
          actions.push(["UpdateRecord", state.TASKS_TABLE, tsk.id, { [tagCol]: ["L"].concat(updated) }]);
        }
      });
      if (actions.length > 0) {
        try {
          await grist.docApi.applyUserActions(actions);
        } catch (e) {
          console.log("rename tag on tasks:", e.message);
        }
      }
    }
    await saveTags();
    renderTagsList();
    refreshAllViews();
  }
  async function removeTagSetting(index) {
    var tg = customTags[index];
    if (!tg) return;
    var confirmed = await showConfirmModal(
      currentLang === "fr" ? "Supprimer le tag \xAB " + tg.name + " \xBB ?" : 'Delete tag "' + tg.name + '"?',
      currentLang === "fr" ? "Supprimer" : "Delete"
    );
    if (!confirmed) return;
    customTags.splice(index, 1);
    await saveTags();
    renderTagsList();
    refreshAllViews();
    showToast(currentLang === "fr" ? "Tag supprim\xE9" : "Tag removed", "info");
  }

  // src/domains/task-modal.js
  function resolveAssigneeIds(list) {
    var ids = [];
    (list || []).forEach(function(val) {
      var u = state.users.find(function(usr) {
        return usr.Email === val || usr.Name === val;
      });
      if (u && ids.indexOf(u.id) === -1) ids.push(u.id);
    });
    return ids;
  }
  function getInputValue(id, fallback) {
    var el = document.getElementById(id);
    if (!el) return fallback || "";
    return el.value;
  }
  function getEstimatedHoursInput() {
    var raw = String(getInputValue("task-estimated-hours", "")).trim().replace(",", ".");
    if (!raw) return 0;
    var value = parseFloat(raw);
    return isFinite(value) && value >= 0 ? value : 0;
  }
  function requireTaskTitle() {
    var modal = document.getElementById("modal-container");
    var titleEl = modal ? modal.querySelector("#task-title") : null;
    var title = titleEl ? titleEl.value.trim() : "";
    if (!title) {
      showToast(currentLang === "fr" ? "Ajoutez un titre avant d\u2019enregistrer." : "Add a title before saving.", "error");
      if (titleEl) titleEl.focus();
      return "";
    }
    return title;
  }
  async function refreshTaskTableColumns() {
    try {
      var data = await grist.docApi.fetchTable(state.TASKS_TABLE);
      state.taskTableColumns = data ? Object.keys(data) : null;
    } catch (e) {
      state.taskTableColumns = null;
    }
  }
  async function keepExistingTaskColumns(record) {
    if (!state.taskTableColumns) await refreshTaskTableColumns();
    if (!state.taskTableColumns) return record;
    var filtered = {};
    Object.keys(record).forEach(function(key) {
      if (state.taskTableColumns.indexOf(key) !== -1) filtered[key] = record[key];
    });
    return filtered;
  }
  async function removeCommentsForTask(taskId) {
    var toRemove = state.comments.filter(function(c) {
      return c.Task_Id === taskId;
    });
    if (!toRemove.length) return;
    await grist.docApi.applyUserActions(toRemove.map(function(c) {
      return ["RemoveRecord", state.COMMENTS_TABLE, c.id];
    }));
  }
  async function removeSubtasksForTask(taskId) {
    var toRemove = state.subtasks.filter(function(st) {
      return st.Parent_Task_Id === taskId;
    });
    if (!toRemove.length) return;
    await grist.docApi.applyUserActions(toRemove.map(function(st) {
      return ["RemoveRecord", state.SUBTASKS_TABLE, st.id];
    }));
  }
  async function removeAttachmentsForTask(taskId) {
    var toRemove = state.attachments.filter(function(attachment) {
      return attachment.Task_Id === taskId;
    });
    if (!toRemove.length) return;
    await grist.docApi.applyUserActions(toRemove.map(function(attachment) {
      return ["RemoveRecord", state.ATTACHMENTS_TABLE, attachment.id];
    }));
  }
  async function removeTimeEntriesForTask(taskId) {
    var toRemove = state.timeEntries.filter(function(entry) {
      return entry.Task_Id === taskId;
    });
    if (!toRemove.length) return;
    await grist.docApi.applyUserActions(toRemove.map(function(entry) {
      return ["RemoveRecord", state.TIME_ENTRIES_TABLE, entry.id];
    }));
    delete state.activeTimers[taskId];
  }
  async function removeDraftChildren(taskId) {
    await removeCommentsForTask(taskId);
    await removeSubtasksForTask(taskId);
    await removeAttachmentsForTask(taskId);
    await removeTimeEntriesForTask(taskId);
  }
  function captureTaskFormState() {
    var autoExtendEl = document.getElementById("task-auto-extend");
    return {
      title: getInputValue("task-title"),
      description: getInputValue("task-desc"),
      status: getInputValue("task-status"),
      priority: getInputValue("task-priority"),
      group: getInputValue("task-group"),
      start: getInputValue("task-start"),
      due: getInputValue("task-due"),
      category: getInputValue("task-category"),
      project: getInputValue("task-project"),
      recurrence: getInputValue("task-recurrence", "none"),
      estimatedHours: getInputValue("task-estimated-hours"),
      extensionDate: getInputValue("task-extension-date"),
      autoExtend: autoExtendEl ? autoExtendEl.checked : null
    };
  }
  function restoreTaskFormState(state2) {
    if (!state2) return;
    [
      ["task-title", state2.title],
      ["task-desc", state2.description],
      ["task-status", state2.status],
      ["task-priority", state2.priority],
      ["task-group", state2.group],
      ["task-start", state2.start],
      ["task-due", state2.due],
      ["task-category", state2.category],
      ["task-project", state2.project],
      ["task-recurrence", state2.recurrence],
      ["task-estimated-hours", state2.estimatedHours],
      ["task-extension-date", state2.extensionDate]
    ].forEach(function(pair) {
      var el = document.getElementById(pair[0]);
      if (el && pair[1] !== void 0 && pair[1] !== null) el.value = pair[1];
    });
    var autoExtendEl = document.getElementById("task-auto-extend");
    if (autoExtendEl && state2.autoExtend !== null) autoExtendEl.checked = state2.autoExtend;
  }
  function openNewTaskModal(defaultStatus) {
    if (!canEditWorkItems()) {
      showToast(currentLang === "fr" ? "Vous n\u2019avez pas les droits pour cr\xE9er une t\xE2che." : "You do not have permission to create a task.", "error");
      return;
    }
    return startNewTask(defaultStatus);
  }
  var editAssignees = [];
  var editAccountable = [];
  var editConsulted = [];
  var editInformed = [];
  var editTags = [];
  var draftTaskId = null;
  function renderTagChips() {
    var html = "";
    for (var i = 0; i < editTags.length; i++) {
      var tagObj = getTags().find(function(tg) {
        return tg.name === editTags[i];
      });
      var color = tagObj ? tagObj.color : "#94a3b8";
      html += '<span class="assignee-chip-tag" style="border-color:' + color + ";color:" + color + ';">' + sanitize(editTags[i]) + ' <span class="chip-remove" onclick="removeTagChip(' + i + ')">\u2715</span></span>';
    }
    return html;
  }
  function renderTagField() {
    var tagSelectOptions = '<option value="">-- ' + t("tag") + " --</option>";
    getTags().forEach(function(tg) {
      tagSelectOptions += '<option value="' + sanitize(tg.name) + '">' + sanitize(tg.name) + "</option>";
    });
    var html = '<div class="detail-field">';
    html += '<span class="detail-field-icon">\u{1F3F7}\uFE0F</span>';
    html += '<span class="detail-field-label">' + t("tag") + "</span>";
    html += '<div class="detail-field-value">';
    html += '<div class="assignee-chips" id="tag-chips">' + renderTagChips() + "</div>";
    html += '<div class="assignee-add-row">';
    html += '<select id="tag-select">' + tagSelectOptions + "</select>";
    html += '<button class="assignee-add-btn" onclick="addTagChip()">' + (currentLang === "fr" ? "Ajouter" : "Add") + "</button>";
    html += "</div></div></div>";
    return html;
  }
  function addTagChip() {
    var sel = document.getElementById("tag-select");
    if (!sel) return;
    var val = sel.value;
    if (!val || editTags.indexOf(val) !== -1) return;
    editTags.push(val);
    var container = document.getElementById("tag-chips");
    if (container) container.innerHTML = renderTagChips();
    sel.value = "";
  }
  function removeTagChip(index) {
    editTags.splice(index, 1);
    var container = document.getElementById("tag-chips");
    if (container) container.innerHTML = renderTagChips();
  }
  async function startNewTask(defaultStatus, dateStr, prefill) {
    prefill = prefill || {};
    var statuses = getKanbanStatuses();
    if (shouldLimitToMyProjects() && editAssignees.length === 0) {
      var mine = myAssigneeValue();
      if (mine) editAssignees = [mine];
    }
    var record = {};
    setField(record, "tasks", "title", prefill.title || "");
    setField(record, "tasks", "status", defaultStatus || statuses[0] && statuses[0].key || "todo");
    setField(record, "tasks", "priority", prefill.priority || "medium");
    if (prefill.description) setField(record, "tasks", "description", prefill.description);
    if (prefill.category) setField(record, "tasks", "category", prefill.category);
    if (prefill.group) setField(record, "tasks", "group", prefill.group);
    if (prefill.tag) setField(record, "tasks", "tag", ["L", prefill.tag]);
    if (prefill.recurrence && prefill.recurrence !== "none") setField(record, "tasks", "recurrence", prefill.recurrence);
    if (prefill.estimatedHours) setField(record, "tasks", "estimatedHours", prefill.estimatedHours);
    if (editAssignees.length > 0) setField(record, "tasks", "assignee", ["L"].concat(resolveAssigneeIds(editAssignees)));
    if (state.currentProjectId) setField(record, "tasks", "projectId", state.currentProjectId);
    setField(record, "tasks", "createdAt", Math.floor(Date.now() / 1e3));
    if (state.TASKS_TABLE === state.DEFAULT_TASKS_TABLE) record.Auto_Extend = true;
    if (dateStr) {
      setField(record, "tasks", "startDate", toEpoch(dateStr));
      setField(record, "tasks", "dueDate", toEpoch(dateStr));
    }
    try {
      record = await keepExistingTaskColumns(record);
      var res = await grist.docApi.applyUserActions([["AddRecord", state.TASKS_TABLE, null, record]]);
      var newId = res && res.retValues && res.retValues[0] || null;
      if (!newId) {
        showToast("Error", "error");
        return;
      }
      draftTaskId = newId;
      await loadAllData();
      await removeDraftChildren(newId);
      await loadAllData();
      openEditTaskModal(newId);
    } catch (e) {
      showToast("Error: " + e.message, "error");
    }
  }
  function openEditTaskModal(taskId, preserveAssignees) {
    var task = state.tasks.find(function(t2) {
      return t2.id === taskId;
    });
    if (!task) return;
    if (!preserveAssignees) {
      editAssignees = task.Assignee ? task.Assignee.split(",").map(function(a) {
        return a.trim();
      }).filter(Boolean) : [];
      editAccountable = task.Accountable ? task.Accountable.split(",").map(function(a) {
        return a.trim();
      }).filter(Boolean) : [];
      editConsulted = task.Consulted ? task.Consulted.split(",").map(function(a) {
        return a.trim();
      }).filter(Boolean) : [];
      editInformed = task.Informed ? task.Informed.split(",").map(function(a) {
        return a.trim();
      }).filter(Boolean) : [];
      editTags = Array.isArray(task.Tag) ? task.Tag.slice() : [];
    }
    var groupOptions = '<option value="">--</option>';
    for (var i = 0; i < state.groups.length; i++) {
      var sel = state.groups[i].Name === task.Group_Name ? " selected" : "";
      groupOptions += '<option value="' + sanitize(state.groups[i].Name) + '"' + sel + ">" + sanitize(state.groups[i].Name) + "</option>";
    }
    var startVal = task.Start_Date ? new Date(task.Start_Date * 1e3).toISOString().split("T")[0] : "";
    var dueVal = task.Due_Date ? new Date(task.Due_Date * 1e3).toISOString().split("T")[0] : "";
    var progressPct = getTaskProgress(task);
    var barClass = progressPct === 100 ? "bar-done" : progressPct >= 50 ? "bar-progress" : "bar-todo";
    var dotColor = task.Priority === "high" ? "#ef4444" : task.Priority === "medium" ? "#f59e0b" : "#22c55e";
    var html = '<div class="modal-overlay" onclick="closeModal(event)">';
    html += '<div class="modal modal-detail" onclick="event.stopPropagation()">';
    html += '<div class="modal-detail-top">';
    html += '<span class="group-dot" style="background:' + dotColor + '"></span>';
    if (task.Group_Name) html += '<span style="font-size:12px;color:#64748b;">' + sanitize(task.Group_Name) + "</span>";
    html += '<span class="status-badge status-' + task.Status + '">\u25CF ' + statusLabel(task.Status) + "</span>";
    html += '<div style="flex:1;"></div>';
    html += '<button type="button" id="task-save-top-' + task.id + '" class="btn btn-primary" onclick="event.preventDefault();event.stopPropagation();updateTask(' + task.id + ')" style="padding:6px 16px;font-size:12px;border-radius:8px;margin-right:8px;">\u{1F4BE} ' + t("save") + "</button>";
    html += '<button class="modal-close" onclick="closeModalForce()">\u2715</button>';
    html += "</div>";
    html += '<div class="modal-detail-content">';
    html += '<div class="modal-detail-left">';
    html += '<input class="detail-title-input" type="text" id="task-title" value="' + sanitize(task.Title) + '" />';
    html += '<div class="detail-field">';
    html += '<div class="detail-field-value"><textarea id="task-desc" placeholder="' + t("fieldDescription") + '">' + sanitize(task.Description) + "</textarea></div>";
    html += "</div>";
    if (state.raciEnabled) {
      html += renderRaciField("R", t("raciResponsible"), "assignee", "editAssignees");
      html += renderRaciField("A", t("raciAccountable"), "accountable", "editAccountable");
      html += renderRaciField("C", t("raciConsulted"), "consulted", "editConsulted");
      html += renderRaciField("I", t("raciInformed"), "informed", "editInformed");
    } else {
      html += '<div class="detail-field">';
      html += '<span class="detail-field-icon">\u{1F464}</span>';
      html += '<span class="detail-field-label">' + t("fieldAssignee") + "</span>";
      html += '<div class="detail-field-value">';
      html += '<div class="assignee-chips" id="assignee-chips">';
      html += renderRaciChips("editAssignees");
      html += "</div>";
      html += '<div class="assignee-add-row">';
      html += '<select id="assignee-select">';
      html += '<option value="">-- ' + t("searchAssignee") + " --</option>";
      for (var i = 0; i < state.users.length; i++) {
        html += '<option value="' + sanitize(state.users[i].Email || state.users[i].Name) + '">' + sanitize(state.users[i].Name || state.users[i].Email) + "</option>";
      }
      html += "</select>";
      html += `<button class="assignee-add-btn" onclick="addRaciChip('editAssignees','assignee')">` + t("addAssignee") + "</button>";
      html += "</div>";
      html += "</div></div>";
    }
    html += '<div class="detail-field">';
    html += '<span class="detail-field-icon">\u{1F4CA}</span>';
    html += '<span class="detail-field-label">' + t("fieldStatus") + "</span>";
    html += '<div class="detail-field-value"><select id="task-status">';
    var _statuses2 = getKanbanStatuses();
    for (var _si2 = 0; _si2 < _statuses2.length; _si2++) {
      var _s2 = _statuses2[_si2];
      var _sl2 = currentLang === "fr" ? _s2.label_fr : _s2.label_en;
      html += '<option value="' + _s2.key + '"' + (task.Status === _s2.key ? " selected" : "") + ">" + _sl2 + "</option>";
    }
    html += "</select></div></div>";
    html += '<div class="detail-field">';
    html += '<span class="detail-field-icon">\u{1F4C5}</span>';
    html += '<span class="detail-field-label">' + t("fieldStartDate") + "</span>";
    html += '<div class="detail-field-value"><input type="date" id="task-start" value="' + startVal + '" /></div>';
    html += "</div>";
    html += '<div class="detail-field">';
    html += '<span class="detail-field-icon">\u23F0</span>';
    html += '<span class="detail-field-label">' + t("fieldDueDate") + "</span>";
    html += '<div class="detail-field-value"><input type="date" id="task-due" value="' + dueVal + '" /></div>';
    html += "</div>";
    html += '<div class="detail-field">';
    html += '<span class="detail-field-icon">\u{1F525}</span>';
    html += '<span class="detail-field-label">' + t("fieldPriority") + "</span>";
    html += '<div class="detail-field-value"><select id="task-priority">';
    html += '<option value="high"' + (task.Priority === "high" ? " selected" : "") + ">" + t("priorityHigh") + "</option>";
    html += '<option value="medium"' + (task.Priority === "medium" ? " selected" : "") + ">" + t("priorityMedium") + "</option>";
    html += '<option value="low"' + (task.Priority === "low" ? " selected" : "") + ">" + t("priorityLow") + "</option>";
    html += "</select></div></div>";
    html += '<div class="detail-field">';
    html += '<span class="detail-field-icon">\u{1F465}</span>';
    html += '<span class="detail-field-label">' + t("fieldGroup") + "</span>";
    html += '<div class="detail-field-value"><select id="task-group">' + groupOptions + "</select></div>";
    html += "</div>";
    var projectOptions = '<option value="">' + t("noProject") + "</option>";
    for (var pi = 0; pi < state.projects.length; pi++) {
      var projSel = state.projects[pi].id === task.Project_Id ? " selected" : "";
      projectOptions += '<option value="' + state.projects[pi].id + '"' + projSel + ">" + sanitize(state.projects[pi].Name) + "</option>";
    }
    html += '<div class="detail-field">';
    html += '<span class="detail-field-icon">\u{1F4C2}</span>';
    html += '<span class="detail-field-label">' + t("project") + "</span>";
    html += '<div class="detail-field-value"><select id="task-project">' + projectOptions + "</select></div>";
    html += "</div>";
    var categoryOptions = '<option value="">--</option>';
    var editCategories = getCategories();
    for (var ci = 0; ci < editCategories.length; ci++) {
      var catSel = editCategories[ci].name === task.Category ? " selected" : "";
      categoryOptions += '<option value="' + sanitize(editCategories[ci].name) + '"' + catSel + ">" + sanitize(editCategories[ci].name) + "</option>";
    }
    html += '<div class="detail-field">';
    html += '<span class="detail-field-icon">\u{1F4C1}</span>';
    html += '<span class="detail-field-label">' + t("fieldCategory") + "</span>";
    html += '<div class="detail-field-value"><select id="task-category">' + categoryOptions + "</select></div>";
    html += "</div>";
    html += renderTagField();
    var taskSubtasks = getTaskSubtasks(task.id);
    html += '<div class="subtasks-section">';
    html += '<div class="subtasks-header">';
    html += '<span class="detail-field-icon">\u2611\uFE0F</span>';
    html += '<span class="detail-field-label">' + t("subtasks") + "</span>";
    html += '<span class="subtask-badge">' + taskSubtasks.filter(function(st2) {
      return st2.Completed;
    }).length + "/" + taskSubtasks.length + "</span>";
    html += "</div>";
    html += '<div class="subtasks-list" id="subtasks-list">';
    if (taskSubtasks.length === 0) {
      html += '<div class="subtasks-empty">' + t("noSubtasks") + "</div>";
    } else {
      for (var si = 0; si < taskSubtasks.length; si++) {
        var st = taskSubtasks[si];
        var stBlocked = isSubtaskBlocked(st);
        var stBlocker = getSubtaskBlocker(st);
        var stDueDateStr = st.Due_Date ? new Date(st.Due_Date * 1e3).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }) : "";
        var stDueClass = st.Due_Date && !st.Completed && st.Due_Date < Math.floor(Date.now() / 1e3) ? " st-overdue" : "";
        html += '<div class="subtask-item' + (st.Completed ? " completed" : "") + (stBlocked ? " blocked" : "") + '" data-id="' + st.id + '" id="st-row-' + st.id + '">';
        html += '<div class="subtask-view" id="st-view-' + st.id + '">';
        html += '<input type="checkbox" class="subtask-checkbox" ' + (st.Completed ? "checked" : "") + (stBlocked ? " disabled" : "") + ' onchange="toggleSubtask(' + st.id + ', this.checked)" />';
        html += '<span class="subtask-title">' + sanitize(st.Title) + "</span>";
        if (stBlocked && stBlocker) {
          html += '<span class="subtask-blocked-badge" title="' + t("blockedBy") + " " + sanitize(stBlocker.Title) + '">\u{1F512}</span>';
        }
        html += '<span class="subtask-meta">';
        if (st.Status && st.Status !== "todo") {
          var stStatusColor = st.Status === "done" ? "#22c55e" : "#f59e0b";
          html += '<span class="subtask-assignee-badge" style="background:' + stStatusColor + "20;color:" + stStatusColor + ';">' + (st.Status === "done" ? "\u2705" : "\u{1F504}") + "</span>";
        }
        if (st.Priority && st.Priority !== "medium") {
          var stPrioColor = st.Priority === "high" ? "#ef4444" : "#94a3b8";
          html += '<span class="subtask-assignee-badge" style="background:' + stPrioColor + "20;color:" + stPrioColor + ';">' + (st.Priority === "high" ? "\u{1F534}" : "\u2B07\uFE0F") + "</span>";
        }
        if (st.Assignee) {
          st.Assignee.split(",").map(function(a) {
            return a.trim();
          }).filter(Boolean).forEach(function(an) {
            html += '<span class="subtask-assignee-badge">\u{1F464} ' + sanitize(an) + "</span>";
          });
        }
        if (stDueDateStr) html += '<span class="subtask-due-badge' + stDueClass + '">\u{1F4C5} ' + stDueDateStr + "</span>";
        if (st.Estimated_Hours) html += '<span class="subtask-assignee-badge">\u23F1 ' + st.Estimated_Hours + "h</span>";
        if (st.Recurrence && st.Recurrence !== "none") {
          var recSymbol = recurrenceSymbol(st.Recurrence);
          html += '<span class="subtask-assignee-badge" title="' + t("recurrence") + '">' + recSymbol + "</span>";
        }
        html += "</span>";
        if (st.Recurrence && st.Recurrence !== "none") {
          html += '<button class="subtask-dep-btn" onclick="generateSubtaskOccurrences(' + st.id + ", " + task.id + ')" title="' + t("generateMonth") + '">\u{1F4C5}+</button>';
        }
        html += '<button class="subtask-edit-btn" onclick="startEditSubtask(' + st.id + ", " + task.id + ')" title="' + t("editSubtask") + '">\u270F\uFE0F</button>';
        html += '<button class="subtask-dep-btn" onclick="openSubtaskDepModal(' + st.id + ", " + task.id + ')" title="' + t("dependencies") + '">\u{1F517}</button>';
        html += '<button class="subtask-delete" onclick="deleteSubtask(' + st.id + ", " + task.id + ')" title="' + t("delete") + '">\u2715</button>';
        html += "</div>";
        var stAssignees = (st.Assignee || "").split(",").map(function(a) {
          return a.trim();
        }).filter(Boolean);
        var assigneeListHtml = '<div class="st-assignee-list" id="st-assignee-' + st.id + '" style="display:flex;flex-wrap:wrap;gap:4px 10px;max-height:84px;overflow-y:auto;padding:6px 8px;border:1px solid #e2e8f0;border-radius:8px;">';
        if (state.users.length === 0) {
          assigneeListHtml += '<span style="font-size:11px;color:#94a3b8;">' + (currentLang === "fr" ? "Aucun membre" : "No members") + "</span>";
        }
        for (var ui = 0; ui < state.users.length; ui++) {
          var uName = state.users[ui].Name;
          var uChk = stAssignees.indexOf(uName) !== -1 ? " checked" : "";
          assigneeListHtml += '<label style="display:inline-flex;align-items:center;gap:4px;font-size:12px;cursor:pointer;white-space:nowrap;"><input type="checkbox" value="' + sanitize(uName) + '"' + uChk + "> " + sanitize(uName) + "</label>";
        }
        assigneeListHtml += "</div>";
        var stDueDateInput = st.Due_Date ? new Date(st.Due_Date * 1e3).toISOString().split("T")[0] : "";
        var stStatus = st.Status || "todo";
        var stPriority = st.Priority || "medium";
        var stLbl = { todo: t("statusTodo"), progress: t("statusProgress"), done: t("statusDone") };
        var prLbl = { high: t("priorityHigh"), medium: t("priorityMedium"), low: t("priorityLow") };
        html += '<div class="subtask-edit-form" id="st-edit-' + st.id + '">';
        html += '<input type="text" class="subtask-edit-title" id="st-title-' + st.id + '" value="' + sanitize(st.Title) + '" placeholder="' + (currentLang === "fr" ? "Titre de la sous-t\xE2che..." : "Subtask title...") + '">';
        html += '<textarea class="subtask-edit-title" id="st-desc-' + st.id + '" rows="2" placeholder="' + (currentLang === "fr" ? "Description (optionnel)..." : "Description (optional)...") + '" style="resize:vertical;">' + sanitize(st.Description || "") + "</textarea>";
        var stType = st.Type || "subtask";
        html += '<div><div class="st-pill-label">' + (currentLang === "fr" ? "Type" : "Type") + "</div>";
        html += '<div class="st-pill-group">';
        html += '<button type="button" class="st-pill' + (stType !== "milestone" ? " active-progress" : "") + '" onclick="setStType(' + st.id + `,'subtask',this)">` + (currentLang === "fr" ? "\u21B3 Sous-t\xE2che" : "\u21B3 Subtask") + "</button>";
        html += '<button type="button" class="st-pill' + (stType === "milestone" ? " active-progress" : "") + '" onclick="setStType(' + st.id + `,'milestone',this)">` + (currentLang === "fr" ? "\u25C6 Jalon (1 date)" : "\u25C6 Milestone (1 date)") + "</button>";
        html += "</div>";
        html += '<input type="hidden" id="st-type-' + st.id + '" value="' + stType + '">';
        html += "</div>";
        html += "<div>";
        html += '<div class="st-pill-label">' + (currentLang === "fr" ? "Statut" : "Status") + "</div>";
        html += '<div class="st-pill-group" id="st-status-group-' + st.id + '">';
        getKanbanStatuses().forEach(function(s) {
          var sLbl = (s.emoji ? s.emoji + " " : "") + (currentLang === "fr" ? s.label_fr : s.label_en);
          var sActiveStyle = stStatus === s.key ? "background:" + (s.color || "#3b82f6") + ";color:#fff;border-color:" + (s.color || "#3b82f6") + ";" : "";
          html += '<button type="button" class="st-pill" style="' + sActiveStyle + '" onclick="setStStatus(' + st.id + ",'" + s.key + `',this)">` + sanitize(sLbl) + "</button>";
        });
        html += "</div>";
        html += '<input type="hidden" id="st-status-' + st.id + '" value="' + stStatus + '">';
        html += "</div>";
        html += "<div>";
        html += '<div class="st-pill-label">' + (currentLang === "fr" ? "Priorit\xE9" : "Priority") + "</div>";
        html += '<div class="st-pill-group" id="st-priority-group-' + st.id + '">';
        ["high", "medium", "low"].forEach(function(p) {
          html += '<button type="button" class="st-pill' + (stPriority === p ? " active-" + p : "") + `" onclick="setStPill('priority',` + st.id + ",'" + p + `',this)">` + prLbl[p] + "</button>";
        });
        html += "</div>";
        html += '<input type="hidden" id="st-priority-' + st.id + '" value="' + stPriority + '">';
        html += "</div>";
        html += "<div>";
        html += '<div class="st-pill-label">' + t("subtaskAssignee") + (currentLang === "fr" ? " (plusieurs possibles)" : " (multiple)") + "</div>";
        if (state.users.length > 1) {
          html += '<input type="text" id="st-assignee-search-' + st.id + '" oninput="filterStAssignees(' + st.id + ', this.value)" placeholder="' + (currentLang === "fr" ? "\u{1F50D} Rechercher un membre..." : "\u{1F50D} Search a member...") + '" style="width:100%;padding:5px 8px;border:1px solid #e2e8f0;border-radius:6px;font-size:12px;margin-bottom:4px;" autocomplete="off">';
        }
        html += assigneeListHtml;
        html += "</div>";
        html += '<div class="st-meta-row">';
        var stStartDateInput = st.Start_Date ? new Date(st.Start_Date * 1e3).toISOString().split("T")[0] : "";
        html += '<input type="date" class="subtask-edit-date" id="st-start-' + st.id + '" value="' + stStartDateInput + '" title="' + (currentLang === "fr" ? "Date d\xE9but" : "Start date") + '">';
        html += '<input type="date" class="subtask-edit-date" id="st-due-' + st.id + '" value="' + stDueDateInput + '" title="' + (currentLang === "fr" ? "\xC9ch\xE9ance" : "Due date") + '">';
        html += '<input type="number" class="st-hours-input" id="st-hours-' + st.id + '" value="' + (st.Estimated_Hours || "") + '" placeholder="' + (currentLang === "fr" ? "Heures" : "Hours") + '" min="0" step="0.5">';
        html += "</div>";
        var stRecur = st.Recurrence || "none";
        html += '<div style="display:flex;align-items:center;gap:8px;margin-top:6px;">';
        html += '<span style="font-size:11px;color:#64748b;">\u{1F504} ' + (currentLang === "fr" ? "R\xE9currence" : "Recurrence") + "</span>";
        html += '<select id="st-recur-' + st.id + '" style="flex:1;font-size:12px;">';
        html += '<option value="none"' + (stRecur === "none" ? " selected" : "") + ">" + t("recurrenceNone") + "</option>";
        html += '<option value="daily"' + (stRecur === "daily" ? " selected" : "") + ">" + t("recurrenceDaily") + "</option>";
        html += '<option value="weekly"' + (stRecur === "weekly" ? " selected" : "") + ">" + t("recurrenceWeekly") + "</option>";
        html += '<option value="biweekly"' + (stRecur === "biweekly" ? " selected" : "") + ">" + t("recurrenceBiweekly") + "</option>";
        html += '<option value="monthly"' + (stRecur === "monthly" ? " selected" : "") + ">" + t("recurrenceMonthly") + "</option>";
        html += '<option value="quarterly"' + (stRecur === "quarterly" ? " selected" : "") + ">" + t("recurrenceQuarterly") + "</option>";
        html += '<option value="yearly"' + (stRecur === "yearly" ? " selected" : "") + ">" + t("recurrenceYearly") + "</option>";
        html += "</select>";
        html += "</div>";
        html += '<div class="st-form-actions">';
        html += '<button type="button" class="subtask-cancel-btn" onclick="cancelEditSubtask(' + st.id + ')">' + (currentLang === "fr" ? "Annuler" : "Cancel") + "</button>";
        html += '<button type="button" class="subtask-save-btn" onclick="saveEditSubtask(' + st.id + ", " + task.id + ')">\u2713 ' + (currentLang === "fr" ? "Enregistrer" : "Save") + "</button>";
        html += "</div>";
        html += "</div>";
        html += "</div>";
      }
    }
    html += "</div>";
    html += '<div class="subtask-add-row">';
    html += '<input type="text" id="new-subtask-input" class="subtask-input" placeholder="' + t("subtaskPlaceholder") + `" onkeypress="if(event.key==='Enter'){event.preventDefault();addSubtask(` + task.id + ');}" />';
    html += '<button type="button" class="subtask-add-btn" onclick="event.preventDefault();addSubtask(' + task.id + ')">+</button>';
    html += "</div>";
    html += "</div>";
    html += '<div class="attachments-section">';
    html += '<div class="comments-header">';
    html += '<span class="detail-field-icon">\u{1F4CE}</span>';
    html += '<span class="detail-field-label">' + (currentLang === "fr" ? "Pi\xE8ces jointes" : "Attachments") + "</span>";
    html += '<span class="comment-badge">' + getTaskAttachments(task.id).length + "</span>";
    html += "</div>";
    html += '<div class="attachments-list" id="attachments-list-' + task.id + '"></div>';
    html += '<div class="attach-add-row">';
    html += '<label class="attach-upload-btn">\u{1F4CE} ' + (currentLang === "fr" ? "Ajouter un fichier" : "Add file") + '<input type="file" multiple style="display:none;" onchange="uploadTaskAttachments(' + task.id + `, Array.from(this.files)); this.value='';"></label>`;
    html += '<span class="attach-status" id="attach-status-' + task.id + '"></span>';
    html += "</div>";
    html += '<div class="attach-hint">' + (currentLang === "fr" ? "Tous formats \xB7 max 5 Mo par fichier (images compress\xE9es automatiquement)" : "All formats \xB7 max 5MB per file (images auto-compressed)") + "</div>";
    html += "</div>";
    var taskComments = getTaskComments(task.id);
    html += '<div class="comments-section">';
    html += '<div class="comments-header">';
    html += '<span class="detail-field-icon">\u{1F4AC}</span>';
    html += '<span class="detail-field-label">' + t("comments") + "</span>";
    html += '<span class="comment-badge">' + taskComments.length + "</span>";
    html += "</div>";
    html += '<div class="comments-list" id="comments-list">';
    if (taskComments.length === 0) {
      html += '<div class="comments-empty">' + t("noComments") + "</div>";
    } else {
      for (var ci = 0; ci < taskComments.length; ci++) {
        var cmt = taskComments[ci];
        html += '<div class="comment-item">';
        html += '<div class="comment-header">';
        html += '<span class="comment-author">\u{1F464} ' + sanitize(cmt.Author || "Anonyme") + "</span>";
        html += '<span class="comment-time">' + formatTimeAgo(cmt.Created_At) + "</span>";
        if (state.isOwner) html += '<button class="comment-delete" onclick="deleteComment(' + cmt.id + ", " + task.id + ')">\u2715</button>';
        html += "</div>";
        html += '<div class="comment-content">' + sanitize(cmt.Content) + "</div>";
        html += "</div>";
      }
    }
    html += "</div>";
    html += '<div class="comment-add-row">';
    html += '<textarea id="new-comment-input" class="comment-input" placeholder="' + t("commentPlaceholder") + '" rows="2"></textarea>';
    html += '<button type="button" class="comment-add-btn" onclick="event.preventDefault();addComment(' + task.id + ')">' + t("addComment") + "</button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += '<div class="modal-detail-right">';
    html += '<div class="detail-card">';
    html += "<h4>\u23F3 " + t("progression") + "</h4>";
    html += '<div class="detail-info-row"><span class="info-label">' + t("advancement") + '</span><span class="info-value">' + progressPct + "%</span></div>";
    html += '<div class="progress-bar-bg"><div class="progress-bar-fill ' + barClass + '" style="width:' + progressPct + '%"></div></div>';
    html += '<div class="detail-info-row"><span class="info-label">' + t("startLabel") + '</span><span class="info-value">' + (startVal ? formatDate(task.Start_Date) : "--") + "</span></div>";
    html += '<div class="detail-info-row"><span class="info-label">' + t("dueLabel") + '</span><span class="info-value" style="' + (isOverdue(task) ? "color:#dc2626;" : "") + '">' + (dueVal ? formatDate(task.Due_Date) : "--") + (isOverdue(task) ? " \u26A0\uFE0F" : "") + "</span></div>";
    html += "</div>";
    html += '<div class="detail-card">';
    html += "<h4>\u26A1 " + t("quickActions") + "</h4>";
    if (task.Status === "done") {
      html += '<button class="quick-action-btn" onclick="quickAction(' + task.id + `,'todo')">\u{1F504} ` + t("reopenTask") + "</button>";
    } else if (task.Status === "todo") {
      html += '<button class="quick-action-btn" onclick="quickAction(' + task.id + `,'progress')">\u25B6\uFE0F ` + t("startTask") + "</button>";
      html += '<button class="quick-action-btn" onclick="quickAction(' + task.id + `,'done')">\u2705 ` + t("completeTask") + "</button>";
    } else {
      html += '<button class="quick-action-btn" onclick="quickAction(' + task.id + `,'done')">\u2705 ` + t("completeTask") + "</button>";
      html += '<button class="quick-action-btn" onclick="quickAction(' + task.id + `,'todo')">\u23EA ` + t("reopenTask") + "</button>";
    }
    html += "</div>";
    html += '<div class="detail-card">';
    html += "<h4>\u{1F4CB} " + t("taskSummary") + "</h4>";
    html += '<div class="detail-info-row"><span class="info-label">' + t("fieldStatus") + ' :</span><span class="info-value" style="color:' + (task.Status === "done" ? "#22c55e" : task.Status === "progress" ? "#3b82f6" : "#f59e0b") + '">' + statusLabel(task.Status) + "</span></div>";
    html += '<div class="detail-info-row"><span class="info-label">' + t("fieldPriority") + ' :</span><span class="info-value" style="color:' + dotColor + '">' + priorityLabel(task.Priority) + "</span></div>";
    html += '<div class="detail-info-row"><span class="info-label">' + t("fieldAssignee") + ' :</span><span class="info-value">' + editAssignees.length + "</span></div>";
    html += "</div>";
    var totalTime = getTaskTotalTime(task.id);
    var isTimerRunning = !!state.activeTimers[task.id];
    var taskTimeEntries = getTaskTimeEntries(task.id);
    html += '<div class="detail-card time-card">';
    html += "<h4>\u23F1\uFE0F " + t("timeTracking") + "</h4>";
    html += '<label for="task-estimated-hours" style="display:block;font-size:11px;font-weight:700;color:#64748b;margin-bottom:4px;">' + t("estimatedTime") + " (h)</label>";
    html += '<input type="number" id="task-estimated-hours" min="0" step="0.5" value="' + (task.Estimated_Hours || "") + '" placeholder="Ex. 8" class="form-input" style="width:100%;margin-bottom:10px;" />';
    html += '<div class="timer-control">';
    if (isTimerRunning) {
      html += '<button class="timer-btn timer-stop" onclick="pauseTimer(' + task.id + ')">\u23F8\uFE0F Pause</button>';
      html += '<span class="timer-status running">\u25CF ' + t("timerRunning") + "</span>";
    } else {
      html += '<button class="timer-btn timer-start" onclick="startTimer(' + task.id + ')">\u25B6\uFE0F ' + t("startTimer") + "</button>";
    }
    html += "</div>";
    html += '<div class="manual-time-entry" style="display:flex;align-items:center;gap:6px;margin-top:8px;flex-wrap:wrap;">';
    html += '<input type="number" id="manual-hours" min="0" max="99" placeholder="0" style="width:52px;" class="form-input" title="' + (currentLang === "fr" ? "Heures" : "Hours") + '"> h';
    html += '<input type="number" id="manual-minutes" min="0" max="59" placeholder="0" style="width:52px;" class="form-input" title="' + (currentLang === "fr" ? "Minutes" : "Minutes") + '"> min';
    html += '<button class="btn btn-secondary btn-sm" onclick="addManualTimeEntry(' + task.id + ')">+ ' + (currentLang === "fr" ? "Ajouter" : "Add") + "</button>";
    html += "</div>";
    html += '<div class="time-summary">';
    html += '<div class="detail-info-row"><span class="info-label">' + t("totalTime") + ' :</span><span class="info-value time-value">' + formatDuration(totalTime) + "</span></div>";
    if (task.Estimated_Hours) {
      var estimatedSec = task.Estimated_Hours * 3600;
      var pctUsed = Math.round(totalTime / estimatedSec * 100);
      html += '<div class="detail-info-row"><span class="info-label">' + t("estimatedTime") + ' :</span><span class="info-value">' + task.Estimated_Hours + "h (" + pctUsed + "%)</span></div>";
    }
    html += "</div>";
    if (taskTimeEntries.length > 0) {
      html += '<div class="time-entries">';
      html += '<div class="time-entries-label">' + t("timeEntries") + ":</div>";
      html += '<div style="max-height:120px;overflow-y:auto;">';
      for (var tei = 0; tei < taskTimeEntries.length; tei++) {
        var te = taskTimeEntries[tei];
        html += '<div class="time-entry-item">';
        html += '<span class="te-duration">' + formatDurationShort(te.Duration) + "</span>";
        html += '<span class="te-date">' + formatTimeAgo(te.Start_Time) + "</span>";
        html += "</div>";
      }
      html += "</div>";
      html += "</div>";
    }
    html += "</div>";
    html += '<div class="detail-card">';
    html += "<h4>\u{1F4CF} " + t("extensionDate") + "</h4>";
    var extDateVal = task.Extension_Date ? fromEpoch(task.Extension_Date) : "";
    html += '<div style="margin-bottom:10px;"><input type="date" id="task-extension-date" value="' + extDateVal + '" style="width:100%;padding:6px 10px;border:1px solid #e2e8f0;border-radius:6px;font-size:12px;" /></div>';
    html += '<label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer;">';
    html += '<input type="checkbox" id="task-auto-extend" ' + (task.Auto_Extend ? "checked" : "") + ' style="width:16px;height:16px;accent-color:#3b82f6;flex-shrink:0;margin-top:2px;" />';
    html += '<span style="font-size:11px;color:#64748b;line-height:1.3;">' + t("autoExtendHint") + "</span>";
    html += "</label>";
    html += "</div>";
    var hasRecurrence = task.Recurrence && task.Recurrence !== "none";
    html += '<div class="detail-card">';
    html += "<h4>\u{1F504} " + t("recurrence") + "</h4>";
    html += '<select id="task-recurrence" class="recurrence-select">';
    html += '<option value="none"' + (!hasRecurrence ? " selected" : "") + ">" + t("recurrenceNone") + "</option>";
    html += '<option value="daily"' + (task.Recurrence === "daily" ? " selected" : "") + ">" + t("recurrenceDaily") + "</option>";
    html += '<option value="weekly"' + (task.Recurrence === "weekly" ? " selected" : "") + ">" + t("recurrenceWeekly") + "</option>";
    html += '<option value="biweekly"' + (task.Recurrence === "biweekly" ? " selected" : "") + ">" + t("recurrenceBiweekly") + "</option>";
    html += '<option value="monthly"' + (task.Recurrence === "monthly" ? " selected" : "") + ">" + t("recurrenceMonthly") + "</option>";
    html += '<option value="quarterly"' + (task.Recurrence === "quarterly" ? " selected" : "") + ">" + t("recurrenceQuarterly") + "</option>";
    html += '<option value="yearly"' + (task.Recurrence === "yearly" ? " selected" : "") + ">" + t("recurrenceYearly") + "</option>";
    html += "</select>";
    if (hasRecurrence) {
      html += '<div class="recurrence-explain">\u2139\uFE0F ' + t("recurrenceExplain") + "</div>";
      html += '<div class="recurrence-batch-btns">';
      html += '<button class="btn btn-secondary btn-sm" onclick="generateOccurrences(' + task.id + `, 'month')">` + t("generateMonth") + "</button>";
      html += '<button class="btn btn-secondary btn-sm" onclick="generateOccurrences(' + task.id + `, 'year')">` + t("generateYear") + "</button>";
      html += "</div>";
    }
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += '<div class="modal-detail-footer">';
    if (state.isOwner) html += '<button class="btn-danger" onclick="deleteTask(' + task.id + ')">' + t("delete") + "</button>";
    else html += "<div></div>";
    html += '<div style="display:flex;gap:8px;">';
    html += '<button type="button" class="btn btn-secondary" onclick="event.preventDefault();closeModalForce()">' + t("cancel") + "</button>";
    html += '<button type="button" class="btn btn-primary" onclick="saveTaskFromFooter(' + task.id + ', event)">' + t("save") + "</button>";
    html += "</div></div>";
    html += "</div></div>";
    document.getElementById("modal-container").innerHTML = html;
    renderAttachmentsSection(task.id);
  }
  function saveTaskFromFooter(taskId, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    var topSaveButton = document.getElementById("task-save-top-" + taskId);
    if (topSaveButton) {
      topSaveButton.click();
    } else {
      updateTask(taskId);
    }
  }
  function getRaciArray(varName) {
    if (varName === "editAssignees") return editAssignees;
    if (varName === "editAccountable") return editAccountable;
    if (varName === "editConsulted") return editConsulted;
    if (varName === "editInformed") return editInformed;
    return [];
  }
  function renderRaciChips(varName) {
    var arr = getRaciArray(varName);
    var html = "";
    for (var i = 0; i < arr.length; i++) {
      var name = arr[i];
      var displayName = name;
      for (var j = 0; j < state.users.length; j++) {
        if (state.users[j].Email === name || state.users[j].Name === name) {
          displayName = state.users[j].Name || state.users[j].Email;
          break;
        }
      }
      html += '<span class="assignee-chip-tag">' + sanitize(displayName) + ` <span class="chip-remove" onclick="removeRaciChip('` + varName + "'," + i + ",'" + varName.replace("edit", "").toLowerCase() + `')">\u2715</span></span>`;
    }
    return html;
  }
  function renderRaciField(letter, label, selectSuffix, varName) {
    var raciColors = { R: "#3b82f6", A: "#f59e0b", C: "#8b5cf6", I: "#64748b" };
    var color = raciColors[letter] || "#94a3b8";
    var html = '<div class="detail-field">';
    html += '<span class="detail-field-icon" style="background:' + color + ';color:#fff;width:24px;height:24px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;">' + letter + "</span>";
    html += '<span class="detail-field-label">' + label + "</span>";
    html += '<div class="detail-field-value">';
    html += '<div class="assignee-chips" id="' + selectSuffix + '-chips">';
    html += renderRaciChips(varName);
    html += "</div>";
    html += '<div class="assignee-add-row">';
    html += '<select id="' + selectSuffix + '-select">';
    html += '<option value="">-- ' + t("searchAssignee") + " --</option>";
    for (var i = 0; i < state.users.length; i++) {
      html += '<option value="' + sanitize(state.users[i].Email || state.users[i].Name) + '">' + sanitize(state.users[i].Name || state.users[i].Email) + "</option>";
    }
    html += "</select>";
    html += `<button class="assignee-add-btn" onclick="addRaciChip('` + varName + "','" + selectSuffix + `')">` + t("addAssignee") + "</button>";
    html += "</div>";
    html += "</div></div>";
    return html;
  }
  function addRaciChip(varName, selectSuffix) {
    var sel = document.getElementById(selectSuffix + "-select");
    var arr = getRaciArray(varName);
    var val = sel.value;
    if (!val || arr.indexOf(val) !== -1) return;
    arr.push(val);
    var container = document.getElementById(selectSuffix + "-chips");
    if (container) container.innerHTML = renderRaciChips(varName);
    sel.value = "";
  }
  function removeRaciChip(varName, index, selectSuffix) {
    var arr = getRaciArray(varName);
    arr.splice(index, 1);
    var container = document.getElementById(selectSuffix + "-chips") || document.getElementById(varName.replace("edit", "").toLowerCase() + "-chips");
    if (container) container.innerHTML = renderRaciChips(varName);
  }
  async function quickAction(taskId, newStatus) {
    var task = state.tasks.find(function(t2) {
      return t2.id === taskId;
    });
    var wasNotDone = task && task.Status !== "done";
    try {
      await grist.docApi.applyUserActions([
        ["UpdateRecord", state.TASKS_TABLE, taskId, { Status: newStatus }]
      ]);
      for (var i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].id === taskId) {
          state.tasks[i].Status = newStatus;
          break;
        }
      }
      showToast(t("taskMoved"), "success");
      if (newStatus === "done" && wasNotDone && task) {
        await notifyTaskCompleted(Object.assign({}, task, { Status: newStatus }));
      }
      if (newStatus === "done" && wasNotDone && task && task.Recurrence && task.Recurrence !== "none") {
        await createNextOccurrence(task);
      }
      closeModalForce();
      await loadAllData();
    } catch (e) {
      console.error("Error quick action:", e);
    }
  }
  async function addSubtask(parentTaskId) {
    var input = document.getElementById("new-subtask-input");
    var title = input.value.trim();
    if (!title) return;
    var formState = captureTaskFormState();
    var savedAssignees = editAssignees.slice();
    var savedTags = editTags.slice();
    var savedAccountable = editAccountable.slice();
    var savedConsulted = editConsulted.slice();
    var savedInformed = editInformed.slice();
    var scrollPos = getModalScrollTop();
    var taskSubtasks = getTaskSubtasks(parentTaskId);
    var maxOrder = taskSubtasks.length > 0 ? Math.max.apply(null, taskSubtasks.map(function(st) {
      return st.Order || 0;
    })) : 0;
    try {
      await grist.docApi.applyUserActions([
        ["AddRecord", state.SUBTASKS_TABLE, null, {
          Parent_Task_Id: parentTaskId,
          Title: title,
          Status: "todo",
          Priority: "medium",
          Completed: false,
          Order: maxOrder + 1,
          Created_At: Math.floor(Date.now() / 1e3)
        }]
      ]);
      input.value = "";
      await loadAllData();
      editAssignees = savedAssignees;
      editTags = savedTags;
      editAccountable = savedAccountable;
      editConsulted = savedConsulted;
      editInformed = savedInformed;
      openEditTaskModal(parentTaskId, true);
      restoreTaskFormState(formState);
      restoreModalScrollTop(scrollPos);
    } catch (e) {
      console.error("Error adding subtask:", e);
      showToast("Error: " + e.message, "error");
    }
  }
  function getModalScrollTop() {
    var modal = document.querySelector("#modal-container .modal");
    return modal ? modal.scrollTop : 0;
  }
  function restoreModalScrollTop(pos) {
    setTimeout(function() {
      var modal = document.querySelector("#modal-container .modal");
      if (modal) modal.scrollTop = pos;
    }, 50);
  }
  async function toggleSubtask(subtaskId, completed) {
    var savedAssignees = editAssignees.slice();
    var savedTags = editTags.slice();
    var savedAccountable = editAccountable.slice();
    var savedConsulted = editConsulted.slice();
    var savedInformed = editInformed.slice();
    var scrollPos = getModalScrollTop();
    try {
      var newStatus = completed ? "done" : "todo";
      await grist.docApi.applyUserActions([
        ["UpdateRecord", state.SUBTASKS_TABLE, subtaskId, { Completed: completed, Status: newStatus }]
      ]);
      for (var i = 0; i < state.subtasks.length; i++) {
        if (state.subtasks[i].id === subtaskId) {
          state.subtasks[i].Completed = completed;
          state.subtasks[i].Status = newStatus;
          break;
        }
      }
      showToast(t("subtaskCompleted"), "success");
      var subtask = state.subtasks.find(function(st) {
        return st.id === subtaskId;
      });
      if (subtask) {
        editAssignees = savedAssignees;
        editTags = savedTags;
        editAccountable = savedAccountable;
        editConsulted = savedConsulted;
        editInformed = savedInformed;
        openEditTaskModal(subtask.Parent_Task_Id, true);
        restoreModalScrollTop(scrollPos);
      }
    } catch (e) {
      console.error("Error toggling subtask:", e);
    }
  }
  async function deleteSubtask(subtaskId, parentTaskId) {
    var confirmed = await showConfirmModal(
      currentLang === "fr" ? "Supprimer cette sous-t\xE2che ?" : "Delete this subtask?",
      currentLang === "fr" ? "Supprimer la sous-t\xE2che" : "Delete subtask"
    );
    if (!confirmed) return;
    var formState = captureTaskFormState();
    var savedAssignees = editAssignees.slice();
    var savedTags = editTags.slice();
    var savedAccountable = editAccountable.slice();
    var savedConsulted = editConsulted.slice();
    var savedInformed = editInformed.slice();
    var scrollPos = getModalScrollTop();
    try {
      var actions = state.subtasks.filter(function(st) {
        return st.Blocked_By_Subtask_Id === subtaskId;
      }).map(function(st) {
        return ["UpdateRecord", state.SUBTASKS_TABLE, st.id, { Blocked_By_Subtask_Id: null }];
      });
      actions.push(["RemoveRecord", state.SUBTASKS_TABLE, subtaskId]);
      await grist.docApi.applyUserActions(actions);
      showToast(t("subtaskDeleted"), "info");
      await loadAllData();
      editAssignees = savedAssignees;
      editTags = savedTags;
      editAccountable = savedAccountable;
      editConsulted = savedConsulted;
      editInformed = savedInformed;
      openEditTaskModal(parentTaskId, true);
      restoreTaskFormState(formState);
      restoreModalScrollTop(scrollPos);
    } catch (e) {
      console.error("Error deleting subtask:", e);
    }
  }
  async function saveEditSubtask(subtaskId, parentTaskId) {
    var titleInput = document.getElementById("st-title-" + subtaskId);
    var descInput = document.getElementById("st-desc-" + subtaskId);
    var statusSel = document.getElementById("st-status-" + subtaskId);
    var prioritySel = document.getElementById("st-priority-" + subtaskId);
    var assigneeBox = document.getElementById("st-assignee-" + subtaskId);
    var startDateInput = document.getElementById("st-start-" + subtaskId);
    var dueDateInput = document.getElementById("st-due-" + subtaskId);
    var hoursInput = document.getElementById("st-hours-" + subtaskId);
    var recurSel = document.getElementById("st-recur-" + subtaskId);
    if (!titleInput) return;
    var newTitle = titleInput.value.trim();
    if (!newTitle) return;
    var newAssignee = "";
    if (assigneeBox) {
      var checked = assigneeBox.querySelectorAll('input[type="checkbox"]:checked');
      newAssignee = Array.prototype.map.call(checked, function(c) {
        return c.value;
      }).join(", ");
    }
    var newStartDate = startDateInput && startDateInput.value ? Math.floor(new Date(startDateInput.value).getTime() / 1e3) : null;
    var newDueDate = dueDateInput && dueDateInput.value ? Math.floor(new Date(dueDateInput.value).getTime() / 1e3) : null;
    var newStatus = statusSel ? statusSel.value : "todo";
    var typeEl = document.getElementById("st-type-" + subtaskId);
    var fields = {
      Title: newTitle,
      Description: descInput ? descInput.value : "",
      Status: newStatus,
      Completed: newStatus === "done",
      Priority: prioritySel ? prioritySel.value : "medium",
      Assignee: newAssignee,
      Estimated_Hours: hoursInput && hoursInput.value ? parseFloat(hoursInput.value) : null,
      Recurrence: recurSel ? recurSel.value : "none",
      Type: typeEl ? typeEl.value : "subtask"
    };
    if (newStartDate) fields.Start_Date = newStartDate;
    if (newDueDate) fields.Due_Date = newDueDate;
    var existingSubtask = state.subtasks.find(function(s) {
      return s.id === subtaskId;
    });
    var previousAssignee = existingSubtask ? existingSubtask.Assignee : "";
    var savedAssignees = editAssignees.slice();
    var savedTags = editTags.slice();
    var savedAccountable = editAccountable.slice();
    var savedConsulted = editConsulted.slice();
    var savedInformed = editInformed.slice();
    try {
      await grist.docApi.applyUserActions([["UpdateRecord", state.SUBTASKS_TABLE, subtaskId, fields]]);
      showToast(t("subtaskSaved"), "success");
      if (fields.Assignee !== previousAssignee) {
        var previousKeys = {};
        splitRecipientValues(previousAssignee).forEach(function(value) {
          var email = resolveUserEmail(value);
          previousKeys[(email || value).toLowerCase()] = true;
        });
        var newlyAssigned = splitRecipientValues(fields.Assignee).filter(function(value) {
          var email = resolveUserEmail(value);
          return !previousKeys[(email || String(value)).toLowerCase()];
        });
        if (newlyAssigned.length) {
          await notifyConcernedUsers(parentTaskId, newlyAssigned, "task_assigned", newTitle);
        }
      }
      await loadAllData();
      editAssignees = savedAssignees;
      editTags = savedTags;
      editAccountable = savedAccountable;
      editConsulted = savedConsulted;
      editInformed = savedInformed;
      openEditTaskModal(parentTaskId, true);
    } catch (e) {
      console.error("Error saving subtask:", e);
      showToast("Error: " + e.message, "error");
    }
  }
  async function generateSubtaskOccurrences(subtaskId, parentTaskId) {
    var st = state.subtasks.find(function(s) {
      return s.id === subtaskId;
    });
    if (!st || !st.Recurrence || st.Recurrence === "none") return;
    var baseDate = st.Due_Date ? new Date(st.Due_Date * 1e3) : /* @__PURE__ */ new Date();
    var actions = [];
    var countMap = { daily: 7, weekly: 4, biweekly: 4, monthly: 3, quarterly: 4, yearly: 3 };
    var count = countMap[st.Recurrence] || 3;
    for (var i = 1; i <= count; i++) {
      var d = new Date(baseDate);
      if (st.Recurrence === "daily") d.setDate(d.getDate() + i);
      else if (st.Recurrence === "weekly") d.setDate(d.getDate() + i * 7);
      else if (st.Recurrence === "biweekly") d.setDate(d.getDate() + i * 14);
      else if (st.Recurrence === "monthly") d.setMonth(d.getMonth() + i);
      else if (st.Recurrence === "quarterly") d.setMonth(d.getMonth() + i * 3);
      else if (st.Recurrence === "yearly") d.setFullYear(d.getFullYear() + i);
      else d.setMonth(d.getMonth() + i);
      actions.push(["AddRecord", state.SUBTASKS_TABLE, null, {
        Parent_Task_Id: parentTaskId,
        Title: st.Title,
        Description: st.Description || "",
        Status: "todo",
        Priority: st.Priority || "medium",
        Assignee: st.Assignee || "",
        Due_Date: Math.floor(d.getTime() / 1e3),
        Recurrence: st.Recurrence,
        Completed: false,
        Order: (st.Order || 0) + i
      }]);
    }
    try {
      await grist.docApi.applyUserActions(actions);
      showToast(currentLang === "fr" ? count + " occurrence(s) cr\xE9\xE9e(s)" : count + " occurrence(s) created", "success");
      var savedAssignees = editAssignees.slice();
      var savedTags = editTags.slice();
      var savedAccountable = editAccountable.slice();
      var savedConsulted = editConsulted.slice();
      var savedInformed = editInformed.slice();
      await loadAllData();
      editAssignees = savedAssignees;
      editTags = savedTags;
      editAccountable = savedAccountable;
      editConsulted = savedConsulted;
      editInformed = savedInformed;
      openEditTaskModal(parentTaskId, true);
    } catch (e) {
      console.error("Error generating subtask occurrences:", e);
      showToast("Error: " + e.message, "error");
    }
  }
  async function addComment(taskId) {
    var textarea = document.getElementById("new-comment-input");
    var content = textarea.value.trim();
    if (!content) return;
    var formState = captureTaskFormState();
    var savedAssignees = editAssignees.slice();
    var savedTags = editTags.slice();
    var savedAccountable = editAccountable.slice();
    var savedConsulted = editConsulted.slice();
    var savedInformed = editInformed.slice();
    var scrollPos = getModalScrollTop();
    try {
      await grist.docApi.applyUserActions([
        ["AddRecord", state.COMMENTS_TABLE, null, {
          Task_Id: taskId,
          Author: state.currentUserEmail || "Utilisateur",
          Content: content,
          Created_At: Math.floor(Date.now() / 1e3)
        }]
      ]);
      textarea.value = "";
      showToast(t("commentAdded"), "success");
      var commentTask = state.tasks.find(function(t2) {
        return t2.id === taskId;
      });
      if (commentTask) {
        await notifyConcernedUsers(taskId, splitRecipientValues(commentTask.Assignee), "comment_added", commentTask.Title || "");
      }
      await loadAllData();
      editAssignees = savedAssignees;
      editTags = savedTags;
      editAccountable = savedAccountable;
      editConsulted = savedConsulted;
      editInformed = savedInformed;
      openEditTaskModal(taskId, true);
      restoreTaskFormState(formState);
      restoreModalScrollTop(scrollPos);
    } catch (e) {
      console.error("Error adding comment:", e);
      showToast("Error: " + e.message, "error");
    }
  }
  async function deleteComment(commentId, taskId) {
    if (!state.isOwner) return;
    var confirmed = await showConfirmModal(
      currentLang === "fr" ? "Supprimer ce commentaire ?" : "Delete this comment?",
      currentLang === "fr" ? "Supprimer le commentaire" : "Delete comment"
    );
    if (!confirmed) return;
    var formState = captureTaskFormState();
    var savedAssignees = editAssignees.slice();
    var savedTags = editTags.slice();
    var savedAccountable = editAccountable.slice();
    var savedConsulted = editConsulted.slice();
    var savedInformed = editInformed.slice();
    try {
      await grist.docApi.applyUserActions([
        ["RemoveRecord", state.COMMENTS_TABLE, commentId]
      ]);
      showToast(t("commentDeleted"), "info");
      await loadAllData();
      editAssignees = savedAssignees;
      editTags = savedTags;
      editAccountable = savedAccountable;
      editConsulted = savedConsulted;
      editInformed = savedInformed;
      openEditTaskModal(taskId, true);
      restoreTaskFormState(formState);
    } catch (e) {
      console.error("Error deleting comment:", e);
    }
  }
  function closeModal(e) {
  }
  function closeModalForce() {
    if (draftTaskId != null) {
      var did = draftTaskId;
      draftTaskId = null;
      var ti = document.getElementById("task-title");
      var titleVal = ti ? ti.value.trim() : "";
      if (titleVal) {
        updateTask(did);
        return;
      }
      removeDraftChildren(did).then(function() {
        return grist.docApi.applyUserActions([["RemoveRecord", state.TASKS_TABLE, did]]);
      }).then(function() {
        return loadAllData();
      }).then(function() {
        refreshAllViews();
      }).catch(function() {
      });
    }
    document.getElementById("modal-container").innerHTML = "";
  }
  async function createTask() {
    var title = requireTaskTitle();
    if (!title) return;
    if (shouldLimitToMyProjects() && editAssignees.length === 0) {
      var mine = myAssigneeValue();
      if (mine) editAssignees = [mine];
    }
    var projectEl = document.getElementById("task-project");
    var projectId = projectEl && projectEl.value ? parseInt(projectEl.value) : 0;
    var record = {};
    setField(record, "tasks", "title", title);
    setField(record, "tasks", "description", getInputValue("task-desc").trim());
    setField(record, "tasks", "status", getInputValue("task-status"));
    setField(record, "tasks", "priority", getInputValue("task-priority"));
    setField(record, "tasks", "assignee", ["L"].concat(resolveAssigneeIds(editAssignees)));
    if (state.raciEnabled && state.TASKS_TABLE === state.DEFAULT_TASKS_TABLE) {
      record.Accountable = editAccountable.join(", ");
      record.Consulted = editConsulted.join(", ");
      record.Informed = editInformed.join(", ");
    }
    setField(record, "tasks", "group", getInputValue("task-group"));
    setField(record, "tasks", "startDate", toEpoch(getInputValue("task-start")));
    setField(record, "tasks", "dueDate", toEpoch(getInputValue("task-due")));
    setField(record, "tasks", "category", getInputValue("task-category").trim());
    setField(record, "tasks", "projectId", projectId);
    setField(record, "tasks", "estimatedHours", getEstimatedHoursInput());
    setField(record, "tasks", "createdAt", Math.floor(Date.now() / 1e3));
    setField(record, "tasks", "tag", ["L"].concat(editTags));
    if (state.TASKS_TABLE === state.DEFAULT_TASKS_TABLE) record.Auto_Extend = true;
    try {
      record = await keepExistingTaskColumns(record);
      var createResult = await grist.docApi.applyUserActions([
        ["AddRecord", state.TASKS_TABLE, null, record]
      ]);
      var newTaskId = createResult && createResult.retValues && createResult.retValues[0] || null;
      showToast(t("taskCreated"), "success");
      if (newTaskId) {
        await notifyConcernedUsers(newTaskId, editAssignees.slice(), "task_assigned", title);
      }
      closeModalForce();
      await loadAllData();
      if (newTaskId) {
        openEditTaskModal(newTaskId);
      }
    } catch (e) {
      console.error("Error creating task:", e);
      showToast("Error: " + e.message, "error");
    }
  }
  async function updateTask(taskId) {
    var title = requireTaskTitle();
    if (!title) return;
    if (shouldLimitToMyProjects() && editAssignees.length === 0) {
      var mine = myAssigneeValue();
      if (mine) editAssignees = [mine];
    }
    var wasDraft = draftTaskId === taskId;
    var task = state.tasks.find(function(t2) {
      return t2.id === taskId;
    });
    var wasNotDone = task && task.Status !== "done";
    var newStatus = getInputValue("task-status");
    var recurrenceEl = document.getElementById("task-recurrence");
    var newRecurrence = recurrenceEl ? recurrenceEl.value : task ? task.Recurrence : "none";
    var projectEl = document.getElementById("task-project");
    var projectId = projectEl && projectEl.value ? parseInt(projectEl.value) : 0;
    var record = {};
    setField(record, "tasks", "title", title);
    setField(record, "tasks", "description", getInputValue("task-desc").trim());
    setField(record, "tasks", "status", newStatus);
    setField(record, "tasks", "priority", getInputValue("task-priority"));
    setField(record, "tasks", "assignee", ["L"].concat(resolveAssigneeIds(editAssignees)));
    if (state.raciEnabled && state.TASKS_TABLE === state.DEFAULT_TASKS_TABLE) {
      record.Accountable = editAccountable.join(", ");
      record.Consulted = editConsulted.join(", ");
      record.Informed = editInformed.join(", ");
    }
    setField(record, "tasks", "group", getInputValue("task-group"));
    setField(record, "tasks", "startDate", toEpoch(getInputValue("task-start")));
    setField(record, "tasks", "dueDate", toEpoch(getInputValue("task-due")));
    setField(record, "tasks", "category", getInputValue("task-category").trim());
    setField(record, "tasks", "projectId", projectId);
    setField(record, "tasks", "recurrence", newRecurrence);
    setField(record, "tasks", "estimatedHours", getEstimatedHoursInput());
    setField(record, "tasks", "tag", ["L"].concat(editTags));
    var extDateEl = document.getElementById("task-extension-date");
    if (extDateEl) record.Extension_Date = toEpoch(extDateEl.value);
    var autoExtEl = document.getElementById("task-auto-extend");
    if (autoExtEl) record.Auto_Extend = autoExtEl.checked;
    if (newStatus === "done" && task && task.Auto_Extend && task.Status !== "done") {
      record.Extension_Date = Math.floor(Date.now() / 1e3);
      record.Auto_Extend = false;
    }
    try {
      record = await keepExistingTaskColumns(record);
      await grist.docApi.applyUserActions([
        ["UpdateRecord", state.TASKS_TABLE, taskId, record]
      ]);
      if (wasDraft) draftTaskId = null;
      showToast(t("taskUpdated"), "success");
      var autoChanges = {};
      if (task) {
        if (task.Status !== newStatus) {
          autoChanges.status = { from: task.Status, to: newStatus };
        }
        var newPriority = document.getElementById("task-priority").value;
        if (task.Priority !== newPriority) autoChanges.priority = { from: task.Priority, to: newPriority };
        var newAssignee = editAssignees.join(", ");
        if (task.Assignee !== newAssignee) autoChanges.assignee = { from: task.Assignee, to: newAssignee };
      }
      if (Object.keys(autoChanges).length > 0) {
        await evaluateAutomationRules(Object.assign({}, task, record, { id: taskId }), autoChanges);
      }
      if (autoChanges.assignee) {
        var previousAssignees = splitRecipientValues(task ? task.Assignee : "");
        var previousKeys = {};
        previousAssignees.forEach(function(value) {
          var email = resolveUserEmail(value);
          previousKeys[(email || value).toLowerCase()] = true;
        });
        var newlyAssigned = editAssignees.filter(function(value) {
          var email = resolveUserEmail(value);
          return !previousKeys[(email || String(value)).toLowerCase()];
        });
        await notifyConcernedUsers(taskId, newlyAssigned, "task_assigned", title);
      }
      if (newStatus === "done" && wasNotDone) {
        await notifyTaskCompleted(Object.assign({}, task, record, { id: taskId, Project_Id: projectId, Title: title }));
      }
      if (newStatus === "done" && wasNotDone && newRecurrence && newRecurrence !== "none") {
        var updatedTask = Object.assign({}, task, record);
        await createNextOccurrence(updatedTask);
      }
      closeModalForce();
      await loadAllData();
    } catch (e) {
      console.error("Error updating task:", e);
      showToast("Error: " + e.message, "error");
    }
  }
  async function deleteTask(taskId) {
    if (!state.isOwner) return;
    var relatedSubtasks = state.subtasks.filter(function(st) {
      return st.Parent_Task_Id === taskId;
    });
    var confirmationMessage = currentLang === "fr" ? "Supprimer cette t\xE2che et ses " + relatedSubtasks.length + " sous-t\xE2che(s) ? Cette action est irr\xE9versible." : "Delete this task and its " + relatedSubtasks.length + " subtask(s)? This action cannot be undone.";
    var confirmed = await showConfirmModal(confirmationMessage, currentLang === "fr" ? "Supprimer la t\xE2che" : "Delete task");
    if (!confirmed) return;
    try {
      var deletedSubtaskIds = {};
      var actions = [];
      relatedSubtasks.forEach(function(st) {
        deletedSubtaskIds[st.id] = true;
      });
      state.subtasks.forEach(function(st) {
        if (st.Parent_Task_Id !== taskId && deletedSubtaskIds[st.Blocked_By_Subtask_Id]) {
          actions.push(["UpdateRecord", state.SUBTASKS_TABLE, st.id, { Blocked_By_Subtask_Id: null }]);
        }
      });
      state.comments.forEach(function(comment) {
        if (comment.Task_Id === taskId) actions.push(["RemoveRecord", state.COMMENTS_TABLE, comment.id]);
      });
      state.timeEntries.forEach(function(entry) {
        if (entry.Task_Id === taskId) actions.push(["RemoveRecord", state.TIME_ENTRIES_TABLE, entry.id]);
      });
      state.attachments.forEach(function(attachment) {
        if (attachment.Task_Id === taskId) actions.push(["RemoveRecord", state.ATTACHMENTS_TABLE, attachment.id]);
      });
      state.pmNotifications.forEach(function(notification) {
        if (notification.Task_Id === taskId) actions.push(["RemoveRecord", state.NOTIFICATIONS_TABLE, notification.id]);
      });
      relatedSubtasks.forEach(function(st) {
        actions.push(["RemoveRecord", state.SUBTASKS_TABLE, st.id]);
      });
      actions.push(["RemoveRecord", state.TASKS_TABLE, taskId]);
      await grist.docApi.applyUserActions(actions);
      if (draftTaskId === taskId) draftTaskId = null;
      document.getElementById("modal-container").innerHTML = "";
      showToast(t("taskDeleted"), "info");
      await loadAllData();
    } catch (e) {
      console.error("Error deleting task:", e);
    }
  }

  // src/domains/subtasks.js
  function getTaskSubtasks(taskId) {
    return state.subtasks.filter(function(st) {
      return st.Parent_Task_Id === taskId;
    }).sort(function(a, b) {
      var da = a.Due_Date || null;
      var db = b.Due_Date || null;
      if (da && db) {
        if (da !== db) return da - db;
      } else if (da) {
        return -1;
      } else if (db) {
        return 1;
      }
      return (a.Order || 0) - (b.Order || 0);
    });
  }
  function getTaskProgress(task) {
    var taskSubtasks = getTaskSubtasks(task.id);
    if (taskSubtasks.length === 0) {
      return task.Status === "done" ? 100 : task.Status === "progress" ? 50 : 10;
    }
    var completed = taskSubtasks.filter(function(st) {
      return st.Completed;
    }).length;
    return Math.round(completed / taskSubtasks.length * 100);
  }
  function isSubtaskBlocked(subtask) {
    if (!subtask.Blocked_By_Subtask_Id) return false;
    var blocker = state.subtasks.find(function(st) {
      return st.id === subtask.Blocked_By_Subtask_Id;
    });
    return blocker && !blocker.Completed;
  }
  function getSubtaskBlocker(subtask) {
    if (!subtask.Blocked_By_Subtask_Id) return null;
    return state.subtasks.find(function(st) {
      return st.id === subtask.Blocked_By_Subtask_Id;
    });
  }
  async function toggleSubtaskFromPopup(subtaskId, taskId, completed) {
    await toggleSubtaskFromCard(subtaskId, completed);
    await loadAllData();
    openCardSubtasksModal(taskId);
    renderKanbanView();
  }
  async function toggleSubtaskFromCard(subtaskId, completed) {
    try {
      await grist.docApi.applyUserActions([
        ["UpdateRecord", state.SUBTASKS_TABLE, subtaskId, { Completed: completed }]
      ]);
      for (var i = 0; i < state.subtasks.length; i++) {
        if (state.subtasks[i].id === subtaskId) {
          state.subtasks[i].Completed = completed;
          break;
        }
      }
      renderKanbanView();
    } catch (e) {
      console.error("toggleSubtaskFromCard:", e);
    }
  }
  function openSubtaskDepModal(subtaskId, taskId) {
    var subtask = state.subtasks.find(function(st) {
      return st.id === subtaskId;
    });
    if (!subtask) return;
    var taskSubtasks = getTaskSubtasks(taskId);
    var otherSubtasks = taskSubtasks.filter(function(st) {
      return st.id !== subtaskId;
    });
    var html = '<div class="modal-overlay" onclick="closeModal(event)">';
    html += '<div class="modal" style="max-width:400px;" onclick="event.stopPropagation()">';
    html += '<div class="modal-header"><h3>\u{1F517} ' + t("dependencies") + '</h3><button class="modal-close" onclick="closeModalForce()">\u2715</button></div>';
    html += '<div class="modal-body">';
    html += '<p style="margin-bottom:12px;font-size:12px;color:#64748b;">' + sanitize(subtask.Title) + "</p>";
    html += '<div class="form-group"><label>' + t("blockedBy") + "</label>";
    html += '<select id="subtask-blocker-select">';
    html += '<option value="">-- ' + t("noDependencies") + " --</option>";
    for (var i = 0; i < otherSubtasks.length; i++) {
      var ost = otherSubtasks[i];
      var sel = subtask.Blocked_By_Subtask_Id === ost.id ? " selected" : "";
      html += '<option value="' + ost.id + '"' + sel + ">" + sanitize(ost.Title) + "</option>";
    }
    html += "</select></div>";
    html += "</div>";
    html += '<div class="modal-footer">';
    html += '<button class="btn btn-secondary" onclick="closeModalForce()">' + t("cancel") + "</button>";
    html += '<button class="btn btn-primary" onclick="updateSubtaskDep(' + subtaskId + ", " + taskId + ')">' + t("save") + "</button>";
    html += "</div></div></div>";
    document.getElementById("modal-container").innerHTML = html;
  }
  async function updateSubtaskDep(subtaskId, taskId) {
    var select = document.getElementById("subtask-blocker-select");
    var blockerId = select.value ? parseInt(select.value) : null;
    try {
      await grist.docApi.applyUserActions([
        ["UpdateRecord", state.SUBTASKS_TABLE, subtaskId, { Blocked_By_Subtask_Id: blockerId }]
      ]);
      showToast(t("dependencyAdded"), "success");
      closeModalForce();
      await loadAllData();
      openEditTaskModal(taskId);
    } catch (e) {
      console.error("Error updating subtask dependency:", e);
      showToast("Error: " + e.message, "error");
    }
  }
  function setStStatus(subtaskId, value, btn) {
    var hidden = document.getElementById("st-status-" + subtaskId);
    if (hidden) hidden.value = value;
    var grp = btn.parentNode;
    if (grp) grp.querySelectorAll(".st-pill").forEach(function(p) {
      p.className = "st-pill";
      p.style.background = "";
      p.style.color = "";
      p.style.borderColor = "";
    });
    var def = getKanbanStatuses().find(function(s) {
      return s.key === value;
    });
    var color = def && def.color ? def.color : "#3b82f6";
    btn.style.background = color;
    btn.style.color = "#fff";
    btn.style.borderColor = color;
  }
  function setStType(subtaskId, value, btn) {
    var hidden = document.getElementById("st-type-" + subtaskId);
    if (hidden) hidden.value = value;
    var grp = btn.parentNode;
    if (grp) grp.querySelectorAll(".st-pill").forEach(function(p) {
      p.className = "st-pill";
    });
    btn.className = "st-pill active-progress";
  }
  function setStPill(field, subtaskId, value, btn) {
    var group = document.getElementById("st-" + field + "-group-" + subtaskId);
    var hidden = document.getElementById("st-" + field + "-" + subtaskId);
    if (!group || !hidden) return;
    hidden.value = value;
    var pills = group.querySelectorAll(".st-pill");
    pills.forEach(function(p) {
      p.className = "st-pill";
    });
    btn.className = "st-pill active-" + value;
  }
  function startEditSubtask(subtaskId) {
    var viewEl = document.getElementById("st-view-" + subtaskId);
    var editEl = document.getElementById("st-edit-" + subtaskId);
    if (viewEl) viewEl.style.display = "none";
    if (editEl) {
      editEl.style.display = "flex";
      var t2 = document.getElementById("st-title-" + subtaskId);
      if (t2) t2.focus();
    }
  }
  function cancelEditSubtask(subtaskId) {
    var viewEl = document.getElementById("st-view-" + subtaskId);
    var editEl = document.getElementById("st-edit-" + subtaskId);
    if (viewEl) viewEl.style.display = "flex";
    if (editEl) editEl.style.display = "none";
  }
  function filterStAssignees(subtaskId, query) {
    var box = document.getElementById("st-assignee-" + subtaskId);
    if (!box) return;
    var q = (query || "").toLowerCase().trim();
    box.querySelectorAll("label").forEach(function(lbl) {
      var name = (lbl.textContent || "").toLowerCase();
      lbl.style.display = !q || name.indexOf(q) !== -1 ? "" : "none";
    });
  }

  // src/domains/kanban.js
  var kanbanGroupBy = "status";
  var expandedKanbanCards = {};
  var collapsedKanbanCols = {};
  var defaultKanbanStatuses = [
    { key: "todo", label_fr: "\xC0 faire", label_en: "To do", color: "#f59e0b", cssClass: "col-todo" },
    { key: "progress", label_fr: "En cours", label_en: "In progress", color: "#3b82f6", cssClass: "col-progress" },
    { key: "done", label_fr: "Termin\xE9", label_en: "Done", color: "#22c55e", cssClass: "col-done" }
  ];
  function getKanbanStatuses() {
    return customKanbanStatuses || defaultKanbanStatuses;
  }
  async function saveKanbanStatuses() {
    await saveSetting("kanban_statuses", JSON.stringify(customKanbanStatuses));
    await syncTaskStatusChoices();
    syncSubtaskStatusChoices();
  }
  async function syncTaskStatusChoices() {
    try {
      var statuses = getKanbanStatuses();
      var choices = statuses.map(function(s) {
        return s.key;
      });
      if (choices.indexOf("archived") === -1) choices.push("archived");
      var choiceOptions = {};
      statuses.forEach(function(s) {
        if (s.color) choiceOptions[s.key] = { fillColor: s.color, textColor: "#271A79" };
      });
      choiceOptions.archived = { fillColor: "#EEFFEE", textColor: "#271A79" };
      var statusCol = getColumnName("tasks", "status");
      await grist.docApi.applyUserActions([
        ["ModifyColumn", state.TASKS_TABLE, statusCol, { widgetOptions: JSON.stringify({ choices, choiceOptions }) }]
      ]);
      state.taskTableColumns = null;
    } catch (e) {
      console.log("syncTaskStatusChoices:", e.message);
    }
  }
  async function syncSubtaskStatusChoices() {
    try {
      var statuses = getKanbanStatuses();
      var choices = statuses.map(function(s) {
        return s.key;
      });
      if (choices.indexOf("archived") === -1) choices.push("archived");
      var choiceOptions = {};
      statuses.forEach(function(s) {
        if (s.color) choiceOptions[s.key] = { fillColor: s.color, textColor: "#ffffff" };
      });
      var widgetOptions = JSON.stringify({ widget: "TextBox", choices, choiceOptions });
      if (typeof localStorage !== "undefined" && localStorage.getItem("pm_subtask_status_sig") === widgetOptions) return;
      await grist.docApi.applyUserActions([
        ["ModifyColumn", state.SUBTASKS_TABLE, "Status", { widgetOptions }]
      ]);
      if (typeof localStorage !== "undefined") localStorage.setItem("pm_subtask_status_sig", widgetOptions);
    } catch (e) {
      console.log("syncSubtaskStatusChoices:", e.message);
    }
  }
  function getStatusLabel(key) {
    var statuses = getKanbanStatuses();
    var found = statuses.find(function(s) {
      return s.key === key;
    });
    if (found) return currentLang === "fr" ? found.label_fr : found.label_en;
    return key;
  }
  function setKanbanGroupBy(value) {
    kanbanGroupBy = value;
    renderKanbanView();
  }
  function sortKanbanTasks(list) {
    var arr = list.slice();
    if (kanbanSort === "alpha") {
      arr.sort(function(a, b) {
        return (a.Title || "").localeCompare(b.Title || "");
      });
    } else if (kanbanSort === "alpha-desc") {
      arr.sort(function(a, b) {
        return (b.Title || "").localeCompare(a.Title || "");
      });
    } else if (kanbanSort === "due") {
      arr.sort(function(a, b) {
        var da = a.Due_Date || null, db = b.Due_Date || null;
        if (da && db) return da - db;
        if (da) return -1;
        if (db) return 1;
        return 0;
      });
    } else if (kanbanSort === "priority") {
      var po = { high: 0, medium: 1, low: 2 };
      arr.sort(function(a, b) {
        var pa = po[a.Priority] !== void 0 ? po[a.Priority] : 3;
        var pb = po[b.Priority] !== void 0 ? po[b.Priority] : 3;
        return pa - pb;
      });
    }
    return arr;
  }
  function toggleKanbanCol(key) {
    collapsedKanbanCols[key] = !collapsedKanbanCols[key];
    renderKanbanView();
  }
  function toggleCardExpand(taskId, ev) {
    if (ev) {
      ev.stopPropagation();
      ev.preventDefault();
    }
    if (expandedKanbanCards[taskId]) delete expandedKanbanCards[taskId];
    else expandedKanbanCards[taskId] = true;
    renderKanbanView();
  }
  function getTaskDateProgress(task) {
    if (!task || !task.Start_Date || !task.Due_Date || task.Due_Date <= task.Start_Date) return null;
    var now = Math.floor(Date.now() / 1e3);
    if (now <= task.Start_Date) return 0;
    if (now >= task.Due_Date) return 100;
    return Math.max(0, Math.min(100, Math.round((now - task.Start_Date) / (task.Due_Date - task.Start_Date) * 100)));
  }
  function openCardSubtasksModal(taskId) {
    var task = state.tasks.find(function(t2) {
      return t2.id === taskId;
    });
    if (!task) return;
    var taskSubtasks = getTaskSubtasks(taskId);
    var html = '<div class="modal-overlay" onclick="closeModal(event)">';
    html += '<div class="modal compact-subtasks-modal" onclick="event.stopPropagation()">';
    html += '<div class="modal-header"><h3>' + (currentLang === "fr" ? "Sous-t\xE2ches" : "Subtasks") + '</h3><button class="modal-close" onclick="closeModalForce()">\u2715</button></div>';
    html += '<div class="modal-body">';
    html += '<div class="compact-subtasks-title">' + sanitize(task.Title || "") + "</div>";
    if (taskSubtasks.length === 0) {
      html += '<div class="subtasks-empty">' + t("noSubtasks") + "</div>";
    } else {
      html += '<div class="compact-subtasks-list">';
      taskSubtasks.forEach(function(st) {
        html += '<label class="compact-subtask-item">';
        html += '<input type="checkbox" ' + (st.Completed ? "checked" : "") + ' onchange="toggleSubtaskFromPopup(' + st.id + ", " + taskId + ', this.checked)">';
        html += '<span class="' + (st.Completed ? "completed" : "") + '">' + sanitize(st.Title) + "</span>";
        html += "</label>";
      });
      html += "</div>";
    }
    html += "</div></div></div>";
    document.getElementById("modal-container").innerHTML = html;
  }
  function openCardCommentsModal(taskId) {
    var task = state.tasks.find(function(t2) {
      return t2.id === taskId;
    });
    var taskComments = getTaskComments(taskId);
    var html = '<div class="modal-overlay" onclick="closeModal(event)">';
    html += '<div class="modal compact-subtasks-modal" onclick="event.stopPropagation()">';
    html += '<div class="modal-header"><h3>' + t("comments") + '</h3><button class="modal-close" onclick="closeModalForce()">\u2715</button></div>';
    html += '<div class="modal-body">';
    if (task) html += '<div class="compact-subtasks-title">' + sanitize(task.Title || "") + "</div>";
    if (taskComments.length === 0) {
      html += '<div class="comments-empty">' + t("noComments") + "</div>";
    } else {
      html += '<div class="quick-comments-list">';
      taskComments.forEach(function(cmt) {
        html += '<div class="quick-comment-item">';
        html += '<div class="quick-comment-meta">\u{1F464} ' + sanitize(cmt.Author || "Anonyme") + " \xB7 " + formatTimeAgo(cmt.Created_At) + "</div>";
        html += '<div class="quick-comment-content">' + sanitize(cmt.Content) + "</div>";
        html += "</div>";
      });
      html += "</div>";
    }
    html += "</div></div></div>";
    document.getElementById("modal-container").innerHTML = html;
  }
  function openCardAttachmentsModal(taskId) {
    var task = state.tasks.find(function(t2) {
      return t2.id === taskId;
    });
    var list = getTaskAttachments(taskId);
    var html = '<div class="modal-overlay" onclick="closeModal(event)">';
    html += '<div class="modal compact-subtasks-modal" onclick="event.stopPropagation()">';
    html += '<div class="modal-header"><h3>' + (currentLang === "fr" ? "Pi\xE8ces jointes" : "Attachments") + '</h3><button class="modal-close" onclick="closeModalForce()">\u2715</button></div>';
    html += '<div class="modal-body">';
    if (task) html += '<div class="compact-subtasks-title">' + sanitize(task.Title || "") + "</div>";
    if (list.length === 0) {
      html += '<div class="attach-empty">' + (currentLang === "fr" ? "Aucune pi\xE8ce jointe" : "No attachments") + "</div>";
    } else {
      html += '<div class="quick-attachments-list">';
      list.forEach(function(att) {
        html += '<div class="quick-attachment-item">';
        html += '<span class="quick-attachment-name">\u{1F4CE} ' + sanitize(att.File_Name || "") + "</span>";
        html += '<span class="quick-attachment-size">' + formatFileSize(att.File_Size) + "</span>";
        html += '<button class="attach-btn" onclick="openAttachmentInNewTab(' + att.id + ')">' + (currentLang === "fr" ? "Ouvrir" : "Open") + "</button>";
        html += '<button class="attach-btn" onclick="downloadAttachment(' + att.id + ')">' + (currentLang === "fr" ? "T\xE9l\xE9charger" : "Download") + "</button>";
        html += "</div>";
      });
      html += "</div>";
    }
    html += "</div></div></div>";
    document.getElementById("modal-container").innerHTML = html;
  }
  function renderKanbanView() {
    var board = document.getElementById("kanban-board");
    var sel = document.getElementById("kanban-groupby");
    if (sel && sel.value !== kanbanGroupBy) sel.value = kanbanGroupBy;
    var sortSel = document.getElementById("kanban-sort");
    if (sortSel && sortSel.value !== kanbanSort) sortSel.value = kanbanSort;
    var columns = [];
    var filteredTasks = getFilteredTasks();
    if (kanbanGroupBy === "priority") {
      columns = [
        { key: "high", label: "\u{1F534} " + t("priorityHigh"), cssClass: "col-todo", field: "Priority" },
        { key: "medium", label: "\u{1F7E1} " + t("priorityMedium"), cssClass: "col-progress", field: "Priority" },
        { key: "low", label: "\u{1F7E2} " + t("priorityLow"), cssClass: "col-done", field: "Priority" }
      ];
    } else if (kanbanGroupBy === "project") {
      var projMap = {};
      filteredTasks.forEach(function(task) {
        var pid = task.Project_Id || 0;
        if (!projMap[pid]) {
          projMap[pid] = { key: String(pid), label: pid ? getProjectName(pid) || "Projet " + pid : currentLang === "fr" ? "Sans projet" : "No project", cssClass: "col-todo", field: "Project_Id", tasks: [], color: getProjectColor(pid || null) };
        }
        projMap[pid].tasks.push(task);
      });
      columns = Object.values(projMap).sort(function(a, b) {
        return a.label.localeCompare(b.label);
      });
    } else if (showArchivedTasks) {
      columns = [
        { key: "archived", label: currentLang === "fr" ? "\u{1F4E6} Archives" : "\u{1F4E6} Archives", cssClass: "col-custom", field: "Status", color: "#94a3b8" }
      ];
    } else {
      var statuses = getKanbanStatuses();
      columns = statuses.map(function(s2) {
        return {
          key: s2.key,
          label: (s2.emoji ? s2.emoji + " " : "") + (currentLang === "fr" ? s2.label_fr : s2.label_en),
          cssClass: s2.cssClass || "col-custom",
          field: "Status",
          color: s2.color
        };
      });
    }
    var html = "";
    for (var s = 0; s < columns.length; s++) {
      var col = columns[s];
      var colTasks = col.tasks || filteredTasks.filter(function(task) {
        if (col.field === "Status") return task.Status === col.key;
        if (col.field === "Priority") return task.Priority === col.key;
        return false;
      });
      colTasks = sortKanbanTasks(colTasks);
      var dotStyle = col.color ? "display:inline-block;width:10px;height:10px;border-radius:50%;background:" + col.color + ";margin-right:6px;" : "display:none;";
      var isCollapsed = !!collapsedKanbanCols[col.key];
      if (isCollapsed) {
        var collapsedStyle = col.color ? "background:" + col.color + "15;border-left:3px solid " + col.color + ";color:" + col.color + ";" : "";
        html += '<div class="kanban-column kanban-column-collapsed ' + col.cssClass + `" onclick="toggleKanbanCol('` + sanitize(col.key) + `')" title="` + col.label + '" style="' + collapsedStyle + '">';
        html += '<div class="kanban-col-header-collapsed">';
        html += '<span class="col-collapse-icon">\u21C4</span>';
        html += '<span class="col-collapsed-label">' + col.label + " (" + colTasks.length + ")</span>";
        html += "</div></div>";
        continue;
      }
      html += '<div class="kanban-column ' + col.cssClass + '">';
      var headerStyle = col.color ? "border-bottom-color:" + col.color + ";color:" + col.color + ";" : "";
      html += '<div class="kanban-col-header" style="' + headerStyle + '">';
      html += '<div style="display:flex;align-items:center;gap:4px;"><span style="' + dotStyle + '"></span>' + col.label + ' <span class="col-count">' + colTasks.length + "</span></div>";
      html += '<div style="display:flex;align-items:center;gap:4px;">';
      if (kanbanGroupBy === "status") html += `<button class="col-add" onclick="openNewTaskModal('` + col.key + `')" title="` + (currentLang === "fr" ? "Nouvelle t\xE2che" : "New task") + '">+</button>';
      var collapseColor = col.color ? "color:" + col.color + ";background:white;" : "";
      html += `<button class="col-add" onclick="toggleKanbanCol('` + sanitize(col.key) + `')" title="` + (currentLang === "fr" ? "R\xE9duire" : "Collapse") + '" style="' + collapseColor + '">\u21C4</button>';
      html += "</div>";
      html += "</div>";
      html += '<div class="kanban-cards" data-groupby="' + kanbanGroupBy + '" data-value="' + sanitize(col.key) + '" data-field="' + col.field + '" ondragover="onDragOver(event)" ondrop="onDrop(event)" ondragleave="onDragLeave(event)">';
      if (colTasks.length === 0) {
        html += '<div class="kanban-empty"><div class="kanban-empty-icon">\u{1F4DD}</div>' + t("noTasks") + "</div>";
      } else {
        for (var i = 0; i < colTasks.length; i++) {
          html += renderTaskCard(colTasks[i]);
        }
      }
      html += "</div>";
      if (kanbanGroupBy === "status") html += `<button class="kanban-add-btn" onclick="openNewTaskModal('` + col.key + `')">` + t("addTask") + "</button>";
      html += "</div>";
    }
    board.innerHTML = html;
  }
  function renderTaskCard(task) {
    var cd = cardDisplaySettings;
    var overdueHtml = isOverdue(task) ? ' <span class="overdue-badge">' + t("overdue") + "</span>" : "";
    var taskSubtasks = getTaskSubtasks(task.id);
    var progressPct = getTaskProgress(task);
    var completedCount = taskSubtasks.filter(function(st) {
      return st.Completed;
    }).length;
    var taskComments = getTaskComments(task.id);
    var taskAttachments = getTaskAttachments(task.id);
    var priorityClass = "priority-" + (task.Priority || "medium");
    var projColor = getProjectColor(task.Project_Id);
    var projName = getProjectName(task.Project_Id);
    var html = '<div class="task-card ' + priorityClass + '" draggable="true" ondragstart="onDragStart(event, ' + task.id + ')" data-id="' + task.id + '" ondblclick="openEditTaskModal(' + task.id + ')" style="border-left:none;padding:0;overflow:visible;">';
    html += '<div class="task-card-body">';
    html += '<div class="task-card-header">';
    html += '<div class="task-card-topline">';
    if (cd.priority) html += '<div class="task-card-priority-text priority-text-' + (task.Priority || "medium") + '">' + priorityLabel(task.Priority) + "</div>";
    html += '<div class="task-card-meta-actions">';
    var _isExpanded = !!expandedKanbanCards[task.id];
    html += '<button class="btn-icon task-card-expand-btn" onclick="event.stopPropagation();toggleCardExpand(' + task.id + ', event)" title="' + (currentLang === "fr" ? "D\xE9tails" : "Details") + '">' + (_isExpanded ? "\u25B2" : "\u25BC") + "</button>";
    html += "</div></div>";
    html += '<div class="task-card-title" onclick="openEditTaskModal(' + task.id + ')">' + sanitize(task.Title) + "</div>";
    if (projName) html += '<div class="task-card-project-name"><span style="background:' + projColor + ';"></span>' + sanitize(projName) + "</div>";
    html += "</div>";
    if (cd.description && task.Description) {
      html += '<div class="task-card-desc">' + sanitize(task.Description) + "</div>";
    }
    var dateProgress = getTaskDateProgress(task);
    if (dateProgress !== null) {
      html += '<div class="task-date-progress" title="' + (currentLang === "fr" ? "Avancement selon les dates" : "Date progress") + '">';
      html += '<div class="task-date-progress-fill" style="width:' + dateProgress + '%"></div>';
      html += "</div>";
    }
    if (cd.subtasks && taskSubtasks.length > 0) {
      var barClass = progressPct === 100 ? "bar-done" : progressPct >= 50 ? "bar-progress" : "bar-todo";
      html += '<div class="task-card-subtasks">';
      html += '<div class="subtask-progress-row">';
      html += '<div class="subtask-progress-bar thin"><div class="subtask-progress-fill ' + barClass + '" style="width:' + progressPct + '%"></div></div>';
      html += '<span class="subtask-count">' + completedCount + "/" + taskSubtasks.length + "</span>";
      html += '<button class="subtask-mini-btn" onclick="event.stopPropagation();openCardSubtasksModal(' + task.id + ')" title="' + (currentLang === "fr" ? "Sous-t\xE2ches" : "Subtasks") + '">\u2611</button>';
      html += "</div></div>";
    }
    html += '<div class="task-card-row">';
    if (cd.date && task.Due_Date) {
      html += '<span class="task-card-date">\u{1F4C5} ' + formatDate(task.Due_Date) + overdueHtml + "</span>";
    }
    if (cd.comments && taskComments.length > 0) {
      html += '<button class="task-card-comments card-quick-btn" onclick="event.stopPropagation();openCardCommentsModal(' + task.id + ')" title="' + t("comments") + '">\u{1F4AC} ' + taskComments.length + "</button>";
    }
    if (taskAttachments.length > 0) {
      html += '<button class="task-card-attachments card-quick-btn" onclick="event.stopPropagation();openCardAttachmentsModal(' + task.id + ')" title="' + (currentLang === "fr" ? "Pi\xE8ces jointes" : "Attachments") + '">\u{1F4CE} ' + taskAttachments.length + "</button>";
    }
    var totalTime = getTaskTotalTime(task.id);
    var isTimerRunning = !!state.activeTimers[task.id];
    if (cd.time && (totalTime > 0 || isTimerRunning)) {
      html += '<span class="task-card-time' + (isTimerRunning ? " timer-running" : "") + '">\u23F1\uFE0F ' + formatDurationShort(totalTime) + (isTimerRunning ? " \u25CF" : "") + "</span>";
      if (isTimerRunning) html += '<button class="task-card-pause-btn" onclick="event.stopPropagation();pauseTimer(' + task.id + ')" title="' + (currentLang === "fr" ? "Pause" : "Pause") + '">\u23F8</button>';
    }
    if (task.Recurrence && task.Recurrence !== "none") {
      var recLabel = recurrenceSymbol(task.Recurrence);
      html += '<span class="task-card-recurrence">' + recLabel + "</span>";
    }
    html += "</div>";
    var tagList = Array.isArray(task.Tag) ? task.Tag : [];
    if (cd.category && task.Category || cd.tags && tagList.length > 0) {
      html += '<div class="task-card-row task-card-taxonomy">';
      if (cd.category && task.Category) {
        var catObj = getCategories().find(function(c) {
          return c.name === task.Category;
        });
        var catColor = catObj ? catObj.color : "#6366f1";
        html += '<span class="task-card-category" style="color:' + catColor + ';">' + sanitize(task.Category) + "</span>";
      }
      if (cd.tags) {
        for (var ti = 0; ti < tagList.length; ti++) {
          var tagObj = getTags().find(function(tg) {
            return tg.name === tagList[ti];
          });
          var tagColor = tagObj ? tagObj.color : "#94a3b8";
          html += '<span class="task-card-tag" style="border-color:' + tagColor + "80;color:" + tagColor + ';">' + sanitize(tagList[ti]) + "</span>";
        }
      }
      html += "</div>";
    }
    if (cd.assignee && task.Assignee) {
      html += '<div class="task-card-row task-card-assignee-row">';
      var assigneeList = task.Assignee.split(",").map(function(a) {
        return a.trim();
      }).filter(Boolean);
      if (state.raciEnabled) {
        for (var ai = 0; ai < assigneeList.length; ai++) {
          html += '<span class="task-card-assignee raci-badge raci-r">R ' + sanitize(getUserDisplayName(assigneeList[ai])) + "</span>";
        }
        var raciRoles = [
          { arr: task.Accountable, cls: "raci-a", letter: "A" },
          { arr: task.Consulted, cls: "raci-c", letter: "C" },
          { arr: task.Informed, cls: "raci-i", letter: "I" }
        ];
        for (var ri = 0; ri < raciRoles.length; ri++) {
          if (raciRoles[ri].arr) {
            var rList = raciRoles[ri].arr.split(",").map(function(a) {
              return a.trim();
            }).filter(Boolean);
            for (var rj = 0; rj < rList.length; rj++) {
              html += '<span class="task-card-assignee raci-badge ' + raciRoles[ri].cls + '">' + raciRoles[ri].letter + " " + sanitize(getUserDisplayName(rList[rj])) + "</span>";
            }
          }
        }
      } else {
        for (var ai2 = 0; ai2 < assigneeList.length; ai2++) {
          html += '<span class="task-card-assignee">\u{1F464} ' + sanitize(getUserDisplayName(assigneeList[ai2])) + "</span>";
        }
      }
      html += "</div>";
    }
    if (task.Status === "done") {
      html += '<div class="task-card-row" style="justify-content:flex-end;"><button class="btn btn-sm" style="font-size:10px;padding:2px 8px;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:6px;cursor:pointer;" onclick="event.stopPropagation();archiveTask(' + task.id + ')" title="' + (currentLang === "fr" ? "Archiver" : "Archive") + '">\u{1F4E6} ' + (currentLang === "fr" ? "Archiver" : "Archive") + "</button></div>";
    }
    if (task.Status === "archived") {
      html += '<div class="task-card-row" style="justify-content:flex-end;"><button class="btn btn-sm" style="font-size:10px;padding:2px 8px;background:#dbeafe;border:1px solid #93c5fd;border-radius:6px;cursor:pointer;" onclick="event.stopPropagation();restoreTask(' + task.id + ')" title="' + (currentLang === "fr" ? "Restaurer" : "Restore") + '">\u267B\uFE0F ' + (currentLang === "fr" ? "Restaurer" : "Restore") + "</button></div>";
    }
    if (_isExpanded) {
      var _fr = currentLang === "fr";
      html += '<div class="task-card-detail" onclick="event.stopPropagation();">';
      if (task.Description) {
        html += '<div class="tcd-section"><div class="tcd-label">' + (_fr ? "Description" : "Description") + "</div>";
        html += '<div class="tcd-desc">' + sanitize(task.Description) + "</div></div>";
      }
      if (taskSubtasks.length > 0) {
        html += '<div class="tcd-section"><div class="tcd-label">' + (_fr ? "Sous-t\xE2ches" : "Subtasks") + " (" + completedCount + "/" + taskSubtasks.length + ")</div>";
        taskSubtasks.forEach(function(st) {
          html += '<label class="tcd-subtask"><input type="checkbox" ' + (st.Completed ? "checked" : "") + ' onclick="event.stopPropagation();toggleSubtaskFromCard(' + st.id + ', this.checked)">';
          html += "<span" + (st.Completed ? ' style="text-decoration:line-through;color:#94a3b8;"' : "") + ">" + sanitize(st.Title) + "</span>";
          if (st.Due_Date) html += '<span class="tcd-st-date">\u{1F4C5} ' + formatDate(st.Due_Date) + "</span>";
          html += "</label>";
        });
        html += "</div>";
      }
      if (taskComments.length > 0) {
        html += '<div class="tcd-section"><div class="tcd-label">' + (_fr ? "Commentaires" : "Comments") + " (" + taskComments.length + ")</div>";
        taskComments.slice(-5).forEach(function(cmt) {
          html += '<div class="tcd-comment"><span class="tcd-c-author">\u{1F464} ' + sanitize(cmt.Author || "?") + "</span> ";
          html += '<span class="tcd-c-time">' + formatTimeAgo(cmt.Created_At) + "</span>";
          html += '<div class="tcd-c-content">' + sanitize(cmt.Content) + "</div></div>";
        });
        html += "</div>";
      }
      if (!task.Description && taskSubtasks.length === 0 && taskComments.length === 0) {
        html += '<div style="color:#94a3b8;font-size:12px;padding:4px 0;">' + (_fr ? "Aucun d\xE9tail pour le moment" : "No details yet") + "</div>";
      }
      html += '<div class="tcd-actions">';
      html += '<button class="btn btn-sm" onclick="event.stopPropagation();openEditTaskModal(' + task.id + ')">\u270F\uFE0F ' + (_fr ? "\xC9diter la t\xE2che" : "Edit task") + "</button>";
      if (state.isOwner) html += '<button class="btn btn-sm tcd-delete-btn" onclick="event.stopPropagation();deleteTask(' + task.id + ')">\u{1F5D1}\uFE0F ' + t("delete") + "</button>";
      html += "</div>";
      html += "</div>";
    }
    html += "</div></div>";
    return html;
  }
  async function archiveTask(taskId) {
    try {
      var statusCol = getColumnName("tasks", "status");
      var task = state.tasks.find(function(t2) {
        return t2.id === taskId;
      });
      var oldStatus = task ? task.Status : "";
      await grist.docApi.applyUserActions([["UpdateRecord", state.TASKS_TABLE, taskId, { [statusCol]: "archived" }]]);
      if (task) task.Status = "archived";
      showToast(currentLang === "fr" ? "T\xE2che archiv\xE9e" : "Task archived", "success");
      if (task && oldStatus !== "archived") {
        await evaluateAutomationRules(Object.assign({}, task, { Status: "archived" }), { status: { from: oldStatus, to: "archived" } });
      }
      refreshAllViews();
    } catch (e) {
      showToast("Error: " + e.message, "error");
    }
  }
  async function restoreTask(taskId) {
    try {
      var statusCol = getColumnName("tasks", "status");
      var task = state.tasks.find(function(t2) {
        return t2.id === taskId;
      });
      var oldStatus = task ? task.Status : "";
      await grist.docApi.applyUserActions([["UpdateRecord", state.TASKS_TABLE, taskId, { [statusCol]: "todo" }]]);
      if (task) task.Status = "todo";
      showToast(currentLang === "fr" ? "T\xE2che restaur\xE9e" : "Task restored", "success");
      if (task && oldStatus !== "todo") {
        await evaluateAutomationRules(Object.assign({}, task, { Status: "todo" }), { status: { from: oldStatus, to: "todo" } });
      }
      refreshAllViews();
    } catch (e) {
      showToast("Error: " + e.message, "error");
    }
  }
  var draggedTaskId = null;
  var _kanbanScrollInterval = null;
  function onDragStart(e, taskId) {
    draggedTaskId = taskId;
    e.target.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    var board = document.getElementById("kanban-board");
    if (board) {
      document.addEventListener("dragover", function _autoScroll(ev) {
        var rect = board.getBoundingClientRect();
        var edge = 60;
        var speed = 8;
        if (ev.clientX > rect.right - edge) board.scrollLeft += speed;
        else if (ev.clientX < rect.left + edge) board.scrollLeft -= speed;
        if (!draggedTaskId) document.removeEventListener("dragover", _autoScroll);
      });
    }
  }
  function onDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  }
  function onDragLeave(e) {
    e.currentTarget.classList.remove("drag-over");
  }
  async function onDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
    var field = e.currentTarget.getAttribute("data-field") || "Status";
    var newValue = e.currentTarget.getAttribute("data-value");
    if (draggedTaskId && newValue) {
      try {
        var draggedTask = state.tasks.find(function(t2) {
          return t2.id === draggedTaskId;
        });
        var oldVal = draggedTask ? draggedTask[field] : "";
        var record = {};
        if (field === "Project_Id") {
          record[field] = newValue ? parseInt(newValue) : null;
        } else {
          record[field] = newValue;
        }
        await grist.docApi.applyUserActions([["UpdateRecord", state.TASKS_TABLE, draggedTaskId, record]]);
        for (var i = 0; i < state.tasks.length; i++) {
          if (state.tasks[i].id === draggedTaskId) {
            state.tasks[i][field] = record[field];
            break;
          }
        }
        showToast(t("taskMoved"), "success");
        if (draggedTask && oldVal !== newValue) {
          var dropChanges = {};
          if (field === "Status") dropChanges.status = { from: oldVal, to: newValue };
          if (field === "Priority") dropChanges.priority = { from: oldVal, to: newValue };
          if (Object.keys(dropChanges).length > 0) {
            await evaluateAutomationRules(Object.assign({}, draggedTask, record), dropChanges);
          }
          if (field === "Status" && newValue === "done" && oldVal !== "done") {
            await notifyTaskCompleted(Object.assign({}, draggedTask, record));
          }
        }
        refreshAllViews();
      } catch (err) {
        console.error("Error moving task:", err);
      }
    }
    draggedTaskId = null;
  }
  function toggleKanbanFullscreen() {
    var el = document.getElementById("tab-kanban");
    var btn = document.getElementById("kanban-fullscreen-btn");
    if (!el) return;
    var on = el.classList.toggle("kanban-fullscreen");
    if (btn) {
      var label = on ? currentLang === "fr" ? "Quitter le plein \xE9cran" : "Exit fullscreen" : currentLang === "fr" ? "Afficher le Kanban en plein \xE9cran" : "Show Kanban fullscreen";
      btn.title = label;
      btn.setAttribute("aria-label", label);
      btn.textContent = on ? "\u2199" : "\u26F6";
    }
  }

  // src/domains/settings.js
  async function saveCardDisplaySettings() {
    await saveSetting("card_display", JSON.stringify(cardDisplaySettings));
  }
  async function saveSetting(key, value) {
    try {
      if (state._settingsCache[key]) {
        await grist.docApi.applyUserActions([["UpdateRecord", state.SETTINGS_TABLE, state._settingsCache[key].id, { Value: value }]]);
        state._settingsCache[key].value = value;
      } else {
        var result = await grist.docApi.applyUserActions([["AddRecord", state.SETTINGS_TABLE, null, { Key: key, Value: value }]]);
        var newId = result && result.retValues && result.retValues[0] || result;
        state._settingsCache[key] = { id: newId, value };
      }
    } catch (e) {
      console.error("[GristPM] Error saving setting:", e);
    }
  }
  function uiLabel(key) {
    return state.uiLabels[key] || defaultUiLabels[key] || key;
  }
  async function saveUiLabels() {
    await saveSetting("ui_labels", JSON.stringify(state.uiLabels));
  }
  function renderSettingsView() {
    renderSettingsProjectsList();
    renderCategoriesList();
    renderTagsList();
    renderCardDisplaySettings();
    renderKanbanStatusesList();
    renderRaciToggle();
    renderAutomationsSection();
    renderNotifyConcernedToggle();
    renderSecuritySection();
    renderUiLabelSettings();
    applyUiLabelsToSettingsHeadings();
  }
  function renderUiLabelSettings() {
    var container = document.getElementById("ui-label-settings");
    if (!container) return;
    var keys = ["projects", "categories", "tags", "statuses", "cardDisplay", "raci", "automations", "notifications", "security", "mapping"];
    var html = '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;">';
    keys.forEach(function(key) {
      html += '<label style="display:flex;flex-direction:column;gap:4px;font-size:12px;font-weight:700;color:#271A79;">';
      html += "<span>" + sanitize(defaultUiLabels[key]) + "</span>";
      html += '<input type="text" data-ui-label-key="' + key + '" value="' + sanitize(uiLabel(key)) + '" style="padding:7px 9px;border:1px solid #cbd5e1;border-radius:8px;font-size:13px;">';
      html += "</label>";
    });
    html += '</div><button class="btn btn-primary btn-sm" style="margin-top:12px;" onclick="saveUiLabelSettings()">\u{1F4BE} Enregistrer les titres</button>';
    container.innerHTML = html;
  }
  async function saveUiLabelSettings() {
    var inputs = document.querySelectorAll("#ui-label-settings [data-ui-label-key]");
    inputs.forEach(function(inp) {
      var key = inp.getAttribute("data-ui-label-key");
      state.uiLabels[key] = (inp.value || defaultUiLabels[key] || key).trim();
    });
    await saveUiLabels();
    applyUiLabelsToSettingsHeadings();
    renderCardDisplaySettings();
    showToast("Titres enregistr\xE9s", "success");
  }
  function applyUiLabelsToSettingsHeadings() {
    var map = {
      "settings-title-projects": "projects",
      "settings-title-categories": "categories",
      "settings-title-tags": "tags",
      "settings-title-statuses": "statuses",
      "settings-title-card-display": "cardDisplay",
      "settings-title-raci": "raci",
      "settings-title-automations": "automations",
      "settings-title-notifications": "notifications",
      "settings-title-security": "security",
      "settings-title-mapping": "mapping"
    };
    Object.keys(map).forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.textContent = uiLabel(map[id]);
    });
  }
  function renderCardDisplaySettings() {
    var container = document.getElementById("card-display-settings");
    if (!container) return;
    var fields = [
      { key: "priority", label: currentLang === "fr" ? "Priorit\xE9" : "Priority" },
      { key: "description", label: currentLang === "fr" ? "Description" : "Description" },
      { key: "date", label: currentLang === "fr" ? "Date d'\xE9ch\xE9ance" : "Due date" },
      { key: "assignee", label: currentLang === "fr" ? "Assign\xE9 \xE0" : "Assignee" },
      { key: "tags", label: uiLabel("tags") },
      { key: "category", label: uiLabel("categories") },
      { key: "time", label: currentLang === "fr" ? "Temps pass\xE9" : "Time spent" },
      { key: "subtasks", label: currentLang === "fr" ? "Sous-t\xE2ches" : "Subtasks" },
      { key: "comments", label: currentLang === "fr" ? "Commentaires" : "Comments" }
    ];
    var html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">';
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      var checked = cardDisplaySettings[f.key] !== false;
      html += '<label style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:8px;cursor:pointer;background:' + (checked ? "#f0fdf4" : "#f8fafc") + ";border:1px solid " + (checked ? "#bbf7d0" : "#e2e8f0") + ';font-size:12px;font-weight:500;">';
      html += '<input type="checkbox" ' + (checked ? "checked" : "") + ` onchange="toggleCardDisplay('` + f.key + `', this.checked)" style="accent-color:#22c55e;">`;
      html += f.label + "</label>";
    }
    html += "</div>";
    container.innerHTML = html;
  }
  async function toggleCardDisplay(key, value) {
    cardDisplaySettings[key] = value;
    await saveCardDisplaySettings();
    renderCardDisplaySettings();
    renderKanbanView();
  }
  function renderRaciToggle() {
    var container = document.getElementById("raci-toggle-container");
    if (!container) return;
    var html = '<div style="display:flex;align-items:center;justify-content:space-between;padding:4px 0;">';
    html += "<div>";
    html += '<span style="font-size:13px;font-weight:600;">' + t(state.raciEnabled ? "raciEnabled" : "raciDisabled") + "</span>";
    html += '<p style="font-size:12px;color:#94a3b8;margin:2px 0 0;">' + (currentLang === "fr" ? "Responsable \xB7 Approbateur \xB7 Consult\xE9 \xB7 Inform\xE9" : "Responsible \xB7 Accountable \xB7 Consulted \xB7 Informed") + "</p>";
    html += "</div>";
    html += '<label class="toggle-switch">';
    html += '<input type="checkbox" ' + (state.raciEnabled ? "checked" : "") + ' onchange="toggleRaci(this.checked)">';
    html += '<span class="toggle-slider"></span>';
    html += "</label>";
    html += "</div>";
    container.innerHTML = html;
  }
  async function toggleRaci(enabled) {
    state.raciEnabled = enabled;
    await saveSetting("raci_enabled", enabled ? "true" : "false");
    renderRaciToggle();
    showToast(t(enabled ? "raciEnabled" : "raciDisabled"), "success");
  }
  function renderNotifyConcernedToggle() {
    var container = document.getElementById("notify-concerned-toggle");
    if (!container) return;
    var L = currentLang === "fr";
    var html = '<div style="display:flex;align-items:center;justify-content:space-between;padding:4px 0;">';
    html += '<div><span style="font-size:13px;font-weight:600;">' + (L ? "Notifier les utilisateurs concern\xE9s" : "Notify concerned users") + "</span>";
    html += '<p style="font-size:12px;color:#94a3b8;margin:2px 0 0;">' + (L ? "\xC0 la cr\xE9ation et \xE0 la modification d'une t\xE2che (R/A/C/I), une notification est cr\xE9\xE9e pour chaque personne concern\xE9e." : "On task creation and update, a notification is created for each concerned person (R/A/C/I).") + "</p></div>";
    html += '<label class="toggle-switch"><input type="checkbox" ' + (state.notifyConcernedEnabled ? "checked" : "") + ' onchange="toggleNotifyConcerned(this.checked)"><span class="toggle-slider"></span></label>';
    html += "</div>";
    container.innerHTML = html;
  }
  async function toggleNotifyConcerned(enabled) {
    state.notifyConcernedEnabled = enabled;
    await saveSetting("notify_concerned", enabled ? "true" : "false");
    renderNotifyConcernedToggle();
    showToast(currentLang === "fr" ? enabled ? "Notifications activ\xE9es" : "Notifications d\xE9sactiv\xE9es" : enabled ? "Notifications enabled" : "Notifications disabled", "success");
  }
  var TRIGGER_LABELS = {
    status_change: "triggerStatusChange",
    priority_change: "triggerPriorityChange",
    assignment_change: "triggerAssignmentChange",
    overdue: "triggerOverdue",
    approaching_deadline: "triggerApproachingDeadline"
  };
  var ACTION_LABELS = {
    notify_assignee: "actionNotifyAssignee",
    notify_project_lead: "actionNotifyProjectLead",
    notify_specific: "actionNotifySpecific",
    notify_all: "actionNotifyAll"
  };
  function renderAutomationsSection() {
    var container = document.getElementById("automation-rules-list");
    if (!container) return;
    if (!state.isOwner) {
      container.innerHTML = '<div style="text-align:center;color:#94a3b8;padding:12px;font-size:13px;">' + (currentLang === "fr" ? "Seuls les owners peuvent g\xE9rer les automatisations" : "Only owners can manage automations") + "</div>";
      return;
    }
    if (!state.automationRules || state.automationRules.length === 0) {
      container.innerHTML = '<div style="text-align:center;color:#94a3b8;padding:20px;font-size:13px;"><p>' + t("noRules") + '</p><button class="btn btn-secondary btn-sm" onclick="addDefaultAutomationRules()" style="margin-top:8px;">' + t("defaultRules") + "</button></div>";
      return;
    }
    var html = "";
    for (var i = 0; i < state.automationRules.length; i++) {
      var rule = state.automationRules[i];
      var trigLabel = t(TRIGGER_LABELS[rule.trigger] || rule.trigger);
      var actLabel = t(ACTION_LABELS[rule.action] || rule.action);
      var condText = "";
      if (rule.condition) {
        if (rule.condition.from) condText += t("conditionFrom") + ": " + rule.condition.from + " ";
        if (rule.condition.to) condText += t("conditionTo") + ": " + rule.condition.to;
      }
      html += '<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:white;border-radius:8px;margin-bottom:6px;border:1px solid #e2e8f0;">';
      html += '<div style="flex:1;">';
      html += '<div style="font-size:13px;font-weight:600;">\u26A1 ' + trigLabel;
      if (condText) html += ' <span style="font-size:11px;color:#64748b;font-weight:400;">(' + condText.trim() + ")</span>";
      html += "</div>";
      html += '<div style="font-size:11px;color:#64748b;">\u2192 ' + actLabel;
      if (rule.action_target) html += " (" + sanitize(rule.action_target) + ")";
      html += "</div>";
      html += "</div>";
      html += '<label class="toggle-switch">';
      html += '<input type="checkbox" ' + (rule.enabled ? "checked" : "") + ' onchange="toggleAutomationRule(' + i + ', this.checked)">';
      html += '<span class="toggle-slider"></span></label>';
      html += '<button class="btn-icon" onclick="openEditAutomationRuleModal(' + i + ')">\u270F\uFE0F</button>';
      html += '<button class="btn-icon" onclick="deleteAutomationRule(' + i + ')">\u{1F5D1}\uFE0F</button>';
      html += "</div>";
    }
    container.innerHTML = html;
  }
  var _editingRuleIndex = null;
  function openAddAutomationRuleModal() {
    _editingRuleIndex = null;
    document.getElementById("automation-modal-title").textContent = "\u26A1 " + t("addRule");
    document.getElementById("auto-trigger").value = "status_change";
    document.getElementById("auto-action").value = "notify_assignee";
    document.getElementById("auto-target").value = "";
    document.getElementById("auto-msg-fr").value = "";
    document.getElementById("auto-msg-en").value = "";
    onAutoTriggerChange();
    onAutoActionChange();
    document.getElementById("automation-modal").style.display = "flex";
  }
  function openEditAutomationRuleModal(index) {
    _editingRuleIndex = index;
    var rule = state.automationRules[index];
    document.getElementById("automation-modal-title").textContent = "\u26A1 " + t("addRule");
    document.getElementById("auto-trigger").value = rule.trigger;
    document.getElementById("auto-action").value = rule.action;
    document.getElementById("auto-target").value = rule.action_target || "";
    document.getElementById("auto-msg-fr").value = rule.message_fr || "";
    document.getElementById("auto-msg-en").value = rule.message_en || "";
    onAutoTriggerChange();
    onAutoActionChange();
    if (rule.condition) {
      if (rule.condition.from) document.getElementById("auto-from").value = rule.condition.from;
      if (rule.condition.to) document.getElementById("auto-to").value = rule.condition.to;
    }
    document.getElementById("automation-modal").style.display = "flex";
  }
  function closeAutomationModal() {
    document.getElementById("automation-modal").style.display = "none";
  }
  function onAutoTriggerChange() {
    var trigger = document.getElementById("auto-trigger").value;
    var condDiv = document.getElementById("auto-conditions");
    if (trigger === "overdue" || trigger === "approaching_deadline" || trigger === "assignment_change") {
      condDiv.style.display = "none";
    } else {
      condDiv.style.display = "flex";
      var fromSel = document.getElementById("auto-from");
      var toSel = document.getElementById("auto-to");
      var anyLabel = t("conditionAny");
      var options = [];
      if (trigger === "status_change") {
        var statuses = getKanbanStatuses();
        options = statuses.map(function(s) {
          return { value: s.key, label: currentLang === "fr" ? s.label_fr : s.label_en };
        });
      } else if (trigger === "priority_change") {
        options = [
          { value: "high", label: currentLang === "fr" ? "Haute" : "High" },
          { value: "medium", label: currentLang === "fr" ? "Moyenne" : "Medium" },
          { value: "low", label: currentLang === "fr" ? "Basse" : "Low" }
        ];
      }
      var optHtml = '<option value="">' + anyLabel + "</option>";
      for (var o = 0; o < options.length; o++) {
        optHtml += '<option value="' + options[o].value + '">' + options[o].label + "</option>";
      }
      fromSel.innerHTML = optHtml;
      toSel.innerHTML = optHtml;
    }
  }
  function onAutoActionChange() {
    var action = document.getElementById("auto-action").value;
    document.getElementById("auto-target-wrap").style.display = action === "notify_specific" ? "block" : "none";
  }
  async function saveAutomationRuleFromModal() {
    var rule = {
      id: _editingRuleIndex !== null && state.automationRules[_editingRuleIndex] ? state.automationRules[_editingRuleIndex].id : "rule_" + Date.now(),
      enabled: _editingRuleIndex !== null && state.automationRules[_editingRuleIndex] ? state.automationRules[_editingRuleIndex].enabled : true,
      trigger: document.getElementById("auto-trigger").value,
      condition: {},
      action: document.getElementById("auto-action").value,
      action_target: document.getElementById("auto-target").value.trim(),
      message_fr: document.getElementById("auto-msg-fr").value.trim(),
      message_en: document.getElementById("auto-msg-en").value.trim()
    };
    var fromVal = document.getElementById("auto-from").value;
    var toVal = document.getElementById("auto-to").value;
    if (fromVal) rule.condition.from = fromVal;
    if (toVal) rule.condition.to = toVal;
    if (!rule.message_fr && !rule.message_en) {
      rule.message_fr = 'La t\xE2che "{title}" a chang\xE9';
      rule.message_en = 'Task "{title}" changed';
    }
    if (_editingRuleIndex !== null) {
      state.automationRules[_editingRuleIndex] = rule;
    } else {
      state.automationRules.push(rule);
    }
    await saveSetting("automation_rules", JSON.stringify(state.automationRules));
    closeAutomationModal();
    renderAutomationsSection();
    showToast(t(_editingRuleIndex !== null ? "ruleSaved" : "ruleCreated"), "success");
  }
  async function deleteAutomationRule(index) {
    var confirmed = await showConfirmModal(
      currentLang === "fr" ? "Supprimer cette r\xE8gle d\u2019automatisation ?" : "Delete this automation rule?",
      currentLang === "fr" ? "Supprimer la r\xE8gle" : "Delete rule"
    );
    if (!confirmed) return;
    state.automationRules.splice(index, 1);
    await saveSetting("automation_rules", JSON.stringify(state.automationRules));
    renderAutomationsSection();
    showToast(t("ruleDeleted"), "info");
  }
  async function toggleAutomationRule(index, enabled) {
    state.automationRules[index].enabled = enabled;
    await saveSetting("automation_rules", JSON.stringify(state.automationRules));
    renderAutomationsSection();
  }
  async function addDefaultAutomationRules() {
    state.automationRules = [
      {
        id: "rule_default_1",
        enabled: true,
        trigger: "status_change",
        condition: { to: "done" },
        action: "notify_assignee",
        message_fr: 'La t\xE2che "{title}" est termin\xE9e',
        message_en: 'Task "{title}" is completed'
      },
      {
        id: "rule_default_2",
        enabled: true,
        trigger: "priority_change",
        condition: { to: "high" },
        action: "notify_project_lead",
        message_fr: 'La t\xE2che "{title}" est pass\xE9e en priorit\xE9 haute',
        message_en: 'Task "{title}" priority changed to high'
      },
      {
        id: "rule_default_3",
        enabled: true,
        trigger: "overdue",
        condition: {},
        action: "notify_assignee",
        message_fr: 'La t\xE2che "{title}" est en retard !',
        message_en: 'Task "{title}" is overdue!'
      }
    ];
    await saveSetting("automation_rules", JSON.stringify(state.automationRules));
    renderAutomationsSection();
    showToast(t("ruleCreated"), "success");
  }
  async function renderSecuritySection() {
    var container = document.getElementById("security-status");
    if (!container) return;
    if (!state.isOwner) {
      container.innerHTML = '<div style="text-align:center;color:#94a3b8;padding:12px;font-size:13px;">' + (currentLang === "fr" ? "Seuls les owners peuvent g\xE9rer la s\xE9curit\xE9" : "Only owners can manage security") + "</div>";
      return;
    }
    container.innerHTML = '<div style="text-align:center;padding:12px;color:#94a3b8;">' + (currentLang === "fr" ? "V\xE9rification..." : "Checking...") + "</div>";
    var results = await checkSecurityStatus();
    if (!results) {
      container.innerHTML = '<div class="security-error">' + (currentLang === "fr" ? "Impossible de lire les r\xE8gles d'acc\xE8s" : "Cannot read access rules") + "</div>";
      return;
    }
    if (results.length === 0) {
      container.innerHTML = '<div style="text-align:center;color:#94a3b8;padding:12px;font-size:13px;">' + (currentLang === "fr" ? "Aucune table du widget d\xE9tect\xE9e" : "No widget tables detected") + "</div>";
      return;
    }
    var securedCount = results.filter(function(r2) {
      return r2.secured;
    }).length;
    var totalCount = results.length;
    var allSecured = securedCount === totalCount;
    var html = '<div class="security-summary ' + (allSecured ? "security-ok" : "security-warn") + '">';
    html += '<span class="security-icon">' + (allSecured ? "\u{1F512}" : "\u{1F513}") + "</span>";
    html += "<span>" + (allSecured ? currentLang === "fr" ? "Document s\xE9curis\xE9" : "Document secured" : currentLang === "fr" ? securedCount + "/" + totalCount + " tables prot\xE9g\xE9es" : securedCount + "/" + totalCount + " tables protected") + "</span>";
    html += "</div>";
    html += '<div class="security-table-list">';
    for (var i = 0; i < results.length; i++) {
      var r = results[i];
      var readOnly = r.editorPerms.indexOf("-CUD") !== -1 || r.editorPerms.indexOf("-C") !== -1 && r.editorPerms.indexOf("-D") !== -1;
      var permLabel = readOnly ? currentLang === "fr" ? "Lecture seule" : "Read only" : currentLang === "fr" ? "Cr\xE9er / Modifier" : "Create / Edit";
      html += '<div class="security-table-row">';
      html += '<span class="security-table-icon">' + (r.secured ? "\u2705" : "\u26A0\uFE0F") + "</span>";
      html += '<span class="security-table-name">' + sanitize(r.tableId) + "</span>";
      html += '<span class="security-table-perm ' + (readOnly ? "perm-readonly" : "perm-readwrite") + '">' + permLabel + "</span>";
      html += '<span class="security-table-status ' + (r.secured ? "status-ok" : "status-warn") + '">' + (r.secured ? currentLang === "fr" ? "Prot\xE9g\xE9e" : "Protected" : currentLang === "fr" ? "Non prot\xE9g\xE9e" : "Unprotected") + "</span>";
      html += "</div>";
    }
    html += "</div>";
    html += '<div class="security-actions">';
    if (!allSecured) {
      html += '<button class="btn btn-primary btn-sm" onclick="applySecurityRules()">' + (currentLang === "fr" ? "\u{1F512} S\xE9curiser le document" : "\u{1F512} Secure document") + "</button>";
    }
    if (securedCount > 0) {
      html += '<button class="btn btn-secondary btn-sm" onclick="removeSecurityRules()" style="color:#ef4444;">' + (currentLang === "fr" ? "Retirer la s\xE9curit\xE9" : "Remove security") + "</button>";
    }
    html += "</div>";
    container.innerHTML = html;
  }
  var _settingsProjectSearch = "";
  var SETTINGS_PROJ_LIMIT = 5;
  function renderSettingsProjectsList(searchOverride) {
    var container = document.getElementById("projects-list");
    if (!container) return;
    if (searchOverride !== void 0) _settingsProjectSearch = searchOverride;
    var q = (_settingsProjectSearch || "").trim().toLowerCase();
    var filtered = q ? state.projects.filter(function(p) {
      return (p.Name || "").toLowerCase().indexOf(q) !== -1;
    }) : state.projects;
    var displayed = q ? filtered : filtered.slice(0, SETTINGS_PROJ_LIMIT);
    var extraCount = q ? 0 : Math.max(0, filtered.length - SETTINGS_PROJ_LIMIT);
    var html = '<div style="margin-bottom:10px;">';
    html += '<input type="text" id="settings-proj-search" class="settings-search-input"';
    html += ' placeholder="' + (currentLang === "fr" ? "Rechercher un projet..." : "Search a project...") + '"';
    html += ' value="' + sanitize(_settingsProjectSearch) + '" oninput="renderSettingsProjectsList(this.value)"';
    html += ' autocomplete="off">';
    html += "</div>";
    if (displayed.length === 0) {
      html += '<div style="text-align:center;color:#94a3b8;padding:20px;">' + t("noProject") + "</div>";
    } else {
      html += '<div class="settings-items">';
      var allTasks = state.tasks;
      displayed.forEach(function(proj) {
        var taskCount = allTasks.filter(function(tk) {
          return tk.Project_Id === proj.id;
        }).length;
        var dotColor = proj.Color || "#6366f1";
        html += '<div class="settings-item">';
        html += '<span class="settings-item-dot" style="background:' + dotColor + ';"></span>';
        html += '<div class="settings-item-info">';
        html += "<strong>" + sanitize(proj.Name) + "</strong>";
        html += '<span class="settings-item-meta">' + taskCount + " " + (currentLang === "fr" ? "t\xE2ches" : "tasks") + "</span>";
        html += "</div>";
        html += '<div class="settings-item-actions">';
        html += '<button class="btn-icon" onclick="openProjectModalForEdit(' + proj.id + ')" title="' + t("editProject") + '">\u270F\uFE0F</button>';
        if (state.isOwner) html += '<button class="btn-icon" onclick="deleteProject(' + proj.id + ')" title="' + t("deleteProject") + '">\u{1F5D1}\uFE0F</button>';
        html += "</div>";
        html += "</div>";
      });
      if (extraCount > 0) {
        html += '<div class="settings-more-hint">+ ' + extraCount + " " + (currentLang === "fr" ? "autres \u2014 tapez pour chercher" : "more \u2014 type to search") + "</div>";
      }
      html += "</div>";
    }
    container.innerHTML = html;
    var inp = document.getElementById("settings-proj-search");
    if (inp && searchOverride !== void 0) {
      var l = inp.value.length;
      inp.setSelectionRange(l, l);
      inp.focus();
    }
  }
  function openProjectModalForEdit(projectId) {
    var proj = state.projects.find(function(p) {
      return p.id === projectId;
    });
    if (!proj) return;
    var statusOptions = ["active", "archived", "completed"];
    var statusLabels = { active: currentLang === "fr" ? "Actif" : "Active", archived: currentLang === "fr" ? "Archiv\xE9" : "Archived", completed: currentLang === "fr" ? "Termin\xE9" : "Completed" };
    var html = '<div class="modal-overlay" onclick="closeModal(event)">';
    html += '<div class="modal" style="max-width:420px;" onclick="event.stopPropagation()">';
    html += '<div class="modal-header"><h3>\u270F\uFE0F ' + (currentLang === "fr" ? "Modifier le projet" : "Edit project") + "</h3>";
    html += '<button class="modal-close" onclick="closeModalForce()">\u2715</button></div>';
    html += '<div class="modal-body">';
    html += '<div class="form-group"><label>' + (currentLang === "fr" ? "Nom" : "Name") + "</label>";
    html += '<input type="text" id="inline-proj-name" class="form-input" value="' + sanitize(proj.Name || "") + '"></div>';
    html += '<div class="form-group"><label>' + (currentLang === "fr" ? "Description" : "Description") + "</label>";
    html += '<textarea id="inline-proj-desc" class="form-input" rows="2">' + sanitize(proj.Description || "") + "</textarea></div>";
    html += '<div style="display:flex;gap:12px;">';
    html += '<div class="form-group" style="flex:1"><label>' + (currentLang === "fr" ? "Couleur" : "Color") + "</label>";
    html += '<input type="color" id="inline-proj-color" value="' + (proj.Color || "#6366f1") + '" style="width:48px;height:36px;border:none;cursor:pointer;"></div>';
    html += '<div class="form-group" style="flex:2"><label>' + (currentLang === "fr" ? "Statut" : "Status") + "</label>";
    html += '<select id="inline-proj-status" class="form-input">';
    statusOptions.forEach(function(s) {
      html += '<option value="' + s + '"' + (proj.Status === s ? " selected" : "") + ">" + (statusLabels[s] || s) + "</option>";
    });
    html += "</select></div></div>";
    html += "</div>";
    html += '<div class="modal-footer">';
    html += '<button class="btn btn-secondary" onclick="closeModalForce()">' + (currentLang === "fr" ? "Annuler" : "Cancel") + "</button>";
    html += '<button class="btn btn-primary" onclick="saveInlineProjectEdit(' + projectId + ')">' + (currentLang === "fr" ? "\u{1F4BE} Enregistrer" : "\u{1F4BE} Save") + "</button>";
    html += "</div></div></div>";
    document.getElementById("modal-container").innerHTML = html;
    document.getElementById("inline-proj-name").focus();
  }
  async function saveInlineProjectEdit(projectId) {
    var name = (document.getElementById("inline-proj-name").value || "").trim();
    if (!name) {
      showToast(currentLang === "fr" ? "Le nom est requis" : "Name is required", "error");
      return;
    }
    var record = {};
    setField(record, "projects", "name", name);
    setField(record, "projects", "description", document.getElementById("inline-proj-desc").value || "");
    setField(record, "projects", "color", document.getElementById("inline-proj-color").value || "#6366f1");
    setField(record, "projects", "status", document.getElementById("inline-proj-status").value || "active");
    try {
      await grist.docApi.applyUserActions([["UpdateRecord", state.PROJECTS_TABLE, projectId, record]]);
      showToast((currentLang === "fr" ? "Projet modifi\xE9" : "Project updated") + " \u2713", "success");
      closeModalForce();
      await loadAllData();
      renderSettingsProjectsList();
      renderProjectSelector();
      refreshAllViews();
    } catch (e) {
      showToast("Error: " + e.message, "error");
    }
  }

  // src/domains/permissions.js
  function getUserRoles(u) {
    if (!u || !u.Role) return [];
    var raw = u.Role;
    if (Array.isArray(raw)) {
      var arr = raw.length > 0 && raw[0] === "L" ? raw.slice(1) : raw;
      return arr.filter(function(r) {
        return r && r !== "L";
      });
    }
    var s = String(raw).trim();
    if (!s) return [];
    if (s.length > 1 && s[0] === "L" && s[1] === ",") {
      return s.slice(2).split(",").map(function(r) {
        return r.trim();
      }).filter(Boolean);
    }
    return [s];
  }
  function userMatchesRole(u, role) {
    return getUserRoles(u).indexOf(role) !== -1;
  }
  function userRoleDisplay(u) {
    var roles = getUserRoles(u);
    return roles.length ? roles.join(", ") : "";
  }
  function getCurrentUserRecord() {
    var em = (state.currentUserEmail || "").toLowerCase().trim();
    if (!em) return null;
    return state.users.find(function(u) {
      return (u.Email || "").toLowerCase().trim() === em;
    }) || null;
  }
  function getCurrentBusinessRoles() {
    var u = getCurrentUserRecord();
    return u ? getUserRoles(u) : [];
  }
  function hasCurrentBusinessRole(role) {
    return getCurrentBusinessRoles().indexOf(role) !== -1;
  }
  function canSeeAllProjects() {
    var roles = getCurrentBusinessRoles();
    if (roles.length > 0) return roles.indexOf("admin") !== -1;
    return state.isOwner;
  }
  function shouldLimitToMyProjects() {
    if (canSeeAllProjects()) return false;
    var roles = getCurrentBusinessRoles();
    return roles.indexOf("member") !== -1 || roles.indexOf("viewer") !== -1;
  }
  function canEditWorkItems() {
    return (state.isOwner || state.isEditor) && !hasCurrentBusinessRole("viewer");
  }
  function taskConcernsCurrentUser(task) {
    var mine = myAssigneeValue();
    var em = (state.currentUserEmail || "").toLowerCase().trim();
    if (!task) return false;
    if (mine) {
      var assignees = (task.Assignee || "").split(",").map(function(s) {
        return s.trim();
      }).filter(Boolean);
      if (assignees.indexOf(mine) !== -1) return true;
    }
    if (em && (task.Created_By || "").toLowerCase().trim() === em) return true;
    return false;
  }
  function applyRoleVisibilityDefaults() {
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
  function applyBusinessRoleRestrictions() {
    var canEdit = canEditWorkItems();
    document.querySelectorAll(".btn-new-task, .btn-new-project, .kanban-add-btn, .col-add").forEach(function(el) {
      el.style.display = canEdit ? "" : "none";
    });
  }
  var WIDGET_ID = "grist-project-manager";
  var WIDGET_NAME = "Gestion de Projet";
  var WIDGET_TABS = [
    { id: "kanban", label_fr: "Kanban", label_en: "Kanban" },
    { id: "gantt", label_fr: "Gantt", label_en: "Gantt" },
    { id: "team", label_fr: "\xC9quipe", label_en: "Team" },
    { id: "settings", label_fr: "Param\xE8tres", label_en: "Settings" }
  ];
  var userAllowedTabs = [];
  async function registerWidget() {
    try {
      var tables = await grist.docApi.listTables();
      if (tables.indexOf("Widget_Registry") === -1) return;
      var data = await grist.docApi.fetchTable("Widget_Registry");
      var existingRow = -1;
      if (data && data.id) {
        for (var i = 0; i < data.id.length; i++) {
          if (data.WidgetId[i] === WIDGET_ID) {
            existingRow = data.id[i];
            break;
          }
        }
      }
      var tabsJson = JSON.stringify(WIDGET_TABS);
      if (existingRow !== -1) {
        await grist.docApi.applyUserActions([
          ["UpdateRecord", "Widget_Registry", existingRow, { WidgetName: WIDGET_NAME, AvailableTabs: tabsJson }]
        ]);
      } else {
        await grist.docApi.applyUserActions([
          ["AddRecord", "Widget_Registry", null, { WidgetId: WIDGET_ID, WidgetName: WIDGET_NAME, AvailableTabs: tabsJson }]
        ]);
      }
    } catch (e) {
      console.log("Widget registration skipped:", e.message);
    }
  }
  async function loadWidgetPermissions() {
    userAllowedTabs = [];
    if (!state.currentUserEmail) return;
    try {
      var tables = await grist.docApi.listTables();
      if (tables.indexOf("Widget_Permissions") === -1) return;
      var data = await grist.docApi.fetchTable("Widget_Permissions");
      if (!data || !data.id) return;
      var email = state.currentUserEmail.toLowerCase().trim();
      for (var i = 0; i < data.id.length; i++) {
        if (data.WidgetId[i] === WIDGET_ID && (data.Email[i] || "").toLowerCase().trim() === email) {
          userAllowedTabs = (data.AllowedTabs[i] || "").split(",").map(function(x) {
            return x.trim().toLowerCase();
          }).filter(Boolean);
          break;
        }
      }
    } catch (e) {
      console.log("Widget permissions load skipped:", e.message);
    }
  }
  function isTabAllowed(tabId) {
    if (userAllowedTabs.length > 0) return userAllowedTabs.indexOf(tabId) !== -1;
    return ["kanban", "gantt", "team", "settings"].indexOf(tabId) !== -1;
  }
  function applyOwnerRestrictions() {
    var allTabs = ["kanban", "gantt", "team", "settings"];
    allTabs.forEach(function(tab) {
      var el = document.querySelector('[data-tab="' + tab + '"]');
      if (el) el.style.display = isTabAllowed(tab) ? "" : "none";
    });
    var activeBtn = document.querySelector(".tab-btn.active");
    if (activeBtn && !isTabAllowed(activeBtn.getAttribute("data-tab"))) {
      switchTab("kanban");
    }
  }
  function getAclRules() {
    return [
      { tableId: state.SETTINGS_TABLE, ownerPerms: "+CRUDS", editorPerms: "+R-CUD" },
      { tableId: state.CONFIG_TABLE, ownerPerms: "+CRUDS", editorPerms: "+R-CUD" },
      { tableId: state.TASKS_TABLE, ownerPerms: "+CRUDS", editorPerms: "+RCU-D" },
      { tableId: state.SUBTASKS_TABLE, ownerPerms: "+CRUDS", editorPerms: "+RCU-D" },
      { tableId: state.COMMENTS_TABLE, ownerPerms: "+CRUDS", editorPerms: "+RCU-D" },
      { tableId: state.TIME_ENTRIES_TABLE, ownerPerms: "+CRUDS", editorPerms: "+RCU-D" },
      { tableId: state.USERS_TABLE, ownerPerms: "+CRUDS", editorPerms: "+R-CUD" },
      { tableId: state.GROUPS_TABLE, ownerPerms: "+CRUDS", editorPerms: "+R-CUD" },
      { tableId: state.PROJECTS_TABLE, ownerPerms: "+CRUDS", editorPerms: "+R-CUD" },
      { tableId: state.USER_INFO_TABLE, ownerPerms: "+CRUDS", editorPerms: "+RCUD" },
      { tableId: state.NOTIFICATIONS_TABLE, ownerPerms: "+CRUDS", editorPerms: "+RCUD" },
      { tableId: state.ATTACHMENTS_TABLE, ownerPerms: "+CRUDS", editorPerms: "+RCU-D" }
    ].filter(function(rule, index, arr) {
      return rule.tableId && arr.findIndex(function(r) {
        return r.tableId === rule.tableId;
      }) === index;
    });
  }
  async function checkSecurityStatus() {
    try {
      var rulesData = await grist.docApi.fetchTable("_grist_ACLRules");
      var resourcesData = await grist.docApi.fetchTable("_grist_ACLResources");
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
            if (!res || res.tableId !== rule.tableId || res.colIds !== "*") continue;
            var formula = rulesData.aclFormula ? rulesData.aclFormula[j] || "" : "";
            var perms = rulesData.permissionsText ? rulesData.permissionsText[j] || "" : "";
            if (formula.indexOf("user.Access") !== -1 && formula.indexOf("OWNER") !== -1) hasOwnerRule = true;
            if (formula === "" && perms !== "") hasEditorRule = true;
            if (formula.indexOf("user.Access") !== -1 && (formula.indexOf("EDITOR") !== -1 || formula.indexOf("not") !== -1 || formula.indexOf("!=") !== -1)) hasEditorRule = true;
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
      console.error("[GristPM] Error checking security:", e);
      return null;
    }
  }
  async function applySecurityRules() {
    var container = document.getElementById("security-status");
    if (!container) return;
    var confirmed = await showConfirmModal(
      currentLang === "fr" ? "Cela va cr\xE9er des r\xE8gles d'acc\xE8s (ACL) pour prot\xE9ger les tables du widget. Les owners garderont tous les droits. Les \xE9diteurs pourront cr\xE9er et modifier les t\xE2ches mais pas les supprimer ni modifier les param\xE8tres. Le document sera recharg\xE9 automatiquement." : "This will create access rules (ACL) to protect widget tables. Owners keep full rights. Editors can create and edit tasks but cannot delete them or modify settings. The document will reload automatically.",
      currentLang === "fr" ? "S\xE9curiser le document" : "Secure document",
      currentLang === "fr" ? "Confirmer" : "Confirm"
    );
    if (!confirmed) return;
    container.innerHTML = '<div style="text-align:center;padding:20px;color:#6366f1;"><div class="spinner" style="margin:0 auto 10px;"></div>' + (currentLang === "fr" ? "Application des r\xE8gles en cours..." : "Applying rules...") + "</div>";
    try {
      var existingTables = await grist.docApi.listTables();
      var resourcesData = await grist.docApi.fetchTable("_grist_ACLResources");
      var rulesData = await grist.docApi.fetchTable("_grist_ACLRules");
      var resourceMap = {};
      if (resourcesData.id) {
        for (var i = 0; i < resourcesData.id.length; i++) {
          resourceMap[resourcesData.tableId[i] + ":" + resourcesData.colIds[i]] = resourcesData.id[i];
        }
      }
      var existingRuleResources = {};
      if (rulesData.id) {
        for (var j = 0; j < rulesData.id.length; j++) {
          var resId = rulesData.resource[j];
          if (!existingRuleResources[resId]) existingRuleResources[resId] = [];
          existingRuleResources[resId].push({
            aclFormula: rulesData.aclFormula ? rulesData.aclFormula[j] || "" : "",
            permissionsText: rulesData.permissionsText ? rulesData.permissionsText[j] || "" : ""
          });
        }
      }
      var actions = [];
      var tempResourceId = -1;
      var aclRules = getAclRules();
      for (var r = 0; r < aclRules.length; r++) {
        var rule = aclRules[r];
        if (existingTables.indexOf(rule.tableId) === -1) continue;
        var resKey = rule.tableId + ":*";
        var resourceId = resourceMap[resKey];
        var alreadyHasRules = false;
        if (resourceId && existingRuleResources[resourceId]) {
          var existing = existingRuleResources[resourceId];
          for (var k = 0; k < existing.length; k++) {
            if (existing[k].aclFormula.indexOf("user.Access") !== -1) {
              alreadyHasRules = true;
              break;
            }
          }
        }
        if (alreadyHasRules) continue;
        if (!resourceId) {
          resourceId = tempResourceId;
          actions.push(["AddRecord", "_grist_ACLResources", tempResourceId, { tableId: rule.tableId, colIds: "*" }]);
          tempResourceId--;
        }
        actions.push(["AddRecord", "_grist_ACLRules", null, {
          resource: resourceId,
          aclFormula: "user.Access in [OWNER]",
          permissionsText: rule.ownerPerms,
          memo: "PM Widget - Owner"
        }]);
        actions.push(["AddRecord", "_grist_ACLRules", null, {
          resource: resourceId,
          aclFormula: "",
          permissionsText: rule.editorPerms,
          memo: "PM Widget - Default"
        }]);
      }
      if (actions.length === 0) {
        showToast(currentLang === "fr" ? "Toutes les tables sont d\xE9j\xE0 s\xE9curis\xE9es" : "All tables are already secured", "success");
        renderSecuritySection();
        return;
      }
      await grist.docApi.applyUserActions(actions);
      showToast(currentLang === "fr" ? "R\xE8gles de s\xE9curit\xE9 appliqu\xE9es \u2713" : "Security rules applied \u2713", "success");
    } catch (e) {
      console.error("[GristPM] Error applying security rules:", e);
      container.innerHTML = '<div class="security-error">' + (currentLang === "fr" ? "Erreur : " : "Error: ") + sanitize(e.message) + "<br><small>" + (currentLang === "fr" ? "Seul un Owner du document peut appliquer les r\xE8gles d'acc\xE8s." : "Only a document Owner can apply access rules.") + "</small></div>";
    }
  }
  async function removeSecurityRules() {
    var confirmed = await showConfirmModal(
      currentLang === "fr" ? "Cela va supprimer toutes les r\xE8gles d'acc\xE8s cr\xE9\xE9es par le widget sur ses tables. Le document sera recharg\xE9 automatiquement." : "This will remove all access rules created by the widget on its tables. The document will reload automatically.",
      currentLang === "fr" ? "Retirer la s\xE9curit\xE9" : "Remove security",
      currentLang === "fr" ? "Confirmer" : "Confirm"
    );
    if (!confirmed) return;
    try {
      var rulesData = await grist.docApi.fetchTable("_grist_ACLRules");
      var resourcesData = await grist.docApi.fetchTable("_grist_ACLResources");
      var pmResourceIds = {};
      if (resourcesData.id) {
        for (var i = 0; i < resourcesData.id.length; i++) {
          if (resourcesData.tableId[i] && resourcesData.tableId[i].indexOf("PM_") === 0 && resourcesData.colIds[i] === "*") {
            pmResourceIds[resourcesData.id[i]] = true;
          }
        }
      }
      var actions = [];
      if (rulesData.id) {
        for (var j = 0; j < rulesData.id.length; j++) {
          if (pmResourceIds[rulesData.resource[j]]) {
            var memo = rulesData.memo ? rulesData.memo[j] || "" : "";
            if (memo.indexOf("PM Widget") !== -1) {
              actions.push(["RemoveRecord", "_grist_ACLRules", rulesData.id[j]]);
            }
          }
        }
      }
      if (actions.length === 0) {
        showToast(currentLang === "fr" ? "Aucune r\xE8gle PM Widget \xE0 supprimer" : "No PM Widget rules to remove", "info");
        return;
      }
      await grist.docApi.applyUserActions(actions);
      showToast(currentLang === "fr" ? "R\xE8gles supprim\xE9es \u2713" : "Rules removed \u2713", "success");
    } catch (e) {
      console.error("[GristPM] Error removing security rules:", e);
      showToast((currentLang === "fr" ? "Erreur : " : "Error: ") + e.message, "error");
    }
  }

  // src/domains/filters.js
  function roleLabel(role) {
    if (role === "admin") return t("roleAdmin");
    if (role === "viewer") return t("roleViewer");
    if (role === "member") return t("roleMember");
    return role;
  }
  function renderProjectSelector() {
    var container = document.getElementById("project-selector");
    if (!container) return;
    var roleSet = {};
    state.users.forEach(function(u2) {
      getUserRoles(u2).forEach(function(r) {
        if (r) roleSet[r] = true;
      });
    });
    var roles = Object.keys(roleSet).sort();
    var visibleUsers = state.currentFilterRole ? state.users.filter(function(u2) {
      return userMatchesRole(u2, state.currentFilterRole);
    }) : state.users;
    var visibleProjects = state.projects;
    if (state.mineOnly || shouldLimitToMyProjects()) {
      var myIds = myProjectIdSet();
      visibleProjects = state.projects.filter(function(p) {
        return myIds[p.id];
      });
    }
    if (state.currentFilterAssignee) {
      var projIdSet = {};
      state.tasks.forEach(function(t2) {
        if (!t2.Project_Id) return;
        var list = (t2.Assignee || "").split(",").map(function(s) {
          return s.trim();
        });
        if (list.indexOf(state.currentFilterAssignee) !== -1) projIdSet[t2.Project_Id] = true;
      });
      var filtered = visibleProjects.filter(function(p) {
        return projIdSet[p.id];
      });
      if (filtered.length > 0) visibleProjects = filtered;
    }
    var html = "";
    if (canSeeAllProjects()) {
      var roleOptions = roles.map(function(r) {
        return { value: r, label: roleLabel(r) };
      });
      html += buildFilterCombo("role", currentLang === "fr" ? "\u2014 R\xF4le \u2014" : "\u2014 Role \u2014", roleOptions, state.currentFilterRole, filterByRole);
      var personOptions = [];
      visibleUsers.forEach(function(u2) {
        var val = u2.Email || u2.Name;
        var label = u2.Name || u2.Email;
        if (val) personOptions.push({ value: val, label });
      });
      html += buildFilterCombo("person", currentLang === "fr" ? "\u2014 Personne \u2014" : "\u2014 Person \u2014", personOptions, state.currentFilterAssignee, filterByAssignee);
    }
    var catOptions = getCategories().map(function(c) {
      return { value: c.name, label: c.name };
    });
    html += buildFilterCombo("category", currentLang === "fr" ? "\u2014 Cat\xE9gorie \u2014" : "\u2014 Category \u2014", catOptions, state.currentFilterCategory, filterByCategory);
    var tagOptions = getTags().map(function(tag) {
      return { value: tag.name, label: tag.name };
    });
    html += buildFilterCombo("tag", "\u2014 Tag \u2014", tagOptions, state.currentFilterTag, filterByTag);
    var selProj = state.currentProjectId ? state.projects.find(function(p) {
      return p.id === state.currentProjectId;
    }) : null;
    var allProjectsLabel = canSeeAllProjects() ? currentLang === "fr" ? "Tous les projets" : "All projects" : currentLang === "fr" ? "Mes projets" : "My projects";
    var btnLabel = selProj ? sanitize(selProj.Name) : allProjectsLabel;
    var btnDotColor = selProj ? selProj.Color || "#6366f1" : "transparent";
    var btnClass = "proj-combobox-btn" + (state.currentProjectId ? " active" : "");
    html += '<div class="proj-combobox" id="proj-combobox">';
    html += '<button type="button" class="' + btnClass + '" onclick="toggleProjectDropdown()" id="proj-combobox-btn">';
    html += '<span class="proj-combobox-dot" style="background:' + btnDotColor + ";" + (selProj ? "" : "opacity:0;") + '"></span>';
    html += '<span class="proj-combobox-label">' + btnLabel + "</span>";
    html += '<span class="proj-combobox-chevron">\u25BE</span>';
    html += "</button>";
    html += '<div class="proj-dropdown" id="project-dropdown">';
    html += '<div class="proj-dropdown-search"><input type="text" id="proj-search-input" placeholder="' + (currentLang === "fr" ? "Rechercher..." : "Search...") + '" oninput="filterProjectDropdown(this.value)" autocomplete="off"></div>';
    var PROJ_INITIAL_LIMIT = 5;
    html += '<div class="proj-dropdown-list" id="proj-dropdown-list">';
    html += '<div class="proj-option' + (!state.currentProjectId ? " selected" : "") + `" data-id="" data-name="" data-always="1" onclick="selectProjectOption('')">`;
    html += '<span class="proj-dot" style="background:#94a3b8;opacity:.4;"></span>';
    html += "<span>" + allProjectsLabel + "</span>";
    html += "</div>";
    var allTasksForCount = state.tasks;
    var extraCount = Math.max(0, visibleProjects.length - PROJ_INITIAL_LIMIT);
    visibleProjects.forEach(function(proj, idx) {
      var taskCount = allTasksForCount.filter(function(tt) {
        return tt.Project_Id === proj.id;
      }).length;
      var isSelected = state.currentProjectId === proj.id;
      var safeName = sanitize(proj.Name || "");
      var isExtra = idx >= PROJ_INITIAL_LIMIT && !isSelected;
      html += '<div class="proj-option' + (isSelected ? " selected" : "") + '"';
      html += ' data-id="' + proj.id + '" data-name="' + safeName + '"';
      if (isExtra) html += ' data-extra="1" style="display:none;"';
      html += ' onclick="selectProjectOption(' + proj.id + ')">';
      html += '<span class="proj-dot" style="background:' + (proj.Color || "#6366f1") + ';"></span>';
      html += '<span style="flex:1;overflow:hidden;text-overflow:ellipsis;">' + safeName + "</span>";
      if (taskCount > 0) html += '<span class="proj-count">' + taskCount + "</span>";
      html += "</div>";
    });
    if (extraCount > 0) {
      html += '<div id="proj-more-hint" style="padding:6px 12px;font-size:11px;color:#94a3b8;text-align:center;border-top:1px solid #f1f5f9;">';
      html += "+ " + extraCount + " " + (currentLang === "fr" ? "autres \u2014 tapez pour chercher" : "more \u2014 type to search");
      html += "</div>";
    }
    html += "</div></div></div>";
    if (state.currentUserEmail && canSeeAllProjects()) {
      html += '<button class="btn-icon" onclick="toggleMyProjects()" title="' + (currentLang === "fr" ? "Mes projets : cr\xE9\xE9s par moi ou qui me sont assign\xE9s" : "My projects: created by or assigned to me") + '" style="width:auto;padding:0 12px;font-size:12px;font-weight:600;' + (state.mineOnly ? "background:#6366f1;color:#fff;border-color:#6366f1;" : "") + '">\u{1F464} ' + (currentLang === "fr" ? "Mes projets" : "My projects") + "</button>";
    }
    if (state.currentFilterRole || state.currentFilterAssignee || state.currentFilterCategory || state.currentFilterTag || state.currentProjectId || state.mineOnly && canSeeAllProjects()) {
      html += '<button class="btn-icon" onclick="resetFilters()" title="' + (currentLang === "fr" ? "R\xE9initialiser les filtres" : "Reset filters") + '" style="color:#ef4444;">\u2715</button>';
    }
    html += '<button class="btn-icon" onclick="openProjectModal()" title="' + t("manageProjects") + '">\u2699\uFE0F</button>';
    container.innerHTML = html;
    var banner = document.getElementById("project-filter-banner");
    if (!banner) {
      banner = document.createElement("div");
      banner.id = "project-filter-banner";
      var appEl = document.querySelector(".app-container") || document.body;
      appEl.insertBefore(banner, appEl.firstChild);
    }
    if (state.currentFilterRole || state.currentFilterAssignee || state.currentFilterCategory || state.currentFilterTag || state.currentProjectId || state.mineOnly && canSeeAllProjects()) {
      var proj2 = state.currentProjectId ? state.projects.find(function(p) {
        return p.id === state.currentProjectId;
      }) : null;
      var c2 = proj2 && proj2.Color ? proj2.Color : "#6366f1";
      var bits = [];
      if (state.mineOnly && canSeeAllProjects()) bits.push("\u{1F464} " + (currentLang === "fr" ? "Mes projets" : "My projects"));
      if (state.currentFilterRole) bits.push("\u{1F454} " + sanitize(roleLabel(state.currentFilterRole)));
      if (state.currentFilterAssignee) {
        var u = state.users.find(function(x) {
          return (x.Email || x.Name) === state.currentFilterAssignee;
        });
        var displayName = u ? u.Name || u.Email : state.currentFilterAssignee;
        bits.push("\u{1F464} " + sanitize(displayName));
      }
      if (state.currentFilterCategory) bits.push("\u{1F4C1} " + sanitize(state.currentFilterCategory));
      if (state.currentFilterTag) bits.push("\u{1F3F7}\uFE0F " + sanitize(state.currentFilterTag));
      if (proj2) bits.push("\u{1F3AF} " + sanitize(proj2.Name));
      banner.innerHTML = (currentLang === "fr" ? "Filtres actifs : " : "Active filters: ") + "<strong>" + bits.join(" \u203A ") + '</strong> \u2014 <a href="#" onclick="resetFilters();return false;" style="color:inherit;text-decoration:underline;">' + (currentLang === "fr" ? "Tout effacer" : "Clear all") + "</a>";
      banner.style.cssText = "display:flex;align-items:center;gap:8px;padding:8px 16px;background:" + c2 + "15;border-bottom:2px solid" + c2 + ";color:" + c2 + ";font-size:12px;font-weight:600;";
    } else {
      banner.style.display = "none";
    }
  }
  function buildFilterCombo(id, placeholder, options, selectedValue, onSelect) {
    var selOpt = options.find(function(o) {
      return o.value === selectedValue;
    });
    var label = selOpt ? selOpt.label : placeholder;
    var isActive = !!selectedValue;
    var h = '<div class="filter-combo" id="fc-' + id + '">';
    h += '<button type="button" class="filter-combo-btn' + (isActive ? " active" : "") + `" onclick="toggleFilterCombo('` + id + `')" id="fc-btn-` + id + '">';
    h += '<span class="filter-combo-label">' + sanitize(label) + "</span>";
    h += '<span class="filter-combo-chevron">\u25BE</span></button>';
    h += '<div class="filter-combo-dd" id="fc-dd-' + id + '">';
    h += '<div class="filter-combo-search"><input type="text" id="fc-search-' + id + '" placeholder="' + (currentLang === "fr" ? "Rechercher..." : "Search...") + `" oninput="filterComboSearch('` + id + `', this.value)" autocomplete="off"></div>`;
    h += '<div class="filter-combo-list" id="fc-list-' + id + '">';
    h += '<div class="filter-combo-opt' + (!selectedValue ? " selected" : "") + '" data-value="" data-label="' + sanitize(placeholder) + `" onclick="selectFilterCombo('` + id + `', '')">` + sanitize(placeholder) + "</div>";
    options.forEach(function(o) {
      h += '<div class="filter-combo-opt' + (o.value === selectedValue ? " selected" : "") + '" data-value="' + sanitize(o.value) + '" data-label="' + sanitize(o.label) + `" onclick="selectFilterCombo('` + id + "', '" + sanitize(o.value).replace(/'/g, "\\'") + `')">` + sanitize(o.label) + "</div>";
    });
    h += "</div></div></div>";
    window["_fcCallback_" + id] = onSelect;
    return h;
  }
  function toggleFilterCombo(id) {
    var dd = document.getElementById("fc-dd-" + id);
    var btn = document.getElementById("fc-btn-" + id);
    if (!dd) return;
    var isOpen = dd.classList.contains("show");
    document.querySelectorAll(".filter-combo-dd.show").forEach(function(d) {
      d.classList.remove("show");
    });
    document.querySelectorAll(".filter-combo-btn.open").forEach(function(b) {
      b.classList.remove("open");
    });
    if (!isOpen) {
      dd.classList.add("show");
      if (btn) btn.classList.add("open");
      var inp = document.getElementById("fc-search-" + id);
      if (inp) {
        inp.value = "";
        inp.focus();
        filterComboSearch(id, "");
      }
      setTimeout(function() {
        document.addEventListener("mousedown", function hideFC(e) {
          var box = document.getElementById("fc-" + id);
          if (box && !box.contains(e.target)) {
            var dd2 = document.getElementById("fc-dd-" + id);
            var btn2 = document.getElementById("fc-btn-" + id);
            if (dd2) dd2.classList.remove("show");
            if (btn2) btn2.classList.remove("open");
            document.removeEventListener("mousedown", hideFC);
          }
        });
      }, 0);
    }
  }
  function filterComboSearch(id, query) {
    var list = document.getElementById("fc-list-" + id);
    if (!list) return;
    var q = (query || "").trim().toLowerCase();
    list.querySelectorAll(".filter-combo-opt").forEach(function(opt) {
      var label = (opt.dataset.label || "").toLowerCase();
      opt.style.display = !q || label.indexOf(q) !== -1 ? "" : "none";
    });
  }
  function selectFilterCombo(id, value) {
    var dd = document.getElementById("fc-dd-" + id);
    var btn = document.getElementById("fc-btn-" + id);
    if (dd) dd.classList.remove("show");
    if (btn) btn.classList.remove("open");
    var cb = window["_fcCallback_" + id];
    if (cb) cb(value);
  }
  function toggleProjectDropdown() {
    var dd = document.getElementById("project-dropdown");
    var btn = document.getElementById("proj-combobox-btn");
    if (!dd) return;
    var isOpen = dd.classList.contains("show");
    if (isOpen) {
      dd.classList.remove("show");
      if (btn) btn.classList.remove("open");
    } else {
      dd.classList.add("show");
      if (btn) btn.classList.add("open");
      var inp = document.getElementById("proj-search-input");
      if (inp) {
        inp.value = "";
        inp.focus();
        filterProjectDropdown("");
      }
      setTimeout(function() {
        document.addEventListener("mousedown", function hideDD(e) {
          var dd2 = document.getElementById("project-dropdown");
          var box = document.getElementById("proj-combobox");
          if (dd2 && box && !box.contains(e.target)) {
            dd2.classList.remove("show");
            var btn2 = document.getElementById("proj-combobox-btn");
            if (btn2) btn2.classList.remove("open");
            document.removeEventListener("mousedown", hideDD);
          }
        });
      }, 0);
    }
  }
  function showProjectDropdown() {
    toggleProjectDropdown();
  }
  function filterProjectDropdown(query) {
    var list = document.getElementById("proj-dropdown-list");
    if (!list) return;
    var q = (query || "").trim().toLowerCase();
    var hint = document.getElementById("proj-more-hint");
    var opts = list.querySelectorAll(".proj-option");
    if (!q) {
      opts.forEach(function(opt) {
        if (opt.dataset.always === "1" || !opt.dataset.extra) {
          opt.style.display = "";
        } else {
          opt.style.display = "none";
        }
      });
      if (hint) hint.style.display = "";
    } else {
      opts.forEach(function(opt) {
        var name = (opt.dataset.name || "").toLowerCase();
        opt.style.display = opt.dataset.always === "1" || name.indexOf(q) !== -1 ? "" : "none";
      });
      if (hint) hint.style.display = "none";
    }
  }
  function selectProjectOption(projectId) {
    var dd = document.getElementById("project-dropdown");
    var btn = document.getElementById("proj-combobox-btn");
    if (dd) dd.classList.remove("show");
    if (btn) btn.classList.remove("open");
    filterByProject(projectId);
  }
  function filterByProject(projectId) {
    state.currentProjectId = projectId ? parseInt(projectId) : null;
    localStorage.setItem("pm-current-project", state.currentProjectId || "");
    renderProjectSelector();
    refreshAllViews();
  }
  function myAssigneeValue() {
    if (!state.currentUserEmail) return null;
    var em = state.currentUserEmail.toLowerCase().trim();
    var u = state.users.find(function(x) {
      return (x.Email || "").toLowerCase().trim() === em;
    });
    if (u) return u.Email || u.Name;
    return state.currentUserEmail;
  }
  function myProjectIdSet() {
    var em = (state.currentUserEmail || "").toLowerCase().trim();
    var mine = myAssigneeValue();
    var set = {};
    state.projects.forEach(function(p) {
      if (em && (p.CreatedBy || "").toLowerCase().trim() === em) set[p.id] = true;
      if (mine && (p.Lead || "") === mine) set[p.id] = true;
    });
    if (mine) state.tasks.forEach(function(tk) {
      if (!tk.Project_Id) return;
      var list = (tk.Assignee || "").split(",").map(function(s) {
        return s.trim();
      });
      if (list.indexOf(mine) !== -1) set[tk.Project_Id] = true;
    });
    return set;
  }
  function toggleMyProjects() {
    state.mineOnly = !state.mineOnly;
    persistFilters();
    renderProjectSelector();
    refreshAllViews();
  }
  function persistFilters() {
    try {
      localStorage.setItem("pm-filters", JSON.stringify({
        role: state.currentFilterRole,
        assignee: state.currentFilterAssignee,
        category: state.currentFilterCategory,
        tag: state.currentFilterTag,
        mineOnly: state.mineOnly
      }));
    } catch (e) {
    }
  }
  function restoreFilters() {
    try {
      var s = JSON.parse(localStorage.getItem("pm-filters") || "{}");
      state.currentFilterRole = s.role || null;
      state.currentFilterAssignee = s.assignee || null;
      state.currentFilterCategory = s.category || null;
      state.currentFilterTag = s.tag || null;
      state.mineOnly = !!s.mineOnly;
    } catch (e) {
    }
  }
  function filterByRole(role) {
    state.currentFilterRole = role || null;
    if (state.currentFilterRole && state.currentFilterAssignee) {
      var stillValid = state.users.some(function(u) {
        var val = u.Email || u.Name;
        return val === state.currentFilterAssignee && userMatchesRole(u, state.currentFilterRole);
      });
      if (!stillValid) {
        state.currentFilterAssignee = null;
        state.currentProjectId = null;
      }
    }
    persistFilters();
    renderProjectSelector();
    refreshAllViews();
  }
  function filterByAssignee(name) {
    state.currentFilterAssignee = name || null;
    if (state.currentFilterAssignee && state.currentProjectId) {
      var match = state.tasks.some(function(t2) {
        if (Number(t2.Project_Id) !== Number(state.currentProjectId)) return false;
        var list = (t2.Assignee || "").split(",").map(function(s) {
          return s.trim();
        });
        return list.indexOf(state.currentFilterAssignee) !== -1;
      });
      if (!match) state.currentProjectId = null;
    }
    persistFilters();
    renderProjectSelector();
    refreshAllViews();
  }
  function filterByCategory(val) {
    state.currentFilterCategory = val || null;
    persistFilters();
    renderProjectSelector();
    refreshAllViews();
  }
  function filterByTag(val) {
    state.currentFilterTag = val || null;
    persistFilters();
    renderProjectSelector();
    refreshAllViews();
  }
  function resetFilters() {
    state.currentFilterRole = null;
    state.currentFilterAssignee = null;
    state.currentFilterCategory = null;
    state.currentFilterTag = null;
    state.mineOnly = false;
    state.currentProjectId = null;
    localStorage.setItem("pm-current-project", "");
    persistFilters();
    renderProjectSelector();
    refreshAllViews();
  }
  var showArchivedTasks = false;
  function toggleArchiveView() {
    showArchivedTasks = !showArchivedTasks;
    updateArchiveButton();
    refreshAllViews();
  }
  function updateArchiveButton() {
    var btn = document.getElementById("archive-toggle-btn");
    if (!btn) return;
    var archivedCount = state.tasks.filter(function(t2) {
      return t2.Status === "archived";
    }).length;
    btn.classList.toggle("active", showArchivedTasks);
    if (showArchivedTasks) {
      btn.innerHTML = currentLang === "fr" ? "\u2190 Retour aux t\xE2ches" : "\u2190 Back to tasks";
      btn.style.background = "#3b82f6";
      btn.style.color = "white";
      btn.style.borderColor = "#3b82f6";
    } else {
      btn.innerHTML = "\u{1F4E6} Archives" + (archivedCount > 0 ? ' <span style="background:#ef4444;color:white;border-radius:50%;padding:1px 6px;font-size:10px;margin-left:4px;">' + archivedCount + "</span>" : "");
      btn.style.background = "#f8fafc";
      btn.style.color = "";
      btn.style.borderColor = "#e2e8f0";
    }
  }
  function getFilteredTasks() {
    var result = state.tasks.filter(function(t2) {
      if (showArchivedTasks) return t2.Status === "archived";
      return t2.Status !== "archived";
    });
    if (state.currentFilterRole) {
      var roleIds = state.users.filter(function(u) {
        return userMatchesRole(u, state.currentFilterRole);
      }).reduce(function(acc, u) {
        if (u.Email) acc.push(u.Email);
        if (u.Name) acc.push(u.Name);
        return acc;
      }, []);
      result = result.filter(function(t2) {
        var list = (t2.Assignee || "").split(",").map(function(s) {
          return s.trim();
        }).filter(Boolean);
        return list.some(function(a) {
          return roleIds.indexOf(a) !== -1;
        });
      });
    }
    if (state.currentFilterAssignee) {
      var assigneeUser = state.users.find(function(x) {
        return (x.Email || x.Name) === state.currentFilterAssignee;
      });
      var assigneeIds = [state.currentFilterAssignee];
      if (assigneeUser && assigneeUser.Name) assigneeIds.push(assigneeUser.Name);
      if (assigneeUser && assigneeUser.Email) assigneeIds.push(assigneeUser.Email);
      result = result.filter(function(t2) {
        var list = (t2.Assignee || "").split(",").map(function(s) {
          return s.trim();
        });
        return list.some(function(a) {
          return assigneeIds.indexOf(a) !== -1;
        });
      });
    }
    if (state.currentFilterCategory) {
      result = result.filter(function(t2) {
        return t2.Category === state.currentFilterCategory;
      });
    }
    if (state.currentFilterTag) {
      result = result.filter(function(t2) {
        return Array.isArray(t2.Tag) && t2.Tag.indexOf(state.currentFilterTag) !== -1;
      });
    }
    if ((state.mineOnly || shouldLimitToMyProjects()) && !state.currentProjectId) {
      var myIds = myProjectIdSet();
      result = result.filter(function(t2) {
        return t2.Project_Id && myIds[t2.Project_Id] || taskConcernsCurrentUser(t2);
      });
    }
    if (state.currentProjectId) {
      var cpid = Number(state.currentProjectId);
      result = result.filter(function(t2) {
        return Number(t2.Project_Id) === cpid;
      });
    }
    return result;
  }
  function getProjectName(projectId) {
    if (!projectId) return "";
    var proj = state.projects.find(function(p) {
      return p.id === projectId;
    });
    return proj ? proj.Name : "";
  }
  function getProjectColor(projectId) {
    if (!projectId) return "#94a3b8";
    var proj = state.projects.find(function(p) {
      return p.id === projectId;
    });
    return proj ? proj.Color || "#6366f1" : "#94a3b8";
  }

  // src/domains/data-loader.js
  async function loadAllData() {
    await loadColumnMapping();
    try {
      var taskData = await grist.docApi.fetchTable(state.TASKS_TABLE);
      state.tasks = [];
      if (taskData && taskData.id) {
        for (var i = 0; i < taskData.id.length; i++) {
          var task = { id: taskData.id[i] };
          var titleCol = getColumnName("tasks", "title");
          var descCol = getColumnName("tasks", "description");
          var statusCol = getColumnName("tasks", "status");
          var priorityCol = getColumnName("tasks", "priority");
          var assigneeCol = getColumnName("tasks", "assignee");
          var groupCol = getColumnName("tasks", "group");
          var startDateCol = getColumnName("tasks", "startDate");
          var dueDateCol = getColumnName("tasks", "dueDate");
          var categoryCol = getColumnName("tasks", "category");
          var tagCol = getColumnName("tasks", "tag");
          var recurrenceCol = getColumnName("tasks", "recurrence");
          var estimatedHoursCol = getColumnName("tasks", "estimatedHours");
          var createdAtCol = getColumnName("tasks", "createdAt");
          var projectIdCol = getColumnName("tasks", "projectId");
          task.Title = taskData[titleCol] ? taskData[titleCol][i] : "";
          task.Description = taskData[descCol] ? taskData[descCol][i] : "";
          task.Status = taskData[statusCol] ? taskData[statusCol][i] : "todo";
          task.Priority = taskData[priorityCol] ? taskData[priorityCol][i] : "medium";
          task.Assignee = taskData[assigneeCol] ? taskData[assigneeCol][i] : null;
          task.Group_Name = taskData[groupCol] ? taskData[groupCol][i] : "";
          task.Start_Date = taskData[startDateCol] ? taskData[startDateCol][i] : null;
          task.Due_Date = taskData[dueDateCol] ? taskData[dueDateCol][i] : null;
          task.Category = taskData[categoryCol] ? taskData[categoryCol][i] : "";
          task.Tag = taskData[tagCol] ? taskData[tagCol][i] : null;
          task.Recurrence = taskData[recurrenceCol] ? taskData[recurrenceCol][i] : "none";
          task.Estimated_Hours = taskData[estimatedHoursCol] ? taskData[estimatedHoursCol][i] : 0;
          task.Created_At = taskData[createdAtCol] ? taskData[createdAtCol][i] : null;
          task.Project_Id = taskData[projectIdCol] ? taskData[projectIdCol][i] : null;
          task.Accountable = taskData.Accountable ? taskData.Accountable[i] || "" : "";
          task.Consulted = taskData.Consulted ? taskData.Consulted[i] || "" : "";
          task.Informed = taskData.Informed ? taskData.Informed[i] || "" : "";
          task.Extension_Date = taskData.Extension_Date ? taskData.Extension_Date[i] : null;
          task.Auto_Extend = taskData.Auto_Extend ? !!taskData.Auto_Extend[i] : false;
          state.tasks.push(task);
        }
      }
    } catch (e) {
      console.warn("Could not load tasks:", e);
      state.tasks = [];
    }
    try {
      var userData = await grist.docApi.fetchTable(state.USERS_TABLE);
      state.users = [];
      if (userData && userData.id) {
        var nameCol = getColumnName("users", "name");
        var emailCol = getColumnName("users", "email");
        var roleCol = getColumnName("users", "role");
        var groupCol = getColumnName("users", "group");
        for (var i = 0; i < userData.id.length; i++) {
          state.users.push({
            id: userData.id[i],
            Name: userData[nameCol] ? userData[nameCol][i] : "",
            Email: userData[emailCol] ? userData[emailCol][i] : "",
            Role: userData[roleCol] ? userData[roleCol][i] : "member",
            Group_Name: userData[groupCol] ? userData[groupCol][i] : ""
          });
        }
      }
    } catch (e) {
      state.users = [];
    }
    state.tasks.forEach(function(task2) {
      var rawAssignee = task2.Assignee;
      var assigneeIds = Array.isArray(rawAssignee) ? rawAssignee[0] === "L" ? rawAssignee.slice(1) : rawAssignee : [];
      task2.Assignee = assigneeIds.map(function(id) {
        var u = state.users.find(function(usr) {
          return usr.id === id;
        });
        return u ? u.Email || u.Name : null;
      }).filter(Boolean).join(", ");
      var rawTag = task2.Tag;
      if (Array.isArray(rawTag)) {
        task2.Tag = (rawTag[0] === "L" ? rawTag.slice(1) : rawTag).filter(function(v) {
          return typeof v === "string";
        });
      } else if (typeof rawTag === "string" && rawTag) {
        task2.Tag = [rawTag];
      } else {
        task2.Tag = [];
      }
    });
    try {
      var groupData = await grist.docApi.fetchTable(state.GROUPS_TABLE);
      state.groups = [];
      if (groupData && groupData.id) {
        for (var i = 0; i < groupData.id.length; i++) {
          state.groups.push({
            id: groupData.id[i],
            Name: groupData.Name ? groupData.Name[i] : "",
            Description: groupData.Description ? groupData.Description[i] : ""
          });
        }
      }
    } catch (e) {
      state.groups = [];
    }
    try {
      var subtaskData = await grist.docApi.fetchTable(state.SUBTASKS_TABLE);
      state.subtasks = [];
      if (subtaskData && subtaskData.id) {
        for (var i = 0; i < subtaskData.id.length; i++) {
          state.subtasks.push({
            id: subtaskData.id[i],
            Parent_Task_Id: subtaskData.Parent_Task_Id ? subtaskData.Parent_Task_Id[i] : null,
            Title: subtaskData.Title ? subtaskData.Title[i] : "",
            Description: subtaskData.Description ? subtaskData.Description[i] : "",
            Status: subtaskData.Status ? subtaskData.Status[i] : "todo",
            Priority: subtaskData.Priority ? subtaskData.Priority[i] : "medium",
            Completed: subtaskData.Completed ? subtaskData.Completed[i] : false,
            Order: subtaskData.Order ? subtaskData.Order[i] : 0,
            Blocked_By_Subtask_Id: subtaskData.Blocked_By_Subtask_Id ? subtaskData.Blocked_By_Subtask_Id[i] : null,
            Assignee: subtaskData.Assignee ? subtaskData.Assignee[i] : "",
            Due_Date: subtaskData.Due_Date ? subtaskData.Due_Date[i] : null,
            Start_Date: subtaskData.Start_Date ? subtaskData.Start_Date[i] : null,
            Estimated_Hours: subtaskData.Estimated_Hours ? subtaskData.Estimated_Hours[i] : null,
            Recurrence: subtaskData.Recurrence ? subtaskData.Recurrence[i] : "none",
            Type: subtaskData.Type ? subtaskData.Type[i] : "subtask",
            Created_At: subtaskData.Created_At ? subtaskData.Created_At[i] : null
          });
        }
      }
    } catch (e) {
      state.subtasks = [];
    }
    try {
      var commentData = await grist.docApi.fetchTable(state.COMMENTS_TABLE);
      state.comments = [];
      if (commentData && commentData.id) {
        for (var i = 0; i < commentData.id.length; i++) {
          state.comments.push({
            id: commentData.id[i],
            Task_Id: commentData.Task_Id ? commentData.Task_Id[i] : null,
            Author: commentData.Author ? commentData.Author[i] : "",
            Content: commentData.Content ? commentData.Content[i] : "",
            Created_At: commentData.Created_At ? commentData.Created_At[i] : null
          });
        }
      }
    } catch (e) {
      state.comments = [];
    }
    try {
      var attData = await grist.docApi.fetchTable(state.ATTACHMENTS_TABLE);
      state.attachments = [];
      if (attData && attData.id) {
        for (var i = 0; i < attData.id.length; i++) {
          state.attachments.push({
            id: attData.id[i],
            Task_Id: attData.Task_Id ? attData.Task_Id[i] : null,
            File_Name: attData.File_Name ? attData.File_Name[i] : "",
            File_Type: attData.File_Type ? attData.File_Type[i] : "",
            File_Size: attData.File_Size ? attData.File_Size[i] : 0,
            Data: attData.File_Data ? attData.File_Data[i] : "",
            Created_At: attData.Created_At ? attData.Created_At[i] : null
          });
        }
      }
    } catch (e) {
      state.attachments = [];
    }
    try {
      var timeData = await grist.docApi.fetchTable(state.TIME_ENTRIES_TABLE);
      state.timeEntries = [];
      state.activeTimers = {};
      if (timeData && timeData.id) {
        for (var i = 0; i < timeData.id.length; i++) {
          var entry = {
            id: timeData.id[i],
            Task_Id: timeData.Task_Id ? timeData.Task_Id[i] : null,
            User: timeData.User ? timeData.User[i] : "",
            Start_Time: timeData.Start_Time ? timeData.Start_Time[i] : null,
            End_Time: timeData.End_Time ? timeData.End_Time[i] : null,
            Duration: timeData.Duration ? timeData.Duration[i] : 0,
            Description: timeData.Description ? timeData.Description[i] : ""
          };
          state.timeEntries.push(entry);
          if (entry.Task_Id && entry.Start_Time && !entry.End_Time) {
            state.activeTimers[entry.Task_Id] = entry.Start_Time;
          }
        }
      }
    } catch (e) {
      state.timeEntries = [];
      state.activeTimers = {};
    }
    try {
      var projData = await grist.docApi.fetchTable(state.PROJECTS_TABLE);
      state.projects = [];
      if (projData && projData.id) {
        var nameCol = getColumnName("projects", "name");
        var descCol = getColumnName("projects", "description");
        var colorCol = getColumnName("projects", "color");
        var statusCol = getColumnName("projects", "status");
        for (var i = 0; i < projData.id.length; i++) {
          state.projects.push({
            id: projData.id[i],
            Name: projData[nameCol] ? projData[nameCol][i] : "",
            Description: projData[descCol] ? projData[descCol][i] : "",
            Color: projData[colorCol] ? projData[colorCol][i] : "#6366f1",
            Status: projData[statusCol] ? projData[statusCol][i] : "active",
            Start_Date: projData.Start_Date ? projData.Start_Date[i] : null,
            End_Date: projData.End_Date ? projData.End_Date[i] : null,
            Lead: projData.Lead ? projData.Lead[i] : "",
            CreatedBy: projData.CreatedBy ? projData.CreatedBy[i] : "",
            CreatedAt: projData.CreatedAt ? projData.CreatedAt[i] : ""
          });
        }
      }
    } catch (e) {
      state.projects = [];
    }
    try {
      var notifData = await grist.docApi.fetchTable(state.NOTIFICATIONS_TABLE);
      state.pmNotifications = [];
      if (notifData && notifData.id) {
        for (var ni = 0; ni < notifData.id.length; ni++) {
          state.pmNotifications.push({
            id: notifData.id[ni],
            Task_Id: notifData.Task_Id ? notifData.Task_Id[ni] : null,
            User_Email: notifData.User_Email ? notifData.User_Email[ni] : "",
            Type: notifData.Type ? notifData.Type[ni] : "",
            Message: notifData.Message ? notifData.Message[ni] : "",
            Created_At: notifData.Created_At ? notifData.Created_At[ni] : null,
            Rule_Id: notifData.Rule_Id ? notifData.Rule_Id[ni] : ""
          });
        }
      }
    } catch (e) {
      state.pmNotifications = [];
    }
    renderProjectSelector();
    refreshAllViews();
  }

  // src/domains/attachments.js
  var ATTACH_MAX_BYTES = 5 * 1024 * 1024;
  function getTaskAttachments(taskId) {
    return state.attachments.filter(function(a) {
      return a.Task_Id === taskId;
    }).sort(function(a, b) {
      return (a.Created_At || 0) - (b.Created_At || 0);
    });
  }
  function formatFileSize(bytes) {
    if (!bytes) return "";
    if (bytes < 1024) return bytes + " o";
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + " Ko";
    return (bytes / 1024 / 1024).toFixed(1) + " Mo";
  }
  function attachmentIsImage(type, name) {
    return /^image\//.test(type || "") || /\.(png|jpe?g|gif|webp|svg|bmp)$/i.test(name || "");
  }
  function attachmentIsPdf(type, name) {
    return (type || "") === "application/pdf" || /\.pdf$/i.test(name || "");
  }
  function readFileAsDataURL(file) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }
  function compressImageFile(file, maxW, quality) {
    maxW = maxW || 1600;
    quality = quality || 0.8;
    return new Promise(function(resolve) {
      readFileAsDataURL(file).then(function(src) {
        if (file.type === "image/gif" || file.type === "image/svg+xml") {
          resolve(src);
          return;
        }
        var img = new Image();
        img.onerror = function() {
          resolve(src);
        };
        img.onload = function() {
          var scale = Math.min(1, maxW / img.width);
          var w = Math.round(img.width * scale), h = Math.round(img.height * scale);
          var canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          var ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(src);
            return;
          }
          if (file.type === "image/png") {
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, w, h);
          }
          ctx.drawImage(img, 0, 0, w, h);
          var out = canvas.toDataURL("image/jpeg", quality);
          resolve(out.length < src.length ? out : src);
        };
        img.src = src;
      }).catch(function() {
        resolve(null);
      });
    });
  }
  async function uploadTaskAttachments(taskId, fileList) {
    if (!fileList || !fileList.length) return;
    var statusEl = document.getElementById("attach-status-" + taskId);
    try {
      var addedCount = 0, skipped = [];
      for (var i = 0; i < fileList.length; i++) {
        var file = fileList[i];
        if (statusEl) statusEl.textContent = (currentLang === "fr" ? "Traitement de " : "Processing ") + file.name + "...";
        var dataUrl = attachmentIsImage(file.type, file.name) ? await compressImageFile(file) : await readFileAsDataURL(file);
        if (!dataUrl) {
          skipped.push(file.name);
          continue;
        }
        var approxBytes = Math.round(dataUrl.length * 0.75);
        if (approxBytes > ATTACH_MAX_BYTES) {
          skipped.push(file.name + " (" + formatFileSize(approxBytes) + ")");
          continue;
        }
        await grist.docApi.applyUserActions([
          ["AddRecord", state.ATTACHMENTS_TABLE, null, {
            Task_Id: taskId,
            File_Name: file.name,
            File_Type: file.type || "",
            File_Size: file.size || 0,
            File_Data: dataUrl,
            Created_At: Math.floor(Date.now() / 1e3)
          }]
        ]);
        addedCount++;
      }
      if (statusEl) statusEl.textContent = "";
      await loadAllData();
      renderAttachmentsSection(taskId);
      if (typeof refreshAllViews === "function") refreshAllViews();
      if (addedCount > 0) showToast((currentLang === "fr" ? "Pi\xE8ce(s) jointe(s) ajout\xE9e(s) : " : "Attachment(s) added: ") + addedCount, "success");
      if (skipped.length) showToast((currentLang === "fr" ? "Trop volumineux (max 5 Mo), ignor\xE9 : " : "Too large (max 5MB), skipped: ") + skipped.join(", "), "error");
    } catch (e) {
      console.error("[GristPM] uploadTaskAttachments error:", e);
      if (statusEl) statusEl.textContent = "";
      showToast((currentLang === "fr" ? "\xC9chec : " : "Failed: ") + e.message, "error");
    }
  }
  function _findAtt(recordId) {
    return state.attachments.find(function(a) {
      return a.id === recordId;
    });
  }
  function downloadAttachment(recordId) {
    var att = _findAtt(recordId);
    if (!att || !att.Data) return;
    var a = document.createElement("a");
    a.href = att.Data;
    a.download = att.File_Name || "fichier";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  async function deleteAttachment(recordId, taskId) {
    var confirmed = await showConfirmModal(
      currentLang === "fr" ? "Supprimer cette pi\xE8ce jointe ?" : "Delete this attachment?",
      currentLang === "fr" ? "Supprimer la pi\xE8ce jointe" : "Delete attachment"
    );
    if (!confirmed) return;
    try {
      await grist.docApi.applyUserActions([["RemoveRecord", state.ATTACHMENTS_TABLE, recordId]]);
      await loadAllData();
      renderAttachmentsSection(taskId);
      if (typeof refreshAllViews === "function") refreshAllViews();
    } catch (e) {
      showToast((currentLang === "fr" ? "Erreur : " : "Error: ") + e.message, "error");
    }
  }
  function viewAttachment(recordId) {
    var att = _findAtt(recordId);
    if (!att || !att.Data) return;
    var isImg = attachmentIsImage(att.File_Type, att.File_Name);
    var isPdf = attachmentIsPdf(att.File_Type, att.File_Name);
    if (isImg || isPdf) {
      var overlay = document.getElementById("attachment-viewer");
      var body = document.getElementById("attachment-viewer-body");
      var title = document.getElementById("attachment-viewer-title");
      if (title) title.textContent = att.File_Name || "";
      if (body) {
        body.innerHTML = isImg ? '<img src="' + att.Data + '" style="max-width:100%;max-height:78vh;display:block;margin:0 auto;border-radius:8px;">' : '<iframe src="' + att.Data + '" style="width:80vw;height:78vh;border:none;border-radius:8px;"></iframe>';
      }
      if (overlay) overlay.style.display = "flex";
    } else {
      downloadAttachment(recordId);
    }
  }
  function closeAttachmentViewer() {
    var overlay = document.getElementById("attachment-viewer");
    var body = document.getElementById("attachment-viewer-body");
    if (body) body.innerHTML = "";
    if (overlay) overlay.style.display = "none";
  }
  function renderAttachmentsSection(taskId) {
    var container = document.getElementById("attachments-list-" + taskId);
    if (!container) return;
    var list = getTaskAttachments(taskId);
    var html = "";
    if (list.length === 0) {
      html = '<div class="attach-empty">' + (currentLang === "fr" ? "Aucune pi\xE8ce jointe" : "No attachments") + "</div>";
    } else {
      list.forEach(function(att) {
        var isImg = attachmentIsImage(att.File_Type, att.File_Name);
        var icon = isImg ? "\u{1F5BC}\uFE0F" : attachmentIsPdf(att.File_Type, att.File_Name) ? "\u{1F4C4}" : "\u{1F4CE}";
        html += '<div class="attach-item">';
        html += '<span class="attach-icon">' + icon + "</span>";
        html += '<span class="attach-name" onclick="viewAttachment(' + att.id + ')" title="' + (currentLang === "fr" ? "Voir" : "View") + '">' + sanitize(att.File_Name) + "</span>";
        html += '<span class="attach-size">' + formatFileSize(att.File_Size) + "</span>";
        html += '<button class="attach-btn" onclick="downloadAttachment(' + att.id + ')" title="' + (currentLang === "fr" ? "T\xE9l\xE9charger" : "Download") + '">\u2B07\uFE0F</button>';
        if (state.isOwner) html += '<button class="attach-btn" onclick="deleteAttachment(' + att.id + ", " + taskId + ')" title="' + t("delete") + '">\u{1F5D1}\uFE0F</button>';
        html += "</div>";
      });
    }
    container.innerHTML = html;
  }
  function openAttachmentInNewTab(recordId) {
    var att = _findAtt(recordId);
    if (!att || !att.Data) return;
    var win = window.open("", "_blank");
    if (win) {
      win.document.write('<iframe src="' + att.Data + '" style="border:0;width:100vw;height:100vh;"></iframe>');
      win.document.title = att.File_Name || "Attachment";
    } else {
      downloadAttachment(recordId);
    }
  }

  // src/domains/projects.js
  function populateProjectLead(selectedValue) {
    var sel = document.getElementById("project-lead");
    if (!sel) return;
    var html = '<option value="">--</option>';
    state.users.forEach(function(u) {
      var val = u.Email || u.Name;
      if (!val) return;
      html += '<option value="' + sanitize(val) + '"' + (val === selectedValue ? " selected" : "") + ">" + sanitize(u.Name || u.Email) + "</option>";
    });
    sel.innerHTML = html;
  }
  function openProjectModal() {
    if (!canEditWorkItems()) {
      showToast(currentLang === "fr" ? "Vous n\u2019avez pas les droits pour cr\xE9er un projet." : "You do not have permission to create a project.", "error");
      return;
    }
    document.getElementById("project-modal").style.display = "flex";
    document.getElementById("edit-project-id").value = "";
    document.getElementById("project-name").value = "";
    document.getElementById("project-description").value = "";
    document.getElementById("project-color").value = "#6366f1";
    document.getElementById("project-status").value = "active";
    populateProjectLead("");
    document.getElementById("project-form-title").textContent = t("addProject");
    var psearch = document.getElementById("project-search");
    if (psearch) psearch.value = "";
    renderProjectList();
  }
  function closeProjectModal() {
    document.getElementById("project-modal").style.display = "none";
  }
  var PROJECT_LIST_LIMIT = 5;
  function renderProjectList() {
    var searchEl = document.getElementById("project-search");
    var q = (searchEl && searchEl.value ? searchEl.value : "").trim().toLowerCase();
    var html = "";
    if (state.projects.length === 0) {
      html = '<div style="text-align:center;color:#94a3b8;padding:20px;">' + t("noProject") + "</div>";
      document.getElementById("project-list").innerHTML = html;
      return;
    }
    var sorted = state.projects.slice().sort(function(a, b) {
      return (b.id || 0) - (a.id || 0);
    });
    var matching = q ? sorted.filter(function(p) {
      return (p.Name || "").toLowerCase().indexOf(q) !== -1;
    }) : sorted;
    var shown = q ? matching : matching.slice(0, PROJECT_LIST_LIMIT);
    if (matching.length === 0) {
      html = '<div style="text-align:center;color:#94a3b8;padding:16px;">' + (currentLang === "fr" ? "Aucun projet trouv\xE9" : "No project found") + "</div>";
      document.getElementById("project-list").innerHTML = html;
      return;
    }
    var filteredTasks = getFilteredTasks();
    html = '<div class="project-items">';
    shown.forEach(function(proj) {
      var taskCount = filteredTasks.filter(function(t2) {
        return t2.Project_Id === proj.id;
      }).length;
      html += '<div class="project-item" style="border-left: 4px solid ' + (proj.Color || "#6366f1") + ';">';
      html += '<div class="project-item-info">';
      html += "<strong>" + sanitize(proj.Name) + "</strong>";
      var metaTxt = taskCount + " " + (currentLang === "fr" ? "t\xE2ches" : "tasks");
      if (proj.Lead) metaTxt += " \xB7 \u{1F464} " + (currentLang === "fr" ? "resp. " : "lead ") + sanitize(getUserDisplayName(proj.Lead));
      if (proj.CreatedBy) metaTxt += " \xB7 " + (currentLang === "fr" ? "cr\xE9\xE9 par " : "created by ") + sanitize(getUserDisplayName(proj.CreatedBy));
      html += '<span class="project-item-meta">' + metaTxt + "</span>";
      html += "</div>";
      html += '<div class="project-item-actions">';
      html += '<button class="btn-icon" onclick="editProject(' + proj.id + ')" title="' + t("editProject") + '">\u270F\uFE0F</button>';
      html += '<button class="btn-icon" onclick="deleteProject(' + proj.id + ')" title="' + t("deleteProject") + '">\u{1F5D1}\uFE0F</button>';
      html += "</div>";
      html += "</div>";
    });
    html += "</div>";
    if (!q && matching.length > PROJECT_LIST_LIMIT) {
      html += '<div style="text-align:center;color:#94a3b8;font-size:12px;padding:6px;">' + (currentLang === "fr" ? "+ " + (matching.length - PROJECT_LIST_LIMIT) + " autre(s) \u2014 utilisez la recherche" : "+ " + (matching.length - PROJECT_LIST_LIMIT) + " more \u2014 use search") + "</div>";
    }
    document.getElementById("project-list").innerHTML = html;
  }
  function editProject(projectId) {
    var proj = state.projects.find(function(p) {
      return p.id === projectId;
    });
    if (!proj) return;
    document.getElementById("edit-project-id").value = proj.id;
    document.getElementById("project-name").value = proj.Name || "";
    document.getElementById("project-description").value = proj.Description || "";
    document.getElementById("project-color").value = proj.Color || "#6366f1";
    document.getElementById("project-status").value = proj.Status || "active";
    populateProjectLead(proj.Lead || "");
    document.getElementById("project-form-title").textContent = t("editProject");
  }
  async function saveProject() {
    var projectId = document.getElementById("edit-project-id").value;
    var name = document.getElementById("project-name").value.trim();
    var description = document.getElementById("project-description").value.trim();
    var color = document.getElementById("project-color").value;
    var status = document.getElementById("project-status").value;
    var leadEl = document.getElementById("project-lead");
    var lead = leadEl ? leadEl.value : "";
    if (!name) {
      showToast(t("projectName") + " " + t("required"), "error");
      return;
    }
    try {
      var record = {};
      setField(record, "projects", "name", name);
      setField(record, "projects", "description", description);
      setField(record, "projects", "color", color);
      setField(record, "projects", "status", status);
      setField(record, "projects", "lead", lead);
      if (projectId) {
        await grist.docApi.applyUserActions([
          ["UpdateRecord", state.PROJECTS_TABLE, parseInt(projectId), record]
        ]);
        showToast(t("editProject") + " \u2713", "success");
      } else {
        if (state.PROJECTS_TABLE === state.DEFAULT_PROJECTS_TABLE) {
          record.CreatedBy = state.currentUserEmail || "";
          record.CreatedAt = (/* @__PURE__ */ new Date()).toISOString();
        }
        await grist.docApi.applyUserActions([
          ["AddRecord", state.PROJECTS_TABLE, null, record]
        ]);
        showToast(t("addProject") + " \u2713", "success");
      }
      closeModalForce();
      await loadAllData();
      refreshAllViews();
      renderProjectList();
      document.getElementById("edit-project-id").value = "";
      document.getElementById("project-name").value = "";
      document.getElementById("project-description").value = "";
      document.getElementById("project-color").value = "#6366f1";
      document.getElementById("project-status").value = "active";
      populateProjectLead("");
      document.getElementById("project-form-title").textContent = t("addProject");
    } catch (e) {
      console.error("Error saving project:", e);
      showToast("Error: " + e.message, "error");
    }
  }
  async function deleteProject(projectId) {
    var confirmed = await showConfirmModal(
      currentLang === "fr" ? "Supprimer ce projet ?" : "Delete this project?",
      currentLang === "fr" ? "Supprimer le projet" : "Delete project"
    );
    if (!confirmed) return;
    try {
      await grist.docApi.applyUserActions([
        ["RemoveRecord", state.PROJECTS_TABLE, projectId]
      ]);
      showToast(t("deleteProject") + " \u2713", "success");
      await loadAllData();
      renderProjectList();
    } catch (e) {
      console.error("Error deleting project:", e);
      showToast("Error: " + e.message, "error");
    }
  }

  // src/bootstrap/ensure-tables.js
  function applyFrenchTableNames(updateDefaults) {
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
  function hasFrenchClientTables(tableIds) {
    return tableIds.indexOf(CLIENT_TABLE_NAMES.config) !== -1 || tableIds.indexOf(CLIENT_TABLE_NAMES.tasks) !== -1;
  }
  function isInsideGrist() {
    try {
      return window.frameElement !== null || window !== window.parent;
    } catch (e) {
      return true;
    }
  }
  async function getRawSettingValue(key) {
    try {
      var data = await grist.docApi.fetchTable(state.SETTINGS_TABLE);
      if (!data || !data.Key) return null;
      for (var i = 0; i < data.Key.length; i++) {
        if (data.Key[i] === key) return data.Value[i];
      }
    } catch (e) {
    }
    return null;
  }
  function buildDefaultConfigRecords() {
    var defaultConfig = [
      ["task_title", state.TASKS_TABLE, "Title", "Titre", true, "Title"],
      ["task_description", state.TASKS_TABLE, "Description", "Description", false, "Description"],
      ["task_status", state.TASKS_TABLE, "Status", "Statut", true, "Status"],
      ["task_priority", state.TASKS_TABLE, "Priority", "Priorit\xE9", true, "Priority"],
      ["task_assignee", state.TASKS_TABLE, "Assignee", "Assign\xE9 \xE0", false, "Assignee"],
      ["task_group", state.TASKS_TABLE, "Group_Name", "Groupe", false, "Group_Name"],
      ["task_start_date", state.TASKS_TABLE, "Start_Date", "Date d\xE9but", false, "Start_Date"],
      ["task_due_date", state.TASKS_TABLE, "Due_Date", "\xC9ch\xE9ance", false, "Due_Date"],
      ["task_category", state.TASKS_TABLE, "Category", "Cat\xE9gorie", false, "Category"],
      ["task_tag", state.TASKS_TABLE, "Tag", "Tag", false, "Tag"],
      ["task_recurrence", state.TASKS_TABLE, "Recurrence", "R\xE9currence", false, "Recurrence"],
      ["task_estimated_hours", state.TASKS_TABLE, "Estimated_Hours", "Heures estim\xE9es", false, "Estimated_Hours"],
      ["task_created_at", state.TASKS_TABLE, "Created_At", "Cr\xE9\xE9 le", false, "Created_At"],
      ["task_project_id", state.PROJECTS_TABLE, "Project_Id", "Projet", false, "Project_Id"],
      ["user_name", state.USERS_TABLE, "Name", "Nom", true, "Name"],
      ["user_email", state.USERS_TABLE, "Email", "Email", true, "Email"],
      ["user_role", state.USERS_TABLE, "Role", "R\xF4le", false, "Role"],
      ["user_group", state.USERS_TABLE, "Group_Name", "Groupe", false, "Group_Name"],
      ["project_name", state.PROJECTS_TABLE, "Name", "Nom", true, "Name"],
      ["project_description", state.PROJECTS_TABLE, "Description", "Description", false, "Description"],
      ["project_color", state.PROJECTS_TABLE, "Color", "Couleur", false, "Color"],
      ["project_status", state.PROJECTS_TABLE, "Status", "Statut", false, "Status"]
    ];
    return defaultConfig.map(function(row) {
      return { Config_Key: row[0], Table_Name: row[1], Column_Name: row[2], Display_Label: row[3], Required: row[4], Default_Value: row[5] };
    });
  }
  async function ensureConfigAndSettingsTables(existingTables) {
    existingTables = existingTables || await grist.docApi.listTables();
    if (existingTables.indexOf(state.CONFIG_TABLE) === -1) {
      await grist.docApi.applyUserActions([
        ["AddTable", state.CONFIG_TABLE, [
          { id: "Config_Key", type: "Text" },
          { id: "Table_Name", type: "Text" },
          { id: "Column_Name", type: "Text" },
          { id: "Display_Label", type: "Text" },
          { id: "Required", type: "Bool" },
          { id: "Default_Value", type: "Text" }
        ]]
      ]);
      var configRecords = buildDefaultConfigRecords();
      await grist.docApi.applyUserActions([
        ["BulkAddRecord", state.CONFIG_TABLE, configRecords.map(function() {
          return null;
        }), configRecords]
      ]);
    }
    existingTables = await grist.docApi.listTables();
    if (existingTables.indexOf(state.SETTINGS_TABLE) === -1) {
      await grist.docApi.applyUserActions([
        ["AddTable", state.SETTINGS_TABLE, [
          { id: "Key", type: "Text" },
          { id: "Value", type: "Text" }
        ]]
      ]);
    }
  }
  async function tableHasColumns(tableId, requiredColumns) {
    try {
      var data = await grist.docApi.fetchTable(tableId);
      var columns = Object.keys(data || {}).filter(function(key) {
        return key !== "id";
      });
      return requiredColumns.every(function(columnId) {
        return columns.indexOf(columnId) !== -1;
      });
    } catch (e) {
      return false;
    }
  }
  async function hasValidMappedTaskTable(existingTables) {
    var configTables = [state.CONFIG_TABLE, CLIENT_TABLE_NAMES.config, "PM_Config"];
    for (var c = 0; c < configTables.length; c++) {
      var configTable = configTables[c];
      if (existingTables.indexOf(configTable) === -1) continue;
      try {
        var configData = await grist.docApi.fetchTable(configTable);
        var rows = configData && configData.id ? configData.id : [];
        var taskTable = "";
        var requiredColumns = [];
        for (var i = 0; i < rows.length; i++) {
          var key = configData.Config_Key && configData.Config_Key[i];
          if (key === "task_title") taskTable = configData.Table_Name[i] || taskTable;
          if (key === "task_title" || key === "task_status") {
            if (configData.Column_Name[i]) requiredColumns.push(configData.Column_Name[i]);
          }
        }
        if (!taskTable || existingTables.indexOf(taskTable) === -1) continue;
        if (requiredColumns.length < 2) continue;
        if (await tableHasColumns(taskTable, requiredColumns)) return true;
      } catch (e) {
        console.warn("Impossible de v\xE9rifier le mapping:", e.message);
      }
    }
    return false;
  }
  async function getInstallModeFromExistingSettings(existingTables) {
    var settingsTables = [state.SETTINGS_TABLE, CLIENT_TABLE_NAMES.settings, "PM_Settings"];
    for (var i = 0; i < settingsTables.length; i++) {
      var settingsTable = settingsTables[i];
      if (existingTables.indexOf(settingsTable) === -1) continue;
      var previousSettingsTable = state.SETTINGS_TABLE;
      state.SETTINGS_TABLE = settingsTable;
      var installMode = await getRawSettingValue("install_mode");
      state.SETTINGS_TABLE = previousSettingsTable;
      if (installMode) return installMode;
    }
    return "";
  }
  async function hasUsableDefaultTaskTable(existingTables) {
    var candidates = [CLIENT_TABLE_NAMES.tasks, "PM_Tasks"];
    for (var i = 0; i < candidates.length; i++) {
      var tableId = candidates[i];
      if (existingTables.indexOf(tableId) === -1) continue;
      if (await tableHasColumns(tableId, ["Title", "Status"])) return true;
    }
    return false;
  }
  async function shouldShowClientSetup(existingTables) {
    existingTables = existingTables || await grist.docApi.listTables();
    if (hasFrenchClientTables(existingTables)) applyFrenchTableNames(true);
    if (await hasUsableDefaultTaskTable(existingTables)) return false;
    if (await hasValidMappedTaskTable(existingTables)) return false;
    return true;
  }
  function showClientSetup() {
    var setup = document.getElementById("client-setup");
    if (setup) setup.classList.remove("hidden");
    var main = document.getElementById("main-content");
    if (main) main.classList.add("hidden");
  }
  function hideClientSetup() {
    var setup = document.getElementById("client-setup");
    if (setup) setup.classList.add("hidden");
    var main = document.getElementById("main-content");
    if (main) main.classList.remove("hidden");
  }
  function formatAccessError(error) {
    var message = error && error.message ? error.message : String(error || "");
    if (/access not granted|access denied|permission|autorisation/i.test(message)) {
      return "Acc\xE8s complet non accord\xE9. Dans le panneau du widget Grist, mettez le niveau d\u2019acc\xE8s sur \u201CAcc\xE8s complet au document\u201D, puis r\xE9essayez.";
    }
    return message;
  }
  function writeSetupDiagnostic(lines, type) {
    var box = document.getElementById("client-setup-diagnostics");
    if (!box) return;
    box.className = "client-setup-diagnostics " + (type || "");
    box.innerHTML = lines.map(function(line) {
      return "<div>" + sanitize(String(line)) + "</div>";
    }).join("");
  }
  async function runSetupDiagnostic() {
    var lines = ["Diagnostic v" + APP_VERSION];
    try {
      var tables = await grist.docApi.listTables();
      lines.push("Tables vues par le widget : " + (tables.length ? tables.join(", ") : "aucune"));
      var hasTaches = tables.indexOf(CLIENT_TABLE_NAMES.tasks) !== -1;
      var hasPmTasks = tables.indexOf("PM_Tasks") !== -1;
      lines.push("Table Taches d\xE9tect\xE9e : " + (hasTaches ? "oui" : "non"));
      lines.push("Table PM_Tasks d\xE9tect\xE9e : " + (hasPmTasks ? "oui" : "non"));
      lines.push("Structure utilisable : " + (await hasUsableDefaultTaskTable(tables) ? "oui" : "non"));
      lines.push("Mapping utilisable : " + (await hasValidMappedTaskTable(tables) ? "oui" : "non"));
      if (await shouldShowClientSetup(tables)) {
        lines.push("Conclusion : installation non reconnue, le choix cr\xE9ation/mapping doit rester affich\xE9.");
        writeSetupDiagnostic(lines, "warning");
      } else {
        lines.push("Conclusion : installation reconnue. Ouverture du widget...");
        writeSetupDiagnostic(lines, "success");
        hideClientSetup();
        setTimeout(function() {
          window.location.reload();
        }, 600);
      }
    } catch (e) {
      lines.push("Erreur : " + formatAccessError(e));
      writeSetupDiagnostic(lines, "error");
    }
  }
  async function setupCreateFrenchTables() {
    try {
      applyFrenchTableNames(true);
      hideClientSetup();
      showToast("Cr\xE9ation des tables en fran\xE7ais...", "info");
      await ensureTables();
      var tablesAfterCreate = await grist.docApi.listTables();
      if (!await hasUsableDefaultTaskTable(tablesAfterCreate)) {
        throw new Error("La table Taches n\u2019a pas pu \xEAtre v\xE9rifi\xE9e apr\xE8s cr\xE9ation. V\xE9rifiez que le widget a un acc\xE8s complet au document.");
      }
      await loadSettings();
      await saveSetting("install_mode", "french_auto");
      showToast("Tables cr\xE9\xE9es. Rechargement du widget...", "success");
      setTimeout(function() {
        window.location.reload();
      }, 700);
    } catch (e) {
      console.error("setupCreateFrenchTables:", e);
      showToast("Erreur pendant la cr\xE9ation : " + formatAccessError(e), "error");
      showClientSetup();
    }
  }
  async function setupUseExistingTables() {
    try {
      applyFrenchTableNames(true);
      hideClientSetup();
      showToast("Pr\xE9paration du mapping...", "info");
      switchTab("settings");
      setTimeout(function() {
        openColumnMappingModal();
      }, 250);
      showToast("Choisissez vos tables existantes dans le mapping.", "success");
    } catch (e) {
      console.error("setupUseExistingTables:", e);
      showToast("Erreur pendant la pr\xE9paration : " + formatAccessError(e), "error");
      showClientSetup();
    }
  }
  async function ensureTables() {
    try {
      var existingTables = await grist.docApi.listTables();
      if (hasFrenchClientTables(existingTables)) applyFrenchTableNames(true);
      var installMode = await getRawSettingValue("install_mode");
      var skipAutoCreateWorkTables = installMode === "mapping" || installMode === "mapping_started" || installMode === "mapping_complete";
      if (existingTables.indexOf(state.CONFIG_TABLE) !== -1) {
        await loadColumnMapping();
      }
      if (!skipAutoCreateWorkTables && (state.USERS_TABLE === state.DEFAULT_USERS_TABLE && existingTables.indexOf(state.USERS_TABLE) === -1)) {
        await grist.docApi.applyUserActions([
          ["AddTable", state.USERS_TABLE, [
            { id: "Name", type: "Text" },
            { id: "Email", type: "Text" },
            { id: "Role", type: "Choice", widgetOptions: JSON.stringify({ choices: ["admin", "member", "viewer"] }) },
            { id: "Group_Name", type: "Text" }
          ]]
        ]);
      }
      if (!skipAutoCreateWorkTables && (state.TASKS_TABLE === state.DEFAULT_TASKS_TABLE && existingTables.indexOf(state.TASKS_TABLE) === -1)) {
        await grist.docApi.applyUserActions([
          ["AddTable", state.TASKS_TABLE, [
            { id: "Title", type: "Text" },
            { id: "Description", type: "Text" },
            { id: "Status", type: "Choice", widgetOptions: JSON.stringify({ choices: ["todo", "progress", "done", "archived"] }) },
            { id: "Priority", type: "Choice", widgetOptions: JSON.stringify({ choices: ["high", "medium", "low"] }) },
            { id: "Assignee", type: "RefList:" + state.USERS_TABLE },
            { id: "Group_Name", type: "Text" },
            { id: "Start_Date", type: "Date" },
            { id: "Due_Date", type: "Date" },
            { id: "Category", type: "Choice" },
            { id: "Tag", type: "ChoiceList" },
            { id: "Recurrence", type: "Choice", widgetOptions: JSON.stringify({ choices: ["none", "daily", "weekly", "monthly"] }) },
            { id: "Estimated_Hours", type: "Numeric" },
            { id: "Created_At", type: "Date" }
          ]]
        ]);
      }
      if (!skipAutoCreateWorkTables && existingTables.indexOf(state.GROUPS_TABLE) === -1) {
        await grist.docApi.applyUserActions([
          ["AddTable", state.GROUPS_TABLE, [
            { id: "Name", type: "Text" },
            { id: "Description", type: "Text" }
          ]]
        ]);
      }
      if (!skipAutoCreateWorkTables && existingTables.indexOf(state.SUBTASKS_TABLE) === -1) {
        await grist.docApi.applyUserActions([
          ["AddTable", state.SUBTASKS_TABLE, [
            { id: "Parent_Task_Id", type: "Int" },
            { id: "Title", type: "Text" },
            { id: "Description", type: "Text" },
            { id: "Status", type: "Choice", widgetOptions: JSON.stringify({ choices: ["todo", "progress", "done", "archived"] }) },
            { id: "Priority", type: "Choice", widgetOptions: JSON.stringify({ choices: ["high", "medium", "low"] }) },
            { id: "Assignee", type: "Text" },
            { id: "Due_Date", type: "Date" },
            { id: "Estimated_Hours", type: "Numeric" },
            { id: "Completed", type: "Bool" },
            { id: "Order", type: "Int" },
            { id: "Created_At", type: "Date" }
          ]]
        ]);
      }
      if (!skipAutoCreateWorkTables && existingTables.indexOf(state.COMMENTS_TABLE) === -1) {
        await grist.docApi.applyUserActions([
          ["AddTable", state.COMMENTS_TABLE, [
            { id: "Task_Id", type: "Int" },
            { id: "Author", type: "Text" },
            { id: "Content", type: "Text" },
            { id: "Created_At", type: "Date" }
          ]]
        ]);
      }
      if (!skipAutoCreateWorkTables && existingTables.indexOf(state.TIME_ENTRIES_TABLE) === -1) {
        await grist.docApi.applyUserActions([
          ["AddTable", state.TIME_ENTRIES_TABLE, [
            { id: "Task_Id", type: "Int" },
            { id: "User", type: "Text" },
            { id: "Start_Time", type: "Date" },
            { id: "End_Time", type: "Date" },
            { id: "Duration", type: "Int" },
            { id: "Description", type: "Text" }
          ]]
        ]);
      }
      if (!skipAutoCreateWorkTables && existingTables.indexOf(state.ATTACHMENTS_TABLE) === -1) {
        await grist.docApi.applyUserActions([
          ["AddTable", state.ATTACHMENTS_TABLE, [
            { id: "Task_Id", type: "Int" },
            { id: "File_Name", type: "Text" },
            { id: "File_Type", type: "Text" },
            { id: "File_Size", type: "Int" },
            { id: "File_Data", type: "Text" },
            { id: "Created_At", type: "DateTime" }
          ]]
        ]);
      } else {
        try {
          var attCols = Object.keys(await grist.docApi.fetchTable(state.ATTACHMENTS_TABLE));
          if (attCols.indexOf("File_Data") === -1) {
            await grist.docApi.applyUserActions([["AddColumn", state.ATTACHMENTS_TABLE, "File_Data", { type: "Text" }]]);
          }
        } catch (mig) {
          console.log("[GristPM] Migration File_Data ignor\xE9e :", mig.message);
        }
      }
      if (!skipAutoCreateWorkTables && (state.PROJECTS_TABLE === state.DEFAULT_PROJECTS_TABLE && existingTables.indexOf(state.PROJECTS_TABLE) === -1)) {
        await grist.docApi.applyUserActions([
          ["AddTable", state.PROJECTS_TABLE, [
            { id: "Name", type: "Text" },
            { id: "Description", type: "Text" },
            { id: "Color", type: "Text" },
            { id: "Status", type: "Choice", widgetOptions: JSON.stringify({ choices: ["active", "archived", "completed"] }) },
            { id: "Start_Date", type: "Date" },
            { id: "End_Date", type: "Date" },
            { id: "Lead", type: "Text" },
            { id: "CreatedBy", type: "Text" },
            { id: "CreatedAt", type: "Text" }
          ]]
        ]);
      }
      try {
        var taskColsCheck = Object.keys(await grist.docApi.fetchTable(state.TASKS_TABLE));
        if (taskColsCheck.indexOf("Project_Id") === -1) {
          await grist.docApi.applyUserActions([
            ["AddColumn", state.TASKS_TABLE, "Project_Id", { type: "Ref:" + state.PROJECTS_TABLE }]
          ]);
          console.log("[GristPM] Project_Id ajout\xE9 \xE0 " + state.TASKS_TABLE);
        } else {
          await grist.docApi.applyUserActions([
            ["ModifyColumn", state.TASKS_TABLE, "Project_Id", { type: "Ref:" + state.PROJECTS_TABLE }]
          ]);
        }
      } catch (e) {
        console.log("[GristPM] Migration Project_Id ignor\xE9e :", e.message);
      }
      try {
        var projCols = Object.keys(await grist.docApi.fetchTable(state.PROJECTS_TABLE));
        var projMig = [];
        if (projCols.indexOf("CreatedBy") === -1) projMig.push(["AddColumn", state.PROJECTS_TABLE, "CreatedBy", { type: "Text" }]);
        if (projCols.indexOf("CreatedAt") === -1) projMig.push(["AddColumn", state.PROJECTS_TABLE, "CreatedAt", { type: "Text" }]);
        if (projCols.indexOf("Lead") === -1) projMig.push(["AddColumn", state.PROJECTS_TABLE, "Lead", { type: "Text" }]);
        if (projMig.length) {
          await grist.docApi.applyUserActions(projMig);
          console.log("[GristPM] CreatedBy/CreatedAt ajout\xE9s \xE0 PM_Projects");
        }
      } catch (e) {
        console.log("[GristPM] Migration CreatedBy ignor\xE9e :", e.message);
      }
      await ensureConfigAndSettingsTables(existingTables);
      existingTables = await grist.docApi.listTables();
      if (existingTables.indexOf(state.SETTINGS_TABLE) === -1) {
        await grist.docApi.applyUserActions([
          ["AddTable", state.SETTINGS_TABLE, [
            { id: "Key", type: "Text" },
            { id: "Value", type: "Text" }
          ]]
        ]);
      }
      if (!skipAutoCreateWorkTables && existingTables.indexOf(state.NOTIFICATIONS_TABLE) === -1) {
        await grist.docApi.applyUserActions([
          ["AddTable", state.NOTIFICATIONS_TABLE, [
            { id: "Task_Id", type: "Int" },
            { id: "User_Email", type: "Text" },
            { id: "Type", type: "Text" },
            { id: "Message", type: "Text" },
            { id: "Created_At", type: "Date" },
            { id: "Rule_Id", type: "Text" }
          ]]
        ]);
      }
      if (existingTables.indexOf(state.TASKS_TABLE) !== -1) {
        try {
          var tableInfo = await grist.docApi.fetchTable(state.TASKS_TABLE);
          var existingCols = Object.keys(tableInfo);
          if (existingCols.indexOf("Recurrence") === -1) {
            await grist.docApi.applyUserActions([
              ["AddColumn", state.TASKS_TABLE, "Recurrence", { type: "Choice", widgetOptions: JSON.stringify({ choices: ["none", "daily", "weekly", "monthly"] }) }]
            ]);
          }
          if (existingCols.indexOf("Estimated_Hours") === -1) {
            await grist.docApi.applyUserActions([
              ["AddColumn", state.TASKS_TABLE, "Estimated_Hours", { type: "Numeric" }]
            ]);
          }
          if (existingCols.indexOf("Tag") === -1) {
            await grist.docApi.applyUserActions([
              ["AddColumn", state.TASKS_TABLE, "Tag", { type: "ChoiceList" }]
            ]);
          }
          var raciCols = ["Accountable", "Consulted", "Informed"];
          var raciActions = [];
          for (var rc = 0; rc < raciCols.length; rc++) {
            if (existingCols.indexOf(raciCols[rc]) === -1) {
              raciActions.push(["AddColumn", state.TASKS_TABLE, raciCols[rc], { type: "Text" }]);
            }
          }
          if (raciActions.length > 0) {
            await grist.docApi.applyUserActions(raciActions);
          }
          if (existingCols.indexOf("Extension_Date") === -1) {
            await grist.docApi.applyUserActions([["AddColumn", state.TASKS_TABLE, "Extension_Date", { type: "Date" }]]);
          }
          if (existingCols.indexOf("Auto_Extend") === -1) {
            await grist.docApi.applyUserActions([["AddColumn", state.TASKS_TABLE, "Auto_Extend", { type: "Bool" }]]);
          }
        } catch (migrationErr) {
          console.log("Migration check completed or columns already exist");
        }
      }
      if (existingTables.indexOf(state.SUBTASKS_TABLE) !== -1) {
        try {
          var stInfo = await grist.docApi.fetchTable(state.SUBTASKS_TABLE);
          var stCols = Object.keys(stInfo);
          var stActions = [];
          if (stCols.indexOf("Blocked_By_Subtask_Id") === -1) {
            stActions.push(["AddColumn", state.SUBTASKS_TABLE, "Blocked_By_Subtask_Id", { type: "Int" }]);
          }
          if (stCols.indexOf("Assignee") === -1) {
            stActions.push(["AddColumn", state.SUBTASKS_TABLE, "Assignee", { type: "Text" }]);
          }
          if (stCols.indexOf("Due_Date") === -1) {
            stActions.push(["AddColumn", state.SUBTASKS_TABLE, "Due_Date", { type: "Date" }]);
          }
          if (stCols.indexOf("Description") === -1) {
            stActions.push(["AddColumn", state.SUBTASKS_TABLE, "Description", { type: "Text" }]);
          }
          if (stCols.indexOf("Status") === -1) {
            stActions.push(["AddColumn", state.SUBTASKS_TABLE, "Status", { type: "Choice", widgetOptions: JSON.stringify({ choices: ["todo", "progress", "done", "archived"] }) }]);
          }
          if (stCols.indexOf("Priority") === -1) {
            stActions.push(["AddColumn", state.SUBTASKS_TABLE, "Priority", { type: "Choice", widgetOptions: JSON.stringify({ choices: ["high", "medium", "low"] }) }]);
          }
          if (stCols.indexOf("Estimated_Hours") === -1) {
            stActions.push(["AddColumn", state.SUBTASKS_TABLE, "Estimated_Hours", { type: "Numeric" }]);
          }
          if (stCols.indexOf("Recurrence") === -1) {
            stActions.push(["AddColumn", state.SUBTASKS_TABLE, "Recurrence", { type: "Choice", widgetOptions: JSON.stringify({ choices: ["none", "daily", "weekly", "monthly"] }) }]);
          }
          if (stCols.indexOf("Start_Date") === -1) {
            stActions.push(["AddColumn", state.SUBTASKS_TABLE, "Start_Date", { type: "Date" }]);
          }
          if (stCols.indexOf("Type") === -1) {
            stActions.push(["AddColumn", state.SUBTASKS_TABLE, "Type", { type: "Choice", widgetOptions: JSON.stringify({ choices: ["subtask", "milestone"] }) }]);
          }
          if (stActions.length > 0) {
            await grist.docApi.applyUserActions(stActions);
          }
        } catch (e) {
          console.log("Subtask migration completed");
        }
      }
    } catch (e) {
      console.error("Error ensuring tables:", e);
    }
  }

  // src/domains/column-mapping-ui.js
  async function openColumnMappingModal() {
    var html = '<div class="modal-overlay" onclick="closeModal(event)">';
    html += '<div class="modal" style="max-width:800px;" onclick="event.stopPropagation()">';
    html += '<div class="modal-header">';
    html += "<h3>\u{1F527} Configuration du mapping des colonnes</h3>";
    html += '<button class="modal-close" onclick="closeModalForce()">\u2715</button>';
    html += "</div>";
    html += '<div class="modal-body" style="max-height:600px;overflow-y:auto;">';
    html += '<div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:12px;margin-bottom:20px;">';
    html += '<p style="margin:0;font-size:13px;color:#0c4a6e;">';
    html += "\u{1F4A1} <strong>Info :</strong> Cette configuration permet de mapper vos propres tables et colonnes Grist existantes. ";
    html += "Utile si vous avez d\xE9j\xE0 des donn\xE9es et souhaitez les r\xE9utiliser avec ce widget.";
    html += "</p></div>";
    var availableTables = [];
    try {
      availableTables = await grist.docApi.listTables();
    } catch (e) {
      console.error("Error listing tables:", e);
    }
    html += '<div class="form-section" style="margin-bottom:25px;">';
    html += '<h4 style="margin-bottom:15px;color:#1e293b;">\u{1F4CB} Table des T\xE2ches</h4>';
    html += '<div class="form-group">';
    html += "<label>Nom de la table</label>";
    html += '<select id="mapping-tasks-table" onchange="detectTaskColumns()">';
    for (var i = 0; i < availableTables.length; i++) {
      var selected = availableTables[i] === state.TASKS_TABLE ? " selected" : "";
      html += '<option value="' + sanitize(availableTables[i]) + '"' + selected + ">" + sanitize(availableTables[i]) + "</option>";
    }
    html += "</select>";
    html += "</div>";
    html += '<div id="tasks-columns-mapping"></div>';
    html += "</div>";
    html += '<div class="form-section" style="margin-bottom:25px;">';
    html += '<h4 style="margin-bottom:15px;color:#1e293b;">\u{1F465} Table des Utilisateurs</h4>';
    html += '<div class="form-group">';
    html += "<label>Nom de la table</label>";
    html += '<select id="mapping-users-table" onchange="detectUserColumns()">';
    for (var i = 0; i < availableTables.length; i++) {
      var selected = availableTables[i] === state.USERS_TABLE ? " selected" : "";
      html += '<option value="' + sanitize(availableTables[i]) + '"' + selected + ">" + sanitize(availableTables[i]) + "</option>";
    }
    html += "</select>";
    html += "</div>";
    html += '<div id="users-columns-mapping"></div>';
    html += "</div>";
    html += '<div class="form-section" style="margin-bottom:25px;">';
    html += '<h4 style="margin-bottom:15px;color:#1e293b;">\u{1F4C2} Table des Projets</h4>';
    html += '<div class="form-group">';
    html += "<label>Nom de la table</label>";
    html += '<select id="mapping-projects-table" onchange="detectProjectColumns()">';
    for (var i = 0; i < availableTables.length; i++) {
      var selected = availableTables[i] === state.PROJECTS_TABLE ? " selected" : "";
      html += '<option value="' + sanitize(availableTables[i]) + '"' + selected + ">" + sanitize(availableTables[i]) + "</option>";
    }
    html += "</select>";
    html += "</div>";
    html += '<div id="projects-columns-mapping"></div>';
    html += "</div>";
    html += "</div>";
    html += '<div class="modal-footer">';
    html += '<button class="btn btn-secondary" onclick="closeModalForce()">Annuler</button>';
    html += '<button class="btn btn-primary" onclick="saveColumnMapping()">\u{1F4BE} Enregistrer la configuration</button>';
    html += "</div>";
    html += "</div></div>";
    document.getElementById("modal-container").innerHTML = html;
    await detectTaskColumns();
    await detectUserColumns();
    await detectProjectColumns();
  }
  async function detectTaskColumns() {
    var tableName = document.getElementById("mapping-tasks-table").value;
    var html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px;">';
    try {
      var tableData = await grist.docApi.fetchTable(tableName);
      var columns = Object.keys(tableData).filter(function(k) {
        return k !== "id";
      });
      var fields = [
        { key: "title", label: "Titre", required: true },
        { key: "description", label: "Description", required: false },
        { key: "status", label: "Statut", required: true },
        { key: "priority", label: "Priorit\xE9", required: true },
        { key: "assignee", label: "Assign\xE9 \xE0", required: false },
        { key: "group", label: "Groupe", required: false },
        { key: "startDate", label: "Date d\xE9but", required: false },
        { key: "dueDate", label: "\xC9ch\xE9ance", required: false },
        { key: "category", label: "Cat\xE9gorie", required: false },
        { key: "tag", label: "Tag", required: false },
        { key: "recurrence", label: "R\xE9currence", required: false },
        { key: "estimatedHours", label: "Heures estim\xE9es", required: false },
        { key: "createdAt", label: "Cr\xE9\xE9 le", required: false },
        { key: "projectId", label: "Projet", required: false }
      ];
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var currentCol = getColumnName("tasks", field.key);
        html += '<div class="form-group">';
        html += "<label>" + field.label + (field.required ? ' <span style="color:#ef4444;">*</span>' : "") + "</label>";
        html += '<select id="map-task-' + field.key + '">';
        html += '<option value="">-- Non mapp\xE9 --</option>';
        for (var j = 0; j < columns.length; j++) {
          var selected = columns[j] === currentCol ? " selected" : "";
          html += '<option value="' + sanitize(columns[j]) + '"' + selected + ">" + sanitize(columns[j]) + "</option>";
        }
        html += "</select>";
        html += "</div>";
      }
    } catch (e) {
      html += '<p style="color:#ef4444;">Erreur lors du chargement des colonnes</p>';
    }
    html += "</div>";
    document.getElementById("tasks-columns-mapping").innerHTML = html;
  }
  async function detectUserColumns() {
    var tableName = document.getElementById("mapping-users-table").value;
    var html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px;">';
    try {
      var tableData = await grist.docApi.fetchTable(tableName);
      var columns = Object.keys(tableData).filter(function(k) {
        return k !== "id";
      });
      var fields = [
        { key: "name", label: "Nom", required: true },
        { key: "email", label: "Email", required: true },
        { key: "role", label: "R\xF4le", required: false },
        { key: "group", label: "Groupe", required: false }
      ];
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var currentCol = getColumnName("users", field.key);
        html += '<div class="form-group">';
        html += "<label>" + field.label + (field.required ? ' <span style="color:#ef4444;">*</span>' : "") + "</label>";
        html += '<select id="map-user-' + field.key + '">';
        html += '<option value="">-- Non mapp\xE9 --</option>';
        for (var j = 0; j < columns.length; j++) {
          var selected = columns[j] === currentCol ? " selected" : "";
          html += '<option value="' + sanitize(columns[j]) + '"' + selected + ">" + sanitize(columns[j]) + "</option>";
        }
        html += "</select>";
        html += "</div>";
      }
    } catch (e) {
      html += '<p style="color:#ef4444;">Erreur lors du chargement des colonnes</p>';
    }
    html += "</div>";
    document.getElementById("users-columns-mapping").innerHTML = html;
  }
  async function detectProjectColumns() {
    var tableName = document.getElementById("mapping-projects-table").value;
    var html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px;">';
    try {
      var tableData = await grist.docApi.fetchTable(tableName);
      var columns = Object.keys(tableData).filter(function(k) {
        return k !== "id";
      });
      var fields = [
        { key: "name", label: "Nom", required: true },
        { key: "description", label: "Description", required: false },
        { key: "color", label: "Couleur", required: false },
        { key: "status", label: "Statut", required: false }
      ];
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var currentCol = getColumnName("projects", field.key);
        html += '<div class="form-group">';
        html += "<label>" + field.label + (field.required ? ' <span style="color:#ef4444;">*</span>' : "") + "</label>";
        html += '<select id="map-project-' + field.key + '">';
        html += '<option value="">-- Non mapp\xE9 --</option>';
        for (var j = 0; j < columns.length; j++) {
          var selected = columns[j] === currentCol ? " selected" : "";
          html += '<option value="' + sanitize(columns[j]) + '"' + selected + ">" + sanitize(columns[j]) + "</option>";
        }
        html += "</select>";
        html += "</div>";
      }
    } catch (e) {
      html += '<p style="color:#ef4444;">Erreur lors du chargement des colonnes</p>';
    }
    html += "</div>";
    document.getElementById("projects-columns-mapping").innerHTML = html;
  }
  async function saveColumnMapping() {
    try {
      var updates = [];
      var tasksTable = document.getElementById("mapping-tasks-table").value;
      var taskFields = ["title", "description", "status", "priority", "assignee", "group", "startDate", "dueDate", "category", "tag", "recurrence", "estimatedHours", "createdAt", "projectId"];
      for (var i = 0; i < taskFields.length; i++) {
        var field = taskFields[i];
        var el = document.getElementById("map-task-" + field);
        if (el && el.value) {
          var configKey = "task_" + field.replace(/([A-Z])/g, "_$1").toLowerCase();
          updates.push({ key: configKey, table: tasksTable, column: el.value });
        }
      }
      var usersTable = document.getElementById("mapping-users-table").value;
      var userFields = ["name", "email", "role", "group"];
      for (var i = 0; i < userFields.length; i++) {
        var field = userFields[i];
        var el = document.getElementById("map-user-" + field);
        if (el && el.value) {
          var configKey = "user_" + field;
          updates.push({ key: configKey, table: usersTable, column: el.value });
        }
      }
      var projectsTable = document.getElementById("mapping-projects-table").value;
      var projectFields = ["name", "description", "color", "status"];
      for (var i = 0; i < projectFields.length; i++) {
        var field = projectFields[i];
        var el = document.getElementById("map-project-" + field);
        if (el && el.value) {
          var configKey = "project_" + field;
          updates.push({ key: configKey, table: projectsTable, column: el.value });
        }
      }
      try {
        await ensureConfigAndSettingsTables(await grist.docApi.listTables());
        await loadSettings();
      } catch (accessError) {
        showToast(formatAccessError(accessError), "error");
        return;
      }
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
          actions.push(["UpdateRecord", state.CONFIG_TABLE, recordId, {
            Table_Name: update.table,
            Column_Name: update.column
          }]);
        } else {
          actions.push(["AddRecord", state.CONFIG_TABLE, null, {
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
        await saveSetting("install_mode", "mapping_complete");
      } else {
        await saveSetting("install_mode", "mapping_started");
        showToast("Mapping incomplet : v\xE9rifiez au minimum la table des t\xE2ches, le titre et le statut.", "error");
        return;
      }
      showToast("\u2713 Configuration sauvegard\xE9e", "success");
      closeModalForce();
      await loadAllData();
      refreshAllViews();
    } catch (e) {
      console.error("Error saving column mapping:", e);
      showToast("Erreur lors de la sauvegarde: " + formatAccessError(e), "error");
    }
  }

  // src/main.js
  Object.assign(window, {
    addCategorySetting,
    addComment,
    addDefaultAutomationRules,
    addKanbanStatus,
    addManualTimeEntry,
    addRaciChip,
    addRoleChoice,
    addSubtask,
    addTagChip,
    addTagSetting,
    applySecurityRules,
    archiveTask,
    cancelEditSubtask,
    closeAttachmentViewer,
    closeAutomationModal,
    closeConfirmModal,
    closeModal,
    closeModalForce,
    closeNotifications,
    closeProjectModal,
    closePromptModal,
    createGroup,
    createTask,
    createUser,
    deleteAttachment,
    deleteAutomationRule,
    deleteComment,
    deleteGroup,
    deleteProject,
    deleteSubtask,
    deleteTask,
    deleteUser,
    detectProjectColumns,
    detectTaskColumns,
    detectUserColumns,
    dismissNotification,
    dismissAllNotifications,
    downloadAttachment,
    editCategorySetting,
    editKanbanStatus,
    editProject,
    editTagSetting,
    exportGanttPdf,
    filterComboSearch,
    filterProjectDropdown,
    filterStAssignees,
    focusGanttTask,
    ganttCollapseAll,
    ganttExpandAll,
    ganttNav,
    ganttToday,
    generateOccurrences,
    generateSubtaskOccurrences,
    onAutoActionChange,
    onAutoTriggerChange,
    onDragLeave,
    onDragOver,
    onDragStart,
    onDrop,
    openAddAutomationRuleModal,
    openAttachmentInNewTab,
    openCardAttachmentsModal,
    openCardCommentsModal,
    openCardSubtasksModal,
    openColumnMappingModal,
    openEditAutomationRuleModal,
    openEditGroupModal,
    openEditTaskModal,
    openEditUserModal,
    openManageRolesModal,
    openNewGroupModal,
    openNewTaskModal,
    openNewUserModal,
    openNotification,
    openProjectModal,
    openProjectModalForEdit,
    openSubtaskDepModal,
    pauseTimer,
    quickAction,
    removeCategorySetting,
    removeKanbanStatus,
    removeRaciChip,
    removeRoleChoice,
    removeSecurityRules,
    removeTagChip,
    removeTagSetting,
    renderEmojiPicker,
    renderProjectList,
    renderSettingsProjectsList,
    resetFilters,
    restoreTask,
    runSetupDiagnostic,
    saveAutomationRuleFromModal,
    saveColumnMapping,
    saveEditSubtask,
    saveInlineProjectEdit,
    saveProject,
    saveRoleChoices,
    saveTaskFromFooter,
    saveUiLabelSettings,
    selectEmoji,
    selectFilterCombo,
    selectProjectOption,
    setGanttCustomRange,
    setGanttMode,
    setGanttSort,
    setGanttYear,
    setKanbanGroupBy,
    setKanbanSort,
    setStPill,
    setStStatus,
    setStType,
    setupCreateFrenchTables,
    setupUseExistingTables,
    showNotifications,
    startEditSubtask,
    startTimer,
    submitPromptModal,
    switchTab,
    toggleArchiveView,
    toggleAutomationRule,
    toggleCardDisplay,
    toggleCardExpand,
    toggleEmojiPicker,
    toggleFilterCombo,
    toggleGanttFullscreen,
    toggleGanttSubtask,
    toggleKanbanCol,
    toggleKanbanFullscreen,
    toggleMyProjects,
    toggleNotifyConcerned,
    toggleProjectDropdown,
    toggleRaci,
    toggleSubtask,
    toggleSubtaskFromCard,
    toggleSubtaskFromPopup,
    updateGroup,
    updateSubtaskDep,
    updateTask,
    updateUser,
    uploadTaskAttachments,
    viewAttachment
  });
  var kanbanSort = "manual";
  var customKanbanStatuses = null;
  var defaultCardDisplay = { description: true, priority: true, date: true, assignee: true, tags: true, category: true, time: true, subtasks: true, comments: true };
  var cardDisplaySettings = Object.assign({}, defaultCardDisplay);
  async function loadSettings() {
    try {
      var data = await grist.docApi.fetchTable(state.SETTINGS_TABLE);
      state._settingsCache = {};
      if (data && data.id) {
        for (var i = 0; i < data.id.length; i++) {
          state._settingsCache[data.Key[i]] = { id: data.id[i], value: data.Value[i] };
        }
      }
      if (state._settingsCache.kanban_statuses) {
        try {
          customKanbanStatuses = JSON.parse(state._settingsCache.kanban_statuses.value);
        } catch (e) {
        }
      }
      if (state._settingsCache.categories) setCategoriesFromSettings(state._settingsCache.categories.value);
      if (state._settingsCache.tags) setTagsFromSettings(state._settingsCache.tags.value);
      if (state._settingsCache.card_display) {
        try {
          cardDisplaySettings = Object.assign({}, defaultCardDisplay, JSON.parse(state._settingsCache.card_display.value));
        } catch (e) {
        }
      }
      if (state._settingsCache.raci_enabled) {
        state.raciEnabled = state._settingsCache.raci_enabled.value === "true";
      }
      if (state._settingsCache.kanban_sort) {
        kanbanSort = state._settingsCache.kanban_sort.value || "manual";
      }
      if (state._settingsCache.automation_rules) {
        try {
          state.automationRules = JSON.parse(state._settingsCache.automation_rules.value);
        } catch (e2) {
          state.automationRules = [];
        }
      }
      if (state._settingsCache.notify_concerned) {
        state.notifyConcernedEnabled = state._settingsCache.notify_concerned.value !== "false";
      }
      if (state._settingsCache.ui_labels) {
        try {
          state.uiLabels = Object.assign({}, defaultUiLabels, JSON.parse(state._settingsCache.ui_labels.value));
        } catch (e3) {
        }
      }
    } catch (e) {
      console.log("[GristPM] PM_Settings not available yet");
    }
  }
  function setKanbanSort(value) {
    kanbanSort = value;
    saveSetting("kanban_sort", value);
    renderKanbanView();
  }
  var _statusDragIndex = null;
  function renderKanbanStatusesList() {
    var container = document.getElementById("kanban-statuses-list");
    if (!container) return;
    var statuses = getKanbanStatuses();
    var html = "";
    for (var i = 0; i < statuses.length; i++) {
      var s = statuses[i];
      var label = currentLang === "fr" ? s.label_fr : s.label_en;
      var c = s.color || "#94a3b8";
      html += '<div class="kanban-status-item" draggable="true" data-status-index="' + i + '" data-color="' + c + '" style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:white;border-radius:8px;margin-bottom:6px;border:1px solid #e2e8f0;border-left:3px solid transparent;">';
      html += '<span class="kanban-status-drag-handle" title="' + (currentLang === "fr" ? "Glisser pour r\xE9ordonner" : "Drag to reorder") + '">\u283F</span>';
      html += '<span style="width:14px;height:14px;border-radius:50%;background:' + (s.color || "#94a3b8") + ';flex-shrink:0;"></span>';
      html += '<span style="flex:1;font-size:13px;font-weight:600;">' + sanitize(label) + "</span>";
      html += '<span style="font-size:10px;color:#94a3b8;font-family:monospace;">' + sanitize(s.key) + "</span>";
      html += '<button class="btn-icon" onclick="editKanbanStatus(' + i + ')" title="' + (currentLang === "fr" ? "Modifier" : "Edit") + '">\u270F\uFE0F</button>';
      if (statuses.length > 2) html += '<button class="btn-icon" onclick="removeKanbanStatus(' + i + ')" title="' + t("delete") + '">\u{1F5D1}\uFE0F</button>';
      html += "</div>";
    }
    container.innerHTML = html;
    var items = container.querySelectorAll(".kanban-status-item");
    items.forEach(function(item) {
      var col = item.dataset.color;
      item.addEventListener("mouseenter", function() {
        item.style.background = col + "10";
        item.style.borderColor = col + "30";
        item.style.borderLeftColor = col;
      });
      item.addEventListener("mouseleave", function() {
        item.style.background = "white";
        item.style.borderColor = "#e2e8f0";
        item.style.borderLeftColor = "transparent";
      });
      item.addEventListener("dragstart", function(e) {
        _statusDragIndex = parseInt(item.dataset.statusIndex);
        item.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
      });
      item.addEventListener("dragend", function() {
        item.classList.remove("dragging");
        items.forEach(function(el) {
          el.classList.remove("drag-over-above", "drag-over-below");
        });
        _statusDragIndex = null;
      });
      item.addEventListener("dragover", function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        var targetIndex = parseInt(item.dataset.statusIndex);
        if (targetIndex === _statusDragIndex) return;
        items.forEach(function(el) {
          el.classList.remove("drag-over-above", "drag-over-below");
        });
        item.classList.add(targetIndex < _statusDragIndex ? "drag-over-above" : "drag-over-below");
      });
      item.addEventListener("dragleave", function() {
        item.classList.remove("drag-over-above", "drag-over-below");
      });
      item.addEventListener("drop", function(e) {
        e.preventDefault();
        items.forEach(function(el) {
          el.classList.remove("drag-over-above", "drag-over-below");
        });
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
      currentLang === "fr" ? "Nouveau statut" : "New status",
      [
        { label: currentLang === "fr" ? "Nom (FR)" : "Name (FR)", placeholder: currentLang === "fr" ? "Ex: \xC0 valider" : "Ex: In review" },
        { label: currentLang === "fr" ? "Nom (EN)" : "Name (EN)", placeholder: currentLang === "fr" ? "Ex: To validate" : "Ex: In review" },
        { label: "Emoji", type: "emoji", placeholder: currentLang === "fr" ? "Ex: \u2705 \u{1F50D} \u{1F4CB}" : "Ex: \u2705 \u{1F50D} \u{1F4CB}" },
        { label: currentLang === "fr" ? "Couleur" : "Color", type: "color" }
      ],
      ["", "", "", "#8b5cf6"]
    );
    if (!result || !result[0]) return;
    var labelFr = result[0].trim();
    var labelEn = (result[1] || "").trim() || labelFr;
    var emoji = (result[2] || "").trim();
    var color = result[3] || "#8b5cf6";
    var key = labelFr.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
    if (!key) return;
    var existing = getKanbanStatuses();
    if (existing.some(function(s) {
      return s.key === key;
    })) {
      showToast(currentLang === "fr" ? "Ce statut existe d\xE9j\xE0" : "This status already exists", "error");
      return;
    }
    ensureCustomStatuses();
    customKanbanStatuses.push({ key, label_fr: labelFr, label_en: labelEn, color, emoji, cssClass: "col-custom" });
    await saveKanbanStatuses();
    renderKanbanStatusesList();
    renderKanbanView();
    showToast(currentLang === "fr" ? "Statut ajout\xE9" : "Status added", "success");
  }
  async function editKanbanStatus(index) {
    ensureCustomStatuses();
    var s = customKanbanStatuses[index];
    if (!s) return;
    var result = await showPromptModal(
      currentLang === "fr" ? "Modifier le statut" : "Edit status",
      [
        { label: currentLang === "fr" ? "Nom (FR)" : "Name (FR)" },
        { label: currentLang === "fr" ? "Nom (EN)" : "Name (EN)" },
        { label: "Emoji", type: "emoji", placeholder: currentLang === "fr" ? "Ex: \u2705 \u{1F50D} \u{1F4CB}" : "Ex: \u2705 \u{1F50D} \u{1F4CB}" },
        { label: currentLang === "fr" ? "Couleur" : "Color", type: "color" }
      ],
      [s.label_fr, s.label_en, s.emoji || "", s.color || "#94a3b8"]
    );
    if (!result || !result[0]) return;
    customKanbanStatuses[index].label_fr = result[0].trim();
    customKanbanStatuses[index].label_en = (result[1] || "").trim() || result[0].trim();
    customKanbanStatuses[index].emoji = (result[2] || "").trim();
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
      currentLang === "fr" ? "Supprimer le statut \xAB " + status.label_fr + " \xBB ?" : 'Delete status "' + status.label_en + '"?',
      currentLang === "fr" ? "Supprimer le statut" : "Delete status"
    );
    if (!confirmed) return;
    var removed = customKanbanStatuses.splice(index, 1)[0];
    await saveKanbanStatuses();
    renderKanbanStatusesList();
    renderKanbanView();
    showToast((currentLang === "fr" ? "Statut supprim\xE9 : " : "Status removed: ") + (currentLang === "fr" ? removed.label_fr : removed.label_en), "success");
  }
  if (!isInsideGrist()) {
    setupScreen = document.getElementById("client-setup");
    if (setupScreen) setupScreen.classList.add("hidden");
    document.getElementById("not-in-grist").classList.remove("hidden");
    document.getElementById("main-content").classList.add("hidden");
  } else {
    (async function() {
      await grist.ready({ requiredAccess: "full" });
      var setupTables = await grist.docApi.listTables();
      if (hasFrenchClientTables(setupTables)) applyFrenchTableNames(true);
      if (await shouldShowClientSetup(setupTables)) {
        showClientSetup();
        return;
      }
      hideClientSetup();
      var bootTables = await grist.docApi.listTables();
      if (hasFrenchClientTables(bootTables)) applyFrenchTableNames(true);
      var helperWriteSucceeded = false;
      try {
        var tables = await grist.docApi.listTables();
        if (tables.indexOf(state.USER_INFO_TABLE) === -1) {
          await grist.docApi.applyUserActions([
            ["AddTable", state.USER_INFO_TABLE, [
              { id: "UserEmail", fields: { type: "Text", label: "UserEmail" } }
            ]]
          ]);
          await grist.docApi.applyUserActions([
            ["ModifyColumn", state.USER_INFO_TABLE, "UserEmail", {
              isFormula: false,
              formula: "user.Email",
              recalcWhen: 2,
              recalcDeps: null
            }]
          ]);
        }
      } catch (e) {
        console.warn("Could not create helper table:", e.message);
      }
      try {
        try {
          var existingData = await grist.docApi.fetchTable(state.USER_INFO_TABLE);
          var rowIds = existingData && existingData.id ? existingData.id : [];
          var actions = [];
          for (var r = 0; r < rowIds.length; r++) {
            actions.push(["RemoveRecord", state.USER_INFO_TABLE, rowIds[r]]);
          }
          actions.push(["AddRecord", state.USER_INFO_TABLE, null, {}]);
          await grist.docApi.applyUserActions(actions);
          helperWriteSucceeded = true;
        } catch (writeErr) {
          console.log("Could not refresh row (read-only?):", writeErr.message);
        }
        var tokenInfo = await grist.docApi.getAccessToken({ readOnly: true });
        var tableResp = await fetch(tokenInfo.baseUrl + "/tables/" + state.USER_INFO_TABLE + "/records?auth=" + tokenInfo.token);
        if (tableResp.ok) {
          var tableData = await tableResp.json();
          if (tableData.records && tableData.records.length > 0) {
            state.currentUserEmail = tableData.records[0].fields.UserEmail || "";
          }
        } else {
          var userInfoData = await grist.docApi.fetchTable(state.USER_INFO_TABLE);
          if (userInfoData && userInfoData.UserEmail && userInfoData.UserEmail.length > 0) {
            state.currentUserEmail = userInfoData.UserEmail[0] || "";
          }
        }
      } catch (e) {
        console.warn("Could not read helper table:", e.message);
      }
      var roleDetected = false;
      try {
        await grist.docApi.applyUserActions([
          ["ModifyColumn", state.USER_INFO_TABLE, "UserEmail", {
            isFormula: false,
            formula: "user.Email",
            recalcWhen: 2,
            recalcDeps: null
          }]
        ]);
        state.isOwner = true;
        state.isEditor = false;
        roleDetected = true;
      } catch (structErr) {
        if (helperWriteSucceeded) {
          state.isOwner = false;
          state.isEditor = true;
          roleDetected = true;
        } else {
          state.isOwner = false;
          state.isEditor = false;
          roleDetected = true;
        }
      }
      if (!roleDetected) {
        if (helperWriteSucceeded) {
          state.isOwner = false;
          state.isEditor = true;
        } else {
          state.isOwner = false;
          state.isEditor = false;
        }
      }
      console.log("Role detection \u2014 isOwner:", state.isOwner, "isEditor:", state.isEditor, "email:", state.currentUserEmail);
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
      updateNotificationBadge();
      restoreFilters();
      try {
        var _sp = localStorage.getItem("pm-current-project");
        if (_sp) state.currentProjectId = parseInt(_sp) || null;
      } catch (e) {
      }
      applyRoleVisibilityDefaults();
      renderProjectSelector();
      refreshAllViews();
      restoreActiveTab();
      if (state.isOwner) syncSubtaskStatusChoices();
      if (typeof grist.onRecords === "function") {
        var _liveReloadTimer = null;
        grist.onRecords(function() {
          if (_liveReloadTimer) clearTimeout(_liveReloadTimer);
          _liveReloadTimer = setTimeout(function() {
            var modal = document.getElementById("modal-container");
            if (modal && modal.innerHTML.trim() !== "") return;
            loadAllData();
          }, 500);
        });
      }
    })();
  }
  var setupScreen;
})();
