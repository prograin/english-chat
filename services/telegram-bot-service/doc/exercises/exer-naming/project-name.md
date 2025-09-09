✅ Summary of Naming Patterns in Your Project

| File Type  | Naming Pattern                         | Folder         |
| ---------- | -------------------------------------- | -------------- |
| Type       | `<entity>-<action>-event.type.ts`      | `types/`       |
| Publisher  | `<entity>-<action>-event.publisher.ts` | `publishers/`  |
| Middleware | `<entity>-<action>.middleware.ts`      | `middlewares/` |

✅ Use past tense (clicked) for events. Use present tense (click) only for function/method names that perform the action.

| Context                    | Naming Example | Why                                     |
| -------------------------- | -------------- | --------------------------------------- |
| Event (already happened)   | `CLICKED`      | Past tense → action **has occurred**    |
| Function (performs action) | `click()`      | Present tense → action **is performed** |
