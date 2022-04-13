"use strict";

function startGame(cards) {
  const doubleCards = [...cards, ...cards];
  const randomOrder = doubleCards.sort(() => Math.random() - 0.5);
  const buttons = randomOrder.map((card) =>
    mapCardToButton(card, (event) => handleCardClicked(event, cards))
  );

  cardsContainerElement.append(...buttons);
}

const cardsContainerElement = document.getElementById("cards-container");
if (!cardsContainerElement) throw Error("Cannot find cards container.");

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
function handleCardClicked(event, cards) {
  const button1 = event.currentTarget;
  const text = button1.innerText;

  button1.disabled = true;
  button1.classList.add("selected");

  if (!lastClicked) {
    lastClicked = {
      text,
      button: button1,
    };
    return;
  }

  const button2 = lastClicked?.button;
  const bothButtons = [button1, button2];

  if (lastClicked.text === text) {
    matchedCards.push(text);

    addClass("success", bothButtons);
    removeClass("failure", bothButtons);
  } else {
    addClass("failure", bothButtons);
    resetButtonAfterDelay(bothButtons);
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

function resetButtonAfterDelay(buttons) {
  window.setTimeout(function () {
    removeClass("failure", buttons);
    removeClass("selected", buttons);
    for (const button of buttons) {
      button.disabled = false;
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

const cards = [1, 2, "a"];
startGame(cards);
