export function buildProfileRelation(profile: any) {
  const missing = "❓";

  const username = profile.username || missing;
  const firstName = profile.first_name || missing;
  const lastName = profile.last_name || missing;
  const age = profile.age !== undefined ? profile.age : missing;
  const gender = profile.gender || missing;
  const career = profile.career || missing;
  const city = profile.city || missing;
  const state = profile.state || missing;
  const country = profile.country || missing;

  const interestsStr = Array.isArray(profile.interests) && profile.interests.length > 0 ? profile.interests.join(", ") : missing;

  let genderSticker = "⚧";
  if (gender.toLowerCase() === "male") genderSticker = "👨";
  else if (gender.toLowerCase() === "female") genderSticker = "👩";

  // Career sticker
  let careerSticker = "💼";
  if (career.toLowerCase().includes("teacher")) careerSticker = "📚";
  else if (career.toLowerCase().includes("developer")) careerSticker = "💻";

  const profileText = `
━━━━━━━━━━━━━━━━━━━━
👤 <b>${firstName} ${lastName}</b>  ${genderSticker}
🆔 <b>Username:</b> /username_${username}
🎂 <b>Age:</b> ${age}
${careerSticker} <b>Career:</b> ${career}
⭐ <b>Interests:</b> ${interestsStr}
📍 <b>Location:</b> ${city}, ${state}, ${country}
━━━━━━━━━━━━━━━━━━━━

`;

  return profileText;
}
