import { t, currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { state } from '../store.js';
import {
  shouldLimitToMyProjects, taskConcernsCurrentUser, canSeeAllProjects, getUserRoles, userMatchesRole
} from './permissions.js';
import { refreshAllViews } from '../ui/tabs.js';
import { getCategories } from './categories.js';
import { getTags } from './tags.js';

export function roleLabel(role) {
  if (role === 'admin') return t('roleAdmin');
  if (role === 'viewer') return t('roleViewer');
  if (role === 'member') return t('roleMember');
  return role; // rôle personnalisé : affiché tel quel
}

export function renderProjectSelector() {
  var container = document.getElementById('project-selector');
  if (!container) return;

  // Rôles disponibles (distincts, triés) — supports ChoiceList arrays
  var roleSet = {};
  state.users.forEach(function(u) { getUserRoles(u).forEach(function(r) { if (r) roleSet[r] = true; }); });
  var roles = Object.keys(roleSet).sort();

  // Personnes visibles selon le rôle sélectionné
  var visibleUsers = state.currentFilterRole
    ? state.users.filter(function(u) { return userMatchesRole(u, state.currentFilterRole); })
    : state.users;

  // Projets visibles
  var visibleProjects = state.projects;
  if (state.mineOnly || shouldLimitToMyProjects()) {
    var myIds = myProjectIdSet();
    visibleProjects = state.projects.filter(function (p) { return myIds[p.id]; });
  }
  if (state.currentFilterAssignee) {
    var projIdSet = {};
    state.tasks.forEach(function(t) {
      if (!t.Project_Id) return;
      var list = (t.Assignee || '').split(',').map(function(s) { return s.trim(); });
      if (list.indexOf(state.currentFilterAssignee) !== -1) projIdSet[t.Project_Id] = true;
    });
    // Si aucune tâche associée, on laisse les projets courants (sinon UX bloquée)
    var filtered = visibleProjects.filter(function(p) { return projIdSet[p.id]; });
    if (filtered.length > 0) visibleProjects = filtered;
  }

  var html = '';

  if (canSeeAllProjects()) {
    // Filtre Rôle
    var roleOptions = roles.map(function(r) { return { value: r, label: roleLabel(r) }; });
    html += buildFilterCombo('role', currentLang === 'fr' ? '— Rôle —' : '— Role —', roleOptions, state.currentFilterRole, filterByRole);

    // Filtre Personne
    var personOptions = [];
    visibleUsers.forEach(function(u) {
      var val = u.Email || u.Name;
      var label = u.Name || u.Email;
      if (val) personOptions.push({ value: val, label: label });
    });
    html += buildFilterCombo('person', currentLang === 'fr' ? '— Personne —' : '— Person —', personOptions, state.currentFilterAssignee, filterByAssignee);
  }

  // Filtre Catégorie
  var catOptions = getCategories().map(function(c) { return { value: c.name, label: c.name }; });
  html += buildFilterCombo('category', currentLang === 'fr' ? '— Catégorie —' : '— Category —', catOptions, state.currentFilterCategory, filterByCategory);

  // Filtre Tag
  var tagOptions = getTags().map(function(tag) { return { value: tag.name, label: tag.name }; });
  html += buildFilterCombo('tag', '— Tag —', tagOptions, state.currentFilterTag, filterByTag);

  // Filtre Projet — combobox moderne avec recherche intégrée
  var selProj = state.currentProjectId ? state.projects.find(function(p) { return p.id === state.currentProjectId; }) : null;
  var allProjectsLabel = canSeeAllProjects()
    ? (currentLang === 'fr' ? 'Tous les projets' : 'All projects')
    : (currentLang === 'fr' ? 'Mes projets' : 'My projects');
  var btnLabel = selProj ? sanitize(selProj.Name) : allProjectsLabel;
  var btnDotColor = selProj ? (selProj.Color || '#6366f1') : 'transparent';
  var btnClass = 'proj-combobox-btn' + (state.currentProjectId ? ' active' : '');
  html += '<div class="proj-combobox" id="proj-combobox">';
  html += '<button type="button" class="' + btnClass + '" onclick="toggleProjectDropdown()" id="proj-combobox-btn">';
  html += '<span class="proj-combobox-dot" style="background:' + btnDotColor + ';' + (selProj ? '' : 'opacity:0;') + '"></span>';
  html += '<span class="proj-combobox-label">' + btnLabel + '</span>';
  html += '<span class="proj-combobox-chevron">▾</span>';
  html += '</button>';
  html += '<div class="proj-dropdown" id="project-dropdown">';
  html += '<div class="proj-dropdown-search"><input type="text" id="proj-search-input" placeholder="' + (currentLang === 'fr' ? 'Rechercher...' : 'Search...') + '" oninput="filterProjectDropdown(this.value)" autocomplete="off"></div>';
  var PROJ_INITIAL_LIMIT = 5;
  html += '<div class="proj-dropdown-list" id="proj-dropdown-list">';
  // "All projects" option (always shown)
  html += '<div class="proj-option' + (!state.currentProjectId ? ' selected' : '') + '" data-id="" data-name="" data-always="1" onclick="selectProjectOption(\'\')">';
  html += '<span class="proj-dot" style="background:#94a3b8;opacity:.4;"></span>';
  html += '<span>' + allProjectsLabel + '</span>';
  html += '</div>';
  // Project options — first 5 visible, rest hidden until search
  var allTasksForCount = state.tasks;
  var extraCount = Math.max(0, visibleProjects.length - PROJ_INITIAL_LIMIT);
  visibleProjects.forEach(function(proj, idx) {
    var taskCount = allTasksForCount.filter(function(tt) { return tt.Project_Id === proj.id; }).length;
    var isSelected = state.currentProjectId === proj.id;
    var safeName = sanitize(proj.Name || '');
    var isExtra = idx >= PROJ_INITIAL_LIMIT && !isSelected;
    html += '<div class="proj-option' + (isSelected ? ' selected' : '') + '"';
    html += ' data-id="' + proj.id + '" data-name="' + safeName + '"';
    if (isExtra) html += ' data-extra="1" style="display:none;"';
    html += ' onclick="selectProjectOption(' + proj.id + ')">';
    html += '<span class="proj-dot" style="background:' + (proj.Color || '#6366f1') + ';"></span>';
    html += '<span style="flex:1;overflow:hidden;text-overflow:ellipsis;">' + safeName + '</span>';
    if (taskCount > 0) html += '<span class="proj-count">' + taskCount + '</span>';
    html += '</div>';
  });
  // "More" hint shown when no search active
  if (extraCount > 0) {
    html += '<div id="proj-more-hint" style="padding:6px 12px;font-size:11px;color:#94a3b8;text-align:center;border-top:1px solid #f1f5f9;">';
    html += '+ ' + extraCount + ' ' + (currentLang === 'fr' ? 'autres — tapez pour chercher' : 'more — type to search');
    html += '</div>';
  }
  html += '</div></div></div>';

  // Bouton "Mes projets" (admin/owner seulement : en member/viewer c'est le mode naturel)
  if (state.currentUserEmail && canSeeAllProjects()) {
    html += '<button class="btn-icon" onclick="toggleMyProjects()" title="' + (currentLang === 'fr' ? 'Mes projets : créés par moi ou qui me sont assignés' : 'My projects: created by or assigned to me') + '" style="width:auto;padding:0 12px;font-size:12px;font-weight:600;' + (state.mineOnly ? 'background:#6366f1;color:#fff;border-color:#6366f1;' : '') + '">👤 ' + (currentLang === 'fr' ? 'Mes projets' : 'My projects') + '</button>';
  }

  if (state.currentFilterRole || state.currentFilterAssignee || state.currentFilterCategory || state.currentFilterTag || state.currentProjectId || (state.mineOnly && canSeeAllProjects())) {
    html += '<button class="btn-icon" onclick="resetFilters()" title="' + (currentLang === 'fr' ? 'Réinitialiser les filtres' : 'Reset filters') + '" style="color:#ef4444;">✕</button>';
  }

  html += '<button class="btn-icon" onclick="openProjectModal()" title="' + t('manageProjects') + '">⚙️</button>';
  container.innerHTML = html;

  // Bandeau de filtre actif en haut de page (affiche tous les filtres en cascade)
  var banner = document.getElementById('project-filter-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'project-filter-banner';
    var appEl = document.querySelector('.app-container') || document.body;
    appEl.insertBefore(banner, appEl.firstChild);
  }
  if (state.currentFilterRole || state.currentFilterAssignee || state.currentFilterCategory || state.currentFilterTag || state.currentProjectId || (state.mineOnly && canSeeAllProjects())) {
    var proj2 = state.currentProjectId ? state.projects.find(function(p) { return p.id === state.currentProjectId; }) : null;
    var c2 = (proj2 && proj2.Color) ? proj2.Color : '#6366f1';
    var bits = [];
    if (state.mineOnly && canSeeAllProjects()) bits.push('👤 ' + (currentLang === 'fr' ? 'Mes projets' : 'My projects'));
    if (state.currentFilterRole) bits.push('👔 ' + sanitize(roleLabel(state.currentFilterRole)));
    if (state.currentFilterAssignee) {
      var u = state.users.find(function(x) { return (x.Email || x.Name) === state.currentFilterAssignee; });
      var displayName = u ? (u.Name || u.Email) : state.currentFilterAssignee;
      bits.push('👤 ' + sanitize(displayName));
    }
    if (state.currentFilterCategory) bits.push('📁 ' + sanitize(state.currentFilterCategory));
    if (state.currentFilterTag) bits.push('🏷️ ' + sanitize(state.currentFilterTag));
    if (proj2) bits.push('🎯 ' + sanitize(proj2.Name));
    banner.innerHTML = (currentLang === 'fr' ? 'Filtres actifs : ' : 'Active filters: ') + '<strong>' + bits.join(' › ') + '</strong> — <a href="#" onclick="resetFilters();return false;" style="color:inherit;text-decoration:underline;">' + (currentLang === 'fr' ? 'Tout effacer' : 'Clear all') + '</a>';
    banner.style.cssText = 'display:flex;align-items:center;gap:8px;padding:8px 16px;background:' + c2 + '15;border-bottom:2px solid' + c2 + ';color:' + c2 + ';font-size:12px;font-weight:600;';
  } else {
    banner.style.display = 'none';
  }
}

export function buildFilterCombo(id, placeholder, options, selectedValue, onSelect) {
  var selOpt = options.find(function(o) { return o.value === selectedValue; });
  var label = selOpt ? selOpt.label : placeholder;
  var isActive = !!selectedValue;
  var h = '<div class="filter-combo" id="fc-' + id + '">';
  h += '<button type="button" class="filter-combo-btn' + (isActive ? ' active' : '') + '" onclick="toggleFilterCombo(\'' + id + '\')" id="fc-btn-' + id + '">';
  h += '<span class="filter-combo-label">' + sanitize(label) + '</span>';
  h += '<span class="filter-combo-chevron">▾</span></button>';
  h += '<div class="filter-combo-dd" id="fc-dd-' + id + '">';
  h += '<div class="filter-combo-search"><input type="text" id="fc-search-' + id + '" placeholder="' + (currentLang === 'fr' ? 'Rechercher...' : 'Search...') + '" oninput="filterComboSearch(\'' + id + '\', this.value)" autocomplete="off"></div>';
  h += '<div class="filter-combo-list" id="fc-list-' + id + '">';
  h += '<div class="filter-combo-opt' + (!selectedValue ? ' selected' : '') + '" data-value="" data-label="' + sanitize(placeholder) + '" onclick="selectFilterCombo(\'' + id + '\', \'\')">' + sanitize(placeholder) + '</div>';
  options.forEach(function(o) {
    h += '<div class="filter-combo-opt' + (o.value === selectedValue ? ' selected' : '') + '" data-value="' + sanitize(o.value) + '" data-label="' + sanitize(o.label) + '" onclick="selectFilterCombo(\'' + id + '\', \'' + sanitize(o.value).replace(/'/g, "\\'") + '\')">' + sanitize(o.label) + '</div>';
  });
  h += '</div></div></div>';
  window['_fcCallback_' + id] = onSelect;
  return h;
}

export function toggleFilterCombo(id) {
  var dd = document.getElementById('fc-dd-' + id);
  var btn = document.getElementById('fc-btn-' + id);
  if (!dd) return;
  var isOpen = dd.classList.contains('show');
  document.querySelectorAll('.filter-combo-dd.show').forEach(function(d) { d.classList.remove('show'); });
  document.querySelectorAll('.filter-combo-btn.open').forEach(function(b) { b.classList.remove('open'); });
  if (!isOpen) {
    dd.classList.add('show');
    if (btn) btn.classList.add('open');
    var inp = document.getElementById('fc-search-' + id);
    if (inp) { inp.value = ''; inp.focus(); filterComboSearch(id, ''); }
    setTimeout(function() {
      document.addEventListener('mousedown', function hideFC(e) {
        var box = document.getElementById('fc-' + id);
        if (box && !box.contains(e.target)) {
          var dd2 = document.getElementById('fc-dd-' + id);
          var btn2 = document.getElementById('fc-btn-' + id);
          if (dd2) dd2.classList.remove('show');
          if (btn2) btn2.classList.remove('open');
          document.removeEventListener('mousedown', hideFC);
        }
      });
    }, 0);
  }
}

export function filterComboSearch(id, query) {
  var list = document.getElementById('fc-list-' + id);
  if (!list) return;
  var q = (query || '').trim().toLowerCase();
  list.querySelectorAll('.filter-combo-opt').forEach(function(opt) {
    var label = (opt.dataset.label || '').toLowerCase();
    opt.style.display = (!q || label.indexOf(q) !== -1) ? '' : 'none';
  });
}

export function selectFilterCombo(id, value) {
  var dd = document.getElementById('fc-dd-' + id);
  var btn = document.getElementById('fc-btn-' + id);
  if (dd) dd.classList.remove('show');
  if (btn) btn.classList.remove('open');
  var cb = window['_fcCallback_' + id];
  if (cb) cb(value);
}

export function toggleProjectDropdown() {
  var dd = document.getElementById('project-dropdown');
  var btn = document.getElementById('proj-combobox-btn');
  if (!dd) return;
  var isOpen = dd.classList.contains('show');
  if (isOpen) {
    dd.classList.remove('show');
    if (btn) btn.classList.remove('open');
  } else {
    dd.classList.add('show');
    if (btn) btn.classList.add('open');
    var inp = document.getElementById('proj-search-input');
    if (inp) { inp.value = ''; inp.focus(); filterProjectDropdown(''); }
    setTimeout(function() {
      document.addEventListener('mousedown', function hideDD(e) {
        var dd2 = document.getElementById('project-dropdown');
        var box = document.getElementById('proj-combobox');
        if (dd2 && box && !box.contains(e.target)) {
          dd2.classList.remove('show');
          var btn2 = document.getElementById('proj-combobox-btn');
          if (btn2) btn2.classList.remove('open');
          document.removeEventListener('mousedown', hideDD);
        }
      });
    }, 0);
  }
}

// Keep showProjectDropdown as alias (called from old code paths if any)
function showProjectDropdown() { toggleProjectDropdown(); }

export function filterProjectDropdown(query) {
  var list = document.getElementById('proj-dropdown-list');
  if (!list) return;
  var q = (query || '').trim().toLowerCase();
  var hint = document.getElementById('proj-more-hint');
  var opts = list.querySelectorAll('.proj-option');

  if (!q) {
    // No query: show first 5 only (restore data-extra hidden state)
    opts.forEach(function(opt) {
      if (opt.dataset.always === '1' || !opt.dataset.extra) {
        opt.style.display = '';
      } else {
        opt.style.display = 'none';
      }
    });
    if (hint) hint.style.display = '';
  } else {
    // Query: show all matching, hide non-matching
    opts.forEach(function(opt) {
      var name = (opt.dataset.name || '').toLowerCase();
      opt.style.display = (opt.dataset.always === '1' || name.indexOf(q) !== -1) ? '' : 'none';
    });
    if (hint) hint.style.display = 'none';
  }
}

export function selectProjectOption(projectId) {
  var dd = document.getElementById('project-dropdown');
  var btn = document.getElementById('proj-combobox-btn');
  if (dd) dd.classList.remove('show');
  if (btn) btn.classList.remove('open');
  filterByProject(projectId);
}

export function filterByProject(projectId) {
  state.currentProjectId = projectId ? parseInt(projectId) : null;
  localStorage.setItem('pm-current-project', state.currentProjectId || '');
  renderProjectSelector();
  refreshAllViews();
}

// Valeur d'assigné correspondant à l'utilisateur courant (Email en priorité, sinon Nom)
export function myAssigneeValue() {
  if (!state.currentUserEmail) return null;
  var em = state.currentUserEmail.toLowerCase().trim();
  var u = state.users.find(function (x) { return (x.Email || '').toLowerCase().trim() === em; });
  if (u) return u.Email || u.Name;
  return state.currentUserEmail; // repli : on tente l'email brut
}
// Ensemble des projets "à moi" : créés par moi OU contenant une tâche qui m'est assignée
export function myProjectIdSet() {
  var em = (state.currentUserEmail || '').toLowerCase().trim();
  var mine = myAssigneeValue();
  var set = {};
  state.projects.forEach(function (p) {
    if (em && (p.CreatedBy || '').toLowerCase().trim() === em) set[p.id] = true;
    if (mine && (p.Lead || '') === mine) set[p.id] = true; // responsable du projet
  });
  if (mine) state.tasks.forEach(function (tk) {
    if (!tk.Project_Id) return;
    var list = (tk.Assignee || '').split(',').map(function (s) { return s.trim(); });
    if (list.indexOf(mine) !== -1) set[tk.Project_Id] = true;
  });
  return set;
}
// Bascule "Afficher seulement mes projets"
export function toggleMyProjects() {
  state.mineOnly = !state.mineOnly;
  persistFilters();
  renderProjectSelector();
  refreshAllViews();
}

// Persistance des filtres (conservés en changeant de page / au rechargement)
export function persistFilters() {
  try {
    localStorage.setItem('pm-filters', JSON.stringify({
      role: state.currentFilterRole, assignee: state.currentFilterAssignee,
      category: state.currentFilterCategory, tag: state.currentFilterTag, mineOnly: state.mineOnly
    }));
  } catch (e) {}
}
export function restoreFilters() {
  try {
    var s = JSON.parse(localStorage.getItem('pm-filters') || '{}');
    state.currentFilterRole = s.role || null;
    state.currentFilterAssignee = s.assignee || null;
    state.currentFilterCategory = s.category || null;
    state.currentFilterTag = s.tag || null;
    state.mineOnly = !!s.mineOnly;
  } catch (e) {}
}

export function filterByRole(role) {
  state.currentFilterRole = role || null;
  // Si la personne sélectionnée n'a plus le rôle, la déselectionner
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

export function filterByAssignee(name) {
  state.currentFilterAssignee = name || null;
  // Si le projet sélectionné n'a plus de tâches pour cette personne, le déselectionner
  if (state.currentFilterAssignee && state.currentProjectId) {
    var match = state.tasks.some(function(t) {
      if (Number(t.Project_Id) !== Number(state.currentProjectId)) return false;
      var list = (t.Assignee || '').split(',').map(function(s) { return s.trim(); });
      return list.indexOf(state.currentFilterAssignee) !== -1;
    });
    if (!match) state.currentProjectId = null;
  }
  persistFilters();
  renderProjectSelector();
  refreshAllViews();
}

export function filterByCategory(val) {
  state.currentFilterCategory = val || null;
  persistFilters();
  renderProjectSelector();
  refreshAllViews();
}

export function filterByTag(val) {
  state.currentFilterTag = val || null;
  persistFilters();
  renderProjectSelector();
  refreshAllViews();
}

export function resetFilters() {
  state.currentFilterRole = null;
  state.currentFilterAssignee = null;
  state.currentFilterCategory = null;
  state.currentFilterTag = null;
  state.mineOnly = false;
  state.currentProjectId = null;
  localStorage.setItem('pm-current-project', '');
  persistFilters();
  renderProjectSelector();
  refreshAllViews();
}

export var showArchivedTasks = false;

export function toggleArchiveView() {
  showArchivedTasks = !showArchivedTasks;
  updateArchiveButton();
  refreshAllViews();
}

export function updateArchiveButton() {
  var btn = document.getElementById('archive-toggle-btn');
  if (!btn) return;
  var archivedCount = state.tasks.filter(function(t) { return t.Status === 'archived'; }).length;
  btn.classList.toggle('active', showArchivedTasks);
  if (showArchivedTasks) {
    btn.innerHTML = (currentLang === 'fr' ? '← Retour aux tâches' : '← Back to tasks');
    btn.style.background = '#3b82f6';
    btn.style.color = 'white';
    btn.style.borderColor = '#3b82f6';
  } else {
    btn.innerHTML = '📦 Archives' + (archivedCount > 0 ? ' <span style="background:#ef4444;color:white;border-radius:50%;padding:1px 6px;font-size:10px;margin-left:4px;">' + archivedCount + '</span>' : '');
    btn.style.background = '#f8fafc';
    btn.style.color = '';
    btn.style.borderColor = '#e2e8f0';
  }
}

export function getFilteredTasks() {
  var result = state.tasks.filter(function(t) {
    if (showArchivedTasks) return t.Status === 'archived';
    return t.Status !== 'archived';
  });
  if (state.currentFilterRole) {
    // Identifiants attendus dans task.Assignee : Email en priorité, sinon Name
    var roleIds = state.users
      .filter(function(u) { return userMatchesRole(u, state.currentFilterRole); })
      .reduce(function(acc, u) {
        if (u.Email) acc.push(u.Email);
        if (u.Name) acc.push(u.Name);
        return acc;
      }, []);
    result = result.filter(function(t) {
      var list = (t.Assignee || '').split(',').map(function(s) { return s.trim(); }).filter(Boolean);
      return list.some(function(a) { return roleIds.indexOf(a) !== -1; });
    });
  }
  if (state.currentFilterAssignee) {
    var assigneeUser = state.users.find(function(x) { return (x.Email || x.Name) === state.currentFilterAssignee; });
    var assigneeIds = [state.currentFilterAssignee];
    if (assigneeUser && assigneeUser.Name) assigneeIds.push(assigneeUser.Name);
    if (assigneeUser && assigneeUser.Email) assigneeIds.push(assigneeUser.Email);
    result = result.filter(function(t) {
      var list = (t.Assignee || '').split(',').map(function(s) { return s.trim(); });
      return list.some(function(a) { return assigneeIds.indexOf(a) !== -1; });
    });
  }
  if (state.currentFilterCategory) {
    result = result.filter(function(t) { return t.Category === state.currentFilterCategory; });
  }
  if (state.currentFilterTag) {
    result = result.filter(function(t) { return Array.isArray(t.Tag) && t.Tag.indexOf(state.currentFilterTag) !== -1; });
  }
  if ((state.mineOnly || shouldLimitToMyProjects()) && !state.currentProjectId) {
    var myIds = myProjectIdSet();
    result = result.filter(function(t) {
      return (t.Project_Id && myIds[t.Project_Id]) || taskConcernsCurrentUser(t);
    });
  }
  if (state.currentProjectId) {
    var cpid = Number(state.currentProjectId);
    result = result.filter(function(t) { return Number(t.Project_Id) === cpid; });
  }
  return result;
}

export function getProjectName(projectId) {
  if (!projectId) return '';
  var proj = state.projects.find(function(p) { return p.id === projectId; });
  return proj ? proj.Name : '';
}

export function getProjectColor(projectId) {
  if (!projectId) return '#94a3b8';
  var proj = state.projects.find(function(p) { return p.id === projectId; });
  return proj ? (proj.Color || '#6366f1') : '#94a3b8';
}
