class InlineName {
  static in_random_chat_n = "Random Chat";
  static in_profile_n = "Profile";
  static in_coin_n = "Coin";
  static in_register_n = "Register";
  static in_edit_n = "Edit";
  static in_search_n = "Search";
  static in_search_interests_n = "By Interests";
  static in_search_career_n = "By Career";
}

class InlineCallback {
  static in_random_chat_c = "RANDOMCHAT::";
  static in_profile_c = "PROFILE::";
  static in_coin_c = "COIN::";
  static in_register_c = "REGISTER::";
  static in_edit_c = "EDIT::";
  static in_search_c = "SEARCH::";
  static in_search_interests_c = "SEARCH::INTERESTS::";
  static in_search_career_c = "SEARCH::CAREER::";
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
}
