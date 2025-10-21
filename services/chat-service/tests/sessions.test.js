import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: ".chat.env" });

const BASE_URL = "http://localhost:3006/chat/sessions";
const TOKEN = process.env.USER_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

async function testSessions() {
  try {
    // const createResp = await axios.post(`${BASE_URL}/me`, { partner_id: 60 }, { headers });
    // console.log("Create Session:", createResp.data);

    // const allResp = await axios.get(`${BASE_URL}/me`, { headers });
    // console.log("All Sessions:", allResp.data);

    // const activeResp = await axios.get(`${BASE_URL}/me?active=true`, { headers });
    // console.log("Active Sessions:", activeResp.data);

    const targetResp = await axios.get(`${BASE_URL}/target/59`, { headers });
    console.log("Session with Partner 2:", targetResp.data);

    const updateResp = await axios.put(`${BASE_URL}/me`, { partner_id: 60, status: "ended" }, { headers });
    console.log("Updated Session:", updateResp.data);
  } catch (error) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
}

testSessions();
