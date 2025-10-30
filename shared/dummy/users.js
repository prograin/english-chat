import { CAREERS } from "../constants/careers.js";
import { INTERESTS } from "../constants/interests.js";

const STATES_CITIES = [
  { state: "Tehran", city: "Tehran", lat: 35.6892, lng: 51.389 },
  { state: "Isfahan", city: "Isfahan", lat: 32.6572, lng: 51.6776 },
  { state: "Shiraz", city: "Shiraz", lat: 29.5918, lng: 52.5836 },
  { state: "Mashhad", city: "Mashhad", lat: 36.2605, lng: 59.6168 },
  { state: "Tabriz", city: "Tabriz", lat: 38.0962, lng: 46.2738 },
  { state: "Markazi", city: "Arak", lat: 34.0918, lng: 49.689 },
];

const FIRST_NAMES = [
  "Ahmadreza",
  "Ali",
  "Reza",
  "Mohammad",
  "Sina",
  "Navid",
  "Amir", // male
  "Sara",
  "Fatemeh",
  "Maryam",
  "Neda",
  "Shirin",
  "Parisa",
  "Leila",
  "Zahra",
  "Elham",
  "Atena",
  "Zyra",
  "Luma",
  "Tara",
  "Kia", // unusual
];

const LAST_NAMES = ["Rezaei", "Mohammadi", "Hosseini", "Karimi", "Ahmadi", "Rahimi", "Najafi", "Taheri", "Farhadi", "Ghasemi"];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomItems(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// 70% Tehran, 30% other cities including Arak
function getRandomLocation() {
  const r = Math.random();
  if (r < 0.7) return STATES_CITIES[0];
  return getRandomItem(STATES_CITIES.slice(1));
}

// Bias towards more females (~65% female)
function getRandomGender() {
  return Math.random() < 0.65 ? "female" : "male";
}

// ~15% users have no last name
function getRandomLastName() {
  return Math.random() < 0.15 ? null : getRandomItem(LAST_NAMES);
}

// Get random career label
function getRandomCareerLabel() {
  return getRandomItem(CAREERS).value;
}

// Get random interest labels
function getRandomInterestValues() {
  const count = Math.floor(Math.random() * 7) + 1; // 1 to 7
  const shuffled = [...INTERESTS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, INTERESTS.length)).map((i) => i.value);
}

export const USERS = Array.from({ length: 70 }, (_, i) => {
  const id = 1001 + i;
  const gender = getRandomGender();

  let firstName;
  if (Math.random() < 0.2) {
    firstName = getRandomItem(FIRST_NAMES.slice(18));
  } else {
    firstName = gender === "male" ? getRandomItem(FIRST_NAMES.slice(0, 7)) : getRandomItem(FIRST_NAMES.slice(7, 18));
  }

  const location = getRandomLocation();

  return {
    user: {
      is_bot: true,
      id,
      telegram_id: id,
      telegram_chat_id: 6608912631,
    },
    profile: {
      username: `user${id}`,
      first_name: firstName,
      last_name: getRandomLastName(),
      age: Math.floor(Math.random() * 30) + 18,
      gender: gender,
      career: getRandomCareerLabel(),
      interests: getRandomInterestValues(), // variable length
      country: "Iran",
      state: location.state,
      city: location.city,
      latitude: location.lat,
      longitude: location.lng,
    },
  };
});

import fs from "fs";

// Ensure the directory exists
const dir = "shared/data";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Path for the JSON file
const filePath = `${dir}/dummy-data.json`;

// Write the USERS array to JSON file
fs.writeFileSync(filePath, JSON.stringify(USERS, null, 2), "utf-8");

console.log(`Saved ${USERS.length} users to ${filePath}`);
