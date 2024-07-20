import { NextFunction } from 'express';
import { db } from '../../../lib/helpers';
import { ApiErrorResponse } from '../../../middleware/error';
import { typeCreateManyPto, typeCreatePto } from '../validators/validator';

export const createPtoModel = async (
  data: typeCreatePto,
) => {
  try {
    const emp = await db.employee.findFirst({
      where: {
        id: data.employeeId,
      },
    });
    if (!emp) {
      throw new ApiErrorResponse({
        status: 500,
        message: 'Employee not found',
      });
    }
    if (emp.remainingPto === 0) {
      throw new ApiErrorResponse({
        status: 405,
        message: 'Employee is out of PTO',
      });
    }
    const result = await db.$transaction(async (tx) => {
      const newPto = await db.pto.create({
        data,
      });
      await tx.employee.update({
        where: {
          id: data.employeeId,
        },
        data: {
          remainingPto: emp.remainingPto - 1,
        },
      });
      return newPto;
    });
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const createManyPtoModel = async (
  data: typeCreateManyPto,
  next: NextFunction
) => {
  const dataArray = data.employeeIds.map((id) => {
    return {
      date: data.date,
      shift: data.shift,
      employeeId: id,
    };
  });
  try {
    const pto = await db.pto.createMany({
      data: dataArray,
    });
    return pto;
  } catch (err) {
    console.log(err);
    next(err);
  }
};
