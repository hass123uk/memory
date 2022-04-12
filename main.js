"use strict";

const cardsContainerElement = document.getElementById("cards-container");
if (!cardsContainerElement) throw Error("Cannot find cards container.");

const initialCards = [1, 2, "a"];

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

function resetButtonAfterDelay(button1, button2) {
  window.setTimeout(function () {
    button1.classList.remove("failure");
    button2.classList.remove("failure");

    button1.classList.remove("selected");
    button2.classList.remove("selected");

    button1.disabled = false;
    button2.disabled = false;
  }, 2000);
}

let matchedCards = [];
let lastClicked;
function handleCardClicked(event) {
  const button = event.currentTarget;

  button.disabled = true;
  button.classList.add("selected");

  const text = button.innerText;
  if (!lastClicked) {
    lastClicked = {
      text,
      button,
    };
    return;
  }

  if (lastClicked.text === text) {
    matchedCards.push(text);
    button.classList.add("success");
    lastClicked.button.classList.add("success");

    button.classList.remove("failure");
    lastClicked.button.classList.remove("failure");
  } else {
    button.classList.add("failure");
    lastClicked.button.classList.add("failure");

    resetButtonAfterDelay(button, lastClicked.button);
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
