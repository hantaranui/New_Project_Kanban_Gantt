import { getStatusLabel } from './kanban.js';

export function isOverdue(task) {
  if (!task.Due_Date || task.Status === 'done') return false;
  var now = Math.floor(Date.now() / 1000);
  return task.Due_Date < now;
}

export function statusLabel(s) {
  return getStatusLabel(s) || s || '';
}
