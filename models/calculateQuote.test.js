import { calculateQuote } from "./calculateQuote";
import { test, expect } from "@jest/globals";

test("Tests the quote price for a new born dog with no discount for breed or no premium for address", () => {
  //arrange
  const expected = 120;

  //act
  const actual = calculateQuote(0, "hound", "gu249bx");

  //assert

  expect(actual).toBe(expected);
});

test("Tests the quote price for a new born dog with discount for breed or premium for address", () => {
  //arrange
  const expected = 108;

  //act
  const actual = calculateQuote(0, "pug", "gu249bx");

  //assert

  expect(actual).toBe(expected);
});
