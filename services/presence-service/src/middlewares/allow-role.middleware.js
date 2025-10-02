/**
 * Middleware to allow access only to users with specific roles.
 * @param  {...string} roles - Allowed roles, e.g. "admin", "user"
 */
export const allowRole = (...roles) => {
  return (req, res, next) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ message: "Unauthorized: No user found" });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden: Insufficient role" });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
