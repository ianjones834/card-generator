import EditorJS from './node_modules/@editorjs/editorjs/dist/editorjs.mjs';
import EditorjsList from './node_modules/@editorjs/list/dist/editorjs-list.mjs';
import Header from './node_modules/@editorjs/header/dist/header.mjs';

let cards = [];
let editors = [];

function newEditor(id) {
  return new EditorJS({
    holder: `editor-${id}`,
    tools: {
      header: {
        class: Header,
        config: {
          placeholder: 'Enter a header',
          levels: [3,5],
          defaultLevel: 3
        },
      },
      list: EditorjsList,
    }
  })
}

function createEditors() {
  for (let card of cards) {
    editors.push(newEditor(card.id))
  }
}

export function newBlankCard() {
  return {
    id: cards.length,
    title: '',
    sub_title: '',
    description: '',
    editor: `editor-${cards.length}`
  }
}

export function resetCardList() {
  clearCardList();
  addCardsToHtml();
}

export function addCardToHtml(card) {
  const card_html = `<div class="card" id="editor-${card.id}">
    <h3>${card.title}</h3>
    <h5>${card.sub_title}</h5>
    ${card.description}
  </div>`;

  $('#card-list').append(card_html);

}

export function editCards(id) {
  cards[id] = cardPrompt(id);
  resetCardList();
}

export function cardPrompt(id) {
  let title = prompt('Enter title', '');
  let sub_title = prompt('Enter Subtitle', '');
  let description = prompt('Enter Description', '');

  return {id: id, title: title, sub_title: sub_title, description: description};
}

function addCardsToHtml() {
  for (let card of cards) {
    addCardToHtml(card);
  }

  createEditors()
}

function clearCardList() {
  $('#card-list').html('');
}

function newPage() {
  for (let i = 0; i < 9; i++) {
    cards.push(newBlankCard());
  }

  resetCardList();
};

function removePage() {
  cards.splice(cards.length - 9);
  resetCardList();
}

newPage();

document.addEventListener('keydown', (event) => {
  if (event.key === '+') {
    newPage();
  }
  else if (event.key === '-' || event.key === '_') {
    removePage();
  }
})