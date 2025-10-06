class InlineName {
  static in_random_chat_n = "Random Chat";
  static in_profile_n = "Profile";
  static in_coin_n = "Coin";
  static in_register_n = "Register";
  static in_edit_n = "Edit";
  static in_search_n = "Search";
  static in_search_only_boys_n = "Only Girls";
  static in_search_only_girls_n = "Only Boys";
  static in_search_same_country_n = "Same Country";
  static in_search_same_city_n = "Same City";
  static in_search_near_age_n = "Near Age";
  static in_search_near_location_n = "Near Location";
  static in_search_interests_n = "By Interests";
  static in_search_career_n = "By Career";
}

export class InlineCallback {
  static in_random_chat_c = "RANDOMCHAT::";
  static in_profile_c = "PROFILE::";
  static in_coin_c = "COIN::";
  static in_register_c = "REGISTER::";
  static in_edit_c = "EDIT::";
  static in_search_c = "SEARCH::";
  static in_search_interests_c = "SEARCH::interests";
  static in_search_career_c = "SEARCH::career";
  static in_search_only_boys_c = "SEARCH::male";
  static in_search_only_girls_c = "SEARCH::female";
  static in_search_same_country_c = "SEARCH::country";
  static in_search_same_city_c = "SEARCH::city";
  static in_search_near_age_c = "SEARCH::age";
  static in_search_near_location_c = "SEARCH::location";
}

export class InlineButton {
  static in_random_chat_b = {
    text: InlineName.in_random_chat_n,
    callback_data: InlineCallback.in_random_chat_c,
  };

  static in_profile_b = {
    text: InlineName.in_profile_n,
    callback_data: InlineCallback.in_profile_c,
  };

  static in_coin_b = {
    text: InlineName.in_coin_n,
    callback_data: InlineCallback.in_coin_c,
  };

  static in_register_b = {
    text: InlineName.in_register_n,
    callback_data: InlineCallback.in_register_c,
  };

  static in_edit_b = {
    text: InlineName.in_edit_n,
    callback_data: InlineCallback.in_edit_c,
    url: "http://192.168.1.10:5173/user/profile",
  };

  static in_search_b = {
    text: InlineName.in_search_n,
    callback_data: InlineCallback.in_search_c,
  };

  static in_search_interests_b = {
    text: InlineName.in_search_interests_n,
    callback_data: InlineCallback.in_search_interests_c,
  };

  static in_search_career_b = {
    text: InlineName.in_search_career_n,
    callback_data: InlineCallback.in_search_career_c,
  };

  static in_search_only_boys_b = {
    text: InlineName.in_search_only_boys_n,
    callback_data: InlineCallback.in_search_only_boys_c,
  };

  static in_search_only_girls_b = {
    text: InlineName.in_search_only_girls_n,
    callback_data: InlineCallback.in_search_only_girls_c,
  };

  static in_search_same_country_boys_b = {
    text: InlineName.in_search_same_country_n,
    callback_data: InlineCallback.in_search_same_country_c,
  };

  static in_search_same_city_b = {
    text: InlineName.in_search_same_city_n,
    callback_data: InlineCallback.in_search_same_city_c,
  };
}
