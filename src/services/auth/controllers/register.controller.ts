import { NextFunction, Request, Response } from 'express';
import { registerModel } from '../models';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registerResult = await registerModel(req.body);

    if (registerResult) {
      res.status(200).send({
        message: 'user registered',
        data: registerResult,
      });
    } else {
      res.status(500).send({
        message: 'user registration failed',
        data: registerResult,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
