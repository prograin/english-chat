import usersSchema from "../../src/schemas/users.schema";

usersSchema.validate(new Object(), {
  allowUnknown: false, //Not allow to fileds is not define like password for response
});
