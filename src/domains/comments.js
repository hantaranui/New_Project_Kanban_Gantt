import { state } from '../store.js';

export function getTaskComments(taskId) {
  return state.comments.filter(function(c) { return c.Task_Id === taskId; })
    .sort(function(a, b) { return (b.Created_At || 0) - (a.Created_At || 0); });
}

// addComment/deleteComment stay in main.js for now: they reassign the RACI
// form buffers (editAssignees/editAccountable/editConsulted/editInformed),
// which are plain `var`s reassigned from many places in main.js - moving
// them here would require importing those bindings and reassigning them,
// which ES modules don't allow (only the declaring module can reassign its
// own exported let/var). They'll move once domains/task-modal.js exists and
// owns that state instead.
