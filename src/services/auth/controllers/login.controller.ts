import { NextFunction, Request, Response } from 'express';
import { loginModel } from '../models';

export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createdResult = await loginModel(req.body);

    if (createdResult) {
      res.cookie('jwt', createdResult.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV! !== 'development',
        sameSite: process.env.NODE_ENV! === 'production' ? 'none' : undefined,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        // maxAge: 10000,
      });
      res.status(200).json({
        accessToken: createdResult.accessToken,
        user: createdResult.foundUser,
      });
    } else {
      res.status(500).send({
        message: 'Login failed',
        data: createdResult,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
