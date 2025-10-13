export type TelegramSearchData = {
  state: string | null;
  action: string | null;
  page: number;
  selected_fields: string[] | null;
  selected_fields_raw: string[];
};
