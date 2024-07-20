import { NextFunction } from 'express';
import { db } from '../../../lib/helpers';
import { ApiErrorResponse } from '../../../middleware/error';
import { typeDelete } from '../validators/validator';
export const deleteModel = async (data: typeDelete, next: NextFunction) => {
  try {
    const foundUser = await db.user.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!foundUser) {
      throw new ApiErrorResponse({
        status: 404,
        message: 'Username not found',
      });
    }

    const deleted = await db.user.delete({
      where: {
        id: data.id,
      },
    });
    return deleted;
  } catch (err) {
    console.log(err);
    next(err);
  }
};
