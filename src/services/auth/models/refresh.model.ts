import jwt from 'jsonwebtoken';
import { db, getRoleName } from '../../../lib/helpers';
import { logger } from '../../../lib/logger';
import { ApiErrorResponse } from '../../../middleware/error';
import { typeRefresh } from '../validators/validator';

export const refreshModel = async (data: typeRefresh) => {
  try {
    const cookies = data;

    if (!cookies?.jwt)
      throw new ApiErrorResponse({
        status: 401,
        message: 'Unauthorized: No JWT provided',
      });

    const refreshToken = cookies.jwt;
    const foundUser = await db.user.findFirst({
      where: { refreshToken },
    });

    // Detected refresh token reuse!
    if (!foundUser) {
      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET!
        );

        const hackedUser = await db.user.findFirst({
          where: { email: (decoded as any).email },
        });

        if (hackedUser) {
          await db.user.update({
            where: { id: hackedUser.id },
            data: { refreshToken: null },
          });
          throw new ApiErrorResponse({
            status: 403,
            message: 'Forbidden: Invalid token',
          });
        }
      } catch (err) {
        console.log(err);
        
      }
     return
    }

    // Evaluate JWT
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as jwt.JwtPayload & { email: string };

    if (foundUser.email !== decoded.email) {
      await db.user.update({
        where: { id: foundUser.id },
        data: { refreshToken },
      });
      throw new ApiErrorResponse({
        status: 403,
        message: 'Forbidden: Invalid token',
      });
    }

    // Refresh token was still valid
    const role = getRoleName(foundUser.role);
    const newRefreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: '1d' }
    );

    // Saving refreshToken with current user
    await db.user.update({
      where: { id: foundUser.id },
      data: { refreshToken: newRefreshToken },
    });

    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          role: role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '10s' }
    );

    return { accessToken, newRefreshToken };
  } catch (err) {
    logger.error(err);
    throw err;
  }
};
