import { t, currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { state } from '../store.js';
import { renderActivityLog } from './activity-log.js';
import { getFilteredTasks, showArchivedTasks } from './filters.js';
import { getOverdueTasks } from './notifications.js';
import { getKanbanStatuses } from './kanban.js';
import { getUserDisplayName } from './team.js';

export function updateStats() {
  var container = document.getElementById('stats-row');
  if (!container) return;
  var filteredTasks = getFilteredTasks();
  var total = filteredTasks.length;
  var html = '';
  if (showArchivedTasks) {
    html += '<div class="stat-card stat-total"><div><div class="stat-label">' + (currentLang === 'fr' ? 'Archivées' : 'Archived') + '</div><div class="stat-value">' + total + '</div></div><div class="stat-icon"><span class="suite-stat-mark"></span></div></div>';
  } else {
    html += '<div class="stat-card stat-total"><div><div class="stat-label">Total</div><div class="stat-value">' + total + '</div></div><div class="stat-icon"><span class="suite-stat-mark"></span></div></div>';
    var statuses = getKanbanStatuses();
    for (var i = 0; i < statuses.length; i++) {
      var s = statuses[i];
      var count = filteredTasks.filter(function(t) { return t.Status === s.key; }).length;
      var label = currentLang === 'fr' ? s.label_fr : s.label_en;
      var color = s.color || '#94a3b8';
      // Cohérent avec l'en-tête de colonne Kanban : emoji si configuré, sinon pastille colorée
      var icon = (s.emoji && s.emoji.trim())
        ? s.emoji.trim()
        : '<span style="display:inline-block;width:16px;height:16px;border-radius:50%;background:' + color + ';"></span>';
      html += '<div class="stat-card"><div><div class="stat-label">' + sanitize(label) + '</div><div class="stat-value" style="color:' + color + '">' + count + '</div></div><div class="stat-icon">' + icon + '</div></div>';
    }
  }
  container.innerHTML = html;
}

export function renderStatsView() {
  var filteredTasks = getFilteredTasks();
  // Status chart (dynamic based on custom statuses)
  var kanbanStatuses = getKanbanStatuses();
  var statusCounts = {};
  kanbanStatuses.forEach(function(s) { statusCounts[s.key] = 0; });
  filteredTasks.forEach(function(t) { statusCounts[t.Status] = (statusCounts[t.Status] || 0) + 1; });
  var maxStatus = Math.max.apply(null, kanbanStatuses.map(function(s) { return statusCounts[s.key] || 0; }).concat([1]));

  var statusHtml = '';
  kanbanStatuses.forEach(function(s) {
    var count = statusCounts[s.key] || 0;
    var height = (count / maxStatus) * 160;
    var label = currentLang === 'fr' ? s.label_fr : s.label_en;
    statusHtml += '<div class="chart-bar">';
    statusHtml += '<span class="chart-bar-value">' + count + '</span>';
    statusHtml += '<div class="chart-bar-fill" style="height:' + height + 'px;background:' + (s.color || '#94a3b8') + '"></div>';
    statusHtml += '<span class="chart-bar-label">' + sanitize(label) + '</span>';
    statusHtml += '</div>';
  });
  document.getElementById('chart-status').innerHTML = statusHtml;

  // Priority chart
  var priorityCounts = { high: 0, medium: 0, low: 0 };
  filteredTasks.forEach(function(t) { priorityCounts[t.Priority] = (priorityCounts[t.Priority] || 0) + 1; });
  var maxPriority = Math.max(priorityCounts.high, priorityCounts.medium, priorityCounts.low, 1);
  
  var priorityHtml = '';
  var priorityColors = { high: '#ef4444', medium: '#f59e0b', low: '#22c55e' };
  var priorityLabels = { high: t('priorityHigh'), medium: t('priorityMedium'), low: t('priorityLow') };
  ['high', 'medium', 'low'].forEach(function(p) {
    var height = (priorityCounts[p] / maxPriority) * 160;
    priorityHtml += '<div class="chart-bar">';
    priorityHtml += '<span class="chart-bar-value">' + priorityCounts[p] + '</span>';
    priorityHtml += '<div class="chart-bar-fill" style="height:' + height + 'px;background:' + priorityColors[p] + '"></div>';
    priorityHtml += '<span class="chart-bar-label">' + priorityLabels[p] + '</span>';
    priorityHtml += '</div>';
  });
  document.getElementById('chart-priority').innerHTML = priorityHtml;

  // Assignee chart
  var assigneeCounts = {};
  filteredTasks.forEach(function(t) {
    if (t.Assignee) {
      t.Assignee.split(',').forEach(function(a) {
        var name = getUserDisplayName(a.trim());
        assigneeCounts[name] = (assigneeCounts[name] || 0) + 1;
      });
    }
  });
  var assigneeEntries = Object.entries(assigneeCounts).sort(function(a, b) { return b[1] - a[1]; }).slice(0, 5);
  var maxAssignee = assigneeEntries.length > 0 ? assigneeEntries[0][1] : 1;
  
  var assigneeHtml = '';
  var colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#22c55e'];
  assigneeEntries.forEach(function(entry, i) {
    var height = (entry[1] / maxAssignee) * 160;
    assigneeHtml += '<div class="chart-bar">';
    assigneeHtml += '<span class="chart-bar-value">' + entry[1] + '</span>';
    assigneeHtml += '<div class="chart-bar-fill" style="height:' + height + 'px;background:' + colors[i % colors.length] + '"></div>';
    assigneeHtml += '<span class="chart-bar-label">' + entry[0] + '</span>';
    assigneeHtml += '</div>';
  });
  if (assigneeEntries.length === 0) {
    assigneeHtml = '<div style="text-align:center;color:#94a3b8;width:100%;">Aucune donnée</div>';
  }
  document.getElementById('chart-assignee').innerHTML = assigneeHtml;

  // Week chart (tasks active or due this week by day)
  var weekDays = currentLang === 'fr' ? ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'] : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  var now = new Date();
  var dayOfWeek = now.getDay();
  var mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  var weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() + mondayOffset);

  var weekCounts = [0, 0, 0, 0, 0, 0, 0];
  filteredTasks.forEach(function(task) {
    var tStart = task.Start_Date ? task.Start_Date : (task.Due_Date || null);
    var tEnd = task.Due_Date ? task.Due_Date : (task.Start_Date || null);
    if (!tEnd) return;
    for (var d = 0; d < 7; d++) {
      var dayStart = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + d);
      var dayEnd = new Date(dayStart); dayEnd.setHours(23, 59, 59, 999);
      var dsTs = Math.floor(dayStart.getTime() / 1000);
      var deTs = Math.floor(dayEnd.getTime() / 1000);
      if (tStart <= deTs && tEnd >= dsTs) {
        weekCounts[d]++;
      }
    }
  });
  var maxWeek = Math.max.apply(null, weekCounts) || 1;
  
  var weekHtml = '';
  weekCounts.forEach(function(count, i) {
    var height = (count / maxWeek) * 160;
    var isToday = i === ((now.getDay() + 6) % 7);
    weekHtml += '<div class="chart-bar">';
    weekHtml += '<span class="chart-bar-value">' + count + '</span>';
    weekHtml += '<div class="chart-bar-fill" style="height:' + height + 'px;background:' + (isToday ? '#ef4444' : '#3b82f6') + '"></div>';
    weekHtml += '<span class="chart-bar-label">' + weekDays[i] + '</span>';
    weekHtml += '</div>';
  });
  document.getElementById('chart-week').innerHTML = weekHtml;

  // Summary stats
  var completionRate = filteredTasks.length > 0 ? Math.round((statusCounts.done / filteredTasks.length) * 100) : 0;
  document.getElementById('stats-completion-rate').textContent = completionRate + '%';
  
  var overdueCount = getOverdueTasks().length;
  document.getElementById('stats-overdue-count').textContent = overdueCount;
  
  // Calculate total time from time entries
  var totalMinutes = 0;
  state.timeEntries.forEach(function(te) {
    if (te.Duration) totalMinutes += te.Duration;
  });
  var totalHours = Math.round(totalMinutes / 60);
  document.getElementById('stats-total-time').textContent = totalHours + 'h';
  
  var avgMinutes = filteredTasks.length > 0 ? Math.round(totalMinutes / filteredTasks.length) : 0;
  var avgHours = Math.round(avgMinutes / 60 * 10) / 10;
  document.getElementById('stats-avg-time').textContent = avgHours + 'h';

  // Workload chart - Risk of overload per user
  renderWorkloadChart();
  renderBurndownChart();
  renderActivityLog();
}

export function renderWorkloadChart() {
  var workloadData = {};
  var now = Math.floor(Date.now() / 1000);
  var filteredTasks = getFilteredTasks();
  
  // Calculate workload for each assignee
  filteredTasks.forEach(function(task) {
    if (task.Assignee && task.Status !== 'done') {
      task.Assignee.split(',').forEach(function(a) {
        var email = a.trim();
        var name = getUserDisplayName(email);
        if (!workloadData[name]) {
          workloadData[name] = {
            total: 0,
            overdue: 0,
            highPriority: 0,
            estimatedHours: 0
          };
        }
        workloadData[name].total++;
        if (task.Due_Date && task.Due_Date < now) {
          workloadData[name].overdue++;
        }
        if (task.Priority === 'high') {
          workloadData[name].highPriority++;
        }
        if (task.Estimated_Hours) {
          workloadData[name].estimatedHours += task.Estimated_Hours;
        }
      });
    }
  });

  // Calculate risk score for each user
  // Score = (tasks * 10) + (overdue * 30) + (highPriority * 15)
  // Risk levels: 0-50 = low, 51-100 = medium, >100 = high
  var workloadEntries = Object.entries(workloadData).map(function(entry) {
    var name = entry[0];
    var data = entry[1];
    var score = (data.total * 10) + (data.overdue * 30) + (data.highPriority * 15);
    var level = score <= 50 ? 'low' : (score <= 100 ? 'medium' : 'high');
    var levelLabel = currentLang === 'fr' 
      ? (level === 'low' ? 'OK' : (level === 'medium' ? 'Attention' : 'Surcharge'))
      : (level === 'low' ? 'OK' : (level === 'medium' ? 'Warning' : 'Overload'));
    return {
      name: name,
      total: data.total,
      overdue: data.overdue,
      highPriority: data.highPriority,
      score: score,
      level: level,
      levelLabel: levelLabel
    };
  }).sort(function(a, b) { return b.score - a.score; });

  var maxScore = workloadEntries.length > 0 ? Math.max(workloadEntries[0].score, 100) : 100;

  var html = '';
  if (workloadEntries.length === 0) {
    html = '<div style="text-align:center;color:#94a3b8;padding:20px;">' + (currentLang === 'fr' ? 'Aucune tâche assignée' : 'No assigned tasks') + '</div>';
  } else {
    workloadEntries.forEach(function(entry) {
      var barWidth = Math.min((entry.score / maxScore) * 100, 100);
      html += '<div class="workload-row">';
      html += '<div class="workload-name" title="' + entry.name + '">' + entry.name + '</div>';
      html += '<div class="workload-bar-bg">';
      html += '<div class="workload-bar-fill ' + entry.level + '" style="width:' + barWidth + '%"></div>';
      html += '</div>';
      html += '<div class="workload-stats">';
      html += '<span class="workload-badge ' + entry.level + '">' + entry.levelLabel + '</span>';
      html += '<span class="workload-detail">' + entry.total + ' ' + (currentLang === 'fr' ? 'tâches' : 'tasks');
      if (entry.overdue > 0) {
        html += ' • <span style="color:#ef4444;">' + entry.overdue + ' ' + (currentLang === 'fr' ? 'en retard' : 'overdue') + '</span>';
      }
      html += '</span>';
      html += '</div>';
      html += '</div>';
    });
  }

  document.getElementById('chart-workload').innerHTML = html;

  // Populate agent filter and render timeline
  var agentSelect = document.getElementById('timeline-agent');
  if (agentSelect) {
    var agentNames = Object.keys(workloadData).sort();
    var currentAgentVal = agentSelect.value;
    agentSelect.innerHTML = '<option value="">' + (currentLang === 'fr' ? 'Tous les agents' : 'All agents') + '</option>';
    agentNames.forEach(function(name) {
      var sel = name === currentAgentVal ? ' selected' : '';
      agentSelect.innerHTML += '<option value="' + sanitize(name) + '"' + sel + '>' + sanitize(name) + '</option>';
    });
  }
  renderTimelineChart();
}

export function renderTimelineChart() {
  var container = document.getElementById('chart-timeline');
  if (!container) return;

  var periodSel = document.getElementById('timeline-period');
  var agentSel = document.getElementById('timeline-agent');
  var period = periodSel ? periodSel.value : 'weeks';
  var agentFilter = agentSel ? agentSel.value : '';

  var now = new Date(); now.setHours(0, 0, 0, 0);
  var slots = [];
  var tlMn = currentLang === 'fr'
    ? ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if (period === 'weeks') {
    // Show 4 past weeks + current + 3 future = 8 weeks
    var dayOfW = now.getDay();
    var offToMon = dayOfW === 0 ? -6 : 1 - dayOfW;
    var thisMon = new Date(now); thisMon.setDate(thisMon.getDate() + offToMon);
    for (var w = -4; w < 4; w++) {
      var wStart = new Date(thisMon); wStart.setDate(thisMon.getDate() + w * 7);
      var wEnd = new Date(wStart); wEnd.setDate(wStart.getDate() + 6); wEnd.setHours(23, 59, 59, 999);
      var isCurrentW = w === 0;
      slots.push({ label: wStart.getDate() + '/' + (wStart.getMonth() + 1), start: Math.floor(wStart.getTime() / 1000), end: Math.floor(wEnd.getTime() / 1000), current: isCurrentW });
    }
  } else {
    // Show 3 past months + current + 2 future = 6 months
    for (var m = -3; m < 3; m++) {
      var d = new Date(now.getFullYear(), now.getMonth() + m, 1);
      var dEnd = new Date(now.getFullYear(), now.getMonth() + m + 1, 0, 23, 59, 59, 999);
      slots.push({ label: tlMn[d.getMonth()], start: Math.floor(d.getTime() / 1000), end: Math.floor(dEnd.getTime() / 1000), current: m === 0 });
    }
  }

  // Collect tasks per slot per agent (overlap-based: task active during slot)
  var agentColors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16'];
  var allAgents = [];
  var filteredTasks = getFilteredTasks().filter(function(t) { return t.Status !== 'done'; });

  filteredTasks.forEach(function(t) {
    if (!t.Assignee) return;
    t.Assignee.split(',').forEach(function(a) {
      var name = getUserDisplayName(a.trim());
      if (allAgents.indexOf(name) === -1) allAgents.push(name);
    });
  });
  allAgents.sort();

  var visibleAgents = agentFilter ? [agentFilter] : allAgents;

  // Build data[slot][agent] = count (task active = overlaps slot)
  var data = slots.map(function(slot) {
    var row = { label: slot.label, total: 0, current: slot.current };
    visibleAgents.forEach(function(agent) { row[agent] = 0; });
    filteredTasks.forEach(function(t) {
      var tS = t.Start_Date ? t.Start_Date : (t.Due_Date || null);
      var tE = t.Due_Date ? t.Due_Date : (t.Start_Date || null);
      if (!tE) return;
      if (tS > slot.end || tE < slot.start) return; // no overlap
      if (!t.Assignee) return;
      t.Assignee.split(',').forEach(function(a) {
        var name = getUserDisplayName(a.trim());
        if (visibleAgents.indexOf(name) === -1) return;
        row[name] = (row[name] || 0) + 1;
        row.total++;
      });
    });
    return row;
  });

  var maxVal = Math.max.apply(null, data.map(function(d) { return d.total; }));
  if (maxVal === 0) maxVal = 1;
  var BAR_H = 120;

  var html = '<div style="display:flex;gap:4px;align-items:flex-end;min-height:' + (BAR_H + 50) + 'px;">';
  data.forEach(function(slot) {
    var colStyle = slot.current ? 'flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;background:#eff6ff;border-radius:6px;padding:2px;' : 'flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;';
    html += '<div style="' + colStyle + '">';
    html += '<span style="font-size:10px;color:' + (slot.current ? '#2563eb' : '#64748b') + ';font-weight:' + (slot.current ? '700' : '600') + ';">' + (slot.total || '') + '</span>';
    html += '<div style="width:100%;display:flex;flex-direction:column-reverse;gap:1px;">';
    var stackH = 0;
    visibleAgents.forEach(function(agent, idx) {
      var count = slot[agent] || 0;
      if (count === 0) return;
      var h = Math.max(Math.round((count / maxVal) * BAR_H), 4);
      stackH += h;
      var color = agentColors[idx % agentColors.length];
      html += '<div title="' + sanitize(agent) + ' : ' + count + '" style="height:' + h + 'px;background:' + color + ';border-radius:2px;opacity:0.85;"></div>';
    });
    if (stackH === 0) {
      html += '<div style="height:4px;background:#e2e8f0;border-radius:2px;"></div>';
    }
    html += '</div>';
    html += '<span style="font-size:10px;color:' + (slot.current ? '#2563eb' : '#94a3b8') + ';margin-top:4px;font-weight:' + (slot.current ? '700' : 'normal') + ';">' + slot.label + '</span>';
    html += '</div>';
  });
  html += '</div>';

  // Legend
  if (visibleAgents.length > 1) {
    html += '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;">';
    visibleAgents.forEach(function(agent, idx) {
      var color = agentColors[idx % agentColors.length];
      html += '<span style="font-size:11px;display:flex;align-items:center;gap:4px;"><span style="display:inline-block;width:10px;height:10px;background:' + color + ';border-radius:2px;"></span>' + sanitize(agent) + '</span>';
    });
    html += '</div>';
  }

  container.innerHTML = html;
}

export function renderBurndownChart() {
  var container = document.getElementById('chart-burndown');
  if (!container) return;
  var periodSel = document.getElementById('burndown-period');
  var weeks = periodSel ? parseInt(periodSel.value) || 8 : 8;

  var now = new Date();
  var dayOfWeek = now.getDay();
  var mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  var thisMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + mondayOffset);
  thisMonday.setHours(0, 0, 0, 0);

  var allTasks = getFilteredTasks();
  var labels = [];
  var remaining = [];
  var completed = [];

  for (var w = weeks - 1; w >= 0; w--) {
    var weekEnd = new Date(thisMonday.getTime() - (w * 7 * 86400000));
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    var weekEndTs = Math.floor(weekEnd.getTime() / 1000);

    var dd = String(weekEnd.getDate()).padStart(2, '0');
    var mm = String(weekEnd.getMonth() + 1).padStart(2, '0');
    labels.push(dd + '/' + mm);

    var createdBefore = allTasks.filter(function(t) {
      return t.Created_At && t.Created_At <= weekEndTs;
    });

    var doneByThen = createdBefore.filter(function(t) {
      return t.Status === 'done';
    }).length;

    var totalByThen = createdBefore.length;
    var remainByThen = totalByThen - doneByThen;

    remaining.push(remainByThen);
    completed.push(doneByThen);
  }

  var maxVal = Math.max.apply(null, remaining.concat(completed).concat([1]));
  var chartH = 180;
  var barW = Math.max(20, Math.floor(300 / weeks));

  var html = '<div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:10px;">';
  html += '<span style="font-size:11px;display:flex;align-items:center;gap:4px;"><span style="display:inline-block;width:10px;height:10px;background:#ef4444;border-radius:2px;flex-shrink:0;"></span>' + t('burnRemaining') + '</span>';
  html += '<span style="font-size:11px;display:flex;align-items:center;gap:4px;"><span style="display:inline-block;width:10px;height:10px;background:#22c55e;border-radius:2px;flex-shrink:0;"></span>' + t('burnCompleted') + '</span>';
  html += '<span style="font-size:11px;display:flex;align-items:center;gap:4px;"><span style="display:inline-block;width:10px;height:10px;border:1.5px dashed #94a3b8;border-radius:2px;flex-shrink:0;"></span>' + t('burnIdeal') + '</span>';
  html += '</div>';

  html += '<div style="position:relative;height:' + (chartH + 30) + 'px;">';

  // Ideal line (from max remaining at start to 0)
  var startRemaining = remaining[0] || 0;
  var svgW = labels.length * (barW + 8);
  html += '<svg style="position:absolute;top:0;left:0;width:' + svgW + 'px;height:' + chartH + 'px;pointer-events:none;">';
  for (var li = 0; li < labels.length - 1; li++) {
    var x1 = li * (barW + 8) + barW / 2;
    var x2 = (li + 1) * (barW + 8) + barW / 2;
    var idealVal1 = startRemaining - (startRemaining / (labels.length - 1)) * li;
    var idealVal2 = startRemaining - (startRemaining / (labels.length - 1)) * (li + 1);
    var y1 = chartH - (idealVal1 / maxVal) * chartH;
    var y2 = chartH - (idealVal2 / maxVal) * chartH;
    html += '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#94a3b8" stroke-dasharray="4,3" stroke-width="1.5"/>';
  }
  html += '</svg>';

  // Bars
  html += '<div style="display:flex;align-items:flex-end;gap:8px;height:' + chartH + 'px;">';
  for (var bi = 0; bi < labels.length; bi++) {
    var remH = (remaining[bi] / maxVal) * (chartH - 20);
    var compH = (completed[bi] / maxVal) * (chartH - 20);
    html += '<div style="display:flex;flex-direction:column;align-items:center;width:' + barW + 'px;">';
    html += '<div style="font-size:9px;color:#64748b;margin-bottom:2px;">' + remaining[bi] + '</div>';
    html += '<div style="width:100%;display:flex;flex-direction:column;gap:1px;">';
    html += '<div style="height:' + remH + 'px;background:#ef4444;border-radius:3px 3px 0 0;min-height:2px;"></div>';
    html += '<div style="height:' + compH + 'px;background:#22c55e;border-radius:0 0 3px 3px;min-height:2px;"></div>';
    html += '</div>';
    html += '</div>';
  }
  html += '</div>';

  // Labels
  html += '<div style="display:flex;gap:8px;margin-top:4px;">';
  for (var lbi = 0; lbi < labels.length; lbi++) {
    html += '<div style="width:' + barW + 'px;text-align:center;font-size:9px;color:#94a3b8;">' + labels[lbi] + '</div>';
  }
  html += '</div>';

  html += '</div>';
  container.innerHTML = html;
}
