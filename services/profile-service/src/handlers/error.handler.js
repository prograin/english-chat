export const errorHandler = async (error, req, res, next) => {
  const error_status = error.status || 500;
  const error_message = error.messgae || "An unexpected error occurred";

  res.status(error_status).json({ error: error_message });
};
