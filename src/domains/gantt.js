import { t, currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { state } from '../store.js';
import { formatDate, getISOWeek, getWeekStart } from '../utils/dates.js';
import { priorityLabel, isMilestone } from '../utils/labels.js';
import { showToast } from '../ui/toast.js';
import { getTaskAttachments } from './attachments.js';
import { getTaskComments } from './comments.js';
import { getTaskSubtasks, getSubtaskBlocker } from './subtasks.js';
import { getFilteredTasks, getProjectName, getProjectColor } from './filters.js';
import { getKanbanStatuses, openCardCommentsModal, openCardAttachmentsModal } from './kanban.js';
import { openEditTaskModal } from './task-modal.js';
import { getUserDisplayName } from './team.js';
import { isOverdue } from './tasks.js';

export var ganttMode = 'days';
export var ganttSort = 'default'; // 'default' | 'priority' | 'alpha' | 'due'
export var ganttCustomStart = ''; // mode 'custom' : date de début (YYYY-MM-DD)
export var ganttCustomEnd = '';   // mode 'custom' : date de fin (YYYY-MM-DD)
export var ganttYear = new Date().getFullYear();
export var ganttMonth = new Date().getMonth();
export var expandedGanttTasks = {}; // taskId -> true quand les sous-tâches sont visibles dans le Gantt
export var selectedGanttTaskId = null;

export function getGanttSubtasks(taskId) {
  return getTaskSubtasks(taskId);
}

// Construit la cellule de sous-tâche du Gantt : lisible, cochable, sans ouvrir la tâche parente.
export function renderGanttSubtaskLabelCell(st, parentTaskId) {
  var completedClass = st.Completed ? ' completed' : '';
  var html = '<td class="gantt-task-label gantt-subtask-cell' + completedClass + '">';
  html += '<label class="gantt-subtask-label" onclick="event.stopPropagation()">';
  html += '<span class="gantt-subtask-arrow">' + (isMilestone(st) ? '◆' : '↳') + '</span>';
  html += '<input type="checkbox" class="gantt-subtask-checkbox" ' + (st.Completed ? 'checked' : '') + ' onchange="toggleGanttSubtask(' + st.id + ', this.checked)">';
  html += '<span class="gantt-subtask-title">' + sanitize(st.Title) + '</span>';
  html += '</label>';
  var stMeta = '';
  var stBlocker = getSubtaskBlocker(st);
  if (stBlocker) {
    var depColor = stBlocker.Completed ? '#94a3b8' : '#ef4444';
    stMeta += '<span style="color:' + depColor + ';" title="' + (currentLang === 'fr' ? 'Dépend de' : 'Depends on') + ' : ' + sanitize(stBlocker.Title) + '">🔗 ' + sanitize(stBlocker.Title).substring(0, 14) + '</span>';
  }
  if (st.Due_Date) stMeta += '<span>📅 ' + formatDate(st.Due_Date) + '</span>';
  else stMeta += '<span>' + (currentLang === 'fr' ? 'sans date' : 'no date') + '</span>';
  if (st.Assignee) stMeta += '<span>👤 ' + sanitize(st.Assignee).split(',')[0].trim().substring(0, 10) + '</span>';
  if (stMeta) html += '<div class="gantt-subtask-meta">' + stMeta + '</div>';
  html += '</td>';
  return html;
}

export async function toggleGanttSubtask(subtaskId, completed) {
  try {
    await grist.docApi.applyUserActions([
      ['UpdateRecord', state.SUBTASKS_TABLE, subtaskId, { Completed: completed }]
    ]);
    for (var i = 0; i < state.subtasks.length; i++) {
      if (state.subtasks[i].id === subtaskId) { state.subtasks[i].Completed = completed; break; }
    }
    renderGanttView();
  } catch (e) {
    console.error('toggleGanttSubtask:', e);
    showToast((currentLang === 'fr' ? 'Impossible de modifier la sous-tâche : ' : 'Could not update subtask: ') + e.message, 'error');
  }
}

// Couleur de barre pour une sous-tâche (verte si complétée, sinon hérite du statut parent)
// B2 : un jalon reçoit en plus la classe gantt-bar-milestone (rendu losange, tous modes)
export function ganttSubtaskBarClass(st, parentTask) {
  var base;
  if (st.Completed) base = 'gantt-bar-done';
  else if (parentTask.Status === 'progress') base = 'gantt-bar-progress';
  else base = 'gantt-bar-todo';
  return base + (isMilestone(st) ? ' gantt-bar-milestone' : '');
}

// Bornes de la sous-tâche. B2 : un jalon est une date unique (Due_Date) → start = end.
export function getGanttSubtaskRange(st, parentTask) {
  if (!st.Start_Date && !st.Due_Date) {
    var far = new Date(8640000000000000);
    return { start: far, end: far };
  }
  var stEnd = st.Due_Date ? new Date(st.Due_Date * 1000) : (parentTask.Due_Date ? new Date(parentTask.Due_Date * 1000) : null);
  if (!stEnd) {
    var far2 = new Date(8640000000000000);
    return { start: far2, end: far2 };
  }
  var stStart;
  if (isMilestone(st)) {
    stStart = new Date(stEnd); // jalon : un seul jour
  } else {
    stStart = st.Start_Date ? new Date(st.Start_Date * 1000) : new Date(stEnd);
    if (stStart > stEnd) stStart = new Date(stEnd);
  }
  stStart.setHours(0, 0, 0, 0);
  stEnd.setHours(23, 59, 59, 999);
  return { start: stStart, end: stEnd };
}

export function getTaskExtensionEnd(task) {
  if (task.Auto_Extend && task.Status !== 'done' && task.Status !== 'archived') {
    var now = new Date(); now.setHours(23, 59, 59, 999);
    var dueDate = task.Due_Date ? new Date(task.Due_Date * 1000) : null;
    if (dueDate && now > dueDate) return now;
  }
  if (task.Extension_Date) {
    var ext = new Date(task.Extension_Date * 1000);
    ext.setHours(23, 59, 59, 999);
    return ext;
  }
  return null;
}

export function getExtensionBarColor(task) {
  var statuses = getKanbanStatuses();
  for (var si = 0; si < statuses.length; si++) {
    if (statuses[si].key === task.Status && statuses[si].color) return statuses[si].color;
  }
  if (task.Status === 'done') return '#22c55e';
  if (task.Status === 'progress') return '#f59e0b';
  return '#3b82f6';
}

export function getGanttBarColor(task) {
  var statuses = getKanbanStatuses();
  for (var si = 0; si < statuses.length; si++) {
    if (statuses[si].key === task.Status && statuses[si].color) return statuses[si].color;
  }
  return '';
}

export function getGanttBarClass(task) {
  if (isOverdue(task)) return 'gantt-bar-overdue';
  if (task.Status === 'done') return 'gantt-bar-done';
  if (task.Status === 'progress') return 'gantt-bar-progress';
  return 'gantt-bar-todo';
}

export function ganttPriorityClass(priority) {
  if (priority === 'high') return 'gantt-priority-high';
  if (priority === 'low') return 'gantt-priority-low';
  return 'gantt-priority-medium';
}

export function ganttTaskRowStart(task) {
  var selected = selectedGanttTaskId === task.id;
  return '<tr class="gantt-task-row' + (selected ? ' gantt-row-selected' : '') + '" data-gantt-task-id="' + task.id + '">';
}

export function renderGanttTaskLabel(task) {
  var dotClass = task.Priority === 'high' ? 'dot-high' : (task.Priority === 'medium' ? 'dot-medium' : 'dot-low');
  var assigneeNames = task.Assignee ? task.Assignee.split(',').map(function(a) { return getUserDisplayName(a.trim()); }).join(', ') : '';
  var ganttProjColor = getProjectColor(task.Project_Id);
  var ganttProjName = getProjectName(task.Project_Id);
  var checked = selectedGanttTaskId === task.id ? ' checked' : '';
  var focusTitle = currentLang === 'fr' ? 'Afficher cette tâche dans le Gantt' : 'Show this task in the Gantt';
  var openTitle = currentLang === 'fr' ? 'Ouvrir la fiche de la tâche' : 'Open task details';
  var taskComments = getTaskComments(task.id);
  var taskAttachments = getTaskAttachments(task.id);

  var html = '<td class="gantt-task-label">';
  html += '<div class="task-name">';
  html += '<input type="checkbox" class="gantt-focus-checkbox"' + checked + ' title="' + focusTitle + '" onclick="event.stopPropagation()" onchange="focusGanttTask(' + task.id + ', this.checked)">';
  html += '<span class="priority-dot ' + dotClass + '" title="' + priorityLabel(task.Priority) + '"></span>';
  html += '<button type="button" class="gantt-task-title-btn" onclick="openEditTaskModal(' + task.id + ')" title="' + openTitle + '">' + sanitize(task.Title) + '</button>';
  html += '</div>';
  if (ganttProjName) {
    html += '<div class="gantt-project-line" style="--project-color:' + ganttProjColor + ';">' + sanitize(ganttProjName) + '</div>';
  }
  html += '<div class="task-info">';
  if (task.Priority) html += '<span class="gantt-priority-text ' + ganttPriorityClass(task.Priority) + '">' + priorityLabel(task.Priority) + '</span>';
  if (assigneeNames) html += ' 👤 ' + sanitize(assigneeNames);
  if (task.Due_Date) html += ' 📅 ' + formatDate(task.Due_Date);
  if (taskComments.length > 0) html += ' <button class="gantt-mini-btn" onclick="event.stopPropagation();openCardCommentsModal(' + task.id + ')" title="' + t('comments') + '">💬 ' + taskComments.length + '</button>';
  if (taskAttachments.length > 0) html += ' <button class="gantt-mini-btn" onclick="event.stopPropagation();openCardAttachmentsModal(' + task.id + ')" title="' + (currentLang === 'fr' ? 'Pièces jointes' : 'Attachments') + '">📎 ' + taskAttachments.length + '</button>';
  html += '</div></td>';
  return html;
}

export function renderGanttView() {
  var yearSelect = document.getElementById('gantt-year');
  if (yearSelect.options.length === 0) {
    for (var y = 2020; y <= 2050; y++) {
      var opt = document.createElement('option');
      opt.value = y;
      opt.textContent = y;
      yearSelect.appendChild(opt);
    }
  }
  // Always sync select TO ganttYear (never overwrite ganttYear from select)
  yearSelect.value = ganttYear;

  document.querySelectorAll('[data-gantt-mode]').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-gantt-mode') === ganttMode);
  });

  var tasksWithDates = getFilteredTasks().filter(function(task) { return task.Start_Date || task.Due_Date; });
  // A8 : tri du Gantt
  var ganttSortSel = document.getElementById('gantt-sort');
  if (ganttSortSel && ganttSortSel.value !== ganttSort) ganttSortSel.value = ganttSort;
  if (ganttSort === 'priority') {
    var prioOrder = { high: 0, medium: 1, low: 2 };
    tasksWithDates.sort(function(a, b) {
      var pa = prioOrder[a.Priority] !== undefined ? prioOrder[a.Priority] : 3;
      var pb = prioOrder[b.Priority] !== undefined ? prioOrder[b.Priority] : 3;
      return pa - pb;
    });
  } else if (ganttSort === 'alpha') {
    tasksWithDates.sort(function(a, b) { return (a.Title || '').localeCompare(b.Title || ''); });
  } else if (ganttSort === 'due') {
    tasksWithDates.sort(function(a, b) {
      var da = a.Due_Date || a.Start_Date || 0, db = b.Due_Date || b.Start_Date || 0;
      return da - db;
    });
  }
  document.getElementById('gantt-task-count').textContent = '(' + tasksWithDates.length + ' ' + (currentLang === 'fr' ? 'tâches' : 'tasks') + ')';

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var dayNames = currentLang === 'fr'
    ? ['DIM.', 'LUN.', 'MAR.', 'MER.', 'JEU.', 'VEN.', 'SAM.']
    : ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  var monthNamesShort = currentLang === 'fr'
    ? ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var monthNames = currentLang === 'fr'
    ? ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var html = '<div class="gantt-container"><table class="gantt-table">';

  // ===== WEEKS MODE =====
  if (ganttMode === 'weeks') {
    var weekAnchor = (ganttYear === today.getFullYear() && ganttMonth === today.getMonth())
      ? new Date(today)
      : new Date(ganttYear, ganttMonth, 1);
    var startWeek = getISOWeek(weekAnchor);
    var numWeeks = 24;
    var weeks = [];
    for (var w = 0; w < numWeeks; w++) {
      var wn = startWeek + w;
      var yr = ganttYear;
      if (wn > 52) { wn -= 52; yr++; }
      var ws = getWeekStart(yr, wn);
      var we = new Date(ws);
      we.setDate(we.getDate() + 6);
      weeks.push({ num: wn, year: yr, start: ws, end: we });
    }

    // Header: week numbers with month subtitle
    html += '<thead><tr><th class="gantt-task-label" style="text-align:left;">' + t('colTaskName') + '</th>';
    for (var wi = 0; wi < weeks.length; wi++) {
      var wk = weeks[wi];
      var isCurrentWeek = getISOWeek(today) === wk.num && today.getFullYear() === wk.year;
      html += '<th style="min-width:80px;' + (isCurrentWeek ? 'background:#fef2f2;color:#ef4444;' : '') + '">';
      html += '<div style="font-size:11px;font-weight:800;">S' + wk.num + '</div>';
      html += '<div style="font-size:9px;font-weight:400;color:#94a3b8;">' + monthNamesShort[wk.start.getMonth()] + ' ' + String(wk.start.getFullYear()).substring(2) + '</div>';
      html += '</th>';
    }
    html += '</tr></thead><tbody>';

    // Task rows
    for (var ti = 0; ti < tasksWithDates.length; ti++) {
      var task = tasksWithDates[ti];
      var barClass = getGanttBarClass(task);
      var barCustomColor = getGanttBarColor(task);
      var barCustomStyle = barCustomColor ? 'background:' + barCustomColor + ';color:white;' : '';
      html += ganttTaskRowStart(task);
      html += renderGanttTaskLabel(task);

      var tStart = task.Start_Date ? new Date(task.Start_Date * 1000) : null;
      var tEnd = task.Due_Date ? new Date(task.Due_Date * 1000) : null;
      if (!tStart && tEnd) tStart = tEnd;
      if (!tEnd && tStart) tEnd = tStart;
      if (tStart) tStart.setHours(0, 0, 0, 0);
      if (tEnd) tEnd.setHours(23, 59, 59, 999);

      // Find first and last week index where bar should appear
      var barStartIdx = -1, barEndIdx = -1;
      for (var wi = 0; wi < weeks.length; wi++) {
        var wk = weeks[wi];
        if (tStart && tEnd && tStart <= wk.end && tEnd >= wk.start) {
          if (barStartIdx === -1) barStartIdx = wi;
          barEndIdx = wi;
        }
      }

      var extEnd = getTaskExtensionEnd(task);
      var extStartIdx = -1, extEndIdx = -1;
      if (extEnd && tEnd && extEnd > tEnd) {
        for (var ewi = 0; ewi < weeks.length; ewi++) {
          if (tEnd <= weeks[ewi].end && extEnd >= weeks[ewi].start) {
            if (extStartIdx === -1) extStartIdx = ewi;
            extEndIdx = ewi;
          }
        }
      }
      var extColor = getExtensionBarColor(task);

      for (var wi = 0; wi < weeks.length; wi++) {
        var isCurrentWeek = getISOWeek(today) === weeks[wi].num && today.getFullYear() === weeks[wi].year;
        html += '<td class="gantt-cell" style="position:relative;' + (isCurrentWeek ? 'background:#fef2f2;' : '') + '">';
        if (wi === barStartIdx) {
          var spanCols = barEndIdx - barStartIdx + 1;
          var widthPx = spanCols * 80;
          html += '<div class="gantt-bar ' + barClass + '" data-gantt-bar-task-id="' + task.id + '" style="left:2px;width:' + widthPx + 'px;cursor:pointer;' + barCustomStyle + '" title="' + sanitize(task.Title) + '" onclick="openEditTaskModal(' + task.id + ')">' + sanitize(task.Title) + '</div>';
        }
        if (wi === extStartIdx && extStartIdx >= 0) {
          var extSpan = extEndIdx - extStartIdx + 1;
          var extW = extSpan * 80;
          html += '<div class="gantt-bar-extension" title="' + t('extensionTooltip') + ' — ' + sanitize(task.Title) + '" style="left:2px;width:' + extW + 'px;border-color:' + extColor + ';background:' + extColor + '20;"></div>';
        }
        html += '</td>';
      }

      html += '</tr>';

      // === Lignes sous-tâches (mode Semaines) ===
      if (expandedGanttTasks[task.id]) {
        var sts = getGanttSubtasks(task.id);
        for (var sti = 0; sti < sts.length; sti++) {
          var st = sts[sti];
          var stRange = getGanttSubtaskRange(st, task);
          var stBarClass = ganttSubtaskBarClass(st, task);
          html += '<tr class="gantt-subtask-row">' + renderGanttSubtaskLabelCell(st, task.id);
          var stStartIdx = -1, stEndIdx = -1;
          for (var wi2 = 0; wi2 < weeks.length; wi2++) {
            if (stRange.start <= weeks[wi2].end && stRange.end >= weeks[wi2].start) {
              if (stStartIdx === -1) stStartIdx = wi2;
              stEndIdx = wi2;
            }
          }
          for (var wi2 = 0; wi2 < weeks.length; wi2++) {
            var isCW = getISOWeek(today) === weeks[wi2].num && today.getFullYear() === weeks[wi2].year;
            html += '<td class="gantt-cell" style="position:relative;' + (isCW ? 'background:#fef2f2;' : '') + '">';
            if (wi2 === stStartIdx) {
              var stSpan = stEndIdx - stStartIdx + 1;
              var stWidth = stSpan * 80;
              html += '<div class="gantt-bar gantt-bar-subtask ' + stBarClass + '" style="left:2px;width:' + stWidth + 'px;cursor:pointer;" title="' + sanitize(st.Title) + '" onclick="openEditTaskModal(' + task.id + ')"></div>';
            }
            html += '</td>';
          }
          html += '</tr>';
        }
      }
    }

    // Footer
    var viewStartMonth = monthNames[weeks[0].start.getMonth()];
    var viewEndMonth = monthNames[weeks[weeks.length - 1].start.getMonth()];
    html += '</tbody></table>';
    html += '<div class="gantt-footer">';
    html += '<span>🌟 ' + t('ganttFullYear') + ' • ' + t('ganttNavInfo') + ' • ' + tasksWithDates.length + ' ' + (currentLang === 'fr' ? 'tâches' : 'tasks') + '</span>';
    html += '<span>' + t('ganttViewRange') + ' ' + viewStartMonth + ' - ' + viewEndMonth + ' ' + ganttYear + '</span>';
    html += '</div></div>';

    document.getElementById('gantt-view').innerHTML = html;
    initGanttDragScroll();
    return;
  }

  // ===== YEAR / TWOYEARS MODE =====
  if (ganttMode === 'year' || ganttMode === 'twoyears') {
    var numYears = ganttMode === 'twoyears' ? 2 : 1;
    var totalMonths = numYears * 12;
    var startYr = ganttYear;
    var colWidth = ganttMode === 'twoyears' ? 50 : 70;

    var todayMonth = today.getMonth();
    var todayYear = today.getFullYear();

    html += '<thead>';
    if (ganttMode === 'twoyears') {
      html += '<tr><th class="gantt-task-label" style="text-align:left;" rowspan="2">' + t('colTaskName') + '</th>';
      html += '<th colspan="12" style="font-size:12px;font-weight:800;background:#f8fafc;">' + startYr + '</th>';
      html += '<th colspan="12" style="font-size:12px;font-weight:800;background:#f8fafc;">' + (startYr + 1) + '</th>';
      html += '</tr><tr>';
    } else {
      html += '<tr><th class="gantt-task-label" style="text-align:left;">' + t('colTaskName') + '</th>';
    }
    for (var ym = 0; ym < totalMonths; ym++) {
      var yr = startYr + Math.floor(ym / 12);
      var mo = ym % 12;
      var isCurrent = (yr === todayYear && mo === todayMonth);
      html += '<th style="min-width:' + colWidth + 'px;' + (isCurrent ? 'background:#fef2f2;color:#ef4444;' : '') + '">' + monthNamesShort[mo].substring(0, 3) + '</th>';
    }
    html += '</tr></thead><tbody>';

    for (var ti = 0; ti < tasksWithDates.length; ti++) {
      var task = tasksWithDates[ti];
      var barClass = getGanttBarClass(task);
      html += ganttTaskRowStart(task) + renderGanttTaskLabel(task);

      var yTStart = task.Start_Date ? new Date(task.Start_Date * 1000) : null;
      var yTEnd = task.Due_Date ? new Date(task.Due_Date * 1000) : null;
      if (!yTStart && yTEnd) yTStart = new Date(yTEnd);
      if (!yTEnd && yTStart) yTEnd = new Date(yTStart);
      if (yTStart) yTStart.setHours(0, 0, 0, 0);
      if (yTEnd) yTEnd.setHours(23, 59, 59, 999);

      var yBarStart = -1, yBarEnd = -1;
      for (var ym = 0; ym < totalMonths; ym++) {
        var yr = startYr + Math.floor(ym / 12);
        var mo = ym % 12;
        var ms = new Date(yr, mo, 1);
        var me = new Date(yr, mo + 1, 0, 23, 59, 59, 999);
        if (yTStart && yTEnd && yTStart <= me && yTEnd >= ms) {
          if (yBarStart === -1) yBarStart = ym;
          yBarEnd = ym;
        }
      }

      var yExtEnd = getTaskExtensionEnd(task);
      var yExtStart = -1, yExtEndIdx = -1;
      if (yExtEnd && yTEnd && yExtEnd > yTEnd) {
        for (var yme = 0; yme < totalMonths; yme++) {
          var yre = startYr + Math.floor(yme / 12); var moe = yme % 12;
          var mse = new Date(yre, moe, 1); var mee = new Date(yre, moe + 1, 0, 23, 59, 59, 999);
          // Démarrer la prolongation le mois SUIVANT la fin de tâche (évite le chevauchement)
          if (mse > yTEnd && yExtEnd >= mse) { if (yExtStart === -1) yExtStart = yme; yExtEndIdx = yme; }
        }
      }
      var yExtColor = getExtensionBarColor(task);

      for (var ym = 0; ym < totalMonths; ym++) {
        var yr2 = startYr + Math.floor(ym / 12);
        var mo2 = ym % 12;
        var isCurrent2 = (yr2 === todayYear && mo2 === todayMonth);
        html += '<td class="gantt-cell" style="position:relative;min-width:' + colWidth + 'px;' + (isCurrent2 ? 'background:#fef2f2;' : '') + '">';
        if (ym === yBarStart) {
          var yBarW = (yBarEnd - yBarStart + 1) * colWidth;
          html += '<div class="gantt-bar ' + barClass + '" data-gantt-bar-task-id="' + task.id + '" style="left:2px;width:' + yBarW + 'px;cursor:pointer;' + barCustomStyle + '" title="' + sanitize(task.Title) + '" onclick="openEditTaskModal(' + task.id + ')">' + sanitize(task.Title) + '</div>';
        }
        if (ym === yExtStart && yExtStart >= 0) {
          var yExtW = (yExtEndIdx - yExtStart + 1) * colWidth;
          html += '<div class="gantt-bar-extension" title="' + t('extensionTooltip') + ' — ' + sanitize(task.Title) + '" style="left:2px;width:' + yExtW + 'px;border-color:' + yExtColor + ';background:' + yExtColor + '20;"></div>';
        }
        html += '</td>';
      }
      html += '</tr>';

      if (expandedGanttTasks[task.id]) {
        var sts = getGanttSubtasks(task.id);
        for (var sti = 0; sti < sts.length; sti++) {
          var st = sts[sti];
          var stRange = getGanttSubtaskRange(st, task);
          var stBarClass = ganttSubtaskBarClass(st, task);
          html += '<tr class="gantt-subtask-row">' + renderGanttSubtaskLabelCell(st, task.id);
          var stYStart = -1, stYEnd = -1;
          for (var ym3 = 0; ym3 < totalMonths; ym3++) {
            var yr3 = startYr + Math.floor(ym3 / 12);
            var mo3 = ym3 % 12;
            var ms3 = new Date(yr3, mo3, 1);
            var me3 = new Date(yr3, mo3 + 1, 0, 23, 59, 59, 999);
            if (stRange.start <= me3 && stRange.end >= ms3) {
              if (stYStart === -1) stYStart = ym3;
              stYEnd = ym3;
            }
          }
          for (var ym3 = 0; ym3 < totalMonths; ym3++) {
            html += '<td class="gantt-cell" style="position:relative;min-width:' + colWidth + 'px;">';
            if (ym3 === stYStart) {
              var stYW = (stYEnd - stYStart + 1) * colWidth;
              html += '<div class="gantt-bar gantt-bar-subtask ' + stBarClass + '" style="left:2px;width:' + stYW + 'px;cursor:pointer;" title="' + sanitize(st.Title) + '" onclick="openEditTaskModal(' + task.id + ')"></div>';
            }
            html += '</td>';
          }
          html += '</tr>';
        }
      }
    }

    html += '</tbody></table>';
    html += '<div class="gantt-footer">';
    var rangeLabel = ganttMode === 'twoyears' ? (startYr + ' - ' + (startYr + 1)) : String(startYr);
    html += '<span>🌟 ' + t('ganttFullYear') + ' • ' + tasksWithDates.length + ' ' + (currentLang === 'fr' ? 'tâches' : 'tasks') + '</span>';
    html += '<span>' + t('ganttViewRange') + ' ' + rangeLabel + '</span>';
    html += '</div></div>';

    document.getElementById('gantt-view').innerHTML = html;
    initGanttDragScroll();
    return;
  }

  // ===== MONTHS MODE =====
  if (ganttMode === 'months') {
    var startDate = new Date(ganttYear, 0, 1);
    var endDate = new Date(ganttYear, 11, 31);

    var todayMonth = today.getMonth();
    var todayYear = today.getFullYear();
    var todayDayPct = (todayYear === ganttYear && todayMonth >= 0 && todayMonth < 12) ? Math.round((today.getDate() - 1) / new Date(ganttYear, todayMonth + 1, 0).getDate() * 100) : -1;

    html += '<thead><tr><th class="gantt-task-label" style="text-align:left;">' + t('colTaskName') + '</th>';
    for (var m = 0; m < 12; m++) {
      var isCurrentMonth = (ganttYear === todayYear && m === todayMonth);
      html += '<th colspan="1" style="' + (isCurrentMonth ? 'background:#fef2f2;color:#ef4444;' : '') + '">' + monthNames[m].substring(0, 3).toUpperCase() + '</th>';
    }
    html += '</tr></thead><tbody>';

    for (var ti = 0; ti < tasksWithDates.length; ti++) {
      var task = tasksWithDates[ti];
      var barClass = getGanttBarClass(task);
      var barCustomColor = getGanttBarColor(task);
      var barCustomStyle = barCustomColor ? 'background:' + barCustomColor + ';color:white;' : '';
      html += ganttTaskRowStart(task);
      html += renderGanttTaskLabel(task);

      var mTStart = task.Start_Date ? new Date(task.Start_Date * 1000) : null;
      var mTEnd = task.Due_Date ? new Date(task.Due_Date * 1000) : null;
      if (!mTStart && mTEnd) mTStart = new Date(mTEnd);
      if (!mTEnd && mTStart) mTEnd = new Date(mTStart);
      if (mTStart) mTStart.setHours(0, 0, 0, 0);
      if (mTEnd) mTEnd.setHours(23, 59, 59, 999);

      var mBarStartIdx = -1, mBarEndIdx = -1;
      for (var m = 0; m < 12; m++) {
        var ms = new Date(ganttYear, m, 1);
        var me = new Date(ganttYear, m + 1, 0, 23, 59, 59, 999);
        if (mTStart && mTEnd && mTStart <= me && mTEnd >= ms) {
          if (mBarStartIdx === -1) mBarStartIdx = m;
          mBarEndIdx = m;
        }
      }

      var mExtEnd = getTaskExtensionEnd(task);
      var mExtStart = -1, mExtEndI = -1;
      if (mExtEnd && mTEnd && mExtEnd > mTEnd) {
        for (var me2 = 0; me2 < 12; me2++) {
          var ms2 = new Date(ganttYear, me2, 1); var me2e = new Date(ganttYear, me2 + 1, 0, 23, 59, 59, 999);
          // Prolongation à partir du mois suivant la fin (évite le chevauchement)
          if (ms2 > mTEnd && mExtEnd >= ms2) { if (mExtStart === -1) mExtStart = me2; mExtEndI = me2; }
        }
      }
      var mExtColor = getExtensionBarColor(task);

      for (var m = 0; m < 12; m++) {
        var isTodayMonth = (ganttYear === todayYear && m === todayMonth);
        html += '<td class="gantt-cell" style="position:relative;min-width:80px;">';
        if (isTodayMonth && todayDayPct >= 0) {
          html += '<div style="position:absolute;top:0;bottom:0;left:' + todayDayPct + '%;width:2px;background:#ef4444;z-index:1;pointer-events:none;"></div>';
        }
        if (m === mBarStartIdx) {
          var mBarWidth = (mBarEndIdx - mBarStartIdx + 1) * 80;
          html += '<div class="gantt-bar ' + barClass + '" data-gantt-bar-task-id="' + task.id + '" style="left:2px;width:' + mBarWidth + 'px;cursor:pointer;' + barCustomStyle + '" title="' + sanitize(task.Title) + '" onclick="openEditTaskModal(' + task.id + ')">' + sanitize(task.Title) + '</div>';
        }
        if (m === mExtStart && mExtStart >= 0) {
          var mExtW = (mExtEndI - mExtStart + 1) * 80;
          html += '<div class="gantt-bar-extension" title="' + t('extensionTooltip') + ' — ' + sanitize(task.Title) + '" style="left:2px;width:' + mExtW + 'px;border-color:' + mExtColor + ';background:' + mExtColor + '20;"></div>';
        }
        html += '</td>';
      }
      html += '</tr>';

      // === Lignes sous-tâches (mode Mois) ===
      if (expandedGanttTasks[task.id]) {
        var sts = getGanttSubtasks(task.id);
        for (var sti = 0; sti < sts.length; sti++) {
          var st = sts[sti];
          var stRange = getGanttSubtaskRange(st, task);
          var stBarClass = ganttSubtaskBarClass(st, task);
          html += '<tr class="gantt-subtask-row">' + renderGanttSubtaskLabelCell(st, task.id);
          var stStartM = -1, stEndM = -1;
          for (var m2 = 0; m2 < 12; m2++) {
            var mStart = new Date(ganttYear, m2, 1);
            var mEnd = new Date(ganttYear, m2 + 1, 0, 23, 59, 59, 999);
            if (stRange.start <= mEnd && stRange.end >= mStart) {
              if (stStartM === -1) stStartM = m2;
              stEndM = m2;
            }
          }
          for (var m2 = 0; m2 < 12; m2++) {
            var isTodayMonth2 = (ganttYear === todayYear && m2 === todayMonth);
            html += '<td class="gantt-cell" style="position:relative;min-width:80px;">';
            if (isTodayMonth2 && todayDayPct >= 0) {
              html += '<div style="position:absolute;top:0;bottom:0;left:' + todayDayPct + '%;width:2px;background:#ef4444;z-index:1;pointer-events:none;"></div>';
            }
            if (m2 === stStartM) {
              var stBarW = (stEndM - stStartM + 1) * 80;
              html += '<div class="gantt-bar gantt-bar-subtask ' + stBarClass + '" style="left:2px;width:' + stBarW + 'px;cursor:pointer;" title="' + sanitize(st.Title) + '" onclick="openEditTaskModal(' + task.id + ')"></div>';
            }
            html += '</td>';
          }
          html += '</tr>';
        }
      }
    }

    html += '</tbody></table>';
    html += '<div class="gantt-footer">';
    html += '<span>🌟 ' + t('ganttFullYear') + ' • ' + t('ganttNavInfo') + ' • ' + tasksWithDates.length + ' ' + (currentLang === 'fr' ? 'tâches' : 'tasks') + '</span>';
    html += '<span>' + t('ganttViewRange') + ' ' + monthNames[0] + ' - ' + monthNames[11] + ' ' + ganttYear + '</span>';
    html += '</div></div>';

    document.getElementById('gantt-view').innerHTML = html;
    initGanttDragScroll();
    return;
  }

  // ===== DAYS MODE (et mode PERSONNALISÉ : mêmes colonnes-jours sur une plage libre) =====
  var startDate, endDate;
  if (ganttMode === 'custom' && ganttCustomStart && ganttCustomEnd) {
    startDate = new Date(ganttCustomStart + 'T00:00:00');
    endDate = new Date(ganttCustomEnd + 'T00:00:00');
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || endDate < startDate) {
      // Plage invalide → repli sur la fenêtre par défaut
      startDate = new Date(ganttYear, ganttMonth - 1, 1);
      endDate = new Date(ganttYear, ganttMonth + 2, 0);
    } else {
      // Limiter à ~400 jours pour éviter une grille démesurée
      var maxEnd = new Date(startDate); maxEnd.setDate(maxEnd.getDate() + 400);
      if (endDate > maxEnd) endDate = maxEnd;
    }
  } else {
    if (ganttYear === today.getFullYear() && ganttMonth === today.getMonth()) {
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 7);
      endDate = new Date(today);
      endDate.setDate(today.getDate() + 60);
    } else {
      startDate = new Date(ganttYear, ganttMonth, 1);
      endDate = new Date(ganttYear, ganttMonth + 2, 0);
    }
  }
  var days = [];
  var d = new Date(startDate);
  while (d <= endDate) {
    days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }

  // Month header row
  html += '<thead><tr><th class="gantt-task-label" style="text-align:left;" rowspan="2">' + t('colTaskName') + '</th>';
  var prevMonth = -1;
  for (var di0 = 0; di0 < days.length; di0++) {
    var dm = days[di0].getMonth();
    if (dm !== prevMonth) {
      var colspan = 0;
      for (var di1 = di0; di1 < days.length && days[di1].getMonth() === dm; di1++) colspan++;
      html += '<th colspan="' + colspan + '" style="font-size:11px;font-weight:700;color:#475569;background:#f8fafc;border-bottom:1px solid #e2e8f0;">' + monthNames[dm].toUpperCase() + '</th>';
      prevMonth = dm;
    }
  }
  html += '</tr><tr>';
  for (var di = 0; di < days.length; di++) {
    var dd = days[di];
    var isToday = dd.getTime() === today.getTime();
    var isWeekend = dd.getDay() === 0 || dd.getDay() === 6;
    html += '<th class="' + (isToday ? 'today' : '') + (isWeekend ? ' weekend' : '') + '">';
    html += '<div>' + dd.getDate() + '</div>';
    html += '<div style="font-size:8px;">' + dayNames[dd.getDay()] + '</div>';
    html += '</th>';
  }
  html += '</tr></thead><tbody>';

  for (var ti = 0; ti < tasksWithDates.length; ti++) {
    var task = tasksWithDates[ti];
    var barClass = getGanttBarClass(task);
    var barCustomColor = getGanttBarColor(task);
    var barCustomStyle = barCustomColor ? 'background:' + barCustomColor + ';color:white;' : '';
    html += ganttTaskRowStart(task);
    html += renderGanttTaskLabel(task);

    var tStart = task.Start_Date ? new Date(task.Start_Date * 1000) : null;
    var tEnd = task.Due_Date ? new Date(task.Due_Date * 1000) : null;
    if (!tStart && tEnd) tStart = tEnd;
    if (!tEnd && tStart) tEnd = tStart;
    if (tStart) tStart.setHours(0, 0, 0, 0);
    if (tEnd) tEnd.setHours(0, 0, 0, 0);

    var barStartIdx = -1, barEndIdx = -1;
    if (tStart && tEnd) {
      for (var di = 0; di < days.length; di++) {
        var dday = days[di];
        if (dday >= tStart && dday <= tEnd) {
          if (barStartIdx === -1) barStartIdx = di;
          barEndIdx = di;
        }
      }
      if (barStartIdx === -1 && tStart < days[0] && tEnd >= days[0]) {
        barStartIdx = 0;
        for (var di2 = 0; di2 < days.length; di2++) {
          if (days[di2] <= tEnd) barEndIdx = di2;
        }
      }
    }

    var dExtEnd = getTaskExtensionEnd(task);
    var dExtStartIdx = -1, dExtEndIdx = -1;
    if (dExtEnd && tEnd && dExtEnd > tEnd) {
      var dExtDay = new Date(dExtEnd); dExtDay.setHours(0, 0, 0, 0);
      for (var dei = 0; dei < days.length; dei++) {
        if (days[dei] >= tEnd && days[dei] <= dExtDay) {
          if (dExtStartIdx === -1) dExtStartIdx = dei;
          dExtEndIdx = dei;
        }
      }
    }
    var dExtColor = getExtensionBarColor(task);

    for (var di = 0; di < days.length; di++) {
      var dd = days[di];
      var isToday = dd.getTime() === today.getTime();
      var isWeekend = dd.getDay() === 0 || dd.getDay() === 6;
      var cellClass = (isToday ? 'today-col' : '') + (isWeekend ? ' weekend-col' : '');

      html += '<td class="gantt-cell ' + cellClass + '">';
      if (di === barStartIdx) {
        var spanDays = barEndIdx - barStartIdx + 1;
        var widthPx = spanDays * 36;
        html += '<div class="gantt-bar ' + barClass + '" data-gantt-bar-task-id="' + task.id + '" style="left:2px;width:' + widthPx + 'px;cursor:pointer;' + barCustomStyle + '" title="' + sanitize(task.Title) + '" onclick="openEditTaskModal(' + task.id + ')">' + sanitize(task.Title) + '</div>';
      }
      if (di === dExtStartIdx && dExtStartIdx >= 0) {
        var dExtW = (dExtEndIdx - dExtStartIdx + 1) * 36;
        html += '<div class="gantt-bar-extension" title="' + t('extensionTooltip') + ' — ' + sanitize(task.Title) + '" style="left:2px;width:' + dExtW + 'px;border-color:' + dExtColor + ';background:' + dExtColor + '20;"></div>';
      }
      html += '</td>';
    }

    html += '</tr>';

    // === Lignes sous-tâches (mode Jours) ===
    if (expandedGanttTasks[task.id]) {
      var sts = getGanttSubtasks(task.id);
      for (var sti = 0; sti < sts.length; sti++) {
        var st = sts[sti];
        var stRange = getGanttSubtaskRange(st, task);
        var stStartDay = new Date(stRange.start); stStartDay.setHours(0, 0, 0, 0);
        var stEndDay = new Date(stRange.end); stEndDay.setHours(0, 0, 0, 0);
        var stBarClass = ganttSubtaskBarClass(st, task);
        var stBarStartIdx = -1, stBarEndIdx = -1;
        for (var di2 = 0; di2 < days.length; di2++) {
          var dday2 = days[di2];
          if (dday2 >= stStartDay && dday2 <= stEndDay) {
            if (stBarStartIdx === -1) stBarStartIdx = di2;
            stBarEndIdx = di2;
          }
        }
        html += '<tr class="gantt-subtask-row">' + renderGanttSubtaskLabelCell(st, task.id);
        for (var di2 = 0; di2 < days.length; di2++) {
          var dd2 = days[di2];
          var isToday2 = dd2.getTime() === today.getTime();
          var isWeekend2 = dd2.getDay() === 0 || dd2.getDay() === 6;
          var cellClass2 = (isToday2 ? 'today-col' : '') + (isWeekend2 ? ' weekend-col' : '');
          html += '<td class="gantt-cell ' + cellClass2 + '">';
          if (di2 === stBarStartIdx) {
            var stSpanDays = stBarEndIdx - stBarStartIdx + 1;
            var stWidth = stSpanDays * 36;
            html += '<div class="gantt-bar gantt-bar-subtask ' + stBarClass + '" style="left:2px;width:' + stWidth + 'px;cursor:pointer;" title="' + sanitize(st.Title) + '" onclick="openEditTaskModal(' + task.id + ')"></div>';
          }
          html += '</td>';
        }
        html += '</tr>';
      }
    }
  }

  html += '</tbody></table>';
  var viewStart = monthNames[startDate.getMonth()];
  var viewEnd = monthNames[endDate.getMonth()];
  html += '<div class="gantt-footer">';
  html += '<span>🌟 ' + t('ganttFullYear') + ' • ' + t('ganttNavInfo') + ' • ' + tasksWithDates.length + ' ' + (currentLang === 'fr' ? 'tâches' : 'tasks') + '</span>';
  html += '<span>' + t('ganttViewRange') + ' ' + viewStart + ' - ' + viewEnd + ' ' + ganttYear + '</span>';
  html += '</div></div>';

  document.getElementById('gantt-view').innerHTML = html;
  initGanttDragScroll();
  scrollGanttToToday();
}

export function initGanttDragScroll() {
  var container = document.querySelector('#gantt-view .gantt-container');
  if (!container) return;
  var isDown = false;
  var startX, scrollLeft, hasMoved;

  container.addEventListener('mousedown', function(e) {
    if (e.button !== 0) return;
    if (e.target.closest('button, a, select, input')) return;
    isDown = true;
    hasMoved = false;
    startX = e.clientX;
    scrollLeft = container.scrollLeft;
    container.style.cursor = 'grabbing';
    container.style.userSelect = 'none';
  });

  document.addEventListener('mouseup', function() {
    if (!isDown) return;
    isDown = false;
    container.style.cursor = '';
    container.style.userSelect = '';
  });

  document.addEventListener('mousemove', function(e) {
    if (!isDown) return;
    var dx = e.clientX - startX;
    if (Math.abs(dx) > 3) hasMoved = true;
    if (!hasMoved) return;
    e.preventDefault();
    container.scrollLeft = scrollLeft - dx;
  });

  container.addEventListener('click', function(e) {
    if (hasMoved) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, true);
}

export function scrollGanttToToday() {
  if (ganttMode !== 'days') return;
  var container = document.querySelector('#gantt-view .gantt-container');
  var todayCell = container ? container.querySelector('.today-col') : null;
  if (!container || !todayCell) return;
  var left = todayCell.offsetLeft - Math.max(80, container.clientWidth * 0.38);
  container.scrollLeft = Math.max(0, left);
}

export function scrollGanttToTask(taskId) {
  var container = document.querySelector('#gantt-view .gantt-container');
  var bar = container ? container.querySelector('[data-gantt-bar-task-id="' + taskId + '"]') : null;
  if (!container || !bar) return;
  var stickyLabel = container.querySelector('.gantt-task-label');
  var labelWidth = stickyLabel ? stickyLabel.offsetWidth : 260;
  var containerRect = container.getBoundingClientRect();
  var barRect = bar.getBoundingClientRect();
  var barContentLeft = container.scrollLeft + (barRect.left - containerRect.left);
  container.scrollLeft = Math.max(0, barContentLeft - labelWidth - 12);
}

export function focusGanttTask(taskId, checked) {
  selectedGanttTaskId = checked ? taskId : null;
  document.querySelectorAll('#gantt-view .gantt-task-row').forEach(function(row) {
    var isSelected = checked && Number(row.getAttribute('data-gantt-task-id')) === Number(taskId);
    row.classList.toggle('gantt-row-selected', isSelected);
    var checkbox = row.querySelector('.gantt-focus-checkbox');
    if (checkbox) checkbox.checked = isSelected;
  });
  if (checked) requestAnimationFrame(function() { scrollGanttToTask(taskId); });
}

export function setGanttYear(value) {
  ganttYear = Math.max(2020, Math.min(2050, parseInt(value)));
  renderGanttView();
}

export function ganttNav(dir) {
  if (ganttMode === 'months' || ganttMode === 'year' || ganttMode === 'twoyears') {
    // Modes annuels : on navigue par année
    ganttYear += dir;
    ganttYear = Math.max(2020, Math.min(2050, ganttYear));
  } else if (ganttMode === 'weeks') {
    // Navigation par trimestre (3 mois)
    ganttMonth += dir * 3;
    if (ganttMonth > 11) { ganttMonth -= 12; ganttYear++; }
    if (ganttMonth < 0) { ganttMonth += 12; ganttYear--; }
    ganttYear = Math.max(2020, Math.min(2050, ganttYear));
  } else {
    // Mode jours (fenêtre de 3 mois) : on avance d'1 mois à la fois
    ganttMonth += dir;
    if (ganttMonth > 11) { ganttMonth -= 12; ganttYear++; }
    if (ganttMonth < 0) { ganttMonth += 12; ganttYear--; }
    ganttYear = Math.max(2020, Math.min(2050, ganttYear));
  }
  renderGanttView();
}

export function ganttToday() {
  var today = new Date();
  ganttYear = today.getFullYear();
  ganttMonth = today.getMonth();
  renderGanttView();
}

export function ganttExpandAll() {
  var tasksWithSubs = state.tasks.filter(function(t) { return getGanttSubtasks(t.id).length > 0; });
  tasksWithSubs.forEach(function(t) { expandedGanttTasks[t.id] = true; });
  renderGanttView();
}

export function ganttCollapseAll() {
  expandedGanttTasks = {};
  renderGanttView();
}

export function setGanttMode(mode) {
  ganttMode = mode;
  // A3 : afficher la zone de dates uniquement en mode personnalisé
  var rangeBox = document.getElementById('gantt-custom-range');
  if (rangeBox) rangeBox.style.display = (mode === 'custom') ? 'flex' : 'none';
  if (mode === 'custom') {
    // Pré-remplir une plage par défaut (mois précédent → 2 mois) si vide
    if (!ganttCustomStart || !ganttCustomEnd) {
      var ds = new Date(ganttYear, ganttMonth - 1, 1);
      var de = new Date(ganttYear, ganttMonth + 2, 0);
      ganttCustomStart = ds.toISOString().split('T')[0];
      ganttCustomEnd = de.toISOString().split('T')[0];
    }
    var sEl = document.getElementById('gantt-custom-start');
    var eEl = document.getElementById('gantt-custom-end');
    if (sEl) sEl.value = ganttCustomStart;
    if (eEl) eEl.value = ganttCustomEnd;
  }
  renderGanttView();
}

export function setGanttCustomRange() {
  var sEl = document.getElementById('gantt-custom-start');
  var eEl = document.getElementById('gantt-custom-end');
  if (sEl) ganttCustomStart = sEl.value;
  if (eEl) ganttCustomEnd = eEl.value;
  renderGanttView();
}

export function setGanttSort(value) {
  ganttSort = value;
  renderGanttView();
}

// A2 : export du Gantt complet en PDF (1 page à la taille réelle du diagramme)
export async function exportGanttPdf() {
  var container = document.querySelector('#gantt-view .gantt-container');
  var table = container ? container.querySelector('.gantt-table') : null;
  if (!table) { showToast(currentLang === 'fr' ? 'Affichez d\'abord le Gantt' : 'Open the Gantt first', 'error'); return; }
  if (typeof html2canvas === 'undefined' || !window.jspdf) {
    showToast(currentLang === 'fr' ? 'Librairies PDF non chargées' : 'PDF libraries not loaded', 'error');
    return;
  }
  showToast(currentLang === 'fr' ? 'Génération du PDF...' : 'Generating PDF...', 'info');
  container.classList.add('gantt-exporting');
  try {
    var canvas = await html2canvas(table, { scale: 2, backgroundColor: '#ffffff', windowWidth: table.scrollWidth, windowHeight: table.scrollHeight });
    container.classList.remove('gantt-exporting');
    var imgData = canvas.toDataURL('image/png');
    var jsPDF = window.jspdf.jsPDF;
    var w = canvas.width, h = canvas.height;
    var pdf = new jsPDF({ orientation: w >= h ? 'landscape' : 'portrait', unit: 'px', format: [w, h], hotfixes: ['px_scaling'] });
    pdf.addImage(imgData, 'PNG', 0, 0, w, h);
    var dateStr = new Date().toISOString().split('T')[0];
    pdf.save('Gantt_' + dateStr + '.pdf');
    showToast(currentLang === 'fr' ? 'PDF exporté ✓' : 'PDF exported ✓', 'success');
  } catch (e) {
    container.classList.remove('gantt-exporting');
    console.error('exportGanttPdf:', e);
    showToast((currentLang === 'fr' ? 'Erreur export PDF : ' : 'PDF export error: ') + e.message, 'error');
  }
}

// A7 : mode plein écran du Gantt (utile quand la hauteur est insuffisante)
export function toggleGanttFullscreen() {
  var el = document.getElementById('tab-gantt');
  var btn = document.getElementById('gantt-fullscreen-btn');
  if (!el) return;
  var on = el.classList.toggle('gantt-fullscreen');
  if (btn) {
    var label = on ? (currentLang === 'fr' ? 'Quitter le plein écran' : 'Exit fullscreen') : (currentLang === 'fr' ? 'Afficher le Gantt en plein écran' : 'Show Gantt fullscreen');
    btn.title = label;
    btn.setAttribute('aria-label', label);
    btn.setAttribute('data-tooltip', label);
  }
}
