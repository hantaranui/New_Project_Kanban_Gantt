import { t, currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { state } from '../store.js';
import { showToast } from '../ui/toast.js';
import { getTaskSubtasks } from './subtasks.js';
import { getFilteredTasks } from './filters.js';
import { loadAllData } from './data-loader.js';
import { openEditTaskModal, startNewTask } from './task-modal.js';

export let calendarYear = new Date().getFullYear();
export let calendarMonth = new Date().getMonth();
export let calendarMode = 'month'; // 'month', 'week' or 'day'
export let calendarWeekOffset = 0; // Offset in weeks from current week
export let calendarDayOffset = 0; // Offset in days from today (day view)

// CALENDAR VIEW
// =============================================================================

export function renderCalendarView() {
  // Update mode buttons
  document.querySelectorAll('.calendar-mode-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-mode') === calendarMode);
  });

  // Responsive: classes JS basées sur la largeur réelle du container (fiable dans iframes)
  applyCalendarResponsiveClasses();
  attachCalendarResizeObserver();

  if (window.innerWidth < 480 && calendarMode !== 'day') { renderCalendarMobileView(); return; }
  if (calendarMode === 'week') { renderCalendarWeekView(); return; }
  if (calendarMode === 'day') { renderCalendarDayView(); return; }

  var monthNames = currentLang === 'fr'
    ? ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var dayNames = currentLang === 'fr'
    ? ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Update title
  document.getElementById('calendar-month-title').textContent = monthNames[calendarMonth] + ' ' + calendarYear;

  // Render weekdays
  var weekdaysHtml = '';
  for (var d = 0; d < 7; d++) {
    var isWeekend = d >= 5;
    weekdaysHtml += '<div class="calendar-weekday' + (isWeekend ? ' weekend' : '') + '">' + dayNames[d] + '</div>';
  }
  document.getElementById('calendar-weekdays').innerHTML = weekdaysHtml;

  // Calculate days
  var firstDay = new Date(calendarYear, calendarMonth, 1);
  var lastDay = new Date(calendarYear, calendarMonth + 1, 0);
  var startDayOfWeek = (firstDay.getDay() + 6) % 7; // Monday = 0
  var daysInMonth = lastDay.getDate();

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  // Render days
  var daysHtml = '';
  var dayIndex = 0;

  // Previous month days
  var prevMonth = new Date(calendarYear, calendarMonth, 0);
  var prevMonthDays = prevMonth.getDate();
  for (var i = startDayOfWeek - 1; i >= 0; i--) {
    var dayNum = prevMonthDays - i;
    var prevDate = new Date(calendarYear, calendarMonth - 1, dayNum);
    var prevTasks = getTasksForDate(prevDate);
    daysHtml += renderCalendarDay(dayNum, prevDate, prevTasks, true, false, false);
    dayIndex++;
  }

  // Current month days
  for (var d = 1; d <= daysInMonth; d++) {
    var currentDate = new Date(calendarYear, calendarMonth, d);
    var isToday = currentDate.getTime() === today.getTime();
    var dayTasks = getTasksForDate(currentDate);
    daysHtml += renderCalendarDay(d, currentDate, dayTasks, false, isToday, false);
    dayIndex++;
  }

  // Next month days
  var remainingDays = 42 - dayIndex; // 6 rows * 7 days
  for (var i = 1; i <= remainingDays; i++) {
    var nextDate = new Date(calendarYear, calendarMonth + 1, i);
    var nextTasks = getTasksForDate(nextDate);
    daysHtml += renderCalendarDay(i, nextDate, nextTasks, true, false);
  }

  var daysContainer = document.getElementById('calendar-days');
  daysContainer.innerHTML = daysHtml;
  daysContainer.className = 'calendar-days';
}

export function renderCalendarDay(dayNum, date, dayTasks, isOtherMonth, isToday, isWeekView) {
  // Validate date
  if (!date || isNaN(date.getTime())) {
    console.error('Invalid date in renderCalendarDay:', date);
    return '';
  }
  var dayOfWeek = (date.getDay() + 6) % 7;
  var isWeekend = dayOfWeek >= 5;
  var dateStr = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');

  var classes = 'calendar-day';
  if (isOtherMonth) classes += ' other-month';
  if (isToday) classes += ' today';
  if (isWeekend) classes += ' weekend';

  var html = '<div class="' + classes + '" onclick="onCalendarDayClick(\'' + dateStr + '\')" ondragover="onCalendarDragOver(event)" ondrop="onCalendarDrop(event, \'' + dateStr + '\')">';
  if (!isWeekView) {
    html += '<div class="day-number">' + dayNum + '</div>';
  }
  html += '<div class="day-tasks">';

  var maxTasks = isWeekView ? 20 : 3;
  for (var i = 0; i < Math.min(dayTasks.length, maxTasks); i++) {
    var task = dayTasks[i];
    var statusClass = 'status-' + task.Status;
    var priorityClass = task.Priority === 'high' ? ' priority-high' : '';
    html += '<div class="day-task ' + statusClass + priorityClass + '" draggable="true" ondragstart="onCalendarTaskDragStart(event, ' + task.id + ')" onclick="event.stopPropagation(); openEditTaskModal(' + task.id + ')" title="' + sanitize(task.Title) + '">';
    html += sanitize(task.Title);
    html += '</div>';
  }

  if (dayTasks.length > maxTasks) {
    html += '<div class="day-more">+' + (dayTasks.length - maxTasks) + ' ' + (currentLang === 'fr' ? 'autres' : 'more') + '</div>';
  }

  html += '</div></div>';
  return html;
}

export function onCalendarDayClick(dateStr) {
  openNewTaskModalWithDate(dateStr);
}

var calendarDraggedTaskId = null;

export function onCalendarTaskDragStart(event, taskId) {
  calendarDraggedTaskId = taskId;
  event.dataTransfer.effectAllowed = 'move';
  event.target.style.opacity = '0.5';
}

export function onCalendarDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  event.currentTarget.classList.add('drag-over');
}

export async function onCalendarDrop(event, dateStr) {
  event.preventDefault();
  event.currentTarget.classList.remove('drag-over');
  
  if (!calendarDraggedTaskId) return;
  
  var task = state.tasks.find(function(t) { return t.id === calendarDraggedTaskId; });
  if (!task) return;
  
  // Parse the new date
  var parts = dateStr.split('-');
  var newDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  var newTimestamp = Math.floor(newDate.getTime() / 1000);
  
  // Calculate duration if task has both start and due dates
  var duration = 0;
  if (task.Start_Date && task.Due_Date) {
    duration = task.Due_Date - task.Start_Date;
  }
  
  // Update the task dates
  var updates = { Due_Date: newTimestamp };
  if (task.Start_Date) {
    updates.Start_Date = newTimestamp - duration;
  }
  
  try {
    await grist.docApi.applyUserActions([
      ['UpdateRecord', state.TASKS_TABLE, calendarDraggedTaskId, updates]
    ]);
    showToast(t('taskMoved'), 'success');
    await loadAllData();
  } catch (e) {
    console.error('Error moving task:', e);
  }
  
  calendarDraggedTaskId = null;
}

export function openNewTaskModalWithDate(dateStr) {
  return startNewTask(null, dateStr); // brouillon avec date pré-remplie -> éditeur complet
}

export function calendarToday() {
  calendarYear = new Date().getFullYear();
  calendarMonth = new Date().getMonth();
  calendarWeekOffset = 0;
  calendarDayOffset = 0;
  renderCalendarView();
}

export function setCalendarMode(mode) {
  calendarMode = mode;
  if (mode === 'week') calendarWeekOffset = 0;
  if (mode === 'day') calendarDayOffset = 0;
  renderCalendarView();
}

export function getTasksForDate(date) {
  var dateStart = new Date(date);
  dateStart.setHours(0, 0, 0, 0);
  var dateEnd = new Date(date);
  dateEnd.setHours(23, 59, 59, 999);
  var dateTs = dateStart.getTime() / 1000;
  var dateEndTs = dateEnd.getTime() / 1000;

  return getFilteredTasks().filter(function(task) {
    var taskStart = task.Start_Date;
    var taskEnd = task.Due_Date;
    if (!taskStart && !taskEnd) return false;
    if (taskStart && taskEnd) {
      return taskStart <= dateEndTs && taskEnd >= dateTs;
    }
    if (taskStart) return taskStart >= dateTs && taskStart <= dateEndTs;
    if (taskEnd) return taskEnd >= dateTs && taskEnd <= dateEndTs;
    return false;
  });
}

export function renderCalendarWeekView() {
  // Calculate week start (Monday) based on offset
  var now = new Date();
  var dayOfWeek = now.getDay();
  var mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  var weekStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + mondayOffset + (calendarWeekOffset * 7));

  var monthNames = currentLang === 'fr'
    ? ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var dayNamesFull = currentLang === 'fr'
    ? ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
    : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  var weekEndDate = new Date(weekStartDate.getFullYear(), weekStartDate.getMonth(), weekStartDate.getDate() + 6);

  // Update title
  var startMonth = monthNames[weekStartDate.getMonth()];
  var endMonth = monthNames[weekEndDate.getMonth()];
  var title = weekStartDate.getDate() + ' ' + startMonth;
  if (startMonth !== endMonth) {
    title += ' - ' + weekEndDate.getDate() + ' ' + endMonth;
  } else {
    title += ' - ' + weekEndDate.getDate() + ' ' + endMonth;
  }
  title += ' ' + weekStartDate.getFullYear();
  document.getElementById('calendar-month-title').textContent = title;

  var today = new Date();
  today.setHours(0, 0, 0, 0);

  // Render weekdays with dates
  var weekdaysHtml = '';
  for (var d = 0; d < 7; d++) {
    var dayDate = new Date(weekStartDate.getFullYear(), weekStartDate.getMonth(), weekStartDate.getDate() + d);
    var isWeekend = d >= 5;
    var isToday = dayDate.getTime() === today.getTime();
    weekdaysHtml += '<div class="calendar-weekday' + (isWeekend ? ' weekend' : '') + (isToday ? ' today' : '') + '">';
    weekdaysHtml += dayNamesFull[d] + ' <strong>' + dayDate.getDate() + '</strong>';
    weekdaysHtml += '</div>';
  }
  document.getElementById('calendar-weekdays').innerHTML = weekdaysHtml;

  // Render days
  var daysHtml = '';
  for (var d = 0; d < 7; d++) {
    var dayDate = new Date(weekStartDate.getFullYear(), weekStartDate.getMonth(), weekStartDate.getDate() + d);
    var isToday = dayDate.getTime() === today.getTime();
    var dayTasks = getTasksForDate(dayDate);
    daysHtml += renderCalendarDay(dayDate.getDate(), dayDate, dayTasks, false, isToday, true);
  }

  var daysContainer = document.getElementById('calendar-days');
  daysContainer.innerHTML = daysHtml;
  daysContainer.className = 'calendar-days week-view';
}

export function calendarNav(dir) {
  if (window.innerWidth < 480 && calendarMode !== 'day') {
    calendarWeekOffset += dir;
    renderCalendarView();
    return;
  }
  if (calendarMode === 'week') {
    calendarWeekOffset += dir;
  } else if (calendarMode === 'day') {
    calendarDayOffset += dir;
  } else {
    calendarMonth += dir;
    if (calendarMonth > 11) { calendarMonth = 0; calendarYear++; }
    if (calendarMonth < 0) { calendarMonth = 11; calendarYear--; }
  }
  renderCalendarView();
}

export function renderCalendarMobileView() {
  var now = new Date();
  var dayOfWeek = now.getDay();
  var mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  var weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() + mondayOffset + (calendarWeekOffset * 7));
  var weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6);

  var monthNames = currentLang === 'fr'
    ? ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var dayNames = currentLang === 'fr'
    ? ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  var titleStart = weekStart.getDate() + ' ' + monthNames[weekStart.getMonth()];
  var titleEnd = weekEnd.getDate() + ' ' + monthNames[weekEnd.getMonth()] + ' ' + weekEnd.getFullYear();
  document.getElementById('calendar-month-title').textContent = titleStart + ' \u2013 ' + titleEnd;
  document.getElementById('calendar-weekdays').innerHTML = '';

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var html = '';

  for (var d = 0; d < 7; d++) {
    var dayDate = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + d);
    var isToday = dayDate.getTime() === today.getTime();
    var isWeekend = d >= 5;
    var dayTasks = getTasksForDate(dayDate);
    var dateStr = dayDate.getFullYear() + '-' + String(dayDate.getMonth() + 1).padStart(2, '0') + '-' + String(dayDate.getDate()).padStart(2, '0');

    var cls = 'calendar-day' + (isToday ? ' today' : '') + (isWeekend ? ' weekend' : '');
    html += '<div class="' + cls + '" onclick="onCalendarDayClick(\'' + dateStr + '\')">';
    html += '<div class="mobile-day-label">';
    html += '<span class="mobile-day-name">' + dayNames[dayDate.getDay()] + '</span>';
    html += '<div class="day-number">' + dayDate.getDate() + '</div>';
    html += '</div>';
    html += '<div class="day-tasks">';
    for (var i = 0; i < dayTasks.length; i++) {
      var task = dayTasks[i];
      html += '<div class="day-task status-' + task.Status + '" onclick="event.stopPropagation(); openEditTaskModal(' + task.id + ')" title="' + sanitize(task.Title) + '">' + sanitize(task.Title) + '</div>';
    }
    if (dayTasks.length === 0) {
      html += '<span class="mobile-no-task">\u2014</span>';
    }
    html += '</div></div>';
  }

  var daysContainer = document.getElementById('calendar-days');
  daysContainer.innerHTML = html;
  daysContainer.className = 'calendar-days calendar-mobile-list';
}

// Responsive calendar: ResizeObserver (fiable dans les iframes Grist) + window resize en fallback
var _calResizeTimer;
var _calResizeObserver = null;

export function applyCalendarResponsiveClasses() {
  var calContainer = document.querySelector('.calendar-container');
  if (!calContainer) return;
  var w = calContainer.getBoundingClientRect().width || window.innerWidth;
  calContainer.classList.toggle('cal-compact', w < 768 && w >= 480);
  calContainer.classList.toggle('cal-mobile', w < 480);
}

export function attachCalendarResizeObserver() {
  var calContainer = document.querySelector('.calendar-container');
  if (!calContainer || _calResizeObserver) return;
  if (window.ResizeObserver) {
    _calResizeObserver = new ResizeObserver(function() {
      clearTimeout(_calResizeTimer);
      _calResizeTimer = setTimeout(function() {
        applyCalendarResponsiveClasses();
        var calTab = document.getElementById('tab-calendar');
        if (calTab && calTab.classList.contains('active')) renderCalendarView();
      }, 150);
    });
    _calResizeObserver.observe(calContainer);
  }
}

window.addEventListener('resize', function() {
  clearTimeout(_calResizeTimer);
  _calResizeTimer = setTimeout(function() {
    applyCalendarResponsiveClasses();
    var calTab = document.getElementById('tab-calendar');
    if (calTab && calTab.classList.contains('active')) renderCalendarView();
  }, 200);
});

export function renderCalendarDayView() {
  var today = new Date();
  var viewDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + calendarDayOffset);
  var isToday = calendarDayOffset === 0;

  var monthNames = currentLang === 'fr'
    ? ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var dayNamesFull = currentLang === 'fr'
    ? ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  document.getElementById('calendar-month-title').textContent =
    dayNamesFull[viewDate.getDay()] + ' ' + viewDate.getDate() + ' ' + monthNames[viewDate.getMonth()] + ' ' + viewDate.getFullYear();

  var dayStart = new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate(), 0, 0, 0);
  var dayEnd = new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate(), 23, 59, 59);
  var dayStartTs = Math.floor(dayStart.getTime() / 1000);
  var dayEndTs = Math.floor(dayEnd.getTime() / 1000);

  var filteredTasks = getFilteredTasks();
  var dayTasks = filteredTasks.filter(function(t) {
    // Tâches dues ce jour précis
    var dueThisDay = t.Due_Date && t.Due_Date >= dayStartTs && t.Due_Date <= dayEndTs;
    // Tâches en cours ce jour : commencées avant la fin du jour et finissant après le début du jour
    var inProgressThisDay = t.Status === 'progress' && t.Start_Date && t.Due_Date &&
      t.Start_Date <= dayEndTs && t.Due_Date >= dayStartTs;
    // Tâches en cours sans date de fin définie mais démarrées
    var inProgressNoEnd = t.Status === 'progress' && t.Start_Date && !t.Due_Date &&
      t.Start_Date <= dayEndTs;
    return dueThisDay || inProgressThisDay || inProgressNoEnd;
  });

  var statusColors = { todo: '#94a3b8', progress: '#3b82f6', done: '#22c55e' };
  var priorityColors = { high: '#ef4444', medium: '#f59e0b', low: '#22c55e' };

  var html = '<div class="calendar-day-view">';
  html += '<div class="calendar-day-header' + (isToday ? ' today' : '') + '">';
  html += isToday ? '📅 ' + (currentLang === 'fr' ? "Aujourd'hui" : 'Today') : '';
  html += '<span class="day-task-count">' + dayTasks.length + ' ' + (currentLang === 'fr' ? 'tâche(s)' : 'task(s)') + '</span>';
  html += '</div>';

  if (dayTasks.length === 0) {
    html += '<div class="day-empty">' + (currentLang === 'fr' ? 'Aucune tâche ce jour' : 'No tasks today') + '</div>';
  } else {
    dayTasks.forEach(function(task) {
      var taskSubtasks = getTaskSubtasks(task.id);
      var completedSt = taskSubtasks.filter(function(st) { return st.Completed; }).length;
      var stColor = statusColors[task.Status] || '#94a3b8';
      var dueThisDay = task.Due_Date && task.Due_Date >= dayStartTs && task.Due_Date <= dayEndTs;
      var isOverdue = task.Due_Date && task.Due_Date < dayStartTs && task.Status !== 'done';
      var dueBadge = dueThisDay
        ? '<span class="day-due-badge">📌 ' + (currentLang === 'fr' ? 'Échéance' : 'Due today') + '</span>'
        : (isOverdue ? '<span class="day-due-badge overdue">⚠️ ' + (currentLang === 'fr' ? 'En retard' : 'Overdue') + '</span>' : '<span class="day-due-badge ongoing">🔄 ' + (currentLang === 'fr' ? 'En cours' : 'In progress') + '</span>');
      html += '<div class="day-task-row" onclick="openEditTaskModal(' + task.id + ')">';
      html += '<div class="day-task-indicator" style="background:' + stColor + '"></div>';
      html += '<div class="day-task-body">';
      html += '<div class="day-task-title">' + sanitize(task.Title) + ' ' + dueBadge + '</div>';
      html += '<div class="day-task-meta">';
      if (task.Assignee) html += '<span>👤 ' + sanitize(task.Assignee.split(',')[0].trim()) + '</span>';
      html += '<span style="color:' + priorityColors[task.Priority] + ';">▲ ' + task.Priority + '</span>';
      if (taskSubtasks.length > 0) {
        html += '<span>☑️ ' + completedSt + '/' + taskSubtasks.length + '</span>';
      }
      html += '</div>';
      if (taskSubtasks.length > 0) {
        html += '<div class="day-subtasks">';
        taskSubtasks.forEach(function(st) {
          html += '<div class="day-subtask-item">';
          html += '<input type="checkbox" ' + (st.Completed ? 'checked' : '') + ' onclick="event.stopPropagation();toggleSubtask(' + st.id + ', ' + !st.Completed + ')" />';
          html += '<span class="' + (st.Completed ? 'st-done' : '') + '">' + sanitize(st.Title) + '</span>';
          if (st.Assignee) html += '<span class="day-st-assignee">👤 ' + sanitize(st.Assignee) + '</span>';
          html += '</div>';
        });
        html += '</div>';
      }
      html += '</div>';
      html += '</div>';
    });
  }

  // Quick add task for this day
  var dateStr = viewDate.getFullYear() + '-' + String(viewDate.getMonth() + 1).padStart(2, '0') + '-' + String(viewDate.getDate()).padStart(2, '0');
  html += '<div class="day-add-task" onclick="openNewTaskForDay(\'' + dateStr + '\')">';
  html += '+ ' + (currentLang === 'fr' ? 'Ajouter une tâche ce jour' : 'Add a task for this day');
  html += '</div>';
  html += '</div>';

  var weekdays = document.getElementById('calendar-weekdays');
  var days = document.getElementById('calendar-days');
  if (weekdays) weekdays.innerHTML = '';
  if (days) { days.innerHTML = html; days.className = 'calendar-days day-view'; }
}

export function openNewTaskForDay(dateStr) {
  openNewTaskModalWithDate(dateStr);
}

