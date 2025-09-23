import { INTERESTS, CAREERS } from "./enums.js";

export const PROFILE_FIELDS = [
  { name: "first_name", label: "First Name", type: "text" },
  { name: "last_name", label: "Last Name", type: "text" },
  { name: "age", label: "Age", type: "number" },
  { name: "gender", label: "Gender", type: "select", options: ["male", "female", "other"] },
  { name: "career", label: "Career", type: "select", options: Object.values(CAREERS) },
  {
    name: "interests",
    label: "Interests",
    type: "multi-select",
    options: Object.values(INTERESTS),
  },
  { name: "country", label: "Country", type: "text" },
  { name: "capital", label: "Capital", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
];
