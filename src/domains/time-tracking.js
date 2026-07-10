import { t, currentLang } from '../i18n.js';
import { state } from '../store.js';
import { showToast } from '../ui/toast.js';
import { loadAllData } from './data-loader.js';
import { openEditTaskModal } from './task-modal.js';

export function getTaskTimeEntries(taskId) {
  return state.timeEntries.filter(function(te) { return te.Task_Id === taskId; })
    .sort(function(a, b) { return (b.Start_Time || 0) - (a.Start_Time || 0); });
}

export function getTaskTotalTime(taskId) {
  var entries = getTaskTimeEntries(taskId);
  var total = 0;
  for (var i = 0; i < entries.length; i++) {
    total += entries[i].Duration || 0;
  }
  // Add running timer if active
  if (state.activeTimers[taskId]) {
    total += Math.floor(Date.now() / 1000) - state.activeTimers[taskId];
  }
  return total;
}

export function formatDuration(seconds) {
  if (!seconds || seconds < 0) return '0' + t('minutes');
  var hours = Math.floor(seconds / 3600);
  var mins = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return hours + t('hours') + ' ' + mins + t('minutes');
  }
  return mins + t('minutes');
}

export function formatDurationShort(seconds) {
  if (!seconds || seconds < 0) return '0m';
  var hours = Math.floor(seconds / 3600);
  var mins = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return hours + 'h' + (mins > 0 ? mins + 'm' : '');
  }
  return mins + 'm';
}

// TIME TRACKING
// =============================================================================

export async function startTimer(taskId) {
  if (state.activeTimers[taskId]) return;
  var now = Math.floor(Date.now() / 1000);
  try {
    await grist.docApi.applyUserActions([
      ['AddRecord', state.TIME_ENTRIES_TABLE, null, {
        Task_Id: taskId,
        User: state.currentUserEmail || 'Utilisateur',
        Start_Time: now,
        End_Time: null,
        Duration: 0,
        Description: currentLang === 'fr' ? 'Timer en cours' : 'Running timer'
      }]
    ]);
    state.activeTimers[taskId] = now;
    await loadAllData();
    openEditTaskModal(taskId);
  } catch (e) {
    console.error('Error starting timer:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

export async function stopTimer(taskId) {
  if (!state.activeTimers[taskId]) return;
  
  var startTime = state.activeTimers[taskId];
  var endTime = Math.floor(Date.now() / 1000);
  var duration = endTime - startTime;
  var openEntry = state.timeEntries.find(function(te) {
    return te.Task_Id === taskId && te.Start_Time === startTime && !te.End_Time;
  });
  
  try {
    if (openEntry) {
      await grist.docApi.applyUserActions([
        ['UpdateRecord', state.TIME_ENTRIES_TABLE, openEntry.id, {
          End_Time: endTime,
          Duration: duration,
          Description: ''
        }]
      ]);
    } else {
      await grist.docApi.applyUserActions([
        ['AddRecord', state.TIME_ENTRIES_TABLE, null, {
          Task_Id: taskId,
          User: state.currentUserEmail || 'Utilisateur',
          Start_Time: startTime,
          End_Time: endTime,
          Duration: duration,
          Description: ''
        }]
      ]);
    }
    delete state.activeTimers[taskId];
    showToast(t('timeEntryAdded'), 'success');
    await loadAllData();
    openEditTaskModal(taskId);
  } catch (e) {
    console.error('Error stopping timer:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

export async function pauseTimer(taskId) {
  await stopTimer(taskId);
}

export async function addManualTimeEntry(taskId) {
  var hours = parseInt(document.getElementById('manual-hours').value) || 0;
  var minutes = parseInt(document.getElementById('manual-minutes').value) || 0;
  var duration = hours * 3600 + minutes * 60;
  if (duration <= 0) {
    showToast(currentLang === 'fr' ? 'Entrez une durée valide' : 'Enter a valid duration', 'error');
    return;
  }
  var now = Math.floor(Date.now() / 1000);
  try {
    await grist.docApi.applyUserActions([
      ['AddRecord', state.TIME_ENTRIES_TABLE, null, {
        Task_Id: taskId,
        User: state.currentUserEmail || 'Utilisateur',
        Start_Time: now - duration,
        End_Time: now,
        Duration: duration,
        Description: currentLang === 'fr' ? 'Saisie manuelle' : 'Manual entry'
      }]
    ]);
    showToast(t('timeEntryAdded'), 'success');
    await loadAllData();
    openEditTaskModal(taskId);
  } catch (e) {
    console.error('Error adding manual time entry:', e);
    showToast('Error: ' + e.message, 'error');
  }
}
