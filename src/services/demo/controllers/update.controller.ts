import { NextFunction, Request, Response } from 'express';
import { updatePtoModel } from '../models';

export const updatePto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedResult = await updatePtoModel(req.body, next);

    if (updatedResult) {
      res.status(201).send({
        message: 'Pto updated',
        data: updatedResult,
      });
    } else {
      res.status(500).send({
        message: 'Pto updated failed',
        data: updatedResult,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
