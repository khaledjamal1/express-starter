import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { ApiErrorResponse } from '../../../middleware/error';
const ROLES = ['DEV', 'MANAGER', 'SUPERVISOR', 'RAMP'] as const;
const login = z
  .object({
    email: z.string({
      invalid_type_error: 'User email must be a string',
      required_error: 'User email is required',
    }),
    password: z.string({
      invalid_type_error: 'Password must be a string',
      required_error: 'Password is required',
    }),
  })
  .strict();
const refresh = z.object({
  jwt: z.string({
    invalid_type_error: 'Cookie must be a string',
    required_error: 'Cookie is required',
  }),
});
const register = z
  .object({
    name: z.string({
      invalid_type_error: 'User name must be a string',
      required_error: 'User name is required',
    }),
    role: z.enum(ROLES),
    email: z
      .string({
        invalid_type_error: 'User name must be a string',
        required_error: 'User name is required',
      })
      .email({ message: 'Invalid email address' }),
    password: z.string({
      invalid_type_error: 'Password must be a string',
      required_error: 'Password is required',
    }),
  })
  .strict();
const deleteUser = z
  .object({
    id: z.string({
      invalid_type_error: 'Id must be a string',
      required_error: 'Id is required',
    }),
  })
  .strict();

export function validateLogin() {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    try {
      login.parse(data);
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
export function validateDelete() {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    try {
      deleteUser.parse(user);
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
export function validateRegister() {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    try {
      register.parse(data);
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
export function validateRefresh() {
  return (req: Request, res: Response, next: NextFunction) => {
    const cookie = req.cookies;
    try {
      refresh.parse(cookie);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ApiErrorResponse({
          status: 500,
          message: 'Unauthorized',
        });
      } else {
        next(error);
      }
    }
  };
}

export type typeLogin = z.infer<typeof login>;
export type typeRegister = z.infer<typeof register>;
export type typeDelete = z.infer<typeof deleteUser>;
export type typeRefresh = z.infer<typeof refresh>;
