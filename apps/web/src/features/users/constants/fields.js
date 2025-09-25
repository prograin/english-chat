// We can use zoo and "useForm"

import { INTERESTS } from "../../../../../../shared/constants/interests.js";
import { GENDERS } from "../../../../../../shared/constants/genders.js";
import { CAREERS } from "../../../../../../shared/constants/careers.js";

export const PROFILE_FIELDS = [
  {
    name: "first_name",
    label: "First Name",
    type: "text",
    required: true,
    default: "",
    formatter: (v) => v?.trim() || "",
  },
  {
    name: "last_name",
    label: "Last Name",
    type: "text",
    required: true,
    default: "",
    formatter: (v) => v?.trim() || "",
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    required: false,
    default: 0,
    min: 0,
    max: 99,
    formatter: (v) => {
      const num = Number(v);
      if (Number.isNaN(num)) return null;
      if (num === 0) return null;
      if (num < 0) return null;
      if (num > 99) return 99;
      return num;
    },
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    required: true,
    options: GENDERS,
    default: "",
    formatter: (v) => (v === "" ? null : v),
  },
  {
    name: "career",
    label: "Career",
    type: "select",
    required: false,
    options: CAREERS,
    default: "",
    formatter: (v) => (v === "" ? null : v),
  },
  {
    name: "interests",
    label: "Interests",
    type: "multi-select",
    required: false,
    options: INTERESTS,
    default: [],
  },
  {
    name: "country",
    label: "Country",
    type: "select",
    required: true,
    options: [],
    default: "",
    formatter: (v) => (v === "" ? null : v),
  },
  {
    name: "state",
    label: "States",
    type: "select",
    required: true,
    options: [],
    default: "",
    formatter: (v) => (v === "" ? null : v),
  },
  {
    name: "city",
    label: "City",
    type: "select",
    required: true,
    options: [],
    default: "",
    formatter: (v) => (v === "" ? null : v),
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: false,
    default: "",
    formatter: (v) => {
      const t = v?.trim();
      return t === "" ? null : t;
    },
  },
];
