import { NextFunction } from 'express';
import { db } from '../../../lib/helpers';
import { ApiErrorResponse } from '../../../middleware/error';
import { typeGetPto } from '../validators/validator';

export const getPtoModel = async (data: typeGetPto, next: NextFunction) => {
  try {
    const pto = await db.pto.findFirst({
      where: {
        id: data.id,
      },
    });
    if (!pto) {
      throw new ApiErrorResponse({
        status: 400,
        message: 'Pto does not exist',
      });
    }
    return pto;
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const getAllPtoModel = async (next: NextFunction) => {
  try {
    const pto = await db.pto.findMany({
      include: {
        employee: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
    return pto;
  } catch (err) {
    console.log(err);
    next(err);
  }
};
