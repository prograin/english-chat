import dotenv from "dotenv";
dotenv.config({ path: "users.env" });

import { createUserService } from "../../services/users.service.js";
import { updateProfileByUserIdService } from "../../services/profile.service.js";
import fs from "fs";

const dummyUsersWithProfiles = JSON.parse(fs.readFileSync("../../shared/data/dummy-data.json", "utf-8"));

export async function createDummyUsers() {
  try {
    // Wrap each user creation in a promise
    const userPromises = dummyUsersWithProfiles.map(async (item) => {
      try {
        // Create user
        try {
          await createUserService(item.user);
          await updateProfileByUserIdService(item.user.id, item.profile);
        } catch (error) {
          console.log(error);
          if (error.status == 409) {
            await updateProfileByUserIdService(item.id, item.profile);
          }
        }

        return { id: item.id, status: "success" };
      } catch (err) {
        console.error(`Error creating user ${item.id}:`, err);
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

createDummyUsers();
