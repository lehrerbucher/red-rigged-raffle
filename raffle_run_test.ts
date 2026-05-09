import { assert, assertEquals, assertNotEquals } from "@std/assert";
import { Price } from "./price.ts";
import { RaffleRun } from "./raffle_run.ts";

Deno.test("the single price is assigned to the candidate", () => {
  // Arrange
  const candidates = ["@Alice"];
  const prices = [new Price("iPhone", 1)];

  // Act
  const winners = new RaffleRun(candidates, prices).run();

  // Assert
  assertEquals(winners.get("@Alice"), "iPhone");
});

Deno.test("the two prices are assigned to the candidates", () => {
  // Arrange
  const candidates = ["@Alice", "@Bob"];
  const prices = [new Price("iPhone", 1), new Price("Shoes", 1)];

  // Act
  const winners = new RaffleRun(candidates, prices).run();

  // Assert
  assertEquals(winners.size, 2);
  assert(winners.has("@Alice"));
  assert(winners.has("@Bob"));
  assert(["iPhone", "Shoes"].includes(winners.get("@Alice")!));
  assert(["iPhone", "Shoes"].includes(winners.get("@Bob")!));
  assertNotEquals(winners.get("@Alice"), winners.get("@Bob"));
});

Deno.test("test multiple prices are assigned to different candidates", () => {
  // Arrange
  const candidates = [
    "@Alice",
    "@Bob",
    "@Claire",
    "@Danny",
    "@Erica",
    "@Freddy",
    "@Georgina",
    "@Alice",
    "@Alice",
    "@Alice",
    "@Alice",
    "@Alice",
    "@Alice",
    "@Alice",
    "@Alice",
    "@Alice",
    "@Alice",
  ];
  const prices = [
    new Price("iPhone", 3),
    new Price("Shoes", 2),
    new Price("Hammer", 1),
  ];

  // Act
  const winners = new RaffleRun(candidates, prices).run();

  // Assert
  assertEquals(winners.size, 6);
  assertEquals([...winners.values().filter(s => s == "iPhone")].length, 3);
  assertEquals([...winners.values().filter(s => s == "Shoes")].length, 2);
  assertEquals([...winners.values().filter(s => s == "Hammer")].length, 1);
});
