export default interface User {
  id?: bigint | null;
  telegram_id?: bigint | null;
  token?: string | null;
  exists: boolean;
  profile?: Record<string, any> | null;
  permissions: { search: string[] | null };
}
