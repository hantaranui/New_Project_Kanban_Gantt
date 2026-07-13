import { t, currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { state } from '../store.js';
import { showToast } from '../ui/toast.js';
import { loadAllData } from './data-loader.js';
import { openCardSubtasksModal, renderKanbanView, getKanbanStatuses } from './kanban.js';
import { openEditTaskModal, closeModalForce } from './task-modal.js';

export function getTaskSubtasks(taskId) {
  // D1 : tri par échéance croissante (sans date en dernier), Order en départage
  return state.subtasks.filter(function(st) { return st.Parent_Task_Id === taskId; })
    .sort(function(a, b) {
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

export function getTaskProgress(task) {
  var taskSubtasks = getTaskSubtasks(task.id);
  if (taskSubtasks.length === 0) {
    // No subtasks: use status-based progress
    return task.Status === 'done' ? 100 : (task.Status === 'progress' ? 50 : 10);
  }
  var completed = taskSubtasks.filter(function(st) { return st.Completed; }).length;
  return Math.round((completed / taskSubtasks.length) * 100);
}

export function isSubtaskBlocked(subtask) {
  if (!subtask.Blocked_By_Subtask_Id) return false;
  var blocker = state.subtasks.find(function(st) { return st.id === subtask.Blocked_By_Subtask_Id; });
  return blocker && !blocker.Completed;
}

export function getSubtaskBlocker(subtask) {
  if (!subtask.Blocked_By_Subtask_Id) return null;
  return state.subtasks.find(function(st) { return st.id === subtask.Blocked_By_Subtask_Id; });
}

export async function toggleSubtaskFromPopup(subtaskId, taskId, completed) {
  await toggleSubtaskFromCard(subtaskId, completed);
  await loadAllData();
  openCardSubtasksModal(taskId);
  renderKanbanView();
}

// Cocher/décocher une sous-tâche depuis le panneau déplié d'une tuile
export async function toggleSubtaskFromCard(subtaskId, completed) {
  try {
    await grist.docApi.applyUserActions([
      ['UpdateRecord', state.SUBTASKS_TABLE, subtaskId, { Completed: completed }]
    ]);
    for (var i = 0; i < state.subtasks.length; i++) {
      if (state.subtasks[i].id === subtaskId) { state.subtasks[i].Completed = completed; break; }
    }
    renderKanbanView();
  } catch (e) {
    console.error('toggleSubtaskFromCard:', e);
  }
}

export function openSubtaskDepModal(subtaskId, taskId) {
  var subtask = state.subtasks.find(function(st) { return st.id === subtaskId; });
  if (!subtask) return;
  
  var taskSubtasks = getTaskSubtasks(taskId);
  var otherSubtasks = taskSubtasks.filter(function(st) { return st.id !== subtaskId; });
  
  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal" style="max-width:400px;" onclick="event.stopPropagation()">';
  html += '<div class="modal-header"><h3>🔗 ' + t('dependencies') + '</h3><button class="modal-close" onclick="closeModalForce()">✕</button></div>';
  html += '<div class="modal-body">';
  html += '<p style="margin-bottom:12px;font-size:12px;color:#64748b;">' + sanitize(subtask.Title) + '</p>';
  
  html += '<div class="form-group"><label>' + t('blockedBy') + '</label>';
  html += '<select id="subtask-blocker-select">';
  html += '<option value="">-- ' + t('noDependencies') + ' --</option>';
  for (var i = 0; i < otherSubtasks.length; i++) {
    var ost = otherSubtasks[i];
    var sel = subtask.Blocked_By_Subtask_Id === ost.id ? ' selected' : '';
    html += '<option value="' + ost.id + '"' + sel + '>' + sanitize(ost.Title) + '</option>';
  }
  html += '</select></div>';
  
  html += '</div>';
  html += '<div class="modal-footer">';
  html += '<button class="btn btn-secondary" onclick="closeModalForce()">' + t('cancel') + '</button>';
  html += '<button class="btn btn-primary" onclick="updateSubtaskDep(' + subtaskId + ', ' + taskId + ')">' + t('save') + '</button>';
  html += '</div></div></div>';
  
  document.getElementById('modal-container').innerHTML = html;
}

export async function updateSubtaskDep(subtaskId, taskId) {
  var select = document.getElementById('subtask-blocker-select');
  var blockerId = select.value ? parseInt(select.value) : null;
  
  try {
    await grist.docApi.applyUserActions([
      ['UpdateRecord', state.SUBTASKS_TABLE, subtaskId, { Blocked_By_Subtask_Id: blockerId }]
    ]);
    showToast(t('dependencyAdded'), 'success');
    closeModalForce();
    await loadAllData();
    openEditTaskModal(taskId);
  } catch (e) {
    console.error('Error updating subtask dependency:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

export function setStStatus(subtaskId, value, btn) {
  var hidden = document.getElementById('st-status-' + subtaskId);
  if (hidden) hidden.value = value;
  var grp = btn.parentNode;
  if (grp) grp.querySelectorAll('.st-pill').forEach(function(p) {
    p.className = 'st-pill'; p.style.background = ''; p.style.color = ''; p.style.borderColor = '';
  });
  var def = getKanbanStatuses().find(function(s) { return s.key === value; });
  var color = (def && def.color) ? def.color : '#3b82f6';
  btn.style.background = color; btn.style.color = '#fff'; btn.style.borderColor = color;
}

// B2 : sélecteur de type de sous-tâche (sous-tâche / jalon)
export function setStType(subtaskId, value, btn) {
  var hidden = document.getElementById('st-type-' + subtaskId);
  if (hidden) hidden.value = value;
  var grp = btn.parentNode;
  if (grp) grp.querySelectorAll('.st-pill').forEach(function(p) { p.className = 'st-pill'; });
  btn.className = 'st-pill active-progress';
}

export function setStPill(field, subtaskId, value, btn) {
  var group = document.getElementById('st-' + field + '-group-' + subtaskId);
  var hidden = document.getElementById('st-' + field + '-' + subtaskId);
  if (!group || !hidden) return;
  hidden.value = value;
  var pills = group.querySelectorAll('.st-pill');
  pills.forEach(function(p) {
    p.className = 'st-pill'; // reset
  });
  btn.className = 'st-pill active-' + value;
}

// Édition inline d'une sous-tâche
export function startEditSubtask(subtaskId) {
  var viewEl = document.getElementById('st-view-' + subtaskId);
  var editEl = document.getElementById('st-edit-' + subtaskId);
  if (viewEl) viewEl.style.display = 'none';
  if (editEl) { editEl.style.display = 'flex'; var t = document.getElementById('st-title-' + subtaskId); if (t) t.focus(); }
}

export function cancelEditSubtask(subtaskId) {
  var viewEl = document.getElementById('st-view-' + subtaskId);
  var editEl = document.getElementById('st-edit-' + subtaskId);
  if (viewEl) viewEl.style.display = 'flex';
  if (editEl) editEl.style.display = 'none';
}

// Filtre la liste des assignés d'une sous-tâche selon la saisie clavier
export function filterStAssignees(subtaskId, query) {
  var box = document.getElementById('st-assignee-' + subtaskId);
  if (!box) return;
  var q = (query || '').toLowerCase().trim();
  box.querySelectorAll('label').forEach(function(lbl) {
    var name = (lbl.textContent || '').toLowerCase();
    lbl.style.display = (!q || name.indexOf(q) !== -1) ? '' : 'none';
  });
}
