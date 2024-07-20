import { NextFunction, Request, Response } from 'express';
import { createManyPtoModel, createPtoModel } from '../models';

export const createPto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createdResult = await createPtoModel(req.body);

    if (createdResult) {
      res.status(200).send({
        message: 'Pto created',
        data: createdResult,
      });
    } else {
      res.status(500).send({
        message: 'Pto creation failed',
        data: createdResult,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const createManyPto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createdResult = await createManyPtoModel(req.body, next);

    if (createdResult) {
      res.status(200).send({
        message: 'Pto created',
        data: createdResult,
      });
    } else {
      res.status(500).send({
        message: 'Pto creation failed',
        data: createdResult,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
