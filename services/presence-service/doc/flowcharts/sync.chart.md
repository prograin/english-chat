# Presence Service → Users Service Sync Flow

# Pros:

- Separation of concerns: Presence service only tracks cache; Users Service owns DB.<br>
- Users Service can decide how to process, batch, retry.<br>
- Scales well: multiple presence instances can publish triggers safely.<br>

# Cons:

- Users Service must have access to Redis.

---

```mermaid
flowchart TD
    A[Presence Service Scheduler] -->|Pub/Sub: Sync now| B[Users Service]
    B --> C[Fetch latest presence data from Redis]
    C --> D[Update Users DB]
```
