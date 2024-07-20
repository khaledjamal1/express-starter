import { NextFunction, Request, Response } from 'express';
import { refreshModel } from '../models';

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getResult = await refreshModel(req.cookies as { jwt: string });

    if (getResult) {
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: process.env.NODE_ENV! === 'production' ? 'none' : undefined,
        secure: process.env.NODE_ENV! !== 'development',
      });
      res.cookie('jwt', getResult.newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV! !== 'development',
        sameSite: process.env.NODE_ENV! === 'production' ? 'none' : undefined,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        accessToken: getResult.accessToken,
      });
    } else {
      res.status(401).send({
        message: 'Error',
        data: getResult,
      });
    }
  } catch (error) {
    throw error;
  }
};
