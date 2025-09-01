import joi from "joi";
import { INTERESTS, CAREERS } from "../config/constants.js";

const userResSchema = joi.object({
  telegram_id: joi.number().integer().required(),
  username: joi.string().allow(null).optional(),
  email: joi.string().email().allow(null).optional(),

  first_name: joi.string().optional(),
  last_name: joi.string().optional(),
  age: joi.number().integer().positive().optional(),
  gender: joi.string().valid("male", "female", "other").optional(),

  career: joi
    .string()
    .allow(null)
    .optional()
    .valid(...CAREERS),
  interests: joi
    .array()
    .items(joi.string().valid(...INTERESTS))
    .allow(null)
    .optional(),

  description: joi.string().allow(null).optional(),
  country: joi.string().allow(null).optional(),
  capital: joi.string().allow(null).optional(),
  city: joi.string().allow(null).optional(),

  latitude: joi.number().allow(null).optional(),
  longitude: joi.number().allow(null).optional(),

  last_active: joi.date().allow(null).optional(),
});
