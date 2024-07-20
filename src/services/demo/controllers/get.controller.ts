import { NextFunction, Request, Response } from 'express';
import { getAllPtoModel, getPtoModel } from '../models';

export const getPto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const getResult = await getPtoModel({ id }, next);

    if (getResult) {
      res.status(200).send({
        message: 'Pto found',
        data: getResult,
      });
    } else {
      res.status(200).send({
        message: 'Pto not found',
        data: getResult,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const getAllPto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getResult = await getAllPtoModel(next);

    if (getResult) {
      res.status(200).send({
        message: 'Pto found',
        data: getResult,
      });
    } else {
      res.status(200).send({
        message: 'Pto not found',
        data: getResult,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
