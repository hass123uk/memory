import { Game, PlayResult } from "./game";

describe("generate number cards", () => {
  test("numbers equal to input are generated", () => {
    const seed = 5;
    const cards = Game.generateRandomNumbers(seed);

    expect(cards).toHaveLength(seed);
  });

  test("min inclusive and max exclusive", () => {
    const seed = 10;
    const min = 1;
    const max = 2;
    const cards = Game.generateRandomNumbers(seed, min, max);

    const allEqualOne = cards.every((card) => card === 1);
    expect(allEqualOne).toEqual(true);
  });

  test("output is random", () => {
    const seed = 10;
    const cards1 = Game.generateRandomNumbers(seed);
    const cards2 = Game.generateRandomNumbers(seed);
    const cards3 = Game.generateRandomNumbers(seed);

    expect(cards1).toEqual(cards1); //Guard against the JS magic.

    expect(cards1).not.toEqual(cards2);
    expect(cards1).not.toEqual(cards3);
  });
});

describe("play game of 2 cards", () => {
  let game: Game;
  beforeAll(() => {
    const oneNumber = Game.generateRandomNumbers(1);
    game = new Game(oneNumber);
  });
  test("double the cards are stored", () => {
    expect(game.cards).toHaveLength(2);
    expect(countPairs(game.cards)).toEqual(1);
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
    const fiveNumbers = Game.generateRandomNumbers(5);
    game = new Game(fiveNumbers);
  });
  test("play history maintained until game over", () => {
    let counter = 0;
    let result;
    let cards = [...game.cards].sort(() => Math.random() - 0.5);
    while (result !== PlayResult.GAMEOVER) {
      for (const card of cards) {
        result = game.cardSelected(card);
        counter++;
      }
      cards = cards.sort();
    }

    expect(game.playHistory.length).toEqual(counter);
  });
});

describe("test guards", () => {
  let game: Game;
  beforeAll(() => {
    const numbers = Game.generateRandomNumbers(2);
    game = new Game(numbers);
  });
  test("decline values not in the inital set", () => {
    const testNumber = 500;
    const allNotTestNumber = game.cards.every((card) => card !== testNumber);
    expect(allNotTestNumber).toEqual(true);

    expect(() =>
      game.cardSelected(testNumber)
    ).toThrowErrorMatchingInlineSnapshot(
      `"This card is not part of the current game."`
    );
  });
  test("decline already solved values", () => {
    const testCard = game.cards[0];
    game.cardSelected(testCard);
    const result = game.cardSelected(testCard);
    expect(result).toEqual(PlayResult.SUCCESS);

    expect(() =>
      game.cardSelected(testCard)
    ).toThrowErrorMatchingInlineSnapshot(
      `"This card has already been solved."`
    );
  });
});

function countPairs(arr: Array<string | number>) {
  let pairs = 0;
  const obj = {};
  arr.forEach((i) => {
    if (obj[i]) {
      pairs += 1;
      obj[i] = 0;
    } else {
      obj[i] = 1;
    }
  });
  return pairs;
}
