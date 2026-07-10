import { state } from '../store.js';
import { renderProjectSelector } from './filters.js';
import { refreshAllViews } from '../ui/tabs.js';
import { loadColumnMapping, getColumnName } from '../config.js';

export async function loadAllData() {
  // Load column mapping first
  await loadColumnMapping();
  
  try {
    var taskData = await grist.docApi.fetchTable(state.TASKS_TABLE);
    state.tasks = [];
    if (taskData && taskData.id) {
      for (var i = 0; i < taskData.id.length; i++) {
        var task = { id: taskData.id[i] };
        
        // Use column mapping to load data
        var titleCol = getColumnName('tasks', 'title');
        var descCol = getColumnName('tasks', 'description');
        var statusCol = getColumnName('tasks', 'status');
        var priorityCol = getColumnName('tasks', 'priority');
        var assigneeCol = getColumnName('tasks', 'assignee');
        var groupCol = getColumnName('tasks', 'group');
        var startDateCol = getColumnName('tasks', 'startDate');
        var dueDateCol = getColumnName('tasks', 'dueDate');
        var categoryCol = getColumnName('tasks', 'category');
        var tagCol = getColumnName('tasks', 'tag');
        var recurrenceCol = getColumnName('tasks', 'recurrence');
        var estimatedHoursCol = getColumnName('tasks', 'estimatedHours');
        var createdAtCol = getColumnName('tasks', 'createdAt');
        var projectIdCol = getColumnName('tasks', 'projectId');
        
        task.Title = taskData[titleCol] ? taskData[titleCol][i] : '';
        task.Description = taskData[descCol] ? taskData[descCol][i] : '';
        task.Status = taskData[statusCol] ? taskData[statusCol][i] : 'todo';
        task.Priority = taskData[priorityCol] ? taskData[priorityCol][i] : 'medium';
        // Bruts pour l'instant (RefList/ChoiceList au format Grist ['L', ...]) -
        // normalisés juste après le chargement de state.users, plus bas.
        task.Assignee = taskData[assigneeCol] ? taskData[assigneeCol][i] : null;
        task.Group_Name = taskData[groupCol] ? taskData[groupCol][i] : '';
        task.Start_Date = taskData[startDateCol] ? taskData[startDateCol][i] : null;
        task.Due_Date = taskData[dueDateCol] ? taskData[dueDateCol][i] : null;
        task.Category = taskData[categoryCol] ? taskData[categoryCol][i] : '';
        task.Tag = taskData[tagCol] ? taskData[tagCol][i] : null;
        task.Recurrence = taskData[recurrenceCol] ? taskData[recurrenceCol][i] : 'none';
        task.Estimated_Hours = taskData[estimatedHoursCol] ? taskData[estimatedHoursCol][i] : 0;
        task.Created_At = taskData[createdAtCol] ? taskData[createdAtCol][i] : null;
        task.Project_Id = taskData[projectIdCol] ? taskData[projectIdCol][i] : null;

        task.Accountable = taskData.Accountable ? taskData.Accountable[i] || '' : '';
        task.Consulted = taskData.Consulted ? taskData.Consulted[i] || '' : '';
        task.Informed = taskData.Informed ? taskData.Informed[i] || '' : '';
        task.Extension_Date = taskData.Extension_Date ? taskData.Extension_Date[i] : null;
        task.Auto_Extend = taskData.Auto_Extend ? !!taskData.Auto_Extend[i] : false;

        state.tasks.push(task);
      }
    }
  } catch (e) {
    console.warn('Could not load tasks:', e);
    state.tasks = [];
  }

  try {
    var userData = await grist.docApi.fetchTable(state.USERS_TABLE);
    state.users = [];
    if (userData && userData.id) {
      var nameCol = getColumnName('users', 'name');
      var emailCol = getColumnName('users', 'email');
      var roleCol = getColumnName('users', 'role');
      var groupCol = getColumnName('users', 'group');
      
      for (var i = 0; i < userData.id.length; i++) {
        state.users.push({
          id: userData.id[i],
          Name: userData[nameCol] ? userData[nameCol][i] : '',
          Email: userData[emailCol] ? userData[emailCol][i] : '',
          Role: userData[roleCol] ? userData[roleCol][i] : 'member',
          Group_Name: userData[groupCol] ? userData[groupCol][i] : ''
        });
      }
    }
  } catch (e) {
    state.users = [];
  }

  // Normalise Assignee (Reference List -> chaîne d'emails séparés par
  // virgule, comme avant la migration) et Tag (Choice List -> tableau JS)
  // ici, à la frontière : tout le reste du code continue de lire task.Assignee
  // comme une chaîne et task.Tag comme un tableau sans aucun changement.
  state.tasks.forEach(function(task) {
    var rawAssignee = task.Assignee;
    var assigneeIds = Array.isArray(rawAssignee) ? (rawAssignee[0] === 'L' ? rawAssignee.slice(1) : rawAssignee) : [];
    task.Assignee = assigneeIds
      .map(function(id) {
        var u = state.users.find(function(usr) { return usr.id === id; });
        return u ? (u.Email || u.Name) : null;
      })
      .filter(Boolean)
      .join(', ');

    var rawTag = task.Tag;
    if (Array.isArray(rawTag)) {
      task.Tag = (rawTag[0] === 'L' ? rawTag.slice(1) : rawTag).filter(function(v) { return typeof v === 'string'; });
    } else if (typeof rawTag === 'string' && rawTag) {
      task.Tag = [rawTag];
    } else {
      task.Tag = [];
    }
  });

  try {
    var groupData = await grist.docApi.fetchTable(state.GROUPS_TABLE);
    state.groups = [];
    if (groupData && groupData.id) {
      for (var i = 0; i < groupData.id.length; i++) {
        state.groups.push({
          id: groupData.id[i],
          Name: groupData.Name ? groupData.Name[i] : '',
          Description: groupData.Description ? groupData.Description[i] : ''
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
          Title: subtaskData.Title ? subtaskData.Title[i] : '',
          Description: subtaskData.Description ? subtaskData.Description[i] : '',
          Status: subtaskData.Status ? subtaskData.Status[i] : 'todo',
          Priority: subtaskData.Priority ? subtaskData.Priority[i] : 'medium',
          Completed: subtaskData.Completed ? subtaskData.Completed[i] : false,
          Order: subtaskData.Order ? subtaskData.Order[i] : 0,
          Blocked_By_Subtask_Id: subtaskData.Blocked_By_Subtask_Id ? subtaskData.Blocked_By_Subtask_Id[i] : null,
          Assignee: subtaskData.Assignee ? subtaskData.Assignee[i] : '',
          Due_Date: subtaskData.Due_Date ? subtaskData.Due_Date[i] : null,
          Start_Date: subtaskData.Start_Date ? subtaskData.Start_Date[i] : null,
          Estimated_Hours: subtaskData.Estimated_Hours ? subtaskData.Estimated_Hours[i] : null,
          Recurrence: subtaskData.Recurrence ? subtaskData.Recurrence[i] : 'none',
          Type: subtaskData.Type ? subtaskData.Type[i] : 'subtask',
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
          Author: commentData.Author ? commentData.Author[i] : '',
          Content: commentData.Content ? commentData.Content[i] : '',
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
          File_Name: attData.File_Name ? attData.File_Name[i] : '',
          File_Type: attData.File_Type ? attData.File_Type[i] : '',
          File_Size: attData.File_Size ? attData.File_Size[i] : 0,
          Data: attData.File_Data ? attData.File_Data[i] : '',
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
          User: timeData.User ? timeData.User[i] : '',
          Start_Time: timeData.Start_Time ? timeData.Start_Time[i] : null,
          End_Time: timeData.End_Time ? timeData.End_Time[i] : null,
          Duration: timeData.Duration ? timeData.Duration[i] : 0,
          Description: timeData.Description ? timeData.Description[i] : ''
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
      var nameCol = getColumnName('projects', 'name');
      var descCol = getColumnName('projects', 'description');
      var colorCol = getColumnName('projects', 'color');
      var statusCol = getColumnName('projects', 'status');
      
      for (var i = 0; i < projData.id.length; i++) {
        state.projects.push({
          id: projData.id[i],
          Name: projData[nameCol] ? projData[nameCol][i] : '',
          Description: projData[descCol] ? projData[descCol][i] : '',
          Color: projData[colorCol] ? projData[colorCol][i] : '#6366f1',
          Status: projData[statusCol] ? projData[statusCol][i] : 'active',
          Start_Date: projData.Start_Date ? projData.Start_Date[i] : null,
          End_Date: projData.End_Date ? projData.End_Date[i] : null,
          Lead: projData.Lead ? projData.Lead[i] : '',
          CreatedBy: projData.CreatedBy ? projData.CreatedBy[i] : '',
          CreatedAt: projData.CreatedAt ? projData.CreatedAt[i] : ''
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
          User_Email: notifData.User_Email ? notifData.User_Email[ni] : '',
          Type: notifData.Type ? notifData.Type[ni] : '',
          Message: notifData.Message ? notifData.Message[ni] : '',
          Created_At: notifData.Created_At ? notifData.Created_At[ni] : null,
          Rule_Id: notifData.Rule_Id ? notifData.Rule_Id[ni] : ''
        });
      }
    }
  } catch (e) {
    state.pmNotifications = [];
  }

  renderProjectSelector();
  refreshAllViews();
}
