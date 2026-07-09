import { t } from '../i18n.js';

export function priorityLabel(p) {
  if (p === 'high') return t('priorityHigh');
  if (p === 'medium') return t('priorityMedium');
  if (p === 'low') return t('priorityLow');
  return p || '';
}

export function isMilestone(st) { return st && st.Type === 'milestone'; }

export function recurrenceSymbol(rec) {
  var map = { daily: '🔄 J', weekly: '🔄 S', biweekly: '🔄 2S', monthly: '🔄 M', quarterly: '🔄 T', yearly: '🔄 A' };
  return map[rec] || '🔄';
}
