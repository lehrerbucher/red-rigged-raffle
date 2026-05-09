import { Price } from "./price.ts";

export class RaffleRun {
  constructor(
    private candidates: string[],
    private prices: Price[],
  ) {}

  public assignPrices(): Map<string, string> {
    const priceByWinner = new Map<string, string>();
    const shuffledCandidates = new Array<string>();
    while (this.candidates.length > 0) {
      const index = Math.floor(Math.random() * this.candidates.length);
      const randomCandidate = this.candidates[index];
      shuffledCandidates.push(randomCandidate);
      this.candidates.pop();
    }
    while (this.prices.length > 0 && shuffledCandidates.length > 0) {
      const price = this.prices[0];
      const winner = shuffledCandidates.shift() || "";
      priceByWinner.set(winner, price.name);
      if (price.units > 0) {
        this.prices.shift();
      } else {
        this.prices[0].units--;
      }
    }
    return priceByWinner;
  }
}
