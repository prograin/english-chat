export const CHANNELS = {
  USER: {
    BUTTON: {
      ANY: {
        CLICKED: "user:button:clicked",
        DOUBLE_CLICKED: "user:button:double-clicked",
      },
    },
    ACTION: {
      LOGGED_IN: "user:action:logged-in",
      LOGGED_OUT: "user:action:logged-out",
      PROFILE_UPDATED: "user:action:profile-updated",
    },
    MESSAGE: {
      RECEIVED: "user:message:received",
      SENT: "user:message:sent",
      DELETED: "user:message:deleted",
    },
  },
  SYSTEM: {
    ERROR: {
      OCCURRED: "system:error:occurred",
      RESOLVED: "system:error:resolved",
    },
    NOTIFICATION: {
      SENT: "system:notification:sent",
      RECEIVED: "system:notification:received",
    },
  },
};
