import { Op } from "sequelize";
import axios from "axios";
import usersModel from "../models/users.model.js";
import dotenv from "dotenv";

dotenv.config({ path: ".users.env" });

const data = await usersModel.findAll({
  attributes: ["id"],
  where: {
    id: { [Op.notIn]: [59, 60] },
  },
});

const ids = data.map((u) => u.dataValues.id);

for (const id of ids) {
  try {
    await axios.delete(`http://localhost:3004/users/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
      },
    });
    console.log(`Deleted user ${id}`);
  } catch (err) {
    console.error(`Failed to delete user ${id}:`, err);
  }
}
