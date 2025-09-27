import { PROFILE_FIELDS } from "../constants/fields";

export const formatProfileData = (data) =>
  PROFILE_FIELDS.reduce((acc, { name, formatter }) => {
    const raw = data[name];
    if (raw == null) return acc; // skip null / undefined
    acc[name] = formatter ? formatter(raw) : raw;
    return acc;
  }, {});
