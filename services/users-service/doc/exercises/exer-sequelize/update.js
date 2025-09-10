import { Op, where } from "sequelize";
import usersModel from "../../../src/models/users.model";

`
User.update() expects one object, not an array.
`;

usersModel.update(
  {
    column: new_value,
  },
  {
    where: { id: id_value },
  }
);

// ---------------------------

const user = usersModel.findOne({ where: { column: value } });
user.column = 10;

user.save();

// ------------------------------
// Multi Update

const updates = [
  { id: 1, value1: 4 },
  { id: 2, value1: 6 },
];

for (const item of updates) {
  await usersModel.update(item, { where: { id: item.id } });
}
