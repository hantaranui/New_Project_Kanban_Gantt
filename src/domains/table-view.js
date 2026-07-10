import { t, currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { priorityLabel } from '../utils/labels.js';
import { formatDate } from '../utils/dates.js';
import { state } from '../store.js';
import { getTaskSubtasks } from './subtasks.js';
import { getFilteredTasks, getProjectName, getProjectColor } from './filters.js';
import { getKanbanStatuses } from './kanban.js';
import { getUserDisplayName } from './team.js';
import { isOverdue, statusLabel } from './tasks.js';

// B2 : multi-filtres statut/priorité du tableau (tableau vide = tous)
export let tableFilterStatuses = [];
export let tableFilterPriorities = [];

export function renderMultiFilter(kind) {
  var containerId = kind === 'status' ? 'ms-status' : 'ms-priority';
  var c = document.getElementById(containerId);
  if (!c) return;
  var opts, selected, placeholder;
  if (kind === 'status') {
    opts = getKanbanStatuses().map(function(s) { return { value: s.key, label: currentLang === 'fr' ? s.label_fr : s.label_en }; });
    selected = tableFilterStatuses;
    placeholder = currentLang === 'fr' ? 'Tous les statuts' : 'All statuses';
  } else {
    opts = [
      { value: 'high', label: t('priorityHigh') },
      { value: 'medium', label: t('priorityMedium') },
      { value: 'low', label: t('priorityLow') }
    ];
    selected = tableFilterPriorities;
    placeholder = currentLang === 'fr' ? 'Toutes priorités' : 'All priorities';
  }
  var labelText = selected.length === 0 ? placeholder
    : opts.filter(function(o) { return selected.indexOf(o.value) !== -1; }).map(function(o) { return o.label; }).join(', ');
  var h = '<button type="button" class="filter-combo-btn' + (selected.length ? ' active' : '') + '" onclick="toggleMsFilter(\'' + containerId + '\')" id="' + containerId + '-btn">';
  h += '<span class="filter-combo-label">' + sanitize(labelText) + '</span><span class="filter-combo-chevron">▾</span></button>';
  h += '<div class="filter-combo-dd" id="' + containerId + '-dd"><div class="filter-combo-list">';
  if (selected.length) {
    h += '<div class="filter-combo-opt" onclick="clearMsFilter(\'' + kind + '\')" style="color:#ef4444;font-weight:600;">✕ ' + (currentLang === 'fr' ? 'Effacer' : 'Clear') + '</div>';
  }
  opts.forEach(function(o) {
    var on = selected.indexOf(o.value) !== -1;
    h += '<div class="filter-combo-opt' + (on ? ' selected' : '') + '" onclick="toggleMsOption(\'' + kind + '\',\'' + sanitize(o.value).replace(/'/g, "\\'") + '\')">';
    h += '<span style="display:inline-block;width:16px;">' + (on ? '✓' : '') + '</span>' + sanitize(o.label) + '</div>';
  });
  h += '</div></div>';
  // Préserver l'état ouvert si le menu l'était avant reconstruction
  var prevDd = document.getElementById(containerId + '-dd');
  var wasOpen = prevDd && prevDd.classList.contains('show');
  c.innerHTML = h;
  if (wasOpen) {
    var newDd = document.getElementById(containerId + '-dd');
    var newBtn = document.getElementById(containerId + '-btn');
    if (newDd) newDd.classList.add('show');
    if (newBtn) newBtn.classList.add('open');
  }
}

export function toggleMsFilter(containerId) {
  var dd = document.getElementById(containerId + '-dd');
  var btn = document.getElementById(containerId + '-btn');
  if (!dd) return;
  var isOpen = dd.classList.contains('show');
  document.querySelectorAll('.filter-combo-dd.show').forEach(function(d) { d.classList.remove('show'); });
  document.querySelectorAll('.filter-combo-btn.open').forEach(function(b) { b.classList.remove('open'); });
  if (!isOpen) {
    dd.classList.add('show');
    if (btn) btn.classList.add('open');
    setTimeout(function() {
      document.addEventListener('mousedown', function hideMs(e) {
        var box = document.getElementById(containerId);
        // Re-query : les éléments sont recréés à chaque renderMultiFilter
        if (box && !box.contains(e.target)) {
          var dd2 = document.getElementById(containerId + '-dd');
          var btn2 = document.getElementById(containerId + '-btn');
          if (dd2) dd2.classList.remove('show');
          if (btn2) btn2.classList.remove('open');
          document.removeEventListener('mousedown', hideMs);
        }
      });
    }, 0);
  }
}

export function toggleMsOption(kind, value) {
  var arr = kind === 'status' ? tableFilterStatuses : tableFilterPriorities;
  var i = arr.indexOf(value);
  if (i === -1) arr.push(value); else arr.splice(i, 1);
  renderTableView(); // reconstruit le filtre (état ouvert préservé) + le tableau
}

export function clearMsFilter(kind) {
  if (kind === 'status') tableFilterStatuses = []; else tableFilterPriorities = [];
  renderMultiFilter(kind);
  renderTableView();
}

export let tableSortField = null;
export let tableSortAsc = true;
export function sortTable(field) {
  if (tableSortField === field) { tableSortAsc = !tableSortAsc; }
  else { tableSortField = field; tableSortAsc = true; }
  renderTableView();
}
export function renderTableView() {
  // B3 : mémoriser l'état avant reconstruction (sous-tâches dépliées + scroll)
  var _prevView = document.getElementById('table-view');
  var _expandedParents = [];
  if (_prevView) {
    _prevView.querySelectorAll('.toggle-btn.expanded').forEach(function(b) {
      _expandedParents.push(b.id.replace('toggle-', ''));
    });
  }
  var _scrollEl = document.scrollingElement || document.documentElement;
  var _scrollTop = _scrollEl ? _scrollEl.scrollTop : (window.scrollY || 0);

  // B2 : (re)construire les multi-filtres statut/priorité
  renderMultiFilter('status');
  renderMultiFilter('priority');

  var search = (document.getElementById('table-search').value || '').toLowerCase();

  var filtered = getFilteredTasks().filter(function(task) {
    if (tableFilterStatuses.length && tableFilterStatuses.indexOf(task.Status) === -1) return false;
    if (tableFilterPriorities.length && tableFilterPriorities.indexOf(task.Priority) === -1) return false;
    if (search) {
      var text = (task.Title + ' ' + task.Description + ' ' + task.Assignee).toLowerCase();
      if (text.indexOf(search) === -1) return false;
    }
    return true;
  });

  if (tableSortField) {
    var dir = tableSortAsc ? 1 : -1;
    filtered.sort(function(a, b) {
      var va, vb;
      switch (tableSortField) {
        case 'Title': va = (a.Title || '').toLowerCase(); vb = (b.Title || '').toLowerCase(); break;
        case 'Project': va = getProjectName(a.Project_Id).toLowerCase(); vb = getProjectName(b.Project_Id).toLowerCase(); break;
        case 'Status': va = a.Status || ''; vb = b.Status || ''; break;
        case 'Priority': var po = {high:0,medium:1,low:2}; va = po[a.Priority] !== undefined ? po[a.Priority] : 3; vb = po[b.Priority] !== undefined ? po[b.Priority] : 3; break;
        case 'Assignee': va = (a.Assignee || '').toLowerCase(); vb = (b.Assignee || '').toLowerCase(); break;
        case 'Start_Date': va = a.Start_Date || 0; vb = b.Start_Date || 0; break;
        case 'Due_Date': va = a.Due_Date || 0; vb = b.Due_Date || 0; break;
        default: va = ''; vb = '';
      }
      if (va < vb) return -1 * dir;
      if (va > vb) return 1 * dir;
      return 0;
    });
  }

  function sortIcon(field) { return tableSortField === field ? (tableSortAsc ? ' ▲' : ' ▼') : ' ⇅'; }
  var thStyle = 'cursor:pointer;user-select:none;';
  var html = '<table class="data-table">';
  html += '<thead><tr>';
  html += '<th style="' + thStyle + '" onclick="sortTable(\'Title\')">' + t('colTaskName') + sortIcon('Title') + '</th>';
  html += '<th style="' + thStyle + '" onclick="sortTable(\'Project\')">' + (currentLang === 'fr' ? 'Projet' : 'Project') + sortIcon('Project') + '</th>';
  html += '<th style="' + thStyle + '" onclick="sortTable(\'Status\')">' + t('colStatus') + sortIcon('Status') + '</th>';
  html += '<th style="' + thStyle + '" onclick="sortTable(\'Priority\')">' + t('colPriority') + sortIcon('Priority') + '</th>';
  html += '<th style="' + thStyle + '" onclick="sortTable(\'Assignee\')">' + t('colAssignee') + sortIcon('Assignee') + '</th>';
  html += '<th style="' + thStyle + '" onclick="sortTable(\'Start_Date\')">' + t('colStartDate') + sortIcon('Start_Date') + '</th>';
  html += '<th style="' + thStyle + '" onclick="sortTable(\'Due_Date\')">' + t('colDueDate') + sortIcon('Due_Date') + '</th>';
  html += '<th>' + t('colActions') + '</th>';
  html += '</tr></thead><tbody>';

  for (var i = 0; i < filtered.length; i++) {
    var task = filtered[i];
    var statusClass = 'status-' + task.Status;
    var overdueHtml = isOverdue(task) ? ' ⚠️' : '';
    var dotClass = task.Priority === 'high' ? 'dot-high' : (task.Priority === 'medium' ? 'dot-medium' : 'dot-low');

    var taskSubtasks = getTaskSubtasks(task.id);
    var completedSt = taskSubtasks.filter(function(st) { return st.Completed; }).length;

    var taskProjColor = getProjectColor(task.Project_Id);
    var taskProjName = getProjectName(task.Project_Id);
    html += '<tr class="task-row clickable-row" onclick="openEditTaskModal(' + task.id + ')">';
    html += '<td><div style="display:flex;align-items:center;gap:8px;border-left:3px solid ' + taskProjColor + ';padding-left:6px;">';
    if (taskSubtasks.length > 0) {
      html += '<button class="toggle-btn" onclick="event.stopPropagation(); toggleSubtasks(' + task.id + ')" id="toggle-' + task.id + '">▶</button>';
    } else {
      html += '<span style="width:18px;"></span>';
    }
    html += '<div><div style="font-weight:700;">' + sanitize(task.Title) + '</div>';
    if (task.Description) html += '<div style="font-size:11px;color:#94a3b8;margin-top:2px;">' + sanitize(task.Description).substring(0, 80) + '</div>';
    html += '</div></div></td>';
    html += '<td>' + (taskProjName ? '<span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:10px;height:10px;border-radius:50%;background:' + taskProjColor + ';display:inline-block;"></span>' + sanitize(taskProjName) + '</span>' : '') + '</td>';
    html += '<td><span class="status-badge ' + statusClass + '">● ' + statusLabel(task.Status) + '</span>';
    if (taskSubtasks.length > 0) html += ' <span class="st-badge">' + completedSt + '/' + taskSubtasks.length + '</span>';
    html += '</td>';
    html += '<td><span class="priority-dot ' + dotClass + '"></span> ' + priorityLabel(task.Priority) + '</td>';
    var assigneeDisplay = task.Assignee ? task.Assignee.split(',').map(function(a) { return getUserDisplayName(a.trim()); }).join(', ') : '';
    html += '<td>' + (assigneeDisplay ? '<span class="assignee-chip">👤 ' + sanitize(assigneeDisplay) + '</span>' : '') + '</td>';
    html += '<td>' + (task.Start_Date ? formatDate(task.Start_Date) : t('notDefined')) + '</td>';
    html += '<td style="' + (isOverdue(task) ? 'color:#dc2626;font-weight:700;' : '') + '">' + (task.Due_Date ? formatDate(task.Due_Date) + overdueHtml : t('noDate')) + '</td>';
    html += '<td onclick="event.stopPropagation();">';
    if (state.isOwner) html += '<button class="btn-icon" onclick="deleteTask(' + task.id + ')">🗑️</button>';
    html += '</td>';
    html += '</tr>';

    // Subtasks rows (hidden by default) — B1 : colonnes enrichies, sans pastille près du titre
    var _nowSec = Math.floor(Date.now() / 1000);
    for (var si = 0; si < taskSubtasks.length; si++) {
      var st = taskSubtasks[si];
      html += '<tr class="subtask-row clickable-row" data-parent="' + task.id + '" style="display:none;cursor:pointer;" onclick="openEditTaskModal(' + task.id + ', true); setTimeout(function(){startEditSubtask(' + st.id + ')},100);">';
      var stStatus = st.Status || (st.Completed ? 'done' : 'todo');
      var stDotClass = st.Priority === 'high' ? 'dot-high' : (st.Priority === 'medium' ? 'dot-medium' : 'dot-low');
      var stAssignee = st.Assignee ? st.Assignee.split(',').map(function(a) { return getUserDisplayName(a.trim()); }).join(', ') : '';
      var stOverdue = st.Due_Date && !st.Completed && st.Due_Date < _nowSec;
      // Colonne Tâche (titre)
      var stMilestoneMark = (st.Type === 'milestone') ? '<span title="Jalon" style="color:#7c3aed;margin-right:3px;">◆</span>' : '';
      html += '<td><div class="subtask-indent"><span class="subtask-arrow">└</span><input type="checkbox" class="subtask-checkbox" ' + (st.Completed ? 'checked' : '') + ' onclick="event.stopPropagation();toggleSubtask(' + st.id + ', ' + !st.Completed + ')" style="cursor:pointer;width:14px;height:14px;margin-right:6px;flex-shrink:0;" />' + stMilestoneMark + '<span class="subtask-name' + (st.Completed ? ' completed' : '') + '">' + sanitize(st.Title) + '</span></div></td>';
      // Projet (vide : hérité du parent)
      html += '<td></td>';
      // Statut (couleur réelle du statut personnalisé)
      var stStatusDef = getKanbanStatuses().find(function(s) { return s.key === stStatus; });
      var stStatusColor = stStatusDef && stStatusDef.color ? stStatusDef.color : '#94a3b8';
      html += '<td><span class="status-badge" style="background:' + stStatusColor + '20;color:' + stStatusColor + ';">● ' + statusLabel(stStatus) + '</span></td>';
      // Priorité
      html += '<td><span class="priority-dot ' + stDotClass + '"></span> ' + priorityLabel(st.Priority) + '</td>';
      // Assigné à
      html += '<td>' + (stAssignee ? '<span class="assignee-chip">👤 ' + sanitize(stAssignee) + '</span>' : '') + '</td>';
      // Date de début
      html += '<td>' + (st.Start_Date ? formatDate(st.Start_Date) : '') + '</td>';
      // Échéance
      html += '<td style="' + (stOverdue ? 'color:#dc2626;font-weight:700;' : '') + '">' + (st.Due_Date ? formatDate(st.Due_Date) + (stOverdue ? ' ⚠️' : '') : '') + '</td>';
      // Actions
      html += '<td></td>';
      html += '</tr>';
    }
  }

  if (filtered.length === 0) {
    html += '<tr><td colspan="8" style="text-align:center;padding:30px;color:#94a3b8;">' + t('noTasks') + '</td></tr>';
  }

  html += '</tbody></table>';
  document.getElementById('table-view').innerHTML = html;

  // B3 : restaurer le dépliage des sous-tâches puis la position de scroll
  _expandedParents.forEach(function(pid) {
    var rows = document.querySelectorAll('.subtask-row[data-parent="' + pid + '"]');
    var btn = document.getElementById('toggle-' + pid);
    for (var i = 0; i < rows.length; i++) rows[i].style.display = 'table-row';
    if (btn) { btn.textContent = '▼'; btn.classList.add('expanded'); }
  });
  if (_scrollEl && _scrollTop) _scrollEl.scrollTop = _scrollTop;
}
