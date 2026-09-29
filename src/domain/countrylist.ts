import { Country } from "./country.ts";

export class CountryList {
  #countries: Country[] = [];

  add(country: Country): void {
    const countryInList = this.#countries.some(
      (existingCountry) => existingCountry.nombre === country.nombre,
    );
    if (!countryInList) {
      this.#countries.push(country);
    } else {
      throw new Error(
        `No se pudo agregar. ${country.nombre} ya está en la lista.`,
      );
    }
  }

  getCountries(): readonly Country[] {
    return [...this.#countries];
  }
}
