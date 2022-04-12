"use strict";

const cardsContainerElement = document.getElementById("cards-container");
if (!cardsContainerElement) throw Error("Cannot find cards container.");

const initialCards = [1, 2];

const doubleAndRandomizedCards = [...initialCards, ...initialCards].sort(
  () => Math.random() - 0.5
);

function mapCardToButton(card, clickHandler) {
  const button = document.createElement("button");
  const text = document.createTextNode(card);
  button.appendChild(text);
  button.classList.add("card");

  button.addEventListener("click", clickHandler, true);
  return button;
}

let matchedCards = [];
let lastClicked;
function handleCardClicked(event) {
  const button = event.currentTarget;
  const text = button.innerText;
  if (!lastClicked) {
    button.disabled = true;
    button.classList.add("selected");
    lastClicked = {
      text,
      button,
    };
    return;
  }

  if (lastClicked.text === text) {
    matchedCards.push(text);
    button.disabled = true;
    button.classList.add("success");
    lastClicked.button.classList.add("success");

    button.classList.remove("failure");
    lastClicked.button.classList.remove("failure");
  } else {
    button.classList.add("failure");
    lastClicked.button.disabled = false;
    lastClicked.button.classList.add("failure");
  }

  lastClicked = undefined;

  if (matchedCards.length === initialCards.length) {
    window.setTimeout(() => {
      const reloadGame = confirm(
        `Well done, all cards matched.\nDo you want to restart the game?`
      );
      if (reloadGame) location.reload();
    }, 0);
  }
}

const buttons = doubleAndRandomizedCards.map((card) =>
  mapCardToButton(card, handleCardClicked)
);
cardsContainerElement.append(...buttons);
