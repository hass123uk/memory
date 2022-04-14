import { countPairs, Game, PlayResult } from "./game";

describe("generate number cards", () => {
  test("pairs equal to input are generated", () => {
    const seed = 5;
    const cards = Game.generateNumberCards(seed);

    expect(cards).toHaveLength(seed * 2);
    expect(countPairs(cards)).toEqual(seed);
  });

  test("min inclusive and max exclusive", () => {
    const seed = 10;
    const min = 1;
    const max = 2;
    const cards = Game.generateNumberCards(seed, min, max);

    const allEqualOne = cards.every((card) => card === 1);
    expect(allEqualOne).toEqual(true);
  });

  test("output is random", () => {
    const seed = 10;
    const cards1 = Game.generateNumberCards(seed);
    const cards2 = Game.generateNumberCards(seed);
    const cards3 = Game.generateNumberCards(seed);

    expect(cards1).toEqual(cards1); //Guard against the JS magic.

    expect(cards1).not.toEqual(cards2);
    expect(cards1).not.toEqual(cards3);
  });
});

describe("play game of 2 cards", () => {
  let game: Game;
  beforeAll(() => {
    const twoCards = Game.generateNumberCards(1);
    game = new Game(twoCards);
  });
  test("selecting the first card", () => {
    const result = game.cardSelected(game.cards[0]);
    expect(result).toEqual(PlayResult.PENDING);
  });
  test("game over on selecting the second card", () => {
    const result = game.cardSelected(game.cards[1]);
    expect(result).toEqual(PlayResult.GAMEOVER);
  });
});

describe("play game of 10 cards", () => {
  let game: Game;
  beforeAll(() => {
    const tenCards = Game.generateNumberCards(2);
    game = new Game(tenCards);
  });
  test("play history maintained until game over", () => {
    let counter = 0;
    let result;
    const sortedCards = game.cards.sort();
    while (result !== PlayResult.GAMEOVER) {
      for (const card of sortedCards) {
        result = game.cardSelected(card);
        counter++;
      }
    }

    expect(game.playHistory.length).toEqual(counter);
  });
});
