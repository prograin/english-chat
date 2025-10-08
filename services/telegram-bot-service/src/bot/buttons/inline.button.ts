class InlineName {
  static in_random_chat_n = "Random Chat";
  static in_profile_n = "Profile";
  static in_coin_n = "Coin";
  static in_register_n = "Register";
  static in_edit_n = "Edit";
  static in_search_n = "Search";
  static in_search_boys_n = "Boys";
  static in_search_girls_n = "Girls";
  static in_search_same_country_n = "Same Country";
  static in_search_same_city_n = "Same City";
  static in_search_near_age_n = "Near Age";
  static in_search_near_location_n = "Near Location";
  static in_search_interests_n = "By Interests";
  static in_search_career_n = "By Career";
  static in_search_start_n = "Start Search";
}

export class InlineCallback {
  static in_random_chat_c = "RANDOMCHAT::";
  static in_profile_c = "PROFILE::";
  static in_coin_c = "COIN::";
  static in_register_c = "REGISTER::";
  static in_edit_c = "EDIT::";
  static in_search_c = "SEARCH::";
  static in_search_interests_c = 'SEARCH::{field:"interests",op:"terms"}';
  static in_search_career_c = 'SEARCH::{field:"career",op:"term"}';
  static in_search_boys_c = 'SEARCH::{field:"gender",op:"term",value:"male"}';
  static in_search_girls_c = 'SEARCH::{field:"gender",op:"term",value:"female"}';
  static in_search_same_country_c = 'SEARCH::{field:"country",op:"term"}';
  static in_search_same_city_c = 'SEARCH::{field:"city",op:"term"}';
  static in_search_near_age_c = 'SEARCH::{field:"age",op":""range"}';
  static in_search_near_location_c = "SEARCH::location";
  static in_search_start_c = "SEARCH::start";
}

export class InlineMeta {
  static in_search_interests_m = { value: "interests" };
  static in_search_career_m = { value: "career" };
  static in_search_boys_m = { value: "gender" };
  static in_search_girls_m = { value: "gender" };
  static in_search_same_country_m = { value: "country" };
  static in_search_same_city_m = { value: "city" };
  static in_search_near_age_m = { value: "age" };
  static in_search_near_location_m = { value: "location" };
  static in_search_start_m = { value: "start" };
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
    meta: InlineMeta.in_search_interests_m,
  };

  static in_search_career_b = {
    text: InlineName.in_search_career_n,
    callback_data: InlineCallback.in_search_career_c,
    meta: InlineMeta.in_search_career_m,
  };

  static in_search_boys_b = {
    text: InlineName.in_search_boys_n,
    callback_data: InlineCallback.in_search_boys_c,
    meta: InlineMeta.in_search_boys_m,
  };

  static in_search_girls_b = {
    text: InlineName.in_search_girls_n,
    callback_data: InlineCallback.in_search_girls_c,
    meta: InlineMeta.in_search_girls_m,
  };

  static in_search_same_country_b = {
    text: InlineName.in_search_same_country_n,
    callback_data: InlineCallback.in_search_same_country_c,
    meta: InlineMeta.in_search_same_country_m,
  };

  static in_search_same_city_b = {
    text: InlineName.in_search_same_city_n,
    callback_data: InlineCallback.in_search_same_city_c,
    meta: InlineMeta.in_search_same_city_m,
  };

  static in_search_start_b = {
    text: InlineName.in_search_start_n,
    callback_data: InlineCallback.in_search_start_c,
  };
}
