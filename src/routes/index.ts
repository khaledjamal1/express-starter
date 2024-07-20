import { Router } from 'express';
import certificateRouter from '../services/certificate/routes';
import staffChangeRouter from '../services/changeStaff/routes';
import { dataRouter } from '../services/data/routes';
import departmentRouter from '../services/department/routes';
import employeeRouter from '../services/employee/routes';
import {
  default as offerRouter,
  default as staffRouter,
} from '../services/offer/routes';
import ptoRouter from '../services/demo/routes';

const apiRouter = Router();

apiRouter.use(
  '/employee',
  // [verifyJWT, verifyRoles(ROLES_LIST.SUPERVISOR)],
  employeeRouter
);
apiRouter.use('/department', departmentRouter);
apiRouter.use('/staff', staffRouter);
apiRouter.use('/offer', offerRouter);
apiRouter.use('/pto', ptoRouter);
apiRouter.use('/staffChange', staffChangeRouter);
apiRouter.use('/Certificate', certificateRouter);
apiRouter.use('/data', dataRouter);

export default apiRouter;
