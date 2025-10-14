import joi from "joi";

const schema = {
  id: joi.number().optional(),
  telegram_id: joi.number().integer().required(),

  email: joi.string().email().allow(null).optional(),
  password: joi.string().min(6).allow(null).optional(),
};

const usersSchema = joi.object(schema);

const responseSchemaObj = { ...schema };
delete responseSchemaObj.password;

export const usersResponseSchema = joi.object(responseSchemaObj);

export default usersSchema;
