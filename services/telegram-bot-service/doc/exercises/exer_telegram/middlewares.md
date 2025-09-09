# middlewaresRunner – Async Middleware Pipeline for Telegram Bot

## Overview

`middlewaresRunner` is a function that allows you to run **multiple middlewares sequentially** before executing a final callback.  
It is inspired by Express.js middleware chaining and works fully with **async functions**.

---

## Code Example

```ts
import TelegramBot, { Message } from "node-telegram-bot-api";

const middlewaresRunner = (
  bot: TelegramBot,
  middlewares: ((msg: Message, next: () => Promise<void>) => Promise<void>)[],
  callback: (bot: TelegramBot, msg: Message) => Promise<void>
) => {
  return async (msg: Message) => {
    let index = -1;

    const next = async () => {
      index++;
      if (index < middlewares.length) {
        await middlewares[index](msg, next); // Run next middleware
      } else {
        await callback(bot, msg); // Final callback after all middlewares
      }
    };

    await next();
  };
};

export default middlewaresRunner;
```
