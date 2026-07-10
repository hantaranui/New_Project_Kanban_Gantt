import { t, currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { state } from '../store.js';
import { getColumnName } from '../config.js';
import { showToast } from '../ui/toast.js';
import { showConfirmModal, showPromptModal } from '../ui/confirm-modal.js';
import { saveSetting } from './settings.js';
import { refreshAllViews } from '../ui/tabs.js';

// Tags des tâches : même patron que les catégories (domains/categories.js) et
// les statuts Kanban (kanban.js) - persistés en PM_Settings (customTags),
// jamais lus depuis une table séparée. La colonne Grist Tag (ChoiceList) ne
// sert qu'à l'affichage natif (couleurs), synchronisée en écriture seule par
// syncTagChoices().
export var customTags = [];

export function getTags() {
  return customTags;
}

export function setTagsFromSettings(raw) {
  var parsed = [];
  try { parsed = JSON.parse(raw) || []; } catch (e) {}
  customTags.length = 0;
  Array.prototype.push.apply(customTags, parsed);
}

export async function saveTags() {
  await saveSetting('tags', JSON.stringify(customTags));
  await syncTagChoices();
}

export async function syncTagChoices() {
  try {
    var choices = customTags.map(function(tg) { return tg.name; });
    var choiceOptions = {};
    customTags.forEach(function(tg) {
      if (tg.color) choiceOptions[tg.name] = { fillColor: tg.color, textColor: '#ffffff' };
    });
    var tagCol = getColumnName('tasks', 'tag');
    await grist.docApi.applyUserActions([
      ['ModifyColumn', state.TASKS_TABLE, tagCol, { widgetOptions: JSON.stringify({ choices: choices, choiceOptions: choiceOptions }) }]
    ]);
    state.taskTableColumns = null;
  } catch (e) {
    console.log('syncTagChoices:', e.message);
  }
}

// Utilisée par l'onglet Paramètres (gestion avec édition/suppression),
// même conteneur DOM #tags-list que l'ancienne implémentation basée table.
export function renderTagsList() {
  var container = document.getElementById('tags-list');
  if (!container) return;

  if (customTags.length === 0) {
    container.innerHTML = '<div style="text-align:center;color:#94a3b8;padding:20px;">' + (currentLang === 'fr' ? 'Aucun tag' : 'No tags') + '</div>';
    return;
  }

  var html = '<div class="settings-items">';
  customTags.forEach(function(tg, i) {
    html += '<div class="settings-item">';
    html += '<span class="settings-item-dot" style="background:' + (tg.color || '#6366f1') + ';"></span>';
    html += '<div class="settings-item-info"><strong>' + sanitize(tg.name) + '</strong></div>';
    html += '<div class="settings-item-actions">';
    html += '<button class="btn-icon" onclick="editTagSetting(' + i + ')" title="' + (currentLang === 'fr' ? 'Modifier' : 'Edit') + '">✏️</button>';
    if (state.isOwner) html += '<button class="btn-icon" onclick="removeTagSetting(' + i + ')" title="' + t('delete') + '">🗑️</button>';
    html += '</div>';
    html += '</div>';
  });
  html += '</div>';
  container.innerHTML = html;
}
export { renderTagsList as renderSettingsTagsList };

export async function addTagSetting() {
  var result = await showPromptModal(
    currentLang === 'fr' ? 'Nouveau tag' : 'New tag',
    [
      { label: currentLang === 'fr' ? 'Nom' : 'Name', placeholder: currentLang === 'fr' ? 'Ex: Urgent' : 'Ex: Urgent' },
      { label: currentLang === 'fr' ? 'Couleur' : 'Color', type: 'color' }
    ],
    ['', '#6366f1']
  );
  if (!result || !result[0]) return;
  var name = result[0].trim();
  if (!name) return;
  if (customTags.some(function(tg) { return tg.name === name; })) {
    showToast(currentLang === 'fr' ? 'Ce tag existe déjà' : 'This tag already exists', 'error');
    return;
  }
  customTags.push({ name: name, color: result[1] || '#6366f1' });
  await saveTags();
  renderTagsList();
  refreshAllViews();
  showToast(currentLang === 'fr' ? 'Tag ajouté' : 'Tag added', 'success');
}

export async function editTagSetting(index) {
  var tg = customTags[index];
  if (!tg) return;
  var result = await showPromptModal(
    currentLang === 'fr' ? 'Modifier le tag' : 'Edit tag',
    [
      { label: currentLang === 'fr' ? 'Nom' : 'Name' },
      { label: currentLang === 'fr' ? 'Couleur' : 'Color', type: 'color' }
    ],
    [tg.name, tg.color || '#6366f1']
  );
  if (!result || !result[0]) return;
  var oldName = tg.name;
  tg.name = result[0].trim();
  tg.color = result[1] || tg.color;

  // Le nom de tag EST une des valeurs stockées dans la colonne Grist
  // (ChoiceList) : un renommage doit être propagé aux tâches existantes.
  if (oldName !== tg.name) {
    var tagCol = getColumnName('tasks', 'tag');
    var actions = [];
    state.tasks.forEach(function(tsk) {
      var list = Array.isArray(tsk.Tag) ? tsk.Tag : [];
      var idx = list.indexOf(oldName);
      if (idx !== -1) {
        var updated = list.slice();
        updated[idx] = tg.name;
        actions.push(['UpdateRecord', state.TASKS_TABLE, tsk.id, { [tagCol]: ['L'].concat(updated) }]);
      }
    });
    if (actions.length > 0) {
      try { await grist.docApi.applyUserActions(actions); } catch (e) { console.log('rename tag on tasks:', e.message); }
    }
  }
  await saveTags();
  renderTagsList();
  refreshAllViews();
}

export async function removeTagSetting(index) {
  var tg = customTags[index];
  if (!tg) return;
  var confirmed = await showConfirmModal(
    currentLang === 'fr' ? 'Supprimer le tag « ' + tg.name + ' » ?' : 'Delete tag "' + tg.name + '"?',
    currentLang === 'fr' ? 'Supprimer' : 'Delete'
  );
  if (!confirmed) return;
  customTags.splice(index, 1);
  await saveTags();
  renderTagsList();
  refreshAllViews();
  showToast(currentLang === 'fr' ? 'Tag supprimé' : 'Tag removed', 'info');
}
