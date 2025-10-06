import { Request, Response, NextFunction } from "express";

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
