export default function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ errors: error.details });
    }
    req.validatedBody = value; // store validated input
    next();
  };
}
