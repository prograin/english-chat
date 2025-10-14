const now = new Date();

export const search_text = "Which type of search do you desire to search for you?";
export const profile_not_found = "Profile not found";
export const need_complete_profile = "Please complete and update your profile before searching using different fields.";
export const search_base = "Select the fields you want to search by, then click Start to begin the search.";
export const no_search_found_text = "No results found for your search.";
export const search_start_text = `<i>Search performed on ${now.toLocaleDateString("en-US")} ${now.toLocaleTimeString("en-US")}</i>`;
export const profile_not_found_text = (username: string) => `User by this (${username}) username is not found`;
