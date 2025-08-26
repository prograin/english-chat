import joi from "joi";

const usersTelegramSchema = joi.object({
  id: joi.number().required(),
  username: joi.string().optional().allow(null, ""),
  first_name: joi.string().optional().allow(null, ""),
  last_name: joi.string().optional().allow(null, ""),
  last_active: joi.date().allow(null),
  user_id: joi.number().optional().allow(null),
});

export default usersTelegramSchema;
