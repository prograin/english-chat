import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";

export const authController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const data = await authService(body);
    console.log(data);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
