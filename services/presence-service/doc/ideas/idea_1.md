# 🟢 Presence Service Architecture

این دیاگرام معماری میکروسرویسی رو نشون میده که وظیفه **مدیریت وضعیت آنلاین بودن کاربران** و **ذخیره آخرین زمان آنلاین (Last Seen)** رو داره.  
سرویس تلگرام جداست، و این سرویس فقط وظیفه مدیریت آنلاین بودن و اطلاع‌رسانی به سرویس‌های دیگر رو بر عهده دارد.

---

## **Mermaid Diagram**

```mermaid
flowchart TD
    subgraph TelegramBot["🤖 Telegram Bot Service"]
        T1[User Click / Message]
    end

    subgraph PresenceService["🟢 Presence Service"]
        P1[Receive Activity Event]
        P2[Update Online Status in Redis]
        P3[Update Last Seen in DB]
        P4[Publish Online Event]
    end

    subgraph Redis["⚡ Redis (Cache + Pub/Sub)"]
        R1[(User Online Cache)]
        R2[[Pub/Sub Channel]]
    end

    subgraph Database["🗄️ PostgreSQL"]
        D1[(users_presence Table)]
    end

    subgraph OtherServices["📡 Other Services"]
        S1[Analytics Service]
        S2[Recommendation Service]
    end

    %% Telegram → Presence
    T1 -->|User Clicks| P1

    %% Presence → Redis & DB
    P1 --> P2
    P1 --> P3
    P2 --> R1
    P3 --> D1

    %% Presence → Pub/Sub
    P4 --> R2

    %% Other services subscribe
    R2 --> S1
    R2 --> S2
```
