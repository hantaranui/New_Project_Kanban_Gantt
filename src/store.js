// Central mutable application state. Every domain in the (still-monolithic)
// main.js reads and mutates these collections directly via `state.X` -
// this is the direct ES-module translation of what used to be ~57 shared
// `var` globals, not a new abstraction: no getters/setters/pub-sub, since
// nothing in the app observes/reacts to these changes beyond the existing
// manual refreshAllViews()-style re-renders already in the code.
import { defaultUiLabels } from './config.js';

export const state = {
  tasks: [],
  users: [],
  groups: [],
  subtasks: [],
  dependencies: [],
  comments: [],
  timeEntries: [],
  customFields: [],
  customFieldValues: [],
  categories: [],
  tags: [],
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
  TASKS_TABLE: 'PM_Tasks',
  USERS_TABLE: 'PM_Users',
  GROUPS_TABLE: 'PM_Groups',
  SUBTASKS_TABLE: 'PM_Subtasks',
  DEPENDENCIES_TABLE: 'PM_Dependencies',
  COMMENTS_TABLE: 'PM_Comments',
  TIME_ENTRIES_TABLE: 'PM_TimeEntries',
  CUSTOM_FIELDS_TABLE: 'PM_CustomFields',
  CUSTOM_FIELD_VALUES_TABLE: 'PM_CustomFieldValues',
  CATEGORIES_TABLE: 'PM_Categories',
  TAGS_TABLE: 'PM_Tags',
  PROJECTS_TABLE: 'PM_Projects',
  CONFIG_TABLE: 'PM_Config',
  SETTINGS_TABLE: 'PM_Settings',
  NOTIFICATIONS_TABLE: 'PM_Notifications',
  ACTIVITY_LOG_TABLE: 'PM_ActivityLog',
  ATTACHMENTS_TABLE: 'PM_Attachments',
  USER_INFO_TABLE: 'PM_UserInfo',
  attachments: [],
  activityLog: [],
  uiLabels: Object.assign({}, defaultUiLabels),
  DEFAULT_TASKS_TABLE: 'PM_Tasks',
  DEFAULT_USERS_TABLE: 'PM_Users',
  DEFAULT_PROJECTS_TABLE: 'PM_Projects',
  DEFAULT_CATEGORIES_TABLE: 'PM_Categories',
  DEFAULT_TAGS_TABLE: 'PM_Tags',
  taskTableColumns: null,
  columnMapping: {
    tasks: {
      title: 'Title',
      description: 'Description',
      status: 'Status',
      priority: 'Priority',
      assignee: 'Assignee',
      group: 'Group_Name',
      startDate: 'Start_Date',
      dueDate: 'Due_Date',
      category: 'Category',
      tag: 'Tag',
      recurrence: 'Recurrence',
      estimatedHours: 'Estimated_Hours',
      createdAt: 'Created_At',
      projectId: 'Project_Id'
    },
    users: {
      name: 'Name',
      email: 'Email',
      role: 'Role',
      group: 'Group_Name'
    },
    projects: {
      name: 'Name',
      description: 'Description',
      color: 'Color',
      status: 'Status',
      lead: 'Lead'
    },
    categories: {
      name: 'Name',
      color: 'Color',
      order: 'Order'
    },
    tags: {
      name: 'Name',
      color: 'Color'
    }
  },
  isOwner: false,
  isEditor: false,
  currentUserEmail: ''
};
