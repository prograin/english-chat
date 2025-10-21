import Joi from "joi";

export const createSessionSchema = Joi.object({
  user_id: Joi.number().optional(),
  partner_id: Joi.number().required(),
  status: Joi.string().optional().valid("active", "ended"),
});

export const updateSessionSchema = Joi.object({
  partner_id: Joi.number().optional(),
  status: Joi.string().valid("active", "ended").required(),
});
