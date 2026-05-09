import { Price } from "./price.ts";

export class Raffle {
  constructor(
    private candidates: string[],
    private prices: Map<string, number>,
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
    while (this.prices.size > 0 && shuffledCandidates.length > 0) {
      const priceNames = [...this.prices.keys()];
      const priceIndex = Math.floor(Math.random() * priceNames.length);
      const priceName = priceNames[priceIndex];
      const priceRemaining = this.prices.get(priceName)!;
      const winner = shuffledCandidates.shift()!;
      priceByWinner.set(winner, priceName);
      if (priceRemaining > 1) {
        this.prices.set(priceName, priceRemaining - 1);
      } else {
        this.prices.delete(priceName);
      }
    }
    return priceByWinner;
  }
}
