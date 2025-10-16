export const REDIS_CHANNELS = {
  user: {
    button: {
      any: {
        clicked: "user:button:clicked",
        double_clicked: "user:button:double-clicked",
      },
    },
  },
  users: {
    presence: {
      updated: "users:presence:updated",
    },
  },
};

export const REDIS_STREAMS = {
  user: {
    profile: "user:profile",
  },
};

export const REDIS_EVENTS = {
  user: {
    profile: {
      updated: "USER_PROFILE_UPDATED",
    },
  },
};

export const KEYS = {
  users: {
    presence: {
      last_active: `users:last_active`,
    },
  },
};

export const PREFIX_KEY = {
  profile: {
    username: {
      key: (value) => `profile:username:${value}`,
    },
  },
  user: {
    chat: {
      requests: {
        key: (sender, reciever) => `user:chat:requests:${sender}_to_${reciever}`,
      },
    },
    data: (value) => `user:${value}`,
    profile: {
      data: (value) => `user:profile:${value}`,
    },
    token: {
      key: (value) => `user:token:${value}`,
    },
    telegram: {
      token: {
        key: (value) => `user:telegram:token:${value}`,
      },
      search: {
        key: (value1, value2) => `user:telegram:search:${value1}:${value2}`,
      },
    },
  },
};
