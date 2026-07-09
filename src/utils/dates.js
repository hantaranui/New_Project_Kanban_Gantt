import { currentLang, t } from '../i18n.js';

export function formatDate(d) {
  if (!d) return '';
  var date = new Date(d * 1000); // Grist stores dates as epoch seconds
  if (isNaN(date.getTime())) {
    date = new Date(d);
    if (isNaN(date.getTime())) return '';
  }
  return date.toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function toEpoch(dateStr) {
  if (!dateStr) return null;
  var d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  return Math.floor(d.getTime() / 1000);
}

export function fromEpoch(ts) {
  if (!ts) return '';
  var d = new Date(ts * 1000);
  var y = d.getFullYear();
  var m = String(d.getMonth() + 1).padStart(2, '0');
  var day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
}

export function getISOWeek(date) {
  var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

export function getWeekStart(year, weekNum) {
  var jan4 = new Date(year, 0, 4);
  var dayOfWeek = jan4.getDay() || 7;
  var monday = new Date(jan4);
  monday.setDate(jan4.getDate() - dayOfWeek + 1 + (weekNum - 1) * 7);
  return monday;
}

export function formatTimeAgo(timestamp) {
  if (!timestamp) return '';
  var now = Math.floor(Date.now() / 1000);
  var diff = now - timestamp;
  if (diff < 60) return t('justNow');
  if (diff < 3600) return t('minutesAgo').replace('{n}', Math.floor(diff / 60));
  if (diff < 86400) return t('hoursAgo').replace('{n}', Math.floor(diff / 3600));
  return t('daysAgo').replace('{n}', Math.floor(diff / 86400));
}
