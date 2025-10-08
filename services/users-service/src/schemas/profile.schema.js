import joi from "joi";

import { GENDER_VALUES } from "../../../../shared/constants/genders.js";
import { CAREER_VALUES } from "../../../../shared/constants/careers.js";
import { INTEREST_VALUES } from "../../../../shared/constants/interests.js";

const schema = {
  id: joi.number().optional(),
  user_id: joi.number(),
  first_name: joi.string().allow(null, "").optional(),
  last_name: joi.string().allow(null, "").optional(),
  age: joi.number().integer().positive().optional().allow(null),
  gender: joi
    .string()
    .valid(...GENDER_VALUES)
    .optional()
    .allow(null, ""),

  career: joi
    .string()
    .allow(null, "")
    .optional()
    .valid(...CAREER_VALUES),
  interests: joi
    .array()
    .items(joi.string().valid(...INTEREST_VALUES))
    .allow(null)
    .optional(),

  description: joi.string().allow(null).optional(),
  country: joi.string().allow(null).optional(),
  state: joi.string().allow(null).optional(),
  city: joi.string().allow(null).optional(),

  latitude: joi.number().allow(null).optional(),
  longitude: joi.number().allow(null).optional(),
};

export const createProfileSchema = joi.object(schema);
export const responseProfileSchema = joi.object(schema);

const updateSchema = { ...schema };
delete updateSchema.id;
delete updateSchema.user_id;

export const updateProfileSchema = joi.object(updateSchema);
