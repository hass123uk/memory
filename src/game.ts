export enum PlayResult {
  SUCCESS = "success",
  FAILURE = "failure",
  PENDING = "pending",
  GAMEOVER = "game-over",
}

type Play = {
  card: number;
  result: PlayResult.PENDING | PlayResult.SUCCESS | PlayResult.FAILURE;
  time: Date;
};

export class Game {
  public static generateRandomNumbers = generateRandomNumbers;
  public readonly initalValues: number[];
  public readonly solvedValues: number[];
  public readonly cards: number[];
  public readonly playHistory: Play[];

  constructor(values: number[]) {
    this.initalValues = values;
    this.solvedValues = [];

    this.cards = this.doubleAndShuffle(values);
    this.playHistory = [];
  }

  public cardSelected(card: number): PlayResult {
    if (!card) throw new Error("Card is not defined.");
    if (this.isCardNotPartGame(card))
      throw new Error("This card is not part of the current game.");
    if (this.isCardSolved(card))
      throw new Error("This card has already been solved.");

    const lastPlay = this.playHistory[this.playHistory.length - 1];
    console.debug("last play", lastPlay);

    let result: PlayResult;
    if (!lastPlay || lastPlay.result !== PlayResult.PENDING) {
      result = PlayResult.PENDING;
    } else {
      result = lastPlay.card === card ? PlayResult.SUCCESS : PlayResult.FAILURE;
    }

    const currentPlay = {
      card,
      result,
      time: new Date(),
    };
    this.playHistory.push(currentPlay);
    console.debug("current play", currentPlay);

    if (result === PlayResult.SUCCESS) {
      this.solvedValues.push(card);
      if (this.isGameEnded()) return PlayResult.GAMEOVER;
    }

    return result;
  }

  private isCardNotPartGame(card: number) {
    return !this.initalValues.includes(card);
  }

  private isCardSolved(card: number) {
    const lengthInInital = this.initalValues.filter(
      (value) => value === card
    ).length;

    const lengthInSolved = this.solvedValues.filter(
      (value) => value === card
    ).length;

    return lengthInSolved === lengthInInital;
  }

  private isGameEnded() {
    return this.solvedValues.length === this.initalValues.length;
  }

  private doubleAndShuffle(values: any[]) {
    const doubled = [...values, ...values];
    const shuffled = doubled.sort(() => Math.random() - 0.5);
    return shuffled;
  }
}

/**
 * @param numberOfNumbers How many random numbers to generate.
 * @param minNumber The min number (inclusive) that can be returned.
 * @param maxNumber The max number (exclusive) that can be returned.
 */
function generateRandomNumbers(
  numberOfNumbers: number,
  minNumber: number = 0,
  maxNumber: number = 101
) {
  const numbers = [];
  while (numbers.length < numberOfNumbers) {
    numbers.push(getFlooredRandom(minNumber, maxNumber));
  }
  return numbers;
}

function getFlooredRandom(min: number, max: number) {
  const arbitraryRandom = Math.random() * (max - min) + min;
  return Math.floor(arbitraryRandom);
}
