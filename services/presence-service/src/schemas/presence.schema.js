import Joi from "joi";

const baseSchema = {
  id: Joi.number().optional(),
  user_id: Joi.number().integer().required(),
  last_active: Joi.date(),
  status: Joi.bool().default(false),
};

// CREATE schema
export const createPresencesSchema = Joi.object({
  user_id: baseSchema.user_id,
  last_active: baseSchema.last_active.optional(),
  status: baseSchema.status.optional(),
});

// UPDATE schema
export const updatePresencesSchema = Joi.object({
  user_id: baseSchema.user_id,
  last_active: baseSchema.last_active.required(),
  status: baseSchema.status.optional(),
});

export const responsePresencesSchema = Joi.object({
  user_id: baseSchema.user_id,
  last_active: baseSchema.last_active.required(),
  status: baseSchema.status.optional(),
});
