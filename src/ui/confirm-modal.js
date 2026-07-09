import { currentLang } from '../i18n.js';
import { sanitize } from '../utils/sanitize.js';

export let confirmResolve = null;

export function showConfirmModal(message, title, okLabel) {
  return new Promise(function(resolve) {
    confirmResolve = resolve;
    document.getElementById('confirm-modal-title').textContent = title || (currentLang === 'fr' ? 'Confirmation' : 'Confirmation');
    document.getElementById('confirm-modal-message').textContent = message;
    var okBtn = document.getElementById('confirm-modal-ok');
    if (okBtn) okBtn.textContent = okLabel || (currentLang === 'fr' ? 'Supprimer' : 'Delete');
    document.getElementById('confirm-modal').style.display = 'flex';
  });
}

export function closeConfirmModal(result) {
  document.getElementById('confirm-modal').style.display = 'none';
  if (confirmResolve) {
    confirmResolve(result);
    confirmResolve = null;
  }
}

export let promptResolve = null;

export function showPromptModal(title, fields, defaults) {
  return new Promise(function(resolve) {
    promptResolve = resolve;
    document.getElementById('prompt-modal-title').textContent = title;
    var body = '';
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      var val = defaults && defaults[i] !== undefined ? defaults[i] : '';
      body += '<label>' + f.label + '</label>';
      if (f.type === 'color') {
        body += '<input type="color" id="prompt-field-' + i + '" value="' + (val || '#3b82f6') + '">';
      } else if (f.type === 'emoji') {
        body += '<div class="emoji-field-wrap">';
        body += '<input type="text" id="prompt-field-' + i + '" value="' + sanitize(val) + '" placeholder="' + (f.placeholder || '') + '" class="emoji-field-input">';
        body += '<button type="button" class="emoji-picker-btn" onclick="toggleEmojiPicker(' + i + ')">😀</button>';
        body += '</div>';
        body += '<div class="emoji-picker-grid" id="emoji-picker-' + i + '" style="display:none;"></div>';
      } else {
        body += '<input type="text" id="prompt-field-' + i + '" value="' + sanitize(val) + '" placeholder="' + (f.placeholder || '') + '">';
      }
    }
    document.getElementById('prompt-modal-body').innerHTML = body;
    document.getElementById('prompt-modal').style.display = 'flex';
    var firstInput = document.getElementById('prompt-field-0');
    if (firstInput) setTimeout(function() { firstInput.focus(); firstInput.select(); }, 50);
    document.getElementById('prompt-modal')._fieldCount = fields.length;
    document.getElementById('prompt-modal').onkeydown = function(e) {
      if (e.key === 'Enter') submitPromptModal();
      if (e.key === 'Escape') closePromptModal();
    };
  });
}

export function submitPromptModal() {
  var count = document.getElementById('prompt-modal')._fieldCount || 1;
  var values = [];
  for (var i = 0; i < count; i++) {
    var el = document.getElementById('prompt-field-' + i);
    values.push(el ? el.value : '');
  }
  document.getElementById('prompt-modal').style.display = 'none';
  if (promptResolve) {
    promptResolve(values);
    promptResolve = null;
  }
}

export const EMOJI_CATEGORIES = [
  { icon: '😀', label: 'Smileys', emojis: [
    '😀','😃','😄','😁','😆','😅','🤣','😂','🙂','😊',
    '😇','🥰','😍','🤩','😘','😗','😋','😛','😜','🤪',
    '😎','🤓','🧐','😏','😒','😞','😔','😟','😕','🙁',
    '😣','😖','😫','😩','🥺','😢','😭','😤','😠','😡',
    '🤬','😈','👿','💀','☠️','💩','🤡','👹','👺','👻',
    '👽','🤖','😺','😸','😹','😻','😼','😽','🙀','😿','😾'
  ]},
  { icon: '👋', label: 'Gestes', emojis: [
    '👋','🤚','🖐️','✋','🖖','👌','🤌','🤏','✌️','🤞',
    '🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','👍',
    '👎','✊','👊','🤛','🤜','👏','🙌','👐','🤲','🤝',
    '🙏','✍️','💅','🤳','💪','🦾','👀','👁️','👤','👥'
  ]},
  { icon: '🐾', label: 'Animaux', emojis: [
    '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯',
    '🦁','🐮','🐷','🐸','🐵','🙈','🙉','🙊','🐒','🐔',
    '🐧','🐦','🐤','🦆','🦅','🦉','🦇','🐺','🐗','🐴',
    '🦄','🐝','🐛','🦋','🐌','🐞','🐜','🪲','🐢','🐍',
    '🦎','🐙','🦀','🐠','🐟','🐬','🐳','🐋','🦈','🐊'
  ]},
  { icon: '🌿', label: 'Nature', emojis: [
    '🌸','💐','🌷','🌹','🥀','🌺','🌻','🌼','🌱','🌲',
    '🌳','🌴','🌵','🍀','☘️','🍁','🍂','🍃','🪴','🌍',
    '🌎','🌏','🌑','🌒','🌓','🌔','🌕','🌙','⭐','🌟',
    '✨','⚡','☀️','🌤️','⛅','🌧️','🌈','❄️','🔥','💧'
  ]},
  { icon: '🍕', label: 'Nourriture', emojis: [
    '🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍒',
    '🍑','🥭','🍍','🥥','🥝','🍅','🥑','🍆','🥔','🥕',
    '🌽','🌶️','🫑','🥒','🥬','🥦','🧄','🧅','🍄','🥜',
    '🍞','🥐','🥖','🧀','🍖','🍗','🥩','🌭','🍔','🍟',
    '🍕','🌮','🍣','🍩','🍪','🎂','🍰','☕','🍵','🧃'
  ]},
  { icon: '⚽', label: 'Activités', emojis: [
    '⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🥏','🎱',
    '🏓','🏸','🏒','🥅','⛳','🏹','🎣','🤿','🥊','🥋',
    '🏋️','🤸','⛷️','🏂','🏄','🚴','🏇','🧗','🎪','🎭',
    '🎨','🎬','🎤','🎧','🎼','🎹','🥁','🎷','🎺','🎸',
    '🎮','🎲','♟️','🧩','🎯','🎳','🎰','🏆','🥇','🎉'
  ]},
  { icon: '🚗', label: 'Voyages', emojis: [
    '🚗','🚕','🚙','🚌','🚎','🏎️','🚓','🚑','🚒','🚐',
    '🛻','🚚','🚛','🚜','🛵','🏍️','🚲','🛴','🚂','🚆',
    '🚇','🚊','🚁','🛩️','✈️','🚀','🛸','🚢','⛵','🛥️',
    '🏠','🏡','🏢','🏣','🏥','🏦','🏗️','🏛️','⛪','🕌',
    '🗼','🗽','⛲','🎡','🎢','🏕️','🌋','🏔️','🗻','🏖️'
  ]},
  { icon: '💡', label: 'Objets', emojis: [
    '⌚','📱','💻','⌨️','🖥️','🖨️','🖱️','💾','💿','📷',
    '📹','🎥','📺','📻','⏰','🔔','📢','📣','🔊','🔇',
    '💡','🔦','🕯️','📖','📚','📝','✏️','🖊️','🖋️','📌',
    '📎','🔗','📐','📏','✂️','🗃️','🗂️','📁','📂','📅',
    '📊','📈','📉','📋','📑','🔒','🔓','🔑','🔧','🔨',
    '🛠️','⚙️','🧲','💊','🩺','🧪','🔬','🔭','📡','💉',
    '🏷️','📦','📮','📧','📩','✉️','💌','💰','💳','💎'
  ]},
  { icon: '❤️', label: 'Symboles', emojis: [
    '❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔',
    '❣️','💕','💞','💓','💗','💖','💘','💝','💟','☮️',
    '✝️','☪️','🕉️','☸️','✡️','🔯','🕎','☯️','☦️','🛐',
    '♈','♉','♊','♋','♌','♍','♎','♏','♐','♑',
    '♒','♓','⛎','🔀','▶️','⏸️','⏹️','⏺️','⏭️','⏮️',
    '✅','❌','❓','❗','‼️','⚠️','🚫','⭕','🔴','🟠',
    '🟡','🟢','🔵','🟣','🟤','⚫','⚪','🔶','🔷','♠️',
    '♥️','♦️','♣️','🏁','🚩','🎌','🏴','🏳️','🏳️‍🌈','🇫🇷'
  ]}
];

export let _emojiPickerFieldIndex = null;

export function toggleEmojiPicker(fieldIndex) {
  var picker = document.getElementById('emoji-picker-' + fieldIndex);
  if (!picker) return;
  if (picker.style.display !== 'none') {
    picker.style.display = 'none';
    return;
  }
  _emojiPickerFieldIndex = fieldIndex;
  renderEmojiPicker(fieldIndex, 0, '');
  picker.style.display = 'block';
}

export function renderEmojiPicker(fieldIndex, catIndex, search) {
  var picker = document.getElementById('emoji-picker-' + fieldIndex);
  if (!picker) return;
  var html = '<div class="emoji-picker-search">';
  html += '<input type="text" class="emoji-search-input" placeholder="' + (currentLang === 'fr' ? 'Rechercher...' : 'Search...') + '" value="' + sanitize(search) + '" oninput="renderEmojiPicker(' + fieldIndex + ',' + catIndex + ',this.value)">';
  html += '</div>';
  html += '<div class="emoji-picker-tabs">';
  for (var c = 0; c < EMOJI_CATEGORIES.length; c++) {
    html += '<button type="button" class="emoji-tab' + (c === catIndex && !search ? ' emoji-tab-active' : '') + '" onclick="renderEmojiPicker(' + fieldIndex + ',' + c + ',\'\')" title="' + EMOJI_CATEGORIES[c].label + '">' + EMOJI_CATEGORIES[c].icon + '</button>';
  }
  html += '</div>';
  html += '<div class="emoji-picker-items">';
  if (search) {
    var q = search.toLowerCase();
    for (var ci = 0; ci < EMOJI_CATEGORIES.length; ci++) {
      var cat = EMOJI_CATEGORIES[ci];
      var matched = cat.emojis.filter(function(e) { return cat.label.toLowerCase().indexOf(q) !== -1 || e.indexOf(q) !== -1; });
      if (matched.length > 0) {
        html += '<div class="emoji-cat-label">' + cat.label + '</div>';
        html += '<div class="emoji-cat-grid">';
        for (var m = 0; m < matched.length; m++) {
          html += '<button type="button" class="emoji-pick-item" onclick="selectEmoji(' + fieldIndex + ',this.textContent)">' + matched[m] + '</button>';
        }
        html += '</div>';
      }
    }
  } else {
    var cat = EMOJI_CATEGORIES[catIndex];
    html += '<div class="emoji-cat-grid">';
    for (var ei = 0; ei < cat.emojis.length; ei++) {
      html += '<button type="button" class="emoji-pick-item" onclick="selectEmoji(' + fieldIndex + ',this.textContent)">' + cat.emojis[ei] + '</button>';
    }
    html += '</div>';
  }
  html += '</div>';
  picker.innerHTML = html;
  if (search) {
    var inp = picker.querySelector('.emoji-search-input');
    if (inp) { inp.focus(); var l = inp.value.length; inp.setSelectionRange(l, l); }
  }
}

export function selectEmoji(fieldIndex, emoji) {
  var input = document.getElementById('prompt-field-' + fieldIndex);
  if (input) input.value = emoji;
  var picker = document.getElementById('emoji-picker-' + fieldIndex);
  if (picker) picker.style.display = 'none';
}

export function closePromptModal() {
  document.getElementById('prompt-modal').style.display = 'none';
  if (promptResolve) {
    promptResolve(null);
    promptResolve = null;
  }
}
