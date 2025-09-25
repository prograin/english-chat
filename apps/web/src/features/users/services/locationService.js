import countries from "../assets/data/countries_with_label.json";
import states from "../assets/data/states_by_country.json";
import cities from "../assets/data/cities_by_state.json";

export function getCountries() {
  return countries;
}

export function getStates(countryId) {
  return states[countryId] || [];
}

export function getCities(stateId) {
  return cities[stateId] || [];
}
