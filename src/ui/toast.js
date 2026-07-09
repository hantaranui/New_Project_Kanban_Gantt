export function showToast(msg, type) {
  var container = document.getElementById('toast-container');
  var toast = document.createElement('div');
  toast.className = 'toast toast-' + (type || 'info');
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(function() { toast.remove(); }, 3000);
}
