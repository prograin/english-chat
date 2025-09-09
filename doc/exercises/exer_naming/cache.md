```ts
<action><Entity><Purpose>
<set><User><LastActive>

export class UserCacheService {
  static async setUserLastActive(userId: string | number, timestamp: number) { }
  static async getUserLastActive(userId: string | number) { }
  static async getUsersLastActive(userIds: Array<string | number>) { }
  static async removeUser(userId: string | number) { }
  static async incrementUserCounter(userId: string | number, counterKey: string) { }
  static async getAllUsers() { }
}
```
