import { PROFILE_FIELDS } from "../constants/fields";

export const formatProfileData = (data) => {
  const formatted = {};
  PROFILE_FIELDS.forEach((field) => {
    let value = data[field.name] ?? field.default;
    if (field.formatter) value = field.formatter(value);
    formatted[field.name] = value;
  });
  return formatted;
};
