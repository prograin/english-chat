export const parseList = (value) => {
  if (Array.isArray(value)) {
    return value; // already an array
  }
  if (typeof value === "string") {
    return value.split(","); // comma-separated string → array
  }
  return []; // anything else → empty array
};
