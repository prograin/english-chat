import { InlineButton } from "src/bot/buttons/inline.button";

export const ma_main_in = {
  inline_keyboard: [
    [InlineButton.in_profile_b, InlineButton.in_coin_b],
    [InlineButton.in_search_b],
    [InlineButton.in_random_chat_b],
  ],
};

export const ma_profile_in = {
  inline_keyboard: [[InlineButton.in_edit_b]],
};

export const ma_search_in = {
  inline_keyboard: [[InlineButton.in_search_career_b, InlineButton.in_search_interests_b]],
};
