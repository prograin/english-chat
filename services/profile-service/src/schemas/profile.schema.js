import joi from "joi";
import { CAREERS, INTERESTS } from "../config/constants.js";

const schema = {
  id: joi.number().optional(),
  user_id: joi.number(),
  first_name: joi.string().allow(null).optional(),
  last_name: joi.string().allow(null).optional(),
  age: joi.number().integer().positive().optional().allow(null),
  gender: joi.string().valid("male", "female", "other").optional().allow(null),

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
};

export const createProfileSchema = joi.object(schema);
export const responseProfileSchema = joi.object(schema);
export const updateProfileSchema = joi.object(schema);
