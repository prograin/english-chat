import { PROFILE_FIELDS } from "../constants/fields";

export const formatInputProfileData = (data) =>
  PROFILE_FIELDS.reduce((acc, { name, inputFormatter }) => {
    if (!Object.keys(data).includes(name)) return acc;

    const raw = data[name];
    acc[name] = inputFormatter ? inputFormatter(raw) : raw;
    return acc;
  }, {});

export const formatOutputProfileData = (data) =>
  PROFILE_FIELDS.reduce((acc, { name, outputFormatter }) => {
    const raw = data[name];
    if (raw === undefined) return acc;
    acc[name] = outputFormatter ? outputFormatter(raw) : raw;
    return acc;
  }, {});
