import { InlineButton, InlineCallback } from "src/bot/buttons/inline.button";

export const ma_search_base_in = [
  [InlineButton.in_search_boys_b, InlineButton.in_search_girls_b],
  [InlineButton.in_search_career_b, InlineButton.in_search_interests_b],
  [InlineButton.in_search_same_country_b, InlineButton.in_search_same_city_b],
];

export const fix_ma_search_base_in = [[InlineButton.in_search_start_b]];

export const ma_search_start_all_in = [[InlineButton.in_search_previous_page_b, InlineButton.in_search_next_page_b]];
export const ma_search_start_next_in = [[InlineButton.in_search_next_page_b]];
export const ma_search_start_previous_in = [[InlineButton.in_search_previous_page_b]];

export const ma_search_profile_in = (toUserId: string) => {
  return [
    [
      {
        text: InlineButton.in_chat_send_request_b.text,
        callback_data: InlineButton.in_chat_send_request_b.callback_data.replace("{userId}", toUserId),
      },
      {
        text: InlineButton.in_contact_add_b.text,
        callback_data: InlineButton.in_contact_add_b.callback_data.replace("{userId}", toUserId),
      },
    ],
  ];
};
