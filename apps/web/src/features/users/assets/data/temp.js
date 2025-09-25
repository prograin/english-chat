import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const countryFile = path.join(__dirname, "countries_all_info.json");
const stateFile = path.join(__dirname, "states.json");
const citiesFile = path.join(__dirname, "cities.json");
const statesOutputFile = path.join(__dirname, "states_by_country.json");
const citiesOutputFile = path.join(__dirname, "cities_by_state.json");
const countriesOutputFile = path.join(__dirname, "countries_with_label.json");

// Read JSON
const countriesData = JSON.parse(fs.readFileSync(countryFile, "utf-8"));
const statesData = JSON.parse(fs.readFileSync(stateFile, "utf-8"));
const citiesData = JSON.parse(fs.readFileSync(citiesFile, "utf-8"));

const countries_target = [1, 103, 225, 179, 12, 101, 45, 116];

// Transform countries to include `value` and `label`
const filteredCountries = countriesData
  .filter((c) => countries_target.includes(c.id))
  .map((c) => ({
    value: c.id,
    label: c.name,
  }));

// Filter states by target countries
const filteredStates = statesData
  .filter((state) => countries_target.includes(state.country_id))
  .map((state) => ({ id: state.id, name: state.name, country_id: state.country_id }));

// Filter cities that belong to the filtered states
const filteredCities = citiesData
  .filter((city) => filteredStates.some((s) => s.id === city.state_id))
  .map((city) => ({ id: city.id, name: city.name, state_id: city.state_id }));

// Group states by country
const statesByCountry = {};
countries_target.forEach((countryId) => {
  statesByCountry[countryId] = filteredStates
    .filter((s) => s.country_id === countryId)
    .map(({ id, name }) => ({ value: id, label: name }));
});

// Group cities by state
const citiesByState = {};
filteredStates.forEach((state) => {
  citiesByState[state.id] = filteredCities
    .filter((c) => c.state_id === state.id)
    .map(({ id, name }) => ({ value: id, label: name }));
});

// Save outputs
fs.writeFileSync(statesOutputFile, JSON.stringify(statesByCountry, null, 2));
fs.writeFileSync(citiesOutputFile, JSON.stringify(citiesByState, null, 2));
fs.writeFileSync(countriesOutputFile, JSON.stringify(filteredCountries, null, 2));

console.log("Saved states by country to", statesOutputFile);
console.log("Saved cities by state to", citiesOutputFile);
console.log("Saved countries with label to", countriesOutputFile);
