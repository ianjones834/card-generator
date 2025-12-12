import EditorJS from './node_modules/@editorjs/editorjs/dist/editorjs.mjs';
import EditorjsList from './node_modules/@editorjs/list/dist/editorjs-list.mjs';
import Header from './node_modules/@editorjs/header/dist/header.mjs';

let card_num = 0;
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
  for (let i = 0; i < card_num; i++) {
    if (i < editors.length) continue;

    editors.push(newEditor(i))
  }
}

function newBlankCard(id) {
  return {
    id: id,
    title: '',
    sub_title: '',
    description: '',
    editor: `editor-${id}`
  }
}

function addCardToHtml(card) {
  const card_html = `<div class="card" id="editor-${card.id}">
    <h3>${card.title}</h3>
    <h5>${card.sub_title}</h5>
    ${card.description}
  </div>`;

  $('#card-list').append(card_html);

}

function newPage() {
  for (let i = 0; i < 9; i++) {
    addCardToHtml(newBlankCard(card_num++));
  }


  createEditors();
};

function removePage() {
  for (let i = 0; i < 9; i++) {
    $(`#editor-${card_num - 1}`).remove();
    card_num--;
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
})