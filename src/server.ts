import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { main } from '../prisma/seed';
import { corsOptions } from './config/config';
import { logger, loggingMiddleware } from './lib/logger';
import { catchAll } from './middleware/catchAll';
import credentials from './middleware/credentials';
import { ErrorHandler } from './middleware/error';
import apiRouter from './routes';
import authRouter from './services/auth/routes';
import { verifyJWT } from './middleware/verifyRoles';

export const app = express();
const port = process.env.SERVER_PORT;
app.listen(port, () => {
  logger.notice(`HR Backend server is listening on port ${port}`);
});
app.use(helmet());
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggingMiddleware);
app.use('/api/auth', authRouter);
app.use('/api',verifyJWT, apiRouter);
app.use('*', catchAll);
app.use(ErrorHandler);


