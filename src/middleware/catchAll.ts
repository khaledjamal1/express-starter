import type { NextFunction, Request, Response } from 'express'
import { ApiErrorResponse } from './error'

export const catchAll = (req: Request, res: Response, next: NextFunction): void => {
  const error = new ApiErrorResponse({
    status: 404,
    message: `Cant find ${req.originalUrl} on the server!`
  })
  next(error)
}
