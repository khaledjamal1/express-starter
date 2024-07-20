import { Router } from 'express';
import controller from './controllers';
import {
  validatedCreateManyPto,
  validatedCreatePto,
  validatedDeletePto,
  validatedGetPto,
  validatedUpdatePto,
} from './validators/validator';

const ptoRouter = Router();

ptoRouter
  .post('/', validatedCreatePto(), controller.createPto)
  .post('/many', validatedCreateManyPto(), controller.createManyPto)
  .get('/:id', validatedGetPto(), controller.getPto)
  .get('/', controller.getAllPto)
  .put('/', validatedUpdatePto(), controller.updatePto)
  .delete('/:id', validatedDeletePto(), controller.deletePto);

export default ptoRouter;
