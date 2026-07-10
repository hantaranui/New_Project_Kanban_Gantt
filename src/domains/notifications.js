import { t, currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { formatDate } from '../utils/dates.js';
import { state } from '../store.js';
import { getFilteredTasks } from './filters.js';
import { getKanbanStatuses } from './kanban.js';
import { openEditTaskModal } from './task-modal.js';

// NOTIFICATIONS / ALERTS + AUTOMATION ENGINE
// =============================================================================

export function getOverdueTasks() {
  var now = Math.floor(Date.now() / 1000);
  return getFilteredTasks().filter(function(t) {
    return t.Due_Date && t.Due_Date < now && t.Status !== 'done' && t.Status !== 'archived';
  });
}

export function getUpcomingTasks() {
  var now = Math.floor(Date.now() / 1000);
  var threeDays = now + (3 * 24 * 60 * 60);
  return getFilteredTasks().filter(function(t) {
    return t.Due_Date && t.Due_Date >= now && t.Due_Date <= threeDays && t.Status !== 'done' && t.Status !== 'archived';
  });
}

export function getMyNotifications() {
  var email = (state.currentUserEmail || '').toLowerCase().trim();
  if (!email) return [];
  return state.pmNotifications
    .filter(function(n) { return (n.User_Email || '').toLowerCase().trim() === email; })
    .sort(function(a, b) { return (b.Created_At || 0) - (a.Created_At || 0); });
}

// Boîte de réception, pas un journal : une notification qui existe est en
// attente par définition (elle est supprimée dès qu'on clique dessus).
export function getUnreadCount() {
  return getMyNotifications().length;
}

export function updateNotificationBadge() {
  var pending = getUnreadCount();
  var hasOverdueRule = state.automationRules.some(function(r) { return r.enabled && r.trigger === 'overdue'; });
  var hasApproachingRule = state.automationRules.some(function(r) { return r.enabled && r.trigger === 'approaching_deadline'; });
  var computed = 0;
  if (!hasOverdueRule) computed += getOverdueTasks().length;
  if (!hasApproachingRule) computed += getUpcomingTasks().length;
  var total = pending + computed;
  var badge = document.getElementById('notif-badge');
  if (badge) {
    badge.textContent = total;
    badge.classList.toggle('show', total > 0);
  }
}

export function showNotifications() {
  var myNotifs = getMyNotifications();
  var hasOverdueRule = state.automationRules.some(function(r) { return r.enabled && r.trigger === 'overdue'; });
  var hasApproachingRule = state.automationRules.some(function(r) { return r.enabled && r.trigger === 'approaching_deadline'; });
  var overdue = !hasOverdueRule ? getOverdueTasks() : [];
  var upcoming = !hasApproachingRule ? getUpcomingTasks() : [];

  var html = '<div class="notif-dropdown" id="notif-dropdown">';
  html += '<div class="notif-header" style="display:flex;justify-content:space-between;align-items:center;">';
  html += '<span>🔔 ' + t('notifications') + '</span>';
  if (myNotifs.length > 0) {
    html += '<button onclick="event.stopPropagation();dismissAllNotifications();" style="background:#3b82f6;color:white;border:none;border-radius:4px;font-size:10px;padding:3px 8px;cursor:pointer;">' + t('markAllRead') + '</button>';
  }
  html += '</div>';

  if (myNotifs.length > 0) {
    for (var ui = 0; ui < myNotifs.length; ui++) {
      var n = myNotifs[ui];
      html += '<div class="notif-item" style="display:flex;align-items:center;gap:6px;font-weight:600;" onclick="openNotification(' + n.id + ', ' + n.Task_Id + ');">';
      html += '<div style="flex:1;">';
      html += '<div class="notif-item-title">' + sanitize(n.Message) + '</div>';
      html += '<div class="notif-item-date">' + formatDate(n.Created_At) + '</div>';
      html += '</div>';
      html += '<button onclick="event.stopPropagation();dismissNotification(' + n.id + ');" style="background:none;border:none;color:#3b82f6;cursor:pointer;font-size:14px;" title="' + t('markAsRead') + '">✓</button>';
      html += '</div>';
    }
  }

  if (overdue.length > 0) {
    html += '<div style="padding:6px 16px;font-size:10px;color:#ef4444;font-weight:700;">⚠️ ' + overdue.length + ' ' + t('overdueTasksAlert') + '</div>';
    for (var oi = 0; oi < overdue.length; oi++) {
      html += '<div class="notif-item overdue" onclick="openEditTaskModal(' + overdue[oi].id + '); closeNotifications();">';
      html += '<div class="notif-item-title">' + sanitize(overdue[oi].Title) + '</div>';
      html += '<div class="notif-item-date">📅 ' + formatDate(overdue[oi].Due_Date) + '</div>';
      html += '</div>';
    }
  }
  if (upcoming.length > 0) {
    html += '<div style="padding:6px 16px;font-size:10px;color:#f59e0b;font-weight:700;">📅 ' + upcoming.length + ' ' + t('upcomingTasksAlert') + '</div>';
    for (var upi = 0; upi < upcoming.length; upi++) {
      html += '<div class="notif-item upcoming" onclick="openEditTaskModal(' + upcoming[upi].id + '); closeNotifications();">';
      html += '<div class="notif-item-title">' + sanitize(upcoming[upi].Title) + '</div>';
      html += '<div class="notif-item-date">📅 ' + formatDate(upcoming[upi].Due_Date) + '</div>';
      html += '</div>';
    }
  }

  if (myNotifs.length === 0 && overdue.length === 0 && upcoming.length === 0) {
    html += '<div class="notif-empty">' + t('noAlerts') + '</div>';
  }
  html += '</div>';

  closeNotifications();
  var btn = document.getElementById('notifications-btn');
  btn.style.position = 'relative';
  btn.insertAdjacentHTML('beforeend', html);
  setTimeout(function() { document.addEventListener('click', closeNotificationsOnOutsideClick); }, 10);
}

export function closeNotifications() {
  var dropdown = document.getElementById('notif-dropdown');
  if (dropdown) dropdown.remove();
  document.removeEventListener('click', closeNotificationsOnOutsideClick);
}

export function closeNotificationsOnOutsideClick(e) {
  if (!e.target.closest('#notifications-btn')) {
    closeNotifications();
  }
}

export async function openNotification(notifId, taskId) {
	closeNotifications();
	await dismissNotification(notifId, false);
	openEditTaskModal(taskId);
}

// Une notification est une chose à traiter, pas un log : on la supprime dès
// qu'elle a été vue (clic individuel ou "tout marquer").
export async function dismissNotification(notifId, reopenDropdown) {
	try {
	  await grist.docApi.applyUserActions([['RemoveRecord', state.NOTIFICATIONS_TABLE, notifId]]);
	  state.pmNotifications = state.pmNotifications.filter(function(n) { return n.id !== notifId; });
	  updateNotificationBadge();
	  if (reopenDropdown !== false) showNotifications();
	} catch (e) {
	  console.error('[GristPM] Error dismissing notification:', e);
	}
}

export async function dismissAllNotifications() {
  var mine = getMyNotifications();
  if (mine.length === 0) return;
  try {
    var ids = mine.map(function(n) { return n.id; });
    var actions = ids.map(function(id) { return ['RemoveRecord', state.NOTIFICATIONS_TABLE, id]; });
    await grist.docApi.applyUserActions(actions);
    state.pmNotifications = state.pmNotifications.filter(function(n) { return ids.indexOf(n.id) === -1; });
    updateNotificationBadge();
    showNotifications();
  } catch (e) {
    console.error('[GristPM] Error dismissing all notifications:', e);
  }
}

// --- Automation Engine ---

export async function createNotification(taskId, userEmail, type, message, ruleId) {
	try {
	  var resolvedEmail = resolveUserEmail(userEmail);
	  if (!resolvedEmail || resolvedEmail.toLowerCase() === (state.currentUserEmail || '').toLowerCase().trim()) return;
	  var record = {
	    Task_Id: taskId,
	    User_Email: resolvedEmail,
      Type: type,
      Message: message,
      Created_At: Math.floor(Date.now() / 1000),
      Rule_Id: ruleId || ''
    };
    await grist.docApi.applyUserActions([['AddRecord', state.NOTIFICATIONS_TABLE, null, record]]);
    record.id = state.pmNotifications.length > 0 ? Math.max.apply(null, state.pmNotifications.map(function(n) { return n.id; })) + 1 : 1;
    state.pmNotifications.push(record);
  } catch (e) {
    console.error('[GristPM] Error creating notification:', e);
  }
}

export function splitRecipientValues(value) {
	if (Array.isArray(value)) return value;
	return String(value || '').split(',').map(function(item) { return item.trim(); }).filter(Boolean);
}

export function resolveUserEmail(value) {
	var raw = String(value || '').trim();
	if (!raw) return '';
	var key = raw.toLowerCase();
	var user = state.users.find(function(candidate) {
	  return String(candidate.Email || '').trim().toLowerCase() === key ||
	    String(candidate.Name || '').trim().toLowerCase() === key;
	});
	if (user && user.Email) return String(user.Email).trim();
	return raw.indexOf('@') > 0 ? raw : '';
}

export function getProjectLead(task) {
	var projectId = Number(task && task.Project_Id || 0);
	var project = state.projects.find(function(item) { return Number(item.id) === projectId; });
	return project ? resolveUserEmail(project.Lead) : '';
}

export async function notifyTaskCompleted(task) {
	if (!task) return;
	var lead = getProjectLead(task);
	if (!lead) return;
	await notifyConcernedUsers(task.id, [lead], 'task_completed', task.Title || '');
}

// Une ligne Notifications par destinataire peut être affichée dans Grist et servir
// de déclencheur aux workflows e-mail n8n ou Power Automate.
export async function notifyConcernedUsers(taskId, emails, eventType, title) {
	if (!state.notifyConcernedEnabled) return;
	var me = (state.currentUserEmail || '').toLowerCase().trim();
	var seen = {}, recipients = [];
	(emails || []).forEach(function(e) {
	  var v = resolveUserEmail(e);
	  var k = v.toLowerCase();
	  if (v && k !== me && !seen[k]) { seen[k] = 1; recipients.push(v); }
	});
	if (!recipients.length) return;
	var messages = {
	  task_assigned: currentLang === 'fr' ? 'Une tâche vous a été assignée : ' : 'A task was assigned to you: ',
	  task_completed: currentLang === 'fr' ? 'Tâche terminée : ' : 'Task completed: ',
	  task_updated: currentLang === 'fr' ? 'Tâche modifiée : ' : 'Task updated: ',
	  comment_added: currentLang === 'fr' ? 'Nouveau commentaire sur : ' : 'New comment on: '
	};
	var msg = (messages[eventType] || messages.task_updated) + title;
	var now = Math.floor(Date.now() / 1000);
  var actions = recipients.map(function(email) {
    return ['AddRecord', state.NOTIFICATIONS_TABLE, null, { Task_Id: taskId, User_Email: email, Type: eventType, Message: msg, Created_At: now, Rule_Id: 'builtin' }];
  });
  try { await grist.docApi.applyUserActions(actions); } catch (e) { console.error('[GristPM] notifyConcernedUsers', e); }
}

export function resolveRecipients(action, actionTarget, task) {
	if (action === 'notify_assignee') {
	  return splitRecipientValues(task.Assignee).map(resolveUserEmail).filter(Boolean);
	}
	if (action === 'notify_project_lead') {
	  var lead = getProjectLead(task);
	  return lead ? [lead] : [];
  }
  if (action === 'notify_specific' && actionTarget) {
    return [actionTarget];
  }
  if (action === 'notify_all') {
    return state.users.map(function(u) { return u.Email; }).filter(Boolean);
  }
  return [];
}

export function renderAutoMessage(template, task) {
  var statusLabel = '';
  var statuses = getKanbanStatuses();
  for (var si = 0; si < statuses.length; si++) {
    if (statuses[si].key === task.Status) {
      statusLabel = currentLang === 'fr' ? statuses[si].label_fr : statuses[si].label_en;
      break;
    }
  }
  return (template || '')
    .replace(/\{title\}/g, task.Title || '')
    .replace(/\{status\}/g, statusLabel || task.Status || '')
    .replace(/\{priority\}/g, task.Priority || '')
    .replace(/\{assignee\}/g, task.Assignee || '');
}

export async function evaluateAutomationRules(task, changes) {
  if (!state.automationRules || state.automationRules.length === 0) return;
  for (var i = 0; i < state.automationRules.length; i++) {
    var rule = state.automationRules[i];
    if (!rule.enabled) continue;
    var triggered = false;

    if (rule.trigger === 'status_change' && changes.status) {
      var mf = !rule.condition || !rule.condition.from || rule.condition.from === changes.status.from;
      var mt = !rule.condition || !rule.condition.to || rule.condition.to === changes.status.to;
      triggered = mf && mt;
    } else if (rule.trigger === 'priority_change' && changes.priority) {
      var mf2 = !rule.condition || !rule.condition.from || rule.condition.from === changes.priority.from;
      var mt2 = !rule.condition || !rule.condition.to || rule.condition.to === changes.priority.to;
      triggered = mf2 && mt2;
    } else if (rule.trigger === 'assignment_change' && changes.assignee) {
      triggered = true;
    }

    if (triggered) {
      var msgTpl = currentLang === 'fr' ? (rule.message_fr || rule.message_en || '') : (rule.message_en || rule.message_fr || '');
      var message = renderAutoMessage(msgTpl, task);
      var recipients = resolveRecipients(rule.action, rule.action_target, task);
      for (var r = 0; r < recipients.length; r++) {
        await createNotification(task.id, recipients[r], rule.trigger, message, rule.id);
      }
    }
  }
  updateNotificationBadge();
}

export async function checkTimeBasedAutomations() {
  if (!state.automationRules || state.automationRules.length === 0) return;
  var now = Math.floor(Date.now() / 1000);
  var todayStart = now - (now % 86400);
  var threeDays = now + (3 * 24 * 60 * 60);

  for (var i = 0; i < state.automationRules.length; i++) {
    var rule = state.automationRules[i];
    if (!rule.enabled) continue;
    if (rule.trigger !== 'overdue' && rule.trigger !== 'approaching_deadline') continue;

    var matching = state.tasks.filter(function(t) {
      if (t.Status === 'done' || t.Status === 'archived' || !t.Due_Date) return false;
      if (rule.trigger === 'overdue') return t.Due_Date < now;
      return t.Due_Date >= now && t.Due_Date <= threeDays;
    });

    for (var j = 0; j < matching.length; j++) {
      var task = matching[j];
      var recipients = resolveRecipients(rule.action, rule.action_target, task);
      for (var r = 0; r < recipients.length; r++) {
        var already = state.pmNotifications.some(function(n) {
          return n.Rule_Id === rule.id && n.Task_Id === task.id && n.User_Email === recipients[r] && n.Created_At >= todayStart;
        });
        if (already) continue;
        var msgTpl = currentLang === 'fr' ? (rule.message_fr || rule.message_en || '') : (rule.message_en || rule.message_fr || '');
        var message = renderAutoMessage(msgTpl, task);
        await createNotification(task.id, recipients[r], rule.trigger, message, rule.id);
      }
    }
  }
  updateNotificationBadge();
}

