import { NextFunction } from 'express';
import { db } from '../../../lib/helpers';
import { ApiErrorResponse } from '../../../middleware/error';
import { typeUpdatePto } from '../validators/validator';

export const updatePtoModel = async (
  data: typeUpdatePto,
  next: NextFunction
) => {
  try {
    const result = await db.$transaction(async (tx) => {
      const checkExists = await tx.pto.findFirst({
        where: {
          id: data.id,
        },
      });
      if (!checkExists) {
        throw new ApiErrorResponse({
          status: 204,
          message: 'Pto not found',
        });
      }
      const pto = await tx.pto.update({
        where: {
          id: data.id,
        },
        data,
      });
      return pto;
    });
    return result;
  } catch (err) {
    console.log(err);
    next(err);
  }
};
