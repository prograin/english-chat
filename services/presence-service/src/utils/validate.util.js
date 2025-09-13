export const validateSchemaUtil = async (schema, data, allowUnknown = false, stripUnknown = false) => {
  const { error, value } = schema.validate(data, {
    allowUnknown,
    stripUnknown,
  });

  if (error) {
    throw new Error(error.details.map((d) => d.message).join(", "));
  }

  return value;
};
