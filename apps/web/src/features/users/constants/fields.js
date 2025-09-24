import { INTERESTS, CAREERS, GENDERS } from "./enums.js";
import { getCountries } from "../services/locationService.js";

export const PROFILE_FIELDS = [
  { name: "first_name", label: "First Name", type: "text" },
  { name: "last_name", label: "Last Name", type: "text" },
  { name: "age", label: "Age", type: "number" },
  { name: "gender", label: "Gender", type: "select", options: GENDERS },
  { name: "career", label: "Career", type: "select", options: CAREERS },
  {
    name: "interests",
    label: "Interests",
    type: "multi-select",
    options: Object.values(INTERESTS),
  },
  { name: "country", label: "Country", type: "select", options: [] },
  { name: "state", label: "States", type: "select", options: [] },
  { name: "city", label: "City", type: "select", options: [] },
  { name: "description", label: "Description", type: "textarea" },
];
