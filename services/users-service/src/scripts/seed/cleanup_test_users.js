import dotenv from "dotenv";
dotenv.config({ path: "users.env" });

import { deleteUserService } from "../../services/users.service.js";
import { updateProfileByUserIdService } from "../../services/profile.service.js";
import fs from "fs";

const dummyUsersWithProfiles = JSON.parse(fs.readFileSync("../../shared/data/dummy-data.json", "utf-8"));

export async function removeDummyUsers() {
  try {
    // Wrap each user creation in a promise
    const userPromises = dummyUsersWithProfiles.map(async (item) => {
      try {
        await deleteUserService(item.user.id);
      } catch (err) {
        console.error(`Error removing user ${item.id}:`, err);
        return { id: item.id, status: "failed", error: err };
      }
    });

    // Wait for all promises to complete
    const results = await Promise.all(userPromises);

    console.log("All dummy users processed!");
    console.log(results); // shows success/failed for each user
    process.exit(); // exit after script finishes
  } catch (error) {
    console.error("Unexpected error:", error);
    process.exit(1); // exit with error code
  }
}

removeDummyUsers();
