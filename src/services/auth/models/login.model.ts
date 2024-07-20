import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db, getRoleName } from '../../../lib/helpers';
import { ApiErrorResponse } from '../../../middleware/error';
import { typeLogin } from '../validators/validator';
export const loginModel = async (data: typeLogin) => {
  try {
    const foundUser = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!foundUser) {
      throw new ApiErrorResponse({
        status: 404,
        message: 'Email or password is wrong...',
      });
    }
    const match = await bcrypt.compare(data.password, foundUser.password);
    if (!match) {
      throw new ApiErrorResponse({
        status: 404,
        message: 'Email or password is wrong',
      });
    }
    const accessToken = jwt.sign(
      {
        userInfo: {
          email: foundUser.email,
          name: foundUser.name,
          role: getRoleName(foundUser.role),
        },
      },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '10s' }
    );
    const refreshToken = jwt.sign(
      {
        email: foundUser.email,
      },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: '1d' }
    );
    await db.user.update({
      where:{
        email:foundUser.email
      },
      data:{
        refreshToken:refreshToken
      }
    })
    return {
      refreshToken,
      accessToken,
      foundUser,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
