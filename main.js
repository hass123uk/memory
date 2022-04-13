"use strict";

const cards = [];
const numberOfCards = 7;
while (cards.length < numberOfCards) {
  const randomNumber = getFlooredRandom(0, 100);
  cards.push(randomNumber);
}

startGame(cards);

function startGame(cards) {
  const doubleCards = [...cards, ...cards];
  const randomOrder = doubleCards.sort(() => Math.random() - 0.5);
  const cardElements = randomOrder.map((card) =>
    createCard(card, (event) => handleCardClicked(event, cards))
  );

  const cardsContainerElement = document.getElementById("cards-container");
  if (!cardsContainerElement) throw Error("Cannot find cards container.");

  cardsContainerElement.append(...cardElements);
}

function createCard(cardText, clickHandler) {
  const card = document.createElement("button");
  card.classList.add("card");
  card.addEventListener("click", clickHandler, true);

  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");
  card.appendChild(cardInner);

  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");

  const h2 = document.createElement("h2");
  const textNode = document.createTextNode(cardText);
  h2.appendChild(textNode);

  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");
  cardBack.appendChild(h2);

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);

  return card;
}

let matchedCards = [];
let lastClicked;
function handleCardClicked(event, cards) {
  console.log(event);
  console.log(event.currentTarget);
  const card1 = event.currentTarget;
  const text = card1.innerText;

  card1.disabled = true;
  card1.classList.add("selected");

  if (!lastClicked || lastClicked.card === card1) {
    lastClicked = {
      text,
      card: card1,
    };
    return;
  }

  const card2 = lastClicked?.card;
  const bothCards = [card1, card2];

  if (lastClicked.text === text) {
    matchedCards.push(text);

    addClass("success", bothCards);
    removeClass("failure", bothCards);
  } else {
    addClass("failure", bothCards);
    resetButtonAfterDelay(bothCards);
  }

  lastClicked = undefined;
  alertOnGameEnd(cards);
}

function addClass(className, elements) {
  for (const element of elements) {
    element.classList.add(className);
  }
}

function removeClass(className, elements) {
  for (const element of elements) {
    element.classList.remove(className);
  }
}

function resetButtonAfterDelay(cards) {
  window.setTimeout(function () {
    removeClass("failure", cards);
    removeClass("selected", cards);
    for (const card of cards) {
      card.disabled = false;
    }
  }, 2000);
}

function alertOnGameEnd(cards) {
  if (matchedCards.length !== cards.length) return;
  window.setTimeout(() => {
    const reloadGame = confirm(
      `Well done, all cards matched.\nDo you want to restart the game?`
    );
    if (reloadGame) location.reload();
  }, 0);
}

function getFlooredRandom(min, max) {
  const arbitraryRandom = Math.random() * (max - min) + min;
  return Math.floor(arbitraryRandom);
}
