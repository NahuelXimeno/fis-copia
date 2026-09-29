import { expect, test, describe } from "vitest";
import { Country } from "../country.ts";
import { CountryList } from "../countrylist.ts";

describe("CountryList class tests", () => {
  test("Create an empty country list", () => {
    const countryList = new CountryList();
    const expectedLength = 0;
    expect(countryList.getCountries().length).toBe(expectedLength);
  });

  test("Add a country to the list", () => {
    const countryList = new CountryList();
    const country = new Country("Uruguay");
    country.capital = "Montevideo";
    countryList.add(country);
    const expectedLength = 1;
    expect(countryList.getCountries().length).toBe(expectedLength);
  });

  test("Add a repeated country to the list", () => {
    const countryList = new CountryList();
    const country = new Country("Uruguay");
    country.capital = "Montevideo";
    countryList.add(country);
    const expectedErrorMessage =
      "No se pudo agregar. Uruguay ya está en la lista.";
    expect(() => countryList.add(country)).toThrow(expectedErrorMessage);
  });
});
