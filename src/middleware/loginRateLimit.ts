import type { NextFunction, Request, Response } from 'express'
import { rateLimit } from 'express-rate-limit'
import { logger } from '../lib/logger'

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  statusCode: 429,
  handler: (req: Request, res: Response, next: NextFunction, options) => {
    logger.info(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`)
    res.status(options.statusCode).json(options.message)
  }
})

export default loginLimiter
