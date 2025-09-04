import usersSchema from "../../src/schemas/users.schema";

usersSchema.validate(req.body, {
  allowUnknown: false, //Not allow to fileds is not define like password for response and raise error if exists
  stripUnknown: true, //Remove fields wich is not in schema
});
