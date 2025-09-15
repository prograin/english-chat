import Joi from "joi";

/**
 * Validate `data` against a Joi schema.
 * @param {Joi.ObjectSchema} schema - Joi validation schema.
 * @param {object} data - Data to validate.
 * @returns {Promise<object>} - The validated value (with any Joi defaults/coercions applied).
 * @throws {Error} - With `status` 400 when validation fails.
 */
const validateUtil = async (schema, data) => {
  const { error, value } = schema.validate(data);
  if (error) {
    const err = new Error("Profile Return Validation Error");
    err.status = 400; // 400 Bad Request is typical for validation failures
    err.details = error.details; // optional: include Joi details for debugging
    throw err;
  }
  return value;
};

export default validateUtil;
