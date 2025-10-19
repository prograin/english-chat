import joi from "joi";

export const createSchema = JOI.object({
  user_id: joi.number().required(),
  block_user_id: joi.number().required(),
});
