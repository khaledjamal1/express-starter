import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../lib/logger';

// Define ApiError interface
interface ApiError extends Error {
  errorDetails?: {
    status?: number;
    message?: string;
    stack?: string;
  };
}

// Define ApiErrorResponse class
class ApiErrorResponse extends Error implements ApiError {
  errorDetails: {
    status?: number;
    message?: string;
    stack?: string;
  };

  constructor({
    status,
    message,
    stack,
  }: {
    status?: number;
    message?: string;
    stack?: string;
  }) {
    super(message);
    this.name = 'ApiErrorResponse';
    this.errorDetails = {
      status,
      message,
      stack,
    };
  }
}

// Define ErrorHandler middleware
const ErrorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(500).json({
      status: 500,
      message: 'Prisma error',
    });
  } else {
    const errStatus = err.errorDetails?.status || 500;
    const errMsg = err.errorDetails?.message || 'Something went wrong';
    res.status(errStatus).json({
      status: errStatus,
      message: errMsg,
    });
  }
  logger.error(err.message);
};

// Export ErrorHandler and ApiErrorResponse
export { ApiErrorResponse, ErrorHandler };
