import { t, currentLang } from '../i18n.js';
import { state } from '../store.js';
import { showToast } from '../ui/toast.js';
import { loadAllData } from './data-loader.js';
import { setField } from '../config.js';

// RECURRENCE HANDLING
// =============================================================================

// Résout task.Assignee (chaîne d'emails/noms normalisée par data-loader.js)
// vers des ids Utilisateurs, pour l'écriture dans la colonne Assignee
// (Reference List) - même logique que task-modal.js (nom distinct : ce sont
// deux implémentations locales indépendantes, non partagées entre modules).
function resolveRecurrenceAssigneeIds(assigneeStr) {
  var names = (assigneeStr || '').split(',').map(function(a) { return a.trim(); }).filter(Boolean);
  var ids = [];
  names.forEach(function(val) {
    var u = state.users.find(function(usr) { return usr.Email === val || usr.Name === val; });
    if (u && ids.indexOf(u.id) === -1) ids.push(u.id);
  });
  return ids;
}

// Génère toutes les occurrences d'une tâche récurrente sur le mois ou l'année en cours.
// N'écrase pas les occurrences déjà existantes (vérifie par titre + date).
export async function generateOccurrences(taskId, period) {
  var task = state.tasks.find(function(t) { return t.id === taskId; });
  if (!task || !task.Recurrence || task.Recurrence === 'none') return;

  var now = Math.floor(Date.now() / 1000);
  var periodEnd;
  if (period === 'month') {
    var endOfMonth = new Date(); endOfMonth.setDate(1); endOfMonth.setMonth(endOfMonth.getMonth() + 1); endOfMonth.setDate(0); endOfMonth.setHours(23, 59, 59);
    periodEnd = Math.floor(endOfMonth.getTime() / 1000);
  } else {
    var endOfYear = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59);
    periodEnd = Math.floor(endOfYear.getTime() / 1000);
  }

  var stepSeconds = task.Recurrence === 'daily' ? 86400 : task.Recurrence === 'weekly' ? 604800 : 2592000;

  // Trouver la dernière date d'échéance parmi les occurrences existantes du même titre
  var existingDates = state.tasks
    .filter(function(t) { return t.Title === task.Title && t.Due_Date; })
    .map(function(t) { return t.Due_Date; });
  var cursor = existingDates.length > 0 ? Math.max.apply(null, existingDates) : (task.Due_Date || now);

  var actions = [];
  var count = 0;
  var safety = 0;
  while (cursor + stepSeconds <= periodEnd && safety < 100) {
    cursor += stepSeconds;
    safety++;
    // Ne pas créer en double
    var alreadyExists = state.tasks.some(function(t) {
      return t.Title === task.Title && t.Due_Date && Math.abs(t.Due_Date - cursor) < 43200;
    });
    if (alreadyExists) continue;
    var record = {};
    setField(record, 'tasks', 'title', task.Title);
    setField(record, 'tasks', 'description', task.Description);
    setField(record, 'tasks', 'status', 'todo');
    setField(record, 'tasks', 'priority', task.Priority);
    setField(record, 'tasks', 'assignee', ['L'].concat(resolveRecurrenceAssigneeIds(task.Assignee)));
    setField(record, 'tasks', 'group', task.Group_Name);
    var startOffset = (task.Start_Date && task.Due_Date) ? (task.Due_Date - task.Start_Date) : 0;
    setField(record, 'tasks', 'startDate', cursor - startOffset);
    setField(record, 'tasks', 'dueDate', cursor);
    setField(record, 'tasks', 'category', task.Category);
    setField(record, 'tasks', 'tag', ['L'].concat(Array.isArray(task.Tag) ? task.Tag : []));
    setField(record, 'tasks', 'recurrence', task.Recurrence);
    setField(record, 'tasks', 'estimatedHours', task.Estimated_Hours);
    setField(record, 'tasks', 'projectId', task.Project_Id);
    setField(record, 'tasks', 'createdAt', now);
    actions.push(['AddRecord', state.TASKS_TABLE, null, record]);
    count++;
  }

  if (actions.length === 0) {
    showToast('Aucune occurrence à générer pour cette période', 'info');
    return;
  }
  try {
    await grist.docApi.applyUserActions(actions);
    showToast(count + ' ' + t('occurrencesGenerated'), 'success');
    await loadAllData();
  } catch (e) {
    console.error('Error generating occurrences:', e);
    showToast('Erreur : ' + e.message, 'error');
  }
}

// B1 : avance une date (epoch s) selon la récurrence (calcul calendaire exact)
export function addRecurrenceToEpoch(epoch, rec) {
  if (!epoch) return null;
  var d = new Date(epoch * 1000);
  switch (rec) {
    case 'daily': d.setDate(d.getDate() + 1); break;
    case 'weekly': d.setDate(d.getDate() + 7); break;
    case 'biweekly': d.setDate(d.getDate() + 14); break;
    case 'monthly': d.setMonth(d.getMonth() + 1); break;
    case 'quarterly': d.setMonth(d.getMonth() + 3); break;
    case 'yearly': d.setFullYear(d.getFullYear() + 1); break;
    default: return epoch;
  }
  return Math.floor(d.getTime() / 1000);
}

export async function createNextOccurrence(task) {
  if (!task.Recurrence || task.Recurrence === 'none') return;

  var newStartDate = addRecurrenceToEpoch(task.Start_Date, task.Recurrence);
  var newDueDate = addRecurrenceToEpoch(task.Due_Date, task.Recurrence);
  var now = Math.floor(Date.now() / 1000);

  try {
    var record = {};
    setField(record, 'tasks', 'title', task.Title);
    setField(record, 'tasks', 'description', task.Description);
    setField(record, 'tasks', 'status', 'todo');
    setField(record, 'tasks', 'priority', task.Priority);
    setField(record, 'tasks', 'assignee', ['L'].concat(resolveRecurrenceAssigneeIds(task.Assignee)));
    setField(record, 'tasks', 'group', task.Group_Name);
    setField(record, 'tasks', 'startDate', newStartDate);
    setField(record, 'tasks', 'dueDate', newDueDate);
    setField(record, 'tasks', 'category', task.Category);
    setField(record, 'tasks', 'tag', ['L'].concat(Array.isArray(task.Tag) ? task.Tag : []));
    setField(record, 'tasks', 'recurrence', task.Recurrence);
    setField(record, 'tasks', 'estimatedHours', task.Estimated_Hours);
    setField(record, 'tasks', 'createdAt', now);
    
    await grist.docApi.applyUserActions([
      ['AddRecord', state.TASKS_TABLE, null, record]
    ]);
    showToast(t('nextOccurrence'), 'success');
  } catch (e) {
    console.error('Error creating next occurrence:', e);
  }
}
