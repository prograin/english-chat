## 2. File Naming Patterns

| Type                | Pattern / Example                                      |
| ------------------- | ------------------------------------------------------ |
| Config files        | `redis.config.ts`, `db.config.ts`                      |
| Types / Interfaces  | `user.types.ts`, `auth-payload.types.ts`               |
| Utilities / Helpers | `date-utils.ts`, `string-utils.ts`, `logger.ts`        |
| Services            | `user.service.ts`, `auth.service.ts`                   |
| Controllers         | `user.controller.ts`, `auth.controller.ts`             |
| Routes              | `user.routes.ts`, `auth.routes.ts`                     |
| Middlewares         | `auth-middleware.ts`, `validate-request-middleware.ts` |
| Event Channels      | `user-button-clicked.ts`                               |
| Publishers          | `user-button-clicked-publisher.ts`                     |
| Subscribers         | `user-button-clicked-subscriber.ts`                    |
| Scheduled Tasks     | `user-last-active-sync.ts`                             |
| Tests               | `user.service.spec.ts`, `auth.controller.spec.ts`      |

---

## 2. File Naming Patterns

| Type                | Pattern                                 | Folder                | Purpose / Usage                                          |
| ------------------- | --------------------------------------- | --------------------- | -------------------------------------------------------- |
| Config files        | `<entity>-<config>.cfg.ts`              | `config/`             | Store environment/configuration data                     |
| Types / Interfaces  | `<entity>-<action>-event.type.ts`       | `types/`              | Define TypeScript types/interfaces, e.g., event payloads |
| Utilities / Helpers | `<entity>-<action>.util.ts`             | `utils/`              | Reusable helper functions and utilities                  |
| Services            | `<entity>-<action>.service.ts`          | `services/`           | Business logic of the app                                |
| Controllers         | `<entity>-<action>.controller.ts`       | `controllers/`        | API request handlers and route logic                     |
| Routes              | `<entity>-<action>.routes.ts`           | `routes/`             | Define routes and link to controllers                    |
| Middlewares         | `<entity>-<action>.middleware.ts`       | `middlewares/`        | Pre-processing requests (auth, validation, logging)      |
| Event Channels      | `<entity>-<action>-event.ts`            | `events/`             | Define event constants / channel names                   |
| Publishers          | `<entity>-<action>-event.publisher.ts`  | `events/publishers/`  | Publish events to bus / queue                            |
| Subscribers         | `<entity>-<action>-event.subscriber.ts` | `events/subscribers/` | Listen and react to events                               |
| Scheduled Tasks     | `<entity>-<action>-task.ts`             | `tasks/`              | Cron jobs or data sync tasks                             |
| Tests               | `<entity>-<action>.spec.ts`             | `tests/`              | Unit and integration tests                               |
| Channels            | `<domain> <entity> <action>`            | `events/channels/`    | Unit and integration tests                               |

---
