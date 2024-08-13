import express, { type Express } from 'express'
import helmet from 'helmet'
import { corsOptions } from '../config/config'
import { loggingMiddleware } from '../lib/logger'
import { catchAll } from '../middleware/catchAll'
import credentials from '../middleware/credentials'
import { ErrorHandler } from '../middleware/error'
import apiRouter from '../routes'
import authRouter from '../services/auth/routes'
import { specs } from '../lib/swagger'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'

function createServer(): Express {
  const app = express()
  app.use(helmet())
  app.use(cors(corsOptions))
  app.use(credentials)
  app.use(cookieParser())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(loggingMiddleware)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'ID_Store server is running'
    })
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, { customCss: '.swagger-ui .topbar { display: none }' }))
  app.use('/api/auth', authRouter)
  app.use('/api', apiRouter)
  app.use('*', catchAll)
  app.use(ErrorHandler)
  return app
}

export default createServer
