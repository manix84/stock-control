/**
 * @jest-environment jsdom
 */
import fetch from "jest-fetch-mock";
import { get } from "../../lib/backend";

const mockDBase = [
  {
    name: "Shirts",
    manufacturer: "Polo",
    stockLevel: 50,
  },
];
beforeEach(() => {
  fetch.resetMocks();
});

describe("DBase", () => {
  it("Checking DBase collects dbase/stock.json", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockDBase));

    const fetchedDbase = await get();

    expect(JSON.stringify(fetchedDbase)).toMatch(JSON.stringify(mockDBase));
  });
});
