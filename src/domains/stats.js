import { currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { getFilteredTasks, showArchivedTasks } from './filters.js';
import { getKanbanStatuses } from './kanban.js';

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
