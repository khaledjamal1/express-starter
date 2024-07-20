import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import controller from './controllers';
import {
  validateDelete,
  validateLogin,
  validateRefresh,
  validateRegister,
} from './validators/validator';
import { logout } from './controllers/logout.controller';

const authRouter = Router();

authRouter
  .post('/register', [rateLimit(), validateRegister()], controller.register)
  .post('/login', [rateLimit(), validateLogin()], controller.Login)
  .delete('/', [rateLimit(), validateDelete()], controller.deleteController)
  .get('/refresh', controller.refresh)
  .get('/logout', logout)

export default authRouter;
