export function raffle(
  candidates: Array<string>,
  prices: Map<string, number>,
): Map<string, string> {
  const shuffled = shuffle(candidates);
  return assignPrices(shuffled, prices);
}

function shuffle(originalItems: Array<string>): Array<string> {
  const shuffled = new Array<string>();
  const items = [...originalItems];
  while (items.length > 0) {
    const index = Math.floor(Math.random() * items.length);
    const randomItem = items[index];
    if (!shuffled.includes(randomItem)) {
      shuffled.push(randomItem);
    }
    items.splice(index, 1);
  }
  return shuffled;
}

function assignPrices(
  shuffledCandidates: Array<string>,
  originalPrices: Map<string, number>,
): Map<string, string> {
  const prices = new Map<string, number>();
  for (const [name, n] of originalPrices) {
    prices.set(name, n);
  }
  const priceByWinner = new Map<string, string>();
  while (prices.size > 0 && shuffledCandidates.length > 0) {
    const priceNames = [...prices.keys()];
    const priceIndex = Math.floor(Math.random() * priceNames.length);
    const priceName = priceNames[priceIndex];
    const priceRemaining = prices.get(priceName)!;
    const winner = shuffledCandidates.shift()!;
    priceByWinner.set(winner, priceName);
    if (priceRemaining > 1) {
      prices.set(priceName, priceRemaining - 1);
    } else {
      prices.delete(priceName);
    }
  }
  return priceByWinner;
}
