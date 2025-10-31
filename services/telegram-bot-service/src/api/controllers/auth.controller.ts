import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";

export const authController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const data = await authService(body);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
