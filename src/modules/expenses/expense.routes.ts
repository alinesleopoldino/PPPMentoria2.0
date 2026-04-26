import { Router } from 'express';
import { asyncHandler } from '../../shared/http/asyncHandler';
import { authenticate } from '../../shared/middlewares/authenticate';
import { validateRequest } from '../../shared/middlewares/validateRequest';
import { ExpenseController } from './expense.controller';
import { expenseParamsSchema, expenseSchema } from './expense.dto';

export const expenseRoutes = Router();
const expenseController = new ExpenseController();

expenseRoutes.use(authenticate);
expenseRoutes.post('/', validateRequest({ body: expenseSchema }), asyncHandler(expenseController.create));
expenseRoutes.get('/', asyncHandler(expenseController.list));
expenseRoutes.get('/:id', validateRequest({ params: expenseParamsSchema }), asyncHandler(expenseController.getById));
expenseRoutes.put(
  '/:id',
  validateRequest({ params: expenseParamsSchema, body: expenseSchema }),
  asyncHandler(expenseController.update),
);
expenseRoutes.delete(
  '/:id',
  validateRequest({ params: expenseParamsSchema }),
  asyncHandler(expenseController.delete),
);
