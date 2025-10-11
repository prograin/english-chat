import dotenv from "dotenv";
dotenv.config({ path: "users.env" });

import { createUserService } from "../../services/users.service.js";
import { dummyUsersWithProfiles } from "../../../../../shared/dummy/users.js";
import { updateProfileByUserIdService } from "../../services/profile.service.js";

export async function createDummyUsers() {
  try {
    for (const item of dummyUsersWithProfiles) {
      // await createUserService({
      //   id: item.id,
      //   telegram_id: item.telegram_id,
      //   username: item.username,
      // });

      await updateProfileByUserIdService(item.id, item.profile);
    }

    console.log("All dummy users and profiles created!");
    process.exit(); // <--- exit after script finishes
  } catch (error) {
    console.error("Error creating dummy users:", error);
    process.exit(1); // <--- exit with error code
  }
}

createDummyUsers();
