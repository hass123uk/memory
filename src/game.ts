export enum PlayResult {
  SUCCESS = "success",
  FAILURE = "failure",
  PENDING = "pending",
  GAMEOVER = "game-over",
}

type Play = {
  card: number;
  result: PlayResult.PENDING | PlayResult.SUCCESS | PlayResult.FAILURE;
};

export class Game {
  public static generateNumberCards = generateNumberCards;
  public readonly cards: number[];
  public readonly matchedCards: number[];
  public readonly playHistory: Play[];

  constructor(cards: number[]) {
    console.debug("New game", cards);

    this.cards = cards;
    this.matchedCards = [];
    this.playHistory = [];
  }

  public cardSelected(card: number): PlayResult {
    console.debug("card selected", card);

    const lastPlay = this.playHistory[this.playHistory.length - 1];
    console.debug("last play", lastPlay);

    let result: PlayResult;
    if (!lastPlay || lastPlay.result !== PlayResult.PENDING) {
      result = PlayResult.PENDING;
    } else {
      result = lastPlay.card === card ? PlayResult.SUCCESS : PlayResult.FAILURE;
    }

    console.debug("play result", result);
    this.playHistory.push({
      card,
      result,
    });

    if (result === PlayResult.SUCCESS) {
      this.matchedCards.push(card);
      if (this.isGameEnded()) return PlayResult.GAMEOVER;
    }

    return result;
  }

  private isGameEnded() {
    return this.matchedCards.length === this.cards.length / 2;
  }
}

/**
 * @param numberOfPairs How many card pairs are generated i.e. there will be double this number in cards.
 * @param minNumber The min number (inclusive) that can be returned.
 * @param maxNumber The max number (exclusive) that can be returned.
 */
function generateNumberCards(
  numberOfPairs: number,
  minNumber: number = 0,
  maxNumber: number = 101
) {
  const numbers = [];
  while (numbers.length < numberOfPairs) {
    numbers.push(getFlooredRandom(minNumber, maxNumber));
  }
  return doubleAndShuffle(numbers);
}

function getFlooredRandom(min: number, max: number) {
  const arbitraryRandom = Math.random() * (max - min) + min;
  return Math.floor(arbitraryRandom);
}

function doubleAndShuffle(values: any[]) {
  const doubled = [...values, ...values];
  const shuffled = doubled.sort(() => Math.random() - 0.5);
  return shuffled;
}

export function countPairs(arr: Array<string | number>) {
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
