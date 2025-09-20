import { Request, Response } from "express";
export const authController = async (req: Request, res: Response, next) => {
  try {
    const body = req.body;
  } catch (error) {
    next(error);
  }
};
