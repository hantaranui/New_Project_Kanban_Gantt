import { t, currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { state } from '../store.js';
import { setField } from '../config.js';
import { showToast } from '../ui/toast.js';
import { showConfirmModal } from '../ui/confirm-modal.js';
import { loadAllData } from './data-loader.js';
import { refreshAllViews } from '../ui/tabs.js';
import { closeModalForce } from './task-modal.js';
import { renderSettingsCategoriesList } from './settings.js';

export function renderCategoriesList() {
  var container = document.getElementById('categories-list');
  if (!container) return;

  if (state.categories.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:20px;color:#94a3b8;">' + t('noCategories') + '</div>';
    return;
  }

  var html = '<div style="display:flex;flex-wrap:wrap;gap:8px;">';
  for (var i = 0; i < state.categories.length; i++) {
    var cat = state.categories[i];
    html += '<span class="category-chip" style="background:' + (cat.Color || '#6366f1') + '20;color:' + (cat.Color || '#6366f1') + ';border:1px solid ' + (cat.Color || '#6366f1') + '40;">';
    html += sanitize(cat.Name);
    html += '</span>';
  }
  html += '</div>';
  container.innerHTML = html;
}

export function openCategoriesModal() {
  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal modal-cf" onclick="event.stopPropagation()">';
  html += '<div class="modal-header"><h3>🏷️ ' + t('manageCategories') + '</h3><button class="modal-close" onclick="closeModalForce()">✕</button></div>';
  html += '<div class="modal-body">';
  
  // Existing categories
  html += '<div class="cf-list">';
  if (state.categories.length === 0) {
    html += '<div class="cf-empty-modal">' + t('noCategories') + '</div>';
  } else {
    for (var i = 0; i < state.categories.length; i++) {
      var cat = state.categories[i];
      html += '<div class="cf-list-item">';
      html += '<span class="category-color-dot" style="background:' + (cat.Color || '#6366f1') + ';"></span>';
      html += '<span class="cf-list-name">' + sanitize(cat.Name) + '</span>';
      html += '<button class="cf-delete-btn" onclick="editCategory(' + cat.id + ',\'' + sanitize(cat.Name).replace(/'/g, "\\'") + '\',\'' + (cat.Color || '#6366f1') + '\')">✏️</button>';
      html += '<button class="cf-delete-btn" onclick="deleteCategory(' + cat.id + ')">🗑️</button>';
      html += '</div>';
    }
  }
  html += '</div>';
  
  // Add / edit category form
  html += '<div class="cf-add-form">';
  html += '<h4 id="cat-form-title">' + t('addCategory') + '</h4>';
  html += '<input type="hidden" id="edit-cat-id" value="" />';
  html += '<div class="cf-form-row">';
  html += '<input type="text" id="new-cat-name" placeholder="' + t('fieldName') + '" class="cf-form-input" />';
  html += '<input type="color" id="new-cat-color" value="#6366f1" style="width:40px;height:36px;border:none;cursor:pointer;" />';
  html += '<button class="btn btn-primary" onclick="saveCategory()">' + t('save') + '</button>';
  html += '</div>';
  html += '</div>';
  
  html += '</div></div></div>';
  
  document.getElementById('modal-container').innerHTML = html;
}

export function editCategory(catId, name, color) {
  document.getElementById('edit-cat-id').value = catId;
  document.getElementById('new-cat-name').value = name;
  document.getElementById('new-cat-color').value = color;
  document.getElementById('cat-form-title').textContent = t('edit');
}

export async function saveCategory() {
  var name = document.getElementById('new-cat-name').value.trim();
  var color = document.getElementById('new-cat-color').value;
  var editId = document.getElementById('edit-cat-id').value;

  if (!name) return;

  try {
    if (editId) {
      var updateRec = {};
      setField(updateRec, 'categories', 'name', name);
      setField(updateRec, 'categories', 'color', color);
      await grist.docApi.applyUserActions([['UpdateRecord', state.CATEGORIES_TABLE, parseInt(editId), updateRec]]);
      showToast(t('saved'), 'success');
    } else {
      var maxOrder = state.categories.length > 0 ? Math.max.apply(null, state.categories.map(function(c) { return c.Order || 0; })) : 0;
      var record = {};
      setField(record, 'categories', 'name', name);
      setField(record, 'categories', 'color', color);
      setField(record, 'categories', 'order', maxOrder + 1);
      await grist.docApi.applyUserActions([['AddRecord', state.CATEGORIES_TABLE, null, record]]);
      showToast(t('categoryCreated'), 'success');
    }
    closeModalForce();
    await loadAllData();
    refreshAllViews();
    renderSettingsCategoriesList();
  } catch (e) {
    console.error('Error adding category:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

export async function deleteCategory(categoryId) {
  if (!state.isOwner) return;
  var confirmed = await showConfirmModal(currentLang === 'fr' ? 'Supprimer cette catégorie ?' : 'Delete this category?', currentLang === 'fr' ? 'Supprimer' : 'Delete');
  if (!confirmed) return;

  try {
    await grist.docApi.applyUserActions([
      ['RemoveRecord', state.CATEGORIES_TABLE, categoryId]
    ]);
    showToast(t('categoryDeleted'), 'info');
    closeModalForce();
    await loadAllData();
    refreshAllViews();
    renderSettingsCategoriesList();
  } catch (e) {
    console.error('Error deleting category:', e);
  }
}
