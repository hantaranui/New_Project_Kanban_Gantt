import { t, currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { state } from '../store.js';
// Temporary backwards imports: none of these are extracted yet
// (shouldLimitToMyProjects/myProjectIdSet/taskConcernsCurrentUser -> filters domain).
import { shouldLimitToMyProjects, myProjectIdSet, taskConcernsCurrentUser } from '../main.js';

export function getTaskDependencies(taskId) {
  // Returns tasks that this task depends on (blockers)
  return state.dependencies.filter(function(d) { return d.Task_Id === taskId; })
    .map(function(d) {
      return state.tasks.find(function(t) { return t.id === d.Depends_On_Task_Id; });
    }).filter(Boolean);
}

export function getTasksDependingOn(taskId) {
  // Returns tasks that depend on this task (blocked by this)
  return state.dependencies.filter(function(d) { return d.Depends_On_Task_Id === taskId; })
    .map(function(d) {
      return state.tasks.find(function(t) { return t.id === d.Task_Id; });
    }).filter(Boolean);
}

export function isTaskBlocked(taskId) {
  var blockers = getTaskDependencies(taskId);
  return blockers.some(function(blocker) {
    return blocker && blocker.Status !== 'done';
  });
}

export function ganttDepBadge(task) {
  var deps = getTaskDependencies(task.id);
  var blocks = getTasksDependingOn(task.id);
  var html = '';
  if (deps.length > 0) {
    var dependsText = (currentLang === 'fr' ? 'Cette tâche dépend de : ' : 'This task depends on: ') + deps.map(function(d) { return d.Title; }).join(', ') + '.';
    html += ' <button type="button" class="gantt-dep-badge gantt-dep-depends" data-tooltip="' + sanitize(dependsText) + '" aria-label="' + sanitize(dependsText) + '" onmouseenter="showGanttDependencyTooltip(event)" onmouseleave="hideGanttDependencyTooltip()" onfocus="showGanttDependencyTooltip(event)" onblur="hideGanttDependencyTooltip()" onclick="event.stopPropagation();showGanttDependencyTooltip(event)">🔗' + deps.length + '</button>';
  }
  if (blocks.length > 0) {
    var blocksText = (currentLang === 'fr' ? 'Cette tâche bloque : ' : 'This task blocks: ') + blocks.map(function(d) { return d.Title; }).join(', ') + (currentLang === 'fr' ? '. La tâche indiquée attend que celle-ci soit terminée.' : '. The listed task is waiting for this one to be completed.');
    html += ' <button type="button" class="gantt-dep-badge gantt-dep-blocks" data-tooltip="' + sanitize(blocksText) + '" aria-label="' + sanitize(blocksText) + '" onmouseenter="showGanttDependencyTooltip(event)" onmouseleave="hideGanttDependencyTooltip()" onfocus="showGanttDependencyTooltip(event)" onblur="hideGanttDependencyTooltip()" onclick="event.stopPropagation();showGanttDependencyTooltip(event)">⏳' + blocks.length + '</button>';
  }
  return html;
}

export function showGanttDependencyTooltip(event) {
  var target = event && event.currentTarget;
  if (!target) return;
  var message = target.getAttribute('data-tooltip');
  if (!message) return;
  var tooltip = document.getElementById('gantt-dependency-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'gantt-dependency-tooltip';
    tooltip.setAttribute('role', 'tooltip');
    document.body.appendChild(tooltip);
  }
  tooltip.textContent = message;
  tooltip.style.display = 'block';
  var rect = target.getBoundingClientRect();
  var left = Math.min(Math.max(8, rect.left), window.innerWidth - tooltip.offsetWidth - 8);
  var top = rect.bottom + 8;
  if (top + tooltip.offsetHeight > window.innerHeight - 8) top = rect.top - tooltip.offsetHeight - 8;
  tooltip.style.left = left + 'px';
  tooltip.style.top = Math.max(8, top) + 'px';
}

export function hideGanttDependencyTooltip() {
  var tooltip = document.getElementById('gantt-dependency-tooltip');
  if (tooltip) tooltip.style.display = 'none';
}

export function normalizeDependencyProjectId(value) {
  var parsed = parseInt(value, 10);
  return isNaN(parsed) ? 0 : parsed;
}

export function getDependencyCandidates(taskId, projectId, query) {
  var normalizedProjectId = normalizeDependencyProjectId(projectId);
  if (!normalizedProjectId) return [];
  var normalizedQuery = String(query || '').trim().toLowerCase();
  var existingDependencyIds = {};
  getTaskDependencies(taskId).forEach(function(dependency) {
    existingDependencyIds[dependency.id] = true;
  });

  return state.tasks.filter(function(candidate) {
    if (candidate.id === taskId || candidate.Status === 'archived' || existingDependencyIds[candidate.id]) return false;
    if (normalizeDependencyProjectId(candidate.Project_Id) !== normalizedProjectId) return false;
    if (normalizedQuery && String(candidate.Title || '').toLowerCase().indexOf(normalizedQuery) === -1) return false;
    if (shouldLimitToMyProjects()) {
      var myIds = myProjectIdSet();
      if (!((candidate.Project_Id && myIds[candidate.Project_Id]) || taskConcernsCurrentUser(candidate))) return false;
    }
    return true;
  }).sort(function(a, b) {
    return String(a.Title || '').localeCompare(String(b.Title || ''));
  });
}

export function refreshDependencyTaskOptions(taskId, resetSelection) {
  var selectedInput = document.getElementById('dep-select');
  var optionsContainer = document.getElementById('dep-options');
  if (!selectedInput || !optionsContainer) return;
  var projectEl = document.getElementById('task-project');
  var searchEl = document.getElementById('dep-search');
  if (resetSelection) {
    selectedInput.value = '';
    if (searchEl) searchEl.value = '';
  }
  var candidates = getDependencyCandidates(taskId, projectEl ? projectEl.value : 0, searchEl ? searchEl.value : '');
  optionsContainer.innerHTML = '';

  if (!normalizeDependencyProjectId(projectEl ? projectEl.value : 0)) {
    var noProject = document.createElement('div');
    noProject.className = 'dep-option-empty';
    noProject.textContent = currentLang === 'fr' ? 'Choisissez d’abord un projet.' : 'Choose a project first.';
    optionsContainer.appendChild(noProject);
    return;
  }
  if (!candidates.length) {
    var empty = document.createElement('div');
    empty.className = 'dep-option-empty';
    empty.textContent = currentLang === 'fr' ? 'Aucune tâche correspondante.' : 'No matching task.';
    optionsContainer.appendChild(empty);
    return;
  }

  candidates.forEach(function(candidate) {
    var option = document.createElement('button');
    option.type = 'button';
    option.className = 'dep-option';
    option.setAttribute('role', 'option');
    option.textContent = candidate.Title || '';
    option.onclick = function() { selectDependencyTask(candidate.id); };
    optionsContainer.appendChild(option);
  });
}

export function clearDependencyTaskSelection() {
  var selectedInput = document.getElementById('dep-select');
  if (selectedInput) selectedInput.value = '';
}

export function openDependencyTaskOptions(taskId) {
  refreshDependencyTaskOptions(taskId);
  var combobox = document.getElementById('dep-combobox');
  var searchEl = document.getElementById('dep-search');
  if (combobox) combobox.classList.add('open');
  if (searchEl) searchEl.setAttribute('aria-expanded', 'true');
}

export function closeDependencyTaskOptions() {
  var combobox = document.getElementById('dep-combobox');
  var searchEl = document.getElementById('dep-search');
  if (combobox) combobox.classList.remove('open');
  if (searchEl) searchEl.setAttribute('aria-expanded', 'false');
}

export function toggleDependencyTaskOptions(taskId) {
  var combobox = document.getElementById('dep-combobox');
  if (combobox && combobox.classList.contains('open')) closeDependencyTaskOptions();
  else openDependencyTaskOptions(taskId);
}

export function selectDependencyTask(taskId) {
  var selectedTask = state.tasks.find(function(candidate) { return candidate.id === taskId; });
  var selectedInput = document.getElementById('dep-select');
  var searchEl = document.getElementById('dep-search');
  if (!selectedTask || !selectedInput || !searchEl) return;
  selectedInput.value = String(selectedTask.id);
  searchEl.value = selectedTask.Title || '';
  closeDependencyTaskOptions();
}
