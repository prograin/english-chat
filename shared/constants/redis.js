export const REDIS_CHANNELS = {
  user: {
    token: "user:token",
    telegram: {
      token: "user:telegram:token",
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
