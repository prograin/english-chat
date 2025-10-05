import countries from "../data/countries.json";
import states from "../data/states.json";
import cities from "../data/cities.json";

import { flattenObject } from "../utils/object";

export function getCountries() {
  return countries;
}

export function getStates(countryId) {
  return states[countryId] || [];
}

export function getCities(stateId) {
  return cities[stateId] || [];
}

export function getCityBySource(source, value) {
  const allCities = flattenObject(cities);
  return findBySource(allCities, source, value);
}

export function getStateBySource(source, value) {
  const allStates = flattenObject(states);
  return findBySource(allStates, source, value);
}

export function getCountryBySource(source, value) {
  const allCountries = countries.flat();
  return findBySource(allCountries, source, value);
}

function findBySource(list, source, value) {
  if (source == "value") {
    return (list.find((item) => item[source] == value) || {}).label || null;
  } else if (source == "label") {
    return (list.find((item) => item[source] == value) || {}).value || null;
  }
}
