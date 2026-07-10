import { t, currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';
import { state } from '../store.js';
import { showToast } from '../ui/toast.js';
import { showConfirmModal } from '../ui/confirm-modal.js';
import { userMatchesRole, userRoleDisplay, getUserRoles } from './permissions.js';
import { roleLabel } from './filters.js';
import { loadAllData } from './data-loader.js';
import { closeModalForce } from './task-modal.js';
import { getColumnName } from '../config.js';
import { renderCategoriesList } from './categories.js';

export function getUserDisplayName(emailOrName) {
  if (!emailOrName) return '';
  // Try to find user by email
  var user = state.users.find(function(u) {
    return u.Email === emailOrName || u.Name === emailOrName;
  });
  if (user && user.Name) return user.Name;
  // If no user found or no name, extract name from email
  if (emailOrName.indexOf('@') !== -1) {
    return emailOrName.split('@')[0];
  }
  return emailOrName;
}

// =============================================================================
// TEAM VIEW (Users & Groups)
// =============================================================================

export function renderTeamView() {
  renderUsersList();
  renderGroupsList();
  renderCategoriesList();
}

export function renderUsersList() {
  var container = document.getElementById('users-list');
  if (!container) return;

  // Apply role filter so the Équipe tab respects the active role selection
  var displayedUsers = state.currentFilterRole
    ? state.users.filter(function(u) { return userMatchesRole(u, state.currentFilterRole); })
    : state.users;

  if (displayedUsers.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:30px;color:#94a3b8;">' + t('noUsers') + '</div>';
    return;
  }

  var html = '<table class="data-table"><thead><tr>';
  html += '<th>' + t('fieldName') + '</th>';
  html += '<th>' + t('fieldEmail') + '</th>';
  html += '<th>' + t('fieldRole') + '</th>';
  html += '<th>' + t('fieldGroup') + '</th>';
  html += '<th>' + t('colActions') + '</th>';
  html += '</tr></thead><tbody>';

  for (var i = 0; i < displayedUsers.length; i++) {
    var u = displayedUsers[i];
    var roleText = userRoleDisplay(u) ? userRoleDisplay(u).split(',').map(function(r) { return roleLabel(r.trim()); }).join(', ') : '';
    var firstRole = getUserRoles(u)[0] || 'member';
    var roleBg = firstRole === 'admin' ? '#fef2f2;color:#dc2626' : (firstRole === 'viewer' ? '#f1f5f9;color:#64748b' : '#eff6ff;color:#1e40af');

    html += '<tr>';
    html += '<td style="font-weight:700;">👤 ' + sanitize(u.Name) + '</td>';
    html += '<td>' + sanitize(u.Email) + '</td>';
    html += '<td><span style="padding:2px 10px;border-radius:20px;font-size:11px;font-weight:600;background:' + roleBg + '">' + sanitize(roleText) + '</span></td>';
    html += '<td>' + (u.Group_Name ? '<span class="assignee-chip">👥 ' + sanitize(u.Group_Name) + '</span>' : '--') + '</td>';
    html += '<td><button class="btn-icon" onclick="openEditUserModal(' + u.id + ')" title="' + t('edit') + '">✏️</button>';
    html += '<button class="btn-icon" onclick="deleteUser(' + u.id + ')">🗑️</button></td>';
    html += '</tr>';
  }

  html += '</tbody></table>';
  container.innerHTML = html;
}

export function renderGroupsList() {
  var container = document.getElementById('groups-list');
  if (!container) return;

  if (state.groups.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:30px;color:#94a3b8;">' + t('noGroups') + '</div>';
    return;
  }

  var html = '';
  for (var i = 0; i < state.groups.length; i++) {
    var g = state.groups[i];
    var memberCount = state.users.filter(function(u) { return u.Group_Name === g.Name; }).length;
    var memberNames = state.users.filter(function(u) { return u.Group_Name === g.Name; }).map(function(u) { return u.Name || u.Email; });

    html += '<div class="template-card">';
    html += '<div class="template-card-info">';
    html += '<h4>👥 ' + sanitize(g.Name) + '</h4>';
    html += '<div class="template-meta">';
    html += memberCount + ' ' + t('members');
    if (g.Description) html += ' • ' + sanitize(g.Description);
    html += '</div>';
    if (memberNames.length > 0) {
      html += '<div style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap;">';
      for (var j = 0; j < memberNames.length; j++) {
        html += '<span class="assignee-chip">👤 ' + sanitize(memberNames[j]) + '</span>';
      }
      html += '</div>';
    }
    html += '</div>';
    html += '<button class="btn-icon" onclick="openEditGroupModal(' + g.id + ')" title="' + t('edit') + '">✏️</button>';
    html += '<button class="btn-icon" onclick="deleteGroup(' + g.id + ')">🗑️</button>';
    html += '</div>';
  }

  container.innerHTML = html;
}

export async function getRoleChoicesFromGrist() {
  var roleSet = {};
  var hasGristChoices = false;

  // Try to get choices defined in Grist column metadata (source of truth)
  try {
    var roleColName = getColumnName('users', 'role');
    var tablesData = await grist.docApi.fetchTable('_grist_Tables');
    var columnsData = await grist.docApi.fetchTable('_grist_Tables_column');

    var tableRowId = null;
    if (tablesData && tablesData.id && tablesData.tableId) {
      for (var i = 0; i < tablesData.id.length; i++) {
        if (tablesData.tableId[i] === state.USERS_TABLE) { tableRowId = tablesData.id[i]; break; }
      }
    }

    if (tableRowId !== null && columnsData && columnsData.id) {
      for (var j = 0; j < columnsData.id.length; j++) {
        if (columnsData.parentId[j] === tableRowId && columnsData.colId[j] === roleColName) {
          var wo = columnsData.widgetOptions[j];
          if (wo) {
            try {
              var opts = JSON.parse(wo);
              if (opts.choices && Array.isArray(opts.choices) && opts.choices.length > 0) {
                opts.choices.forEach(function(c) { roleSet[c] = true; });
                hasGristChoices = true;
              }
            } catch (e) { /* ignore parse errors */ }
          }
          break;
        }
      }
    }
  } catch (e) {
    console.log('Could not fetch role choices from Grist metadata:', e);
  }

  // Add defaults only if no choices are defined yet (first-time setup)
  if (!hasGristChoices) {
    ['admin', 'member', 'viewer'].forEach(function(r) { roleSet[r] = true; });
  }

  // Always include roles currently assigned to users (so no user is orphaned)
  state.users.forEach(function(u) { getUserRoles(u).forEach(function(r) { if (r) roleSet[r] = true; }); });

  return Object.keys(roleSet).sort();
}

// In-memory state for the manage roles modal
var _manageRolesState = { choices: [] };

export async function openManageRolesModal() {
  var choices = await getRoleChoicesFromGrist();
  _manageRolesState.choices = choices.slice();
  renderManageRolesModal();
}

export function renderManageRolesModal() {
  var choices = _manageRolesState.choices;
  // Build usage map: role -> count of users (ChoiceList-safe)
  var usage = {};
  state.users.forEach(function(u) { getUserRoles(u).forEach(function(r) { if (r) usage[r] = (usage[r] || 0) + 1; }); });

  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal" onclick="event.stopPropagation()">';
  html += '<div class="modal-header"><h3>' + t('manageRolesTitle') + '</h3><button class="modal-close" onclick="closeModalForce()">✕</button></div>';
  html += '<div class="modal-body">';
  html += '<p style="color:#64748b;font-size:13px;margin:0 0 12px 0;">' + t('manageRolesSubtitle') + '</p>';

  // Existing roles list
  html += '<div class="settings-items">';
  if (choices.length === 0) {
    html += '<div style="text-align:center;color:#94a3b8;padding:20px;">--</div>';
  } else {
    for (var i = 0; i < choices.length; i++) {
      var r = choices[i];
      var count = usage[r] || 0;
      html += '<div class="settings-item">';
      html += '<div class="settings-item-info">';
      html += '<strong>' + sanitize(roleLabel(r)) + '</strong>';
      html += '<span class="settings-item-meta">' + count + ' ' + (currentLang === 'fr' ? 'utilisateur(s)' : 'user(s)') + '</span>';
      html += '</div>';
      html += '<div class="settings-item-actions">';
      html += '<button class="btn-icon" onclick="removeRoleChoice(' + i + ')" title="' + t('confirmDeleteRole') + '">🗑️</button>';
      html += '</div>';
      html += '</div>';
    }
  }
  html += '</div>';

  // Add new role
  html += '<div style="display:flex;gap:8px;margin-top:16px;">';
  html += '<input type="text" id="new-role-name" placeholder="' + t('newRolePlaceholder') + '" style="flex:1;" onkeydown="if(event.key===\'Enter\'){addRoleChoice();}" />';
  html += '<button class="btn btn-primary btn-sm" onclick="addRoleChoice()">+ ' + t('addRole') + '</button>';
  html += '</div>';

  html += '</div>';
  html += '<div class="modal-footer">';
  html += '<button class="btn btn-secondary" onclick="closeModalForce()">' + t('cancel') + '</button>';
  html += '<button class="btn btn-primary" onclick="saveRoleChoices()">' + t('save') + '</button>';
  html += '</div></div></div>';

  document.getElementById('modal-container').innerHTML = html;
}

export function addRoleChoice() {
  var input = document.getElementById('new-role-name');
  var name = (input.value || '').trim();
  if (!name) return;
  if (_manageRolesState.choices.indexOf(name) !== -1) {
    showToast(currentLang === 'fr' ? 'Ce rôle existe déjà' : 'Role already exists', 'error');
    return;
  }
  _manageRolesState.choices.push(name);
  renderManageRolesModal();
}

export function removeRoleChoice(index) {
  var role = _manageRolesState.choices[index];
  // Check if used
  var inUse = state.users.some(function(u) { return userMatchesRole(u, role); });
  if (inUse) {
    if (!confirm(t('cannotDeleteUsedRole') + '. ' + (currentLang === 'fr' ? 'Continuer ?' : 'Continue?'))) {
      return;
    }
  } else if (!confirm(t('confirmDeleteRole'))) {
    return;
  }
  _manageRolesState.choices.splice(index, 1);
  renderManageRolesModal();
}

export async function saveRoleChoices() {
  try {
    var roleColName = getColumnName('users', 'role');
    var tablesData = await grist.docApi.fetchTable('_grist_Tables');
    var columnsData = await grist.docApi.fetchTable('_grist_Tables_column');

    // Find table row id
    var tableRowId = null;
    for (var i = 0; i < tablesData.id.length; i++) {
      if (tablesData.tableId[i] === state.USERS_TABLE) { tableRowId = tablesData.id[i]; break; }
    }
    if (tableRowId === null) throw new Error('Table not found');

    // Find Role column and existing widgetOptions
    var existingOpts = {};
    for (var j = 0; j < columnsData.id.length; j++) {
      if (columnsData.parentId[j] === tableRowId && columnsData.colId[j] === roleColName) {
        var wo = columnsData.widgetOptions[j];
        if (wo) {
          try { existingOpts = JSON.parse(wo); } catch (e) {}
        }
        break;
      }
    }

    // Update choices
    existingOpts.choices = _manageRolesState.choices;
    if (!existingOpts.widget) existingOpts.widget = 'TextBox';

    await grist.docApi.applyUserActions([
      ['ModifyColumn', state.USERS_TABLE, roleColName, { widgetOptions: JSON.stringify(existingOpts) }]
    ]);
    showToast(t('rolesUpdated'), 'success');
    closeModalForce();
  } catch (e) {
    console.error('Error saving roles:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

export async function openEditUserModal(userId) {
  var user = state.users.find(function(u) { return u.id === userId; });
  if (!user) return;

  var groupOptions = '<option value="">--</option>';
  for (var i = 0; i < state.groups.length; i++) {
    var sel = state.groups[i].Name === user.Group_Name ? ' selected' : '';
    groupOptions += '<option value="' + sanitize(state.groups[i].Name) + '"' + sel + '>' + sanitize(state.groups[i].Name) + '</option>';
  }

  var roleChoices = await getRoleChoicesFromGrist();

  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal" onclick="event.stopPropagation()">';
  html += '<div class="modal-header"><h3>' + t('edit') + ' - ' + sanitize(user.Name) + '</h3><button class="modal-close" onclick="closeModalForce()">✕</button></div>';
  html += '<div class="modal-body">';
  html += '<div class="form-group"><label>' + t('fieldName') + '</label><input type="text" id="user-name" value="' + sanitize(user.Name) + '" /></div>';
  html += '<div class="form-group"><label>' + t('fieldEmail') + '</label><input type="email" id="user-email" value="' + sanitize(user.Email) + '" /></div>';
  html += '<div class="form-row">';
  html += '<div class="form-group"><label>' + t('fieldRole') + '</label><select id="user-role">';
  // Add current role first if it's not in the choices list
  if (user.Role && roleChoices.indexOf(user.Role) === -1) {
    html += '<option value="' + sanitize(user.Role) + '" selected>' + sanitize(roleLabel(user.Role)) + '</option>';
  }
  for (var i = 0; i < roleChoices.length; i++) {
    var r = roleChoices[i];
    var sel = (user.Role === r) ? ' selected' : '';
    html += '<option value="' + sanitize(r) + '"' + sel + '>' + sanitize(roleLabel(r)) + '</option>';
  }
  html += '</select></div>';
  html += '<div class="form-group"><label>' + t('fieldGroup') + '</label><select id="user-group">' + groupOptions + '</select></div>';
  html += '</div>';
  html += '</div>';
  html += '<div class="modal-footer">';
  html += '<button class="btn btn-secondary" onclick="closeModalForce()">' + t('cancel') + '</button>';
  html += '<button class="btn btn-primary" onclick="updateUser(' + userId + ')">' + t('save') + '</button>';
  html += '</div></div></div>';

  document.getElementById('modal-container').innerHTML = html;
}

export function openEditGroupModal(groupId) {
  var group = state.groups.find(function(g) { return g.id === groupId; });
  if (!group) return;

  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal" onclick="event.stopPropagation()">';
  html += '<div class="modal-header"><h3>' + t('edit') + ' - ' + sanitize(group.Name) + '</h3><button class="modal-close" onclick="closeModalForce()">✕</button></div>';
  html += '<div class="modal-body">';
  html += '<div class="form-group"><label>' + t('fieldName') + '</label><input type="text" id="group-name" value="' + sanitize(group.Name) + '" /></div>';
  html += '<div class="form-group"><label>' + t('fieldDescription') + '</label><textarea id="group-desc">' + sanitize(group.Description || '') + '</textarea></div>';
  html += '</div>';
  html += '<div class="modal-footer">';
  html += '<button class="btn btn-secondary" onclick="closeModalForce()">' + t('cancel') + '</button>';
  html += '<button class="btn btn-primary" onclick="updateGroup(' + groupId + ')">' + t('save') + '</button>';
  html += '</div></div></div>';

  document.getElementById('modal-container').innerHTML = html;
}

export async function updateUser(userId) {
  var name = document.getElementById('user-name').value.trim();
  if (!name) return;

  var record = {};
  record[getColumnName('users', 'name')] = name;
  record[getColumnName('users', 'email')] = document.getElementById('user-email').value.trim();
  record[getColumnName('users', 'role')] = document.getElementById('user-role').value;
  record[getColumnName('users', 'group')] = document.getElementById('user-group').value;

  try {
    await grist.docApi.applyUserActions([
      ['UpdateRecord', state.USERS_TABLE, userId, record]
    ]);
    showToast(t('taskUpdated'), 'success');
    closeModalForce();
    await loadAllData();
  } catch (e) {
    console.error('Error updating user:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

export async function updateGroup(groupId) {
  var name = document.getElementById('group-name').value.trim();
  if (!name) return;

  try {
    await grist.docApi.applyUserActions([
      ['UpdateRecord', state.GROUPS_TABLE, groupId, {
        Name: name,
        Description: document.getElementById('group-desc').value.trim()
      }]
    ]);
    showToast(t('taskUpdated'), 'success');
    closeModalForce();
    await loadAllData();
  } catch (e) {
    console.error('Error updating group:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

export async function openNewUserModal() {
  var groupOptions = '<option value="">--</option>';
  for (var i = 0; i < state.groups.length; i++) {
    groupOptions += '<option value="' + sanitize(state.groups[i].Name) + '">' + sanitize(state.groups[i].Name) + '</option>';
  }

  var roleChoices = await getRoleChoicesFromGrist();

  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal" onclick="event.stopPropagation()">';
  html += '<div class="modal-header"><h3>' + t('modalNewUser') + '</h3><button class="modal-close" onclick="closeModalForce()">✕</button></div>';
  html += '<div class="modal-body">';
  html += '<div class="form-group"><label>' + t('fieldName') + '</label><input type="text" id="user-name" /></div>';
  html += '<div class="form-group"><label>' + t('fieldEmail') + '</label><input type="email" id="user-email" /></div>';
  html += '<div class="form-row">';
  html += '<div class="form-group"><label>' + t('fieldRole') + '</label><select id="user-role">';
  for (var i = 0; i < roleChoices.length; i++) {
    var r = roleChoices[i];
    var sel = (r === 'member') ? ' selected' : '';
    html += '<option value="' + sanitize(r) + '"' + sel + '>' + sanitize(roleLabel(r)) + '</option>';
  }
  html += '</select></div>';
  html += '<div class="form-group"><label>' + t('fieldGroup') + '</label><select id="user-group">' + groupOptions + '</select></div>';
  html += '</div>';
  html += '</div>';
  html += '<div class="modal-footer">';
  html += '<button class="btn btn-secondary" onclick="closeModalForce()">' + t('cancel') + '</button>';
  html += '<button class="btn btn-primary" onclick="createUser()">' + t('save') + '</button>';
  html += '</div></div></div>';

  document.getElementById('modal-container').innerHTML = html;
}

export function openNewGroupModal() {
  var html = '<div class="modal-overlay" onclick="closeModal(event)">';
  html += '<div class="modal" onclick="event.stopPropagation()">';
  html += '<div class="modal-header"><h3>' + t('modalNewGroup') + '</h3><button class="modal-close" onclick="closeModalForce()">✕</button></div>';
  html += '<div class="modal-body">';
  html += '<div class="form-group"><label>' + t('fieldName') + '</label><input type="text" id="group-name" /></div>';
  html += '<div class="form-group"><label>' + t('fieldDescription') + '</label><textarea id="group-desc"></textarea></div>';
  html += '</div>';
  html += '<div class="modal-footer">';
  html += '<button class="btn btn-secondary" onclick="closeModalForce()">' + t('cancel') + '</button>';
  html += '<button class="btn btn-primary" onclick="createGroup()">' + t('save') + '</button>';
  html += '</div></div></div>';

  document.getElementById('modal-container').innerHTML = html;
}

export async function createUser() {
  var name = document.getElementById('user-name').value.trim();
  if (!name) return;

  var record = {};
  record[getColumnName('users', 'name')] = name;
  record[getColumnName('users', 'email')] = document.getElementById('user-email').value.trim();
  record[getColumnName('users', 'role')] = document.getElementById('user-role').value;
  record[getColumnName('users', 'group')] = document.getElementById('user-group').value;

  try {
    await grist.docApi.applyUserActions([
      ['AddRecord', state.USERS_TABLE, null, record]
    ]);
    showToast(t('userCreated'), 'success');
    closeModalForce();
    await loadAllData();
  } catch (e) {
    console.error('Error creating user:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

export async function createGroup() {
  var name = document.getElementById('group-name').value.trim();
  if (!name) return;

  var record = {
    Name: name,
    Description: document.getElementById('group-desc').value.trim()
  };

  try {
    await grist.docApi.applyUserActions([
      ['AddRecord', state.GROUPS_TABLE, null, record]
    ]);
    showToast(t('groupCreated'), 'success');
    closeModalForce();
    await loadAllData();
  } catch (e) {
    console.error('Error creating group:', e);
    showToast('Error: ' + e.message, 'error');
  }
}

export async function deleteUser(userId) {
  if (!state.isOwner) return;
  var confirmed = await showConfirmModal(t('confirmDeleteUser'), currentLang === 'fr' ? 'Supprimer l\'utilisateur' : 'Delete user');
  if (!confirmed) return;
  try {
    await grist.docApi.applyUserActions([
      ['RemoveRecord', state.USERS_TABLE, userId]
    ]);
    showToast(t('userDeleted'), 'info');
    await loadAllData();
  } catch (e) {
    console.error('Error deleting user:', e);
  }
}

export async function deleteGroup(groupId) {
  if (!state.isOwner) return;
  var confirmed = await showConfirmModal(t('confirmDeleteGroup'), currentLang === 'fr' ? 'Supprimer le groupe' : 'Delete group');
  if (!confirmed) return;
  try {
    await grist.docApi.applyUserActions([
      ['RemoveRecord', state.GROUPS_TABLE, groupId]
    ]);
    showToast(t('groupDeleted'), 'info');
    await loadAllData();
  } catch (e) {
    console.error('Error deleting group:', e);
  }
}
