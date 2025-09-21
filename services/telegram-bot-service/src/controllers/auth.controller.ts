import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";

export const authController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const token = await authService(body);
    return token;
  } catch (error) {
    next(error);
  }
};
