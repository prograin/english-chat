**_When we return in middle ware it causes callback will never be awaited_**

```ts
if (index < middlewares.length) {
  middlewares[index](msg, response, next);
} else {
  await callback(bot, msg, response);
}
```

```mermaid
flowchart TD

    %% Middlewares Flow
    subgraph Middel Wares
        G[Check Message Has User]
        B[Get User By Telegram Id From Cache]
        I[Return]
        C[Get Users By ID From Users And Refresh Cache]
        D[Get Users By Telegram Id From Users Service]
        E[Set To Cache]
    end

    %% Callback
    subgraph Call Back
        A[Start]
        F[Create New User From Users Service - CB]
        L[Serve Button]
    end

    %% Flow

    G -->|Yes| B
    G -->|No| I
    B -->|Yes| C
    B -->|No| D
    D -->|Yes| E
    D -->|No|A
    C-->A
    E-->A
    A-->|No user existed|F
    A-->|User existed|L
    F-->L

    %% Define class styles
    classDef noteStyle stroke:#333,stroke-width:1px,font-size:12px;

```
