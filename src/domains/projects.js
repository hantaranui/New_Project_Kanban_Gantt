import { t, currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { state } from '../store.js';
import { showToast } from '../ui/toast.js';
import { showConfirmModal } from '../ui/confirm-modal.js';
import { getFilteredTasks } from './filters.js';
import { loadAllData } from './data-loader.js';
import { canEditWorkItems } from './permissions.js';
import { closeModalForce } from './task-modal.js';
import { refreshAllViews } from '../ui/tabs.js';
import { setField } from '../config.js';
import { getUserDisplayName } from './team.js';

export function populateProjectLead(selectedValue) {
  var sel = document.getElementById('project-lead');
  if (!sel) return;
  var html = '<option value="">--</option>';
  state.users.forEach(function (u) {
    var val = u.Email || u.Name;
    if (!val) return;
    html += '<option value="' + sanitize(val) + '"' + (val === selectedValue ? ' selected' : '') + '>' + sanitize(u.Name || u.Email) + '</option>';
  });
  sel.innerHTML = html;
}

export function openProjectModal() {
  if (!canEditWorkItems()) {
    showToast(currentLang === 'fr' ? 'Vous n’avez pas les droits pour créer un projet.' : 'You do not have permission to create a project.', 'error');
    return;
  }
  document.getElementById('project-modal').style.display = 'flex';
  document.getElementById('edit-project-id').value = '';
  document.getElementById('project-name').value = '';
  document.getElementById('project-description').value = '';
  document.getElementById('project-color').value = '#6366f1';
  document.getElementById('project-status').value = 'active';
  populateProjectLead('');
  document.getElementById('project-form-title').textContent = t('addProject');
  var psearch = document.getElementById('project-search');
  if (psearch) psearch.value = '';
  renderProjectList();
}

export function closeProjectModal() {
  document.getElementById('project-modal').style.display = 'none';
}

export let PROJECT_LIST_LIMIT = 5;
export function renderProjectList() {
  var searchEl = document.getElementById('project-search');
  var q = (searchEl && searchEl.value ? searchEl.value : '').trim().toLowerCase();

  var html = '';
  if (state.projects.length === 0) {
    html = '<div style="text-align:center;color:#94a3b8;padding:20px;">' + t('noProject') + '</div>';
    document.getElementById('project-list').innerHTML = html;
    return;
  }

  // Tri du plus récent au plus ancien (id décroissant)
  var sorted = state.projects.slice().sort(function(a, b) { return (b.id || 0) - (a.id || 0); });

  var matching = q
    ? sorted.filter(function(p) { return (p.Name || '').toLowerCase().indexOf(q) !== -1; })
    : sorted;

  // Sans recherche : limiter aux N plus récents
  var shown = q ? matching : matching.slice(0, PROJECT_LIST_LIMIT);

  if (matching.length === 0) {
    html = '<div style="text-align:center;color:#94a3b8;padding:16px;">' + (currentLang === 'fr' ? 'Aucun projet trouvé' : 'No project found') + '</div>';
    document.getElementById('project-list').innerHTML = html;
    return;
  }

  var filteredTasks = getFilteredTasks();
  html = '<div class="project-items">';
  shown.forEach(function(proj) {
    var taskCount = filteredTasks.filter(function(t) { return t.Project_Id === proj.id; }).length;
    html += '<div class="project-item" style="border-left: 4px solid ' + (proj.Color || '#6366f1') + ';">';
    html += '<div class="project-item-info">';
    html += '<strong>' + sanitize(proj.Name) + '</strong>';
    var metaTxt = taskCount + ' ' + (currentLang === 'fr' ? 'tâches' : 'tasks');
    if (proj.Lead) metaTxt += ' · 👤 ' + (currentLang === 'fr' ? 'resp. ' : 'lead ') + sanitize(getUserDisplayName(proj.Lead));
    if (proj.CreatedBy) metaTxt += ' · ' + (currentLang === 'fr' ? 'créé par ' : 'created by ') + sanitize(getUserDisplayName(proj.CreatedBy));
    html += '<span class="project-item-meta">' + metaTxt + '</span>';
    html += '</div>';
    html += '<div class="project-item-actions">';
    html += '<button class="btn-icon" onclick="editProject(' + proj.id + ')" title="' + t('editProject') + '">✏️</button>';
    html += '<button class="btn-icon" onclick="deleteProject(' + proj.id + ')" title="' + t('deleteProject') + '">🗑️</button>';
    html += '</div>';
    html += '</div>';
  });
  html += '</div>';

  // Indicateur si des projets sont masqués (hors recherche)
  if (!q && matching.length > PROJECT_LIST_LIMIT) {
    html += '<div style="text-align:center;color:#94a3b8;font-size:12px;padding:6px;">'
      + (currentLang === 'fr'
        ? '+ ' + (matching.length - PROJECT_LIST_LIMIT) + ' autre(s) — utilisez la recherche'
        : '+ ' + (matching.length - PROJECT_LIST_LIMIT) + ' more — use search')
      + '</div>';
  }

  document.getElementById('project-list').innerHTML = html;
}

export function editProject(projectId) {
  var proj = state.projects.find(function(p) { return p.id === projectId; });
  if (!proj) return;
  
  document.getElementById('edit-project-id').value = proj.id;
  document.getElementById('project-name').value = proj.Name || '';
  document.getElementById('project-description').value = proj.Description || '';
  document.getElementById('project-color').value = proj.Color || '#6366f1';
  document.getElementById('project-status').value = proj.Status || 'active';
  populateProjectLead(proj.Lead || '');
  document.getElementById('project-form-title').textContent = t('editProject');
}

export async function saveProject() {
  var projectId = document.getElementById('edit-project-id').value;
  var name = document.getElementById('project-name').value.trim();
  var description = document.getElementById('project-description').value.trim();
  var color = document.getElementById('project-color').value;
  var status = document.getElementById('project-status').value;
  var leadEl = document.getElementById('project-lead');
  var lead = leadEl ? leadEl.value : '';

  if (!name) {
    showToast(t('projectName') + ' ' + t('required'), 'error');
    return;
  }

  try {
    var record = {};
    setField(record, 'projects', 'name', name);
    setField(record, 'projects', 'description', description);
    setField(record, 'projects', 'color', color);
    setField(record, 'projects', 'status', status);
    setField(record, 'projects', 'lead', lead);
    
    if (projectId) {
      await grist.docApi.applyUserActions([
        ['UpdateRecord', state.PROJECTS_TABLE, parseInt(projectId), record]
      ]);
      showToast(t('editProject') + ' ✓', 'success');
    } else {
      // Créateur du projet (auteur) — uniquement sur la table par défaut qui possède ces colonnes
      if (state.PROJECTS_TABLE === state.DEFAULT_PROJECTS_TABLE) {
        record.CreatedBy = state.currentUserEmail || '';
        record.CreatedAt = new Date().toISOString();
      }
      await grist.docApi.applyUserActions([
        ['AddRecord', state.PROJECTS_TABLE, null, record]
      ]);
      showToast(t('addProject') + ' ✓', 'success');
    }
    closeModalForce();
    await loadAllData();
    refreshAllViews();
    renderProjectList();
    document.getElementById('edit-project-id').value = '';
    document.getElementById('project-name').value = '';
    document.getElementById('project-description').value = '';
    document.getElementById('project-color').value = '#6366f1';
    document.getElementById('project-status').value = 'active';
    populateProjectLead('');
    document.getElementById('project-form-title').textContent = t('addProject');
  } catch (e) {
    console.error('Error saving project:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

export async function deleteProject(projectId) {
  var confirmed = await showConfirmModal(
    currentLang === 'fr' ? 'Supprimer ce projet ?' : 'Delete this project?',
    currentLang === 'fr' ? 'Supprimer le projet' : 'Delete project'
  );
  if (!confirmed) return;
  
  try {
    await grist.docApi.applyUserActions([
      ['RemoveRecord', state.PROJECTS_TABLE, projectId]
    ]);
    showToast(t('deleteProject') + ' ✓', 'success');
    await loadAllData();
    renderProjectList();
  } catch (e) {
    console.error('Error deleting project:', e);
    showToast('Error: ' + e.message, 'error');
  }
}
