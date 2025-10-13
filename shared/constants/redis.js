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
        key: (value) => `user:telegram:search:${value}`,
      },
    },
  },
};
