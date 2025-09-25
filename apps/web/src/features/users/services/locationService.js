import countries from "../data/countries.json";
import states from "../data/states.json";
import cities from "../data/cities.json";

export function getCountries() {
  return countries;
}

export function getStates(countryId) {
  return states[countryId] || [];
}

export function getCities(stateId) {
  return cities[stateId] || [];
}
