import { Country } from "../domain/country.ts";
import { CountryList } from "../domain/countrylist.ts";

const btnAdd = document.getElementById("btn-add") as HTMLButtonElement | null;
const inpName = document.getElementById("inp-name") as HTMLInputElement | null;
const inpCapital = document.getElementById(
  "inp-capital",
) as HTMLInputElement | null;

const mainCountryList = new CountryList();

if (btnAdd && inpName && inpCapital) {
  btnAdd.addEventListener("click", () => {
    const countriesErrorContainer = document.getElementById(
      "add-countries-error",
    );
    const countriesError = document.getElementById("add-countries-error-msg");
    try {
      const newCountry = new Country(inpName.value);
      newCountry.capital = inpCapital.value;
      mainCountryList.add(newCountry);
      clearInputs(inpName, inpCapital);
      countriesErrorContainer?.classList.add("d-none");
      loadCountryList(newCountry);
      appendAlert(`${newCountry.nombre} agregado correctamente!`, "success");
    } catch (error) {
      countriesErrorContainer?.classList.remove("d-none");
      if (countriesError) {
        if (error instanceof Error) {
          countriesError.innerText = error.message;
        } else {
          countriesError.innerText = String(error);
        }
      }
    }
  });

  inpCapital.addEventListener("keypress", function (event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      btnAdd.click();
    }
  });
}

function clearInputs(
  inpNameEl: HTMLInputElement,
  inpCapitalEl: HTMLInputElement,
) {
  inpNameEl.value = "";
  inpCapitalEl.value = "";
}

function loadCountryList(newCountry: Country) {
  const countriesList = document.getElementById("countries-list");
  const countriesContainer = document.getElementById("countries");
  const emptyList = document.getElementById("empty-list");

  emptyList?.classList.add("d-none");
  countriesContainer?.classList.remove("d-none");
  if (countriesList) {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerText = newCountry.toString();
    countriesList.appendChild(li);
  }
}

const alertPlaceholder = document.getElementById("alerts");
const appendAlert = (message: string, type: "success" | "danger") => {
  if (!alertPlaceholder) return;
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible pe-4" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
};
