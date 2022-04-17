import { Game } from "./game";
import { createCardElements } from "./game-ui";

const NUMBERS_IN_PLAY = 5;

const game = new Game(Game.generateRandomNumbers(NUMBERS_IN_PLAY));

const cards = createCardElements(game);

const cardsContainer = document.getElementById("cards-container");
if (!cardsContainer) throw Error("Cannot find cards container.");

cardsContainer.append(...cards);
