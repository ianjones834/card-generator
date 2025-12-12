import EditorJS from './node_modules/@editorjs/editorjs/dist/editorjs.mjs';
import EditorjsList from './node_modules/@editorjs/list/dist/editorjs-list.mjs';
import Header from './node_modules/@editorjs/header/dist/header.mjs';

let card = 0;
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

function addCardToHtml(id) {
  $('#card-list').append(`<div class="card" id="editor-${id}"></div>`);
}

function newPage() {
  for (let i = 0; i < 9; i++) {
    addCardToHtml(card);
    editors.push(newEditor(card++))
  }
};

function removePage() {
  for (let i = 0; i < 9; i++) {
    $(`#editor-${card - 1}`).remove();
    card--;
  }

  editors.splice(editors.length - 9);
}

newPage();

document.addEventListener('keydown', (event) => {
  if (event.key === '+') {
    newPage();
  }
  else if (event.key === '-' || event.key === '_') {
    removePage();
  }
});