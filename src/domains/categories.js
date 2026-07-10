import { t, currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { state } from '../store.js';
import { getColumnName } from '../config.js';
import { showToast } from '../ui/toast.js';
import { showConfirmModal, showPromptModal } from '../ui/confirm-modal.js';
import { saveSetting } from './settings.js';
import { refreshAllViews } from '../ui/tabs.js';

// Catégories des tâches : même patron que les statuts Kanban (kanban.js) -
// persistées en PM_Settings (customCategories), jamais lues depuis une table
// séparée. La colonne Grist Category (Choice) ne sert qu'à l'affichage natif
// (couleurs), synchronisée en écriture seule par syncCategoryChoices().
export var customCategories = [];

export function getCategories() {
  return customCategories;
}

export function setCategoriesFromSettings(raw) {
  var parsed = [];
  try { parsed = JSON.parse(raw) || []; } catch (e) {}
  customCategories.length = 0;
  Array.prototype.push.apply(customCategories, parsed);
}

export async function saveCategories() {
  await saveSetting('categories', JSON.stringify(customCategories));
  await syncCategoryChoices();
}

export async function syncCategoryChoices() {
  try {
    var choices = customCategories.map(function(c) { return c.name; });
    var choiceOptions = {};
    customCategories.forEach(function(c) {
      if (c.color) choiceOptions[c.name] = { fillColor: c.color, textColor: '#ffffff' };
    });
    var categoryCol = getColumnName('tasks', 'category');
    await grist.docApi.applyUserActions([
      ['ModifyColumn', state.TASKS_TABLE, categoryCol, { widgetOptions: JSON.stringify({ choices: choices, choiceOptions: choiceOptions }) }]
    ]);
    state.taskTableColumns = null;
  } catch (e) {
    console.log('syncCategoryChoices:', e.message);
  }
}

// Utilisée à la fois par l'onglet Équipe (aperçu) et l'onglet Paramètres
// (gestion avec édition/suppression) : même conteneur DOM #categories-list.
export function renderCategoriesList() {
  var container = document.getElementById('categories-list');
  if (!container) return;

  if (customCategories.length === 0) {
    container.innerHTML = '<div style="text-align:center;color:#94a3b8;padding:20px;">' + (currentLang === 'fr' ? 'Aucune catégorie' : 'No categories') + '</div>';
    return;
  }

  var html = '<div class="settings-items">';
  customCategories.forEach(function(cat, i) {
    html += '<div class="settings-item">';
    html += '<span class="settings-item-dot" style="background:' + (cat.color || '#6366f1') + ';"></span>';
    html += '<div class="settings-item-info"><strong>' + sanitize(cat.name) + '</strong></div>';
    html += '<div class="settings-item-actions">';
    html += '<button class="btn-icon" onclick="editCategorySetting(' + i + ')" title="' + (currentLang === 'fr' ? 'Modifier' : 'Edit') + '">✏️</button>';
    if (state.isOwner) html += '<button class="btn-icon" onclick="removeCategorySetting(' + i + ')" title="' + t('delete') + '">🗑️</button>';
    html += '</div>';
    html += '</div>';
  });
  html += '</div>';
  container.innerHTML = html;
}
export { renderCategoriesList as renderSettingsCategoriesList };

export async function addCategorySetting() {
  var result = await showPromptModal(
    currentLang === 'fr' ? 'Nouvelle catégorie' : 'New category',
    [
      { label: currentLang === 'fr' ? 'Nom' : 'Name', placeholder: currentLang === 'fr' ? 'Ex: Discovery' : 'Ex: Discovery' },
      { label: currentLang === 'fr' ? 'Couleur' : 'Color', type: 'color' }
    ],
    ['', '#6366f1']
  );
  if (!result || !result[0]) return;
  var name = result[0].trim();
  if (!name) return;
  if (customCategories.some(function(c) { return c.name === name; })) {
    showToast(currentLang === 'fr' ? 'Cette catégorie existe déjà' : 'This category already exists', 'error');
    return;
  }
  customCategories.push({ name: name, color: result[1] || '#6366f1' });
  await saveCategories();
  renderCategoriesList();
  refreshAllViews();
  showToast(currentLang === 'fr' ? 'Catégorie ajoutée' : 'Category added', 'success');
}

export async function editCategorySetting(index) {
  var cat = customCategories[index];
  if (!cat) return;
  var result = await showPromptModal(
    currentLang === 'fr' ? 'Modifier la catégorie' : 'Edit category',
    [
      { label: currentLang === 'fr' ? 'Nom' : 'Name' },
      { label: currentLang === 'fr' ? 'Couleur' : 'Color', type: 'color' }
    ],
    [cat.name, cat.color || '#6366f1']
  );
  if (!result || !result[0]) return;
  var oldName = cat.name;
  cat.name = result[0].trim();
  cat.color = result[1] || cat.color;

  // Le nom de catégorie EST la valeur stockée dans la colonne Grist (Choice) :
  // un renommage doit donc être propagé aux tâches existantes, sinon elles
  // se retrouvent avec une valeur orpheline qui ne correspond plus à aucun choix.
  if (oldName !== cat.name) {
    var categoryCol = getColumnName('tasks', 'category');
    var affected = state.tasks.filter(function(tsk) { return tsk.Category === oldName; });
    if (affected.length > 0) {
      var actions = affected.map(function(tsk) { return ['UpdateRecord', state.TASKS_TABLE, tsk.id, { [categoryCol]: cat.name }]; });
      try { await grist.docApi.applyUserActions(actions); } catch (e) { console.log('rename category on tasks:', e.message); }
    }
  }
  await saveCategories();
  renderCategoriesList();
  refreshAllViews();
}

export async function removeCategorySetting(index) {
  var cat = customCategories[index];
  if (!cat) return;
  var confirmed = await showConfirmModal(
    currentLang === 'fr' ? 'Supprimer la catégorie « ' + cat.name + ' » ?' : 'Delete category "' + cat.name + '"?',
    currentLang === 'fr' ? 'Supprimer' : 'Delete'
  );
  if (!confirmed) return;
  customCategories.splice(index, 1);
  await saveCategories();
  renderCategoriesList();
  refreshAllViews();
  showToast(currentLang === 'fr' ? 'Catégorie supprimée' : 'Category removed', 'info');
}
