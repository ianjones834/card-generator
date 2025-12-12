let cards = [];

function newBlankCard() {
  return {
    id: cards.length,
    title: '',
    sub_title: '',
    description: ''
  }
}

function resetCardList() {
  clearCardList();
  addCardsToHtml();
}

function addCardToHtml(card) {
  const card_html = `<div class="card" onclick="editCards(${card.id});">
    <h3>${card.title}</h3>
    <h5>${card.sub_title}</h5>
    ${card.description}
  </div>`;

  $('#card-list').append(card_html);
}

function editCards(id) {
  cards[id] = cardPrompt(id);
  resetCardList();
}

function cardPrompt(id) {
  let title = prompt('Enter title', '');
  let sub_title = prompt('Enter Subtitle', '');
  let description = prompt('Enter Description', '');

  return {id: id, title: title, sub_title: sub_title, description: description};
}

function addCardsToHtml() {
  for (let card of cards) {
    addCardToHtml(card);
  }
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