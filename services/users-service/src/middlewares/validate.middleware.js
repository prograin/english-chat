import Joi from "joi";

/**
 * Returns an Express middleware that validates req.body against a Joi schema.
 * @param {Joi.ObjectSchema} schema - Joi object validation schema.
 * @returns {Function} Express middleware
 */
const validateMiddleware = (schema) => {
  return async (req, res, next) => {
    try {
      const body = req.body;
      const { error, value } = schema.validate(body);
      if (error) {
        error.status = 400;
        throw error;
      }

      req.validatedBody = value;
      next();
    } catch (err) {
      err.status = 401;
      next(err);
    }
  };
};

export default validateMiddleware;
