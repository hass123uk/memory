import { Game, PlayResult } from "./game";

export function createCardElements(game: Game) {
  const cardElements = game.cards.map((card) =>
    createCard(card, (event: Event) => handleCardClicked(event, game))
  );

  return cardElements;
}

function createCard(card: number, clickHandler: EventListener) {
  const cardElement = createElementWithClass("button", ["card"]);
  cardElement.addEventListener("click", clickHandler, true);
  const cardInner = createElementWithClass("div", ["card-inner"]);
  const cardFront = createElementWithClass("div", ["card-front"]);
  const cardBack = createElementWithClass("div", ["card-back"]);
  const h2 = createElementWithTextNode("h2", card.toString());

  cardBack.appendChild(h2);
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  cardElement.appendChild(cardInner);

  return cardElement;
}

function createElementWithClass(elementType: string, classes: string[]) {
  const element = document.createElement(elementType);
  element.classList.add(...classes);
  return element;
}

function createElementWithTextNode(elementType: string, text: string) {
  const element = document.createElement(elementType);
  const textNode = document.createTextNode(text);
  element.appendChild(textNode);
  return element;
}

let currentPendingElement: HTMLButtonElement | undefined;
function handleCardClicked(event: Event, game: Game) {
  const cardElement = event.currentTarget as HTMLButtonElement;

  cardElement.disabled = true;
  cardElement.classList.add("selected");

  if (!currentPendingElement) {
    console.error(
      "current pending element is null - this should not be possible."
    );
  }
  const bothCards = [cardElement, currentPendingElement];

  const card = Number(cardElement.innerText.trim());
  const result = game.cardSelected(card);

  switch (result) {
    case PlayResult.SUCCESS:
      currentPendingElement = cardElement;
      break;
    case PlayResult.SUCCESS:
      addClass("success", bothCards);
      removeClass("failure", bothCards);
      break;
    case PlayResult.FAILURE:
      addClass("failure", bothCards);
      resetButtonAfterDelay(bothCards);
      break;
    case PlayResult.GAMEOVER:
      alertOnGameEnd();
      break;
    default:
      console.error("Unknown play result in click handler.");
      break;
  }
}

function addClass(className: string, elements: Array<HTMLElement | undefined>) {
  for (const element of elements) {
    element?.classList.add(className);
  }
}

function removeClass(
  className: string,
  elements: Array<HTMLElement | undefined>
) {
  for (const element of elements) {
    element?.classList.remove(className);
  }
}

function resetButtonAfterDelay(cards: Array<HTMLButtonElement | undefined>) {
  window.setTimeout(function () {
    removeClass("selected", cards);
    removeClass("failure", cards);
    for (const card of cards) {
      if (card) card.disabled = false;
    }
  }, 1000);
}

function alertOnGameEnd() {
  window.setTimeout(() => {
    const reloadGame = confirm("Restart the game?");
    if (reloadGame) location.reload();
  }, 300);
}
