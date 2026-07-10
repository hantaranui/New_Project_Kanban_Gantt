import { currentLang, t } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { state } from '../store.js';
import { showConfirmModal } from '../ui/confirm-modal.js';
import { showToast } from '../ui/toast.js';
import { loadAllData } from './data-loader.js';
import { refreshAllViews } from '../ui/tabs.js';

export const ATTACH_MAX_BYTES = 5 * 1024 * 1024; // limite pratique par fichier (~5 Mo)

export function getTaskAttachments(taskId) {
  return state.attachments.filter(function(a) { return a.Task_Id === taskId; })
    .sort(function(a, b) { return (a.Created_At || 0) - (b.Created_At || 0); });
}

export function formatFileSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + ' o';
  if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' Ko';
  return (bytes / 1024 / 1024).toFixed(1) + ' Mo';
}

export function attachmentIsImage(type, name) {
  return /^image\//.test(type || '') || /\.(png|jpe?g|gif|webp|svg|bmp)$/i.test(name || '');
}
export function attachmentIsPdf(type, name) {
  return (type || '') === 'application/pdf' || /\.pdf$/i.test(name || '');
}

export function readFileAsDataURL(file) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.onerror = reject;
    reader.onload = function() { resolve(reader.result); };
    reader.readAsDataURL(file);
  });
}

// Compression/redimension des images (canvas) pour limiter le poids base64
export function compressImageFile(file, maxW, quality) {
  maxW = maxW || 1600; quality = quality || 0.8;
  return new Promise(function(resolve) {
    readFileAsDataURL(file).then(function(src) {
      if (file.type === 'image/gif' || file.type === 'image/svg+xml') { resolve(src); return; }
      var img = new Image();
      img.onerror = function() { resolve(src); };
      img.onload = function() {
        var scale = Math.min(1, maxW / img.width);
        var w = Math.round(img.width * scale), h = Math.round(img.height * scale);
        var canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        var ctx = canvas.getContext('2d');
        if (!ctx) { resolve(src); return; }
        if (file.type === 'image/png') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); }
        ctx.drawImage(img, 0, 0, w, h);
        var out = canvas.toDataURL('image/jpeg', quality);
        resolve(out.length < src.length ? out : src);
      };
      img.src = src;
    }).catch(function() { resolve(null); });
  });
}

// Upload d'un ou plusieurs fichiers (encodés base64) pour une tâche
export async function uploadTaskAttachments(taskId, fileList) {
  if (!fileList || !fileList.length) return;
  var statusEl = document.getElementById('attach-status-' + taskId);
  try {
    var addedCount = 0, skipped = [];
    for (var i = 0; i < fileList.length; i++) {
      var file = fileList[i];
      if (statusEl) statusEl.textContent = (currentLang === 'fr' ? 'Traitement de ' : 'Processing ') + file.name + '...';
      var dataUrl = attachmentIsImage(file.type, file.name)
        ? await compressImageFile(file)
        : await readFileAsDataURL(file);
      if (!dataUrl) { skipped.push(file.name); continue; }
      // Taille approximative du base64 (3/4 de la longueur de la chaîne)
      var approxBytes = Math.round(dataUrl.length * 0.75);
      if (approxBytes > ATTACH_MAX_BYTES) { skipped.push(file.name + ' (' + formatFileSize(approxBytes) + ')'); continue; }
      await grist.docApi.applyUserActions([
        ['AddRecord', state.ATTACHMENTS_TABLE, null, {
          Task_Id: taskId,
          File_Name: file.name,
          File_Type: file.type || '',
          File_Size: file.size || 0,
          File_Data: dataUrl,
          Created_At: Math.floor(Date.now() / 1000)
        }]
      ]);
      addedCount++;
    }
    if (statusEl) statusEl.textContent = '';
    await loadAllData();
    renderAttachmentsSection(taskId);
    if (typeof refreshAllViews === 'function') refreshAllViews();
    if (addedCount > 0) showToast((currentLang === 'fr' ? 'Pièce(s) jointe(s) ajoutée(s) : ' : 'Attachment(s) added: ') + addedCount, 'success');
    if (skipped.length) showToast((currentLang === 'fr' ? 'Trop volumineux (max 5 Mo), ignoré : ' : 'Too large (max 5MB), skipped: ') + skipped.join(', '), 'error');
  } catch (e) {
    console.error('[GristPM] uploadTaskAttachments error:', e);
    if (statusEl) statusEl.textContent = '';
    showToast((currentLang === 'fr' ? 'Échec : ' : 'Failed: ') + e.message, 'error');
  }
}

export function _findAtt(recordId) {
  return state.attachments.find(function(a) { return a.id === recordId; });
}

export function downloadAttachment(recordId) {
  var att = _findAtt(recordId);
  if (!att || !att.Data) return;
  var a = document.createElement('a');
  a.href = att.Data;
  a.download = att.File_Name || 'fichier';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export async function deleteAttachment(recordId, taskId) {
  var confirmed = await showConfirmModal(
    currentLang === 'fr' ? 'Supprimer cette pièce jointe ?' : 'Delete this attachment?',
    currentLang === 'fr' ? 'Supprimer la pièce jointe' : 'Delete attachment'
  );
  if (!confirmed) return;
  try {
    await grist.docApi.applyUserActions([['RemoveRecord', state.ATTACHMENTS_TABLE, recordId]]);
    await loadAllData();
    renderAttachmentsSection(taskId);
    if (typeof refreshAllViews === 'function') refreshAllViews();
  } catch (e) {
    showToast((currentLang === 'fr' ? 'Erreur : ' : 'Error: ') + e.message, 'error');
  }
}

// Visionneur : ouvre une image/PDF en grand (base64), sinon télécharge
export function viewAttachment(recordId) {
  var att = _findAtt(recordId);
  if (!att || !att.Data) return;
  var isImg = attachmentIsImage(att.File_Type, att.File_Name);
  var isPdf = attachmentIsPdf(att.File_Type, att.File_Name);
  if (isImg || isPdf) {
    var overlay = document.getElementById('attachment-viewer');
    var body = document.getElementById('attachment-viewer-body');
    var title = document.getElementById('attachment-viewer-title');
    if (title) title.textContent = att.File_Name || '';
    if (body) {
      body.innerHTML = isImg
        ? '<img src="' + att.Data + '" style="max-width:100%;max-height:78vh;display:block;margin:0 auto;border-radius:8px;">'
        : '<iframe src="' + att.Data + '" style="width:80vw;height:78vh;border:none;border-radius:8px;"></iframe>';
    }
    if (overlay) overlay.style.display = 'flex';
  } else {
    downloadAttachment(recordId);
  }
}

export function closeAttachmentViewer() {
  var overlay = document.getElementById('attachment-viewer');
  var body = document.getElementById('attachment-viewer-body');
  if (body) body.innerHTML = '';
  if (overlay) overlay.style.display = 'none';
}

// (Re)construit la section pièces jointes du formulaire de tâche
export function renderAttachmentsSection(taskId) {
  var container = document.getElementById('attachments-list-' + taskId);
  if (!container) return;
  var list = getTaskAttachments(taskId);
  var html = '';
  if (list.length === 0) {
    html = '<div class="attach-empty">' + (currentLang === 'fr' ? 'Aucune pièce jointe' : 'No attachments') + '</div>';
  } else {
    list.forEach(function(att) {
      var isImg = attachmentIsImage(att.File_Type, att.File_Name);
      var icon = isImg ? '🖼️' : (attachmentIsPdf(att.File_Type, att.File_Name) ? '📄' : '📎');
      html += '<div class="attach-item">';
      html += '<span class="attach-icon">' + icon + '</span>';
      html += '<span class="attach-name" onclick="viewAttachment(' + att.id + ')" title="' + (currentLang === 'fr' ? 'Voir' : 'View') + '">' + sanitize(att.File_Name) + '</span>';
      html += '<span class="attach-size">' + formatFileSize(att.File_Size) + '</span>';
      html += '<button class="attach-btn" onclick="downloadAttachment(' + att.id + ')" title="' + (currentLang === 'fr' ? 'Télécharger' : 'Download') + '">⬇️</button>';
      if (state.isOwner) html += '<button class="attach-btn" onclick="deleteAttachment(' + att.id + ', ' + taskId + ')" title="' + t('delete') + '">🗑️</button>';
      html += '</div>';
    });
  }
  container.innerHTML = html;
}

export function openAttachmentInNewTab(recordId) {
  var att = _findAtt(recordId);
  if (!att || !att.Data) return;
  var win = window.open('', '_blank');
  if (win) {
    win.document.write('<iframe src="' + att.Data + '" style="border:0;width:100vw;height:100vh;"></iframe>');
    win.document.title = att.File_Name || 'Attachment';
  } else {
    downloadAttachment(recordId);
  }
}
