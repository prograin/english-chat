import countries from "../statics/countries_with_label.json";
import states from "../statics/states_by_country.json";
import cities from "../statics/cities_by_state.json";

export function getCountries() {
  return countries;
}

export function getStates(countryId) {
  return states[countryId] || [];
}

export function getCities(stateId) {
  return cities[stateId] || [];
}
