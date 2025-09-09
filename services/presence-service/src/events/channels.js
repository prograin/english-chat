```
[Domain] : [Entity] : [Action]
* Domain → the broad category, e.g., USER, SYNC, ORDER, PAYMENT
* Entity → what object/event this is about, e.g., BUTTON, PRESENCE, STATUS
* Action → what happened, e.g., CLICKED, UPDATED, DELETED
```;

export const CHANNELS = {
  USER: {
    BUTTON: {
      ANY: {
        CLICKED: "user:button:clicked",
        DOUBLE_CLICKED: "user:button:double-clicked",
      },
    },
  },
  SYNC: {
    USERS: {
      PRESENCE: {
        CACHE: "sync:cache:users:presence",
      },
    },
  },
};
