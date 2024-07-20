import bcrypt from 'bcrypt';
import { db, getRoleValue } from '../../../lib/helpers';
import { logger } from '../../../lib/logger';
import { ApiErrorResponse } from '../../../middleware/error';
import { typeRegister } from '../validators/validator';
export const registerModel = async (data: typeRegister) => {
  try {
    const hash = await bcrypt.hash(data.password, 10);
    const userCheck = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (userCheck) {
      throw new ApiErrorResponse({
        status: 404,
        message: 'Email already exists',
      });
    }
    const user = await db.user.create({
      data: {
        email: data.email,
        name: data.name,
        role: getRoleValue(data.role),
        password: hash,
      },
    });
    const { password, ...createdUser } = user;
    return createdUser;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};
