import { Price } from "./price.ts";

export class RaffleRun {
  constructor(
    private candidates: string[],
    private prices: Price[],
  ) {}

  public run(): Map<string, string> {
    const shuffledCandidates = this.shuffleCandidates();
    return this.assignPrices(shuffledCandidates);
  }

  private shuffleCandidates(): Array<string> {
    const shuffledCandidates = new Array<string>();
    while (this.candidates.length > 0) {
      const index = Math.floor(Math.random() * this.candidates.length);
      const randomCandidate = this.candidates[index];
      if (!shuffledCandidates.includes(randomCandidate)) {
        shuffledCandidates.push(randomCandidate);
      }
      this.candidates.splice(index, 1);
    }
    return shuffledCandidates;
  }

  private assignPrices(shuffledCandidates: Array<string>): Map<string, string> {
    const priceByWinner = new Map<string, string>();
    while (this.prices.length > 0 && shuffledCandidates.length > 0) {
      const price = this.prices.shift()!;
      const winner = shuffledCandidates.shift()!;
      priceByWinner.set(winner, price.name);
      if (price.units > 1) {
        this.prices.push(new Price(price.name, price.units - 1));
      }
    }
    return priceByWinner;
  }
}
