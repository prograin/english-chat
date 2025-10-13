import { QueryFilter } from "./search.type";

export function buildUserSearchMessage(user: any) {
  const username = user.username || "Unknown";
  const firstName = user.first_name || "Not provided";
  const age = user.age ? `${user.age} years old` : "Not provided";
  const state = user.state || "Not provided";
  const city = user.city || "Not provided";
  const country = user.country || "Not provided";
  const gender = user.gender || "Not provided";
  const lastActive = user.last_active || "Unknown";
  const career = user.career || "Not provided";
  const interests = Array.isArray(user.interests) ? user.interests.join(", ") : "Not provided";

  const genderSticker = gender.toLowerCase() === "female" ? "🙍‍♀️" : gender.toLowerCase() === "male" ? "🙍‍♂️" : "❓";

  const location = [country, state, city].filter(Boolean).join(", ");

  return `🔗 <b>Username:</b> /username_${username} ${genderSticker} ${gender}
<pre>
<b>Name</b>       : <b>${firstName} ${age}</b>
<b>Location</b>   : <b>${location}</b>
<b>Career</b>     : <b>${career}</b>
<b>Interests</b>  : <b>${interests}</b>
<b>Last Seen</b>  : <b>${lastActive}</b>
</pre>\n
`;
}

export function buildSearchQueryOptions(selectedFields: string[] | null, userProfile: Record<string, any> | any) {
  const mustClauses = [];

  for (const fieldData of selectedFields || []) {
    const f: QueryFilter = JSON.parse(fieldData) as QueryFilter;
    if (["term", "terms"].includes(f.op)) {
      mustClauses.push({ [f.op]: { [f.field]: f.value ?? userProfile[f.field] } });
    } else if (["gt", "gte", "lt", "lte", "eq"].includes(f.op)) {
      if (f.op === "eq") {
        mustClauses.push({ term: { [f.field]: f.value ?? userProfile[f.field] } });
      } else {
        mustClauses.push({ range: { [f.field]: { [f.op]: f.value ?? userProfile[f.field] } } });
      }
    } else {
      return { error: `Unsupported operator: ${f.op}` };
    }
  }
  const query = { bool: { must: mustClauses } };
  return query;
}
