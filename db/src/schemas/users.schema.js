import joi from "joi";

const usersSchema = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  age: joi.number().integer().positive().optional().allow(null),
  gender: joi.string().required().valid("male", "female", "other"),
  country: joi.string().allow(null, "").optional(),
  capital: joi.string().allow(null, "").optional(),
  city: joi.string().allow(null, "").optional(),
  latitude: joi.number().allow(null).optional(),
  longitude: joi.number().allow(null).optional(),
});

export default usersSchema;
