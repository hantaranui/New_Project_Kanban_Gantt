import { t, currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { state } from '../store.js';
import { getUserDisplayName } from './team.js';

export async function logActivity(action, taskId, taskTitle, details) {
  try {
    var record = {
      Timestamp: Math.floor(Date.now() / 1000),
      User_Email: state.currentUserEmail || 'unknown',
      Action: action,
      Task_Id: taskId || 0,
      Task_Title: taskTitle || '',
      Details: details || ''
    };
    await grist.docApi.applyUserActions([['AddRecord', state.ACTIVITY_LOG_TABLE, null, record]]);
    state.activityLog.push(record);
  } catch (e) {
    console.log('[GristPM] Activity log skipped:', e.message);
  }
}

export let _activityLogLimit = 20;

export function renderActivityLog() {
  var container = document.getElementById('activity-log-list');
  if (!container) return;

  var sorted = state.activityLog.slice().sort(function(a, b) { return (b.Timestamp || 0) - (a.Timestamp || 0); });
  var shown = sorted.slice(0, _activityLogLimit);

  if (shown.length === 0) {
    container.innerHTML = '<div style="text-align:center;color:#94a3b8;padding:20px;">' + t('actNoActivity') + '</div>';
    return;
  }

  var ACTION_ICONS = {
    task_created: '🆕',
    task_updated: '✏️',
    task_deleted: '🗑️',
    status_changed: '🔄',
    task_archived: '📦',
    task_restored: '♻️',
    comment_added: '💬'
  };

  var ACTION_I18N = {
    task_created: 'actTaskCreated',
    task_updated: 'actTaskUpdated',
    task_deleted: 'actTaskDeleted',
    status_changed: 'actStatusChanged',
    task_archived: 'actTaskArchived',
    task_restored: 'actTaskRestored',
    comment_added: 'actCommentAdded'
  };

  var html = '';
  var lastDateStr = '';
  for (var i = 0; i < shown.length; i++) {
    var entry = shown[i];
    var dateObj = entry.Timestamp ? new Date(entry.Timestamp * 1000) : new Date();
    var dateStr = dateObj.toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' });
    if (dateStr !== lastDateStr) {
      html += '<div style="font-size:11px;font-weight:700;color:#94a3b8;padding:8px 0 4px;border-bottom:1px solid #f1f5f9;text-transform:capitalize;">' + dateStr + '</div>';
      lastDateStr = dateStr;
    }
    var icon = ACTION_ICONS[entry.Action] || '📋';
    var actionText = t(ACTION_I18N[entry.Action] || entry.Action);
    var userName = getUserDisplayName(entry.User_Email);
    var timeStr = dateObj.toLocaleTimeString(currentLang === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit' });

    html += '<div class="activity-entry" style="display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid #f8fafc;"';
    if (entry.Task_Id) html += ' onclick="openEditTaskModal(' + entry.Task_Id + ')" style="cursor:pointer;"';
    html += '>';
    html += '<span style="font-size:16px;flex-shrink:0;margin-top:2px;">' + icon + '</span>';
    html += '<div style="flex:1;min-width:0;">';
    html += '<div style="font-size:13px;"><strong>' + sanitize(userName) + '</strong> ' + actionText;
    if (entry.Task_Title) html += ' <span style="color:#3b82f6;font-weight:600;">' + sanitize(entry.Task_Title) + '</span>';
    html += '</div>';
    if (entry.Details) html += '<div style="font-size:11px;color:#64748b;margin-top:2px;">' + sanitize(entry.Details) + '</div>';
    html += '</div>';
    html += '<span style="font-size:10px;color:#94a3b8;white-space:nowrap;margin-top:3px;">' + timeStr + '</span>';
    html += '</div>';
  }

  if (sorted.length > _activityLogLimit) {
    html += '<div style="text-align:center;padding:12px;"><button class="btn btn-secondary btn-sm" onclick="expandActivityLog()">' + t('actLoadMore') + '</button></div>';
  }

  container.innerHTML = html;
}

export function expandActivityLog() {
  _activityLogLimit += 20;
  renderActivityLog();
}
