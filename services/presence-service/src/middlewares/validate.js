export const validate = (schema) => {
  return async (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ error: error.details });
    }
    req.validatedBody = value;
    next();
  };
};
