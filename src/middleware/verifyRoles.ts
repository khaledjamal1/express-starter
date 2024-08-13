/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { NextFunction, Request, Response } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { ROLES_LIST } from '../config/config'
import { getRoleValue } from '../lib/helpers'
import { logger } from '../lib/logger'
import { ApiErrorResponse } from './error'

interface CustomRequest extends Request {
  user?: string
  role?: number
}

const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
    throw new ApiErrorResponse({
      status: 400,
      message: 'Unauthorized: Bearer token missing or invalid'
    })
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
    if (err) {
      logger.error('token expired')
      throw new ApiErrorResponse({
        status: 403,
        message: 'Forbidden: Invalid token'
      })
    }
    logger.info('decoded')
    const decodedToken = decoded as JwtPayload & {
      UserInfo: { name: string; role: number }
    }
    req.user = decodedToken.UserInfo?.name
    req.role = decodedToken.UserInfo?.role
    next()
  })
}

const verifyRoles = (...allowedRoles: number[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
      throw new ApiErrorResponse({
        status: 400,
        message: 'Unauthorized: Bearer token missing or invalid'
      })
    }
    const token = authHeader.split(' ')[1]

    const decodedToken = jwt.decode(token) as JwtPayload & { userInfo: { name: string; role: string } }

    const role = getRoleValue(decodedToken?.userInfo?.role as 'DEV' | 'MANAGER' | 'SUPERVISOR' | 'RAMP')

    if (!role) {
      throw new ApiErrorResponse({
        status: 401,
        message: 'Unauthorized: Role information missing'
      })
    }

    // Allow access if the user has the "DEV" role
    if (role === ROLES_LIST.DEV) {
      next()
      return
    }

    // Allow access if no specific roles are provided for the route
    if (allowedRoles.length === 0) {
      next()
      return
    }

    // Check if the user's role matches any of the allowed roles
    if (!allowedRoles.includes(role)) {
      throw new ApiErrorResponse({
        status: 403,
        message: 'Forbidden: Insufficient role permissions'
      })
    }

    next()
  }
}

export { verifyJWT, verifyRoles }
