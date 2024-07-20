import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { ApiErrorResponse } from '../../../middleware/error';

const createPto = z
  .object({
    date: z.string({
      invalid_type_error: 'Date must be a string',
      required_error: 'Date is required',
    }),
    shift: z.enum(['DAY', 'NIGHT']),
    employeeId: z.string({
      invalid_type_error: 'Id must be a string',
      required_error: 'Id is required',
    }),
  })
  .strict();
const createManyPto = z
  .object({
    date: z.string({
      invalid_type_error: 'Date must be a string',
      required_error: 'Date is required',
    }),
    shift: z.enum(['DAY', 'NIGHT']),
    employeeIds: z.array(
      z.string({
        invalid_type_error: 'Id must be a string',
        required_error: 'Idsss is required',
      })
    ),
  })
  .strict();
const updatePto = z
  .object({
    id: z.number({
      invalid_type_error: 'ID must be a number',
      required_error: 'ID is required',
    }),
    date: z
      .string({
        invalid_type_error: 'Date must be a string',
        required_error: 'Date is required',
      })
      .optional(),
    shift: z.enum(['DAY', 'NIGHT']).optional(),
    employeeId: z
      .string({
        invalid_type_error: 'Id must be a string',
        required_error: 'Id is required',
      })
      .optional(),
  })
  .strict()
  .refine((allFields) => Object.keys(allFields).length >= 1, {
    message: 'Minimum of one field update is required',
  });
const getPto = z
  .object({
    id: z.number(),
  })
  .strict();
const deletePto = z
  .object({
    id: z.coerce.number({
      invalid_type_error: 'ID must be a number',
      required_error: 'ID is required',
    }),
  })
  .strict();
export function validatedCreatePto() {
  return (req: Request, res: Response, next: NextFunction) => {
    const pto = req.body;
    try {
      createPto.parse(pto);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ApiErrorResponse({
          status: 500,
          message: error.issues[0].message || error.message,
        });
      } else {
        next(error);
      }
    }
  };
}
export function validatedCreateManyPto() {
  return (req: Request, res: Response, next: NextFunction) => {
    const pto = req.body;
    try {
      createManyPto.parse(pto);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ApiErrorResponse({
          status: 500,
          message: error.issues[0].message || error.message,
        });
      } else {
        next(error);
      }
    }
  };
}
export function validatedUpdatePto() {
  return (req: Request, res: Response, next: NextFunction) => {
    const pto = req.body;
    try {
      updatePto.parse(pto);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ApiErrorResponse({
          status: 500,
          message: error.issues[0].message || error.message,
        });
      } else {
        next(error);
      }
    }
  };
}
export function validatedGetPto() {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = +req.params.id;
    try {
      getPto.parse({ id });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ApiErrorResponse({
          status: 500,
          message: error.issues[0].message || error.message,
        });
      } else {
        next(error);
      }
    }
  };
}
export function validatedDeletePto() {
  return (req: Request, res: Response, next: NextFunction) => {
    const pto = req.params;
    try {
      deletePto.parse(pto);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ApiErrorResponse({
          status: 500,
          message: error.issues[0].message || error.message,
        });
      } else {
        next(error);
      }
    }
  };
}

export type typeCreatePto = z.infer<typeof createPto>;
export type typeCreateManyPto = z.infer<typeof createManyPto>;
export type typeUpdatePto = z.infer<typeof updatePto>;
export type typeGetPto = z.infer<typeof getPto>;
export type typeDeletePto = z.infer<typeof deletePto>;
