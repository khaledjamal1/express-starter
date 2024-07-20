import { db } from '../../../lib/helpers';
import { ApiErrorResponse } from '../../../middleware/error';
import { typeDeletePto } from '../validators/validator';

export const deletePtoModel = async (data: typeDeletePto) => {
  try {
    const pto = await db.pto.findFirst({
      where: {
        id: +data.id,
      },
      include: {
        employee: {
          select: {
            id: true,
            remainingPto: true,
          },
        },
      },
    });

    if (!pto || !pto.employee) {
      throw new ApiErrorResponse({
        status: 404,
        message: 'PTO record or employee not found',
      });
    }

    const result = await db.$transaction(async (tx) => {
      await tx.employee.update({
        where: {
          id: pto.employee.id,
        },
        data: {
          remainingPto: pto.employee.remainingPto + 1,
        },
      });

      const deletedPto = await tx.pto.delete({
        where: {
          id: +data.id,
        },
      });

      return deletedPto;
    });

    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
