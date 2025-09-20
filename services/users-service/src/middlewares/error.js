// Centralized error handler
export const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.statusCode || 500; // Default to 500 if not set
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
};
