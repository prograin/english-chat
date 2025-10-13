export default interface User {
  id?: bigint | null;
  telegram_id?: bigint | null;
  token?: string | null;
  exists: boolean;
  profile?: object | null;
  permissions: { search: string[] | null };
}
