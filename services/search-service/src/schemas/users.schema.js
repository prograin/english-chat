import Joi from "joi";

export const usersSchema = Joi.object({
  user_id: Joi.number().integer().optional(),
  age: Joi.number().integer().optional(),
  gender: Joi.string().optional().lowercase(),
  career: Joi.string().optional().lowercase(),
  interests: Joi.string().optional().lowercase(),
  country: Joi.string().optional().lowercase(),
  state: Joi.string().optional().lowercase(),
  city: Joi.string().optional().lowercase(),
  location: Joi.object({
    lat: Joi.number().required(),
    lon: Joi.number().required(),
  }).optional(),
  username: Joi.string().optional(),
  last_active: Joi.date().optional(),
});
