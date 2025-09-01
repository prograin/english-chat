import joi from "joi";
import { INTERESTS, CAREERS } from "../config/constants.js";

const schema = {
  telegram_id: joi.number().integer().required(),

  username: joi.string().allow(null).optional(),
  email: joi.string().email().allow(null).optional(),
  password: joi.string().min(6).allow(null).optional(),

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

  last_active: joi.date().allow(null).optional(),
};

// Create schema for creation/updating
const usersSchema = joi.object(schema);

// Create response schema by cloning and removing password
const responseSchemaObj = { ...schema };
delete responseSchemaObj.password;
export const usersResponseSchema = joi.object(responseSchemaObj);

export default usersSchema;
