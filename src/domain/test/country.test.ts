import { expect, test, describe } from "vitest";
import { Country } from "../country.ts";

describe("Country class tests", () => {
  test("Create a country", () => {
    const country = new Country("Uruguay");
    const countryName = country.nombre;
    const expectedName = "Uruguay";
    expect(countryName).toBe(expectedName);
  });

  test("Invalid empty country name", () => {
    expect(() => new Country("")).toThrow(
      "Nombre del país no puede ser vacío.",
    );
  });

  test("Trimmed capital string", () => {
    const country = new Country("Uruguay");
    country.capital = "  Montevideo  ";
    expect(country.capital).toBe("Montevideo");
  });

  test("ToString country", () => {
    const country = new Country("Uruguay");
    country.capital = "Montevideo";
    const expectedString = "País: Uruguay - capital: Montevideo";
    expect(country.toString()).toBe(expectedString);
  });
});
