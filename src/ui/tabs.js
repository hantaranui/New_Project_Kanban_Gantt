import { renderCalendarView } from '../domains/calendar.js';
import { renderKanbanView } from '../domains/kanban.js';
import { renderTableView } from '../domains/table-view.js';
import { renderGanttView } from '../domains/gantt.js';
import { renderTemplatesView } from '../domains/templates.js';
import { updateStats, renderStatsView } from '../domains/stats.js';
import { renderTeamView } from '../domains/team.js';
import { renderSettingsView } from '../domains/settings.js';
import { renderProjectSelector, updateArchiveButton } from '../domains/filters.js';
import { applyBusinessRoleRestrictions } from '../domains/permissions.js';

export function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });
  document.querySelectorAll('.tab-content').forEach(function(tc) {
    tc.classList.toggle('active', tc.id === 'tab-' + tabId);
  });
  // Save active tab to localStorage
  localStorage.setItem('pm-active-tab', tabId);
  
  if (tabId === 'calendar') renderCalendarView();
  if (tabId === 'kanban') renderKanbanView();
  if (tabId === 'table') renderTableView();
  if (tabId === 'gantt') renderGanttView();
  if (tabId === 'templates') renderTemplatesView();
  if (tabId === 'stats') renderStatsView();
  if (tabId === 'team') renderTeamView();
  if (tabId === 'settings') renderSettingsView();
}

export function restoreActiveTab() {
  var savedTab = localStorage.getItem('pm-active-tab');
  var allowedTabs = ['kanban', 'gantt', 'team', 'settings'];
  if (savedTab && allowedTabs.indexOf(savedTab) !== -1) {
    switchTab(savedTab);
  } else {
    switchTab('kanban');
  }
}


export function refreshAllViews() {
  if (typeof renderProjectSelector === 'function') renderProjectSelector();
  updateStats();
  updateArchiveButton();
  var activeTab = document.querySelector('.tab-btn.active');
  if (activeTab) {
    var tab = activeTab.getAttribute('data-tab');
    if (tab === 'calendar') renderCalendarView();
    if (tab === 'kanban') renderKanbanView();
    if (tab === 'table') renderTableView();
    if (tab === 'gantt') renderGanttView();
    if (tab === 'templates') renderTemplatesView();
    if (tab === 'stats') renderStatsView();
    if (tab === 'team') renderTeamView();
  }
  applyBusinessRoleRestrictions();
}
