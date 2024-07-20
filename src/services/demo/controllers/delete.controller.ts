import { NextFunction, Request, Response } from 'express';
import { deletePtoModel } from '../models';

interface Params {
  id: number;
}
export const deletePto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedResult = await deletePtoModel(req.params as unknown as Params);

    if (deletedResult) {
      res.status(200).send({
        message: 'Pto deleted',
        data: deletedResult,
      });
    } else {
      res.status(500).send({
        message: 'Pto deletion failed',
        data: deletedResult,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
