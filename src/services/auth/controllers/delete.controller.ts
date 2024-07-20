import { NextFunction, Request, Response } from 'express';
import { deleteModel } from '../models';

export const deleteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedResult = await deleteModel(req.body, next);

    if (deletedResult) {
      res.status(200).send({
        message: 'User deleted',
        data: deletedResult,
      });
    } else {
      res.status(500).send({
        message: 'User deletion failed',
        data: deletedResult,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
