import Joi from "joi";

/**
 * Validate `data` against a Joi schema and optionally strip unknown keys/nulls.
 *
 * @param {Joi.ObjectSchema} schema - Joi validation schema.
 * @param {object} data - Data to validate.
 * @param {boolean} [allowUnknown=false] - Allow unknown keys during validation.
 * @param {boolean} [stripUnknown=false] - Strip unknown keys from the validated value.
 * @param {boolean} [allowNull=false] - If false, remove keys with null/undefined values.
 * @returns {Promise<object>} - The validated and optionally cleaned value.
 * @throws {Error} - Error with `status` 400 when validation fails.
 */
const validateUtil = async (
  schema,
  data,
  allowUnknown = false,
  stripUnknown = false,
  allowNull = false
) => {
  const { error, value } = schema.validate(data, { allowUnknown, stripUnknown });
  if (error) {
    const err = new Error("Profile Return Validation Error");
    err.status = 400;
    err.details = error.details;
    throw err;
  }

  if (!allowNull) {
    Object.keys(value).forEach((key) => {
      if (value[key] === undefined || value[key] === null || value[key] === "") {
        delete value[key];
      }
    });
  }

  return value;
};

export default validateUtil;
