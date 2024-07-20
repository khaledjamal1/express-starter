import { Request, Response } from 'express';
import { db } from '../../../lib/helpers';
import { ApiErrorResponse } from '../../../middleware/error';

export const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  console.log(cookies);

  if (!cookies?.jwt)
    throw new ApiErrorResponse({ status: 204, message: 'no content' }); // No content
  const refreshToken = cookies.jwt;
  // Is refreshToken in db?
  const foundUser = await db.user.findFirst({
    where: {
      refreshToken,
    },
  });

  if (!foundUser) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: process.env.NODE_ENV! === 'production' ? 'none' : undefined,
      secure: process.env.NODE_ENV! !== 'development',
    });
    throw new ApiErrorResponse({ status: 204, message: 'no content' });
  }

  // Delete refreshToken in db
  await db.user.update({
    where: {
      id: foundUser.id,
    },
    data: {
      refreshToken: null,
    },
  });

  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: process.env.NODE_ENV! === 'production' ? 'none' : undefined,
    secure: process.env.NODE_ENV! !== 'development',
  });
};
