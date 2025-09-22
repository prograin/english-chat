import Joi from "joi";

/**
 * Validate `data` against a Joi schema.
 * @param {Joi.ObjectSchema} schema - Joi validation schema.
 * @param {object} data - Data to validate.
 * @returns {Promise<object>} - The validated value (with any Joi defaults/coercions applied).
 * @throws {Error} - With `status` 400 when validation fails.
 */
const validateUtil = async (schema, data, allowUnknown = false, stripUnknown = false) => {
  const { error, value } = schema.validate(data, { allowUnknown, stripUnknown });
  if (error) {
    const err = new Error("Profile Return Validation Error");
    err.status = 400;
    err.details = error.details;
    throw err;
  }

  Object.keys(value).forEach((key) => {
    if (value[key] === undefined || value[key] === null) {
      delete value[key];
    }
  });

  return value;
};

export default validateUtil;
