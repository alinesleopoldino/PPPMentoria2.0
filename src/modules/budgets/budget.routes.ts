import { Router } from 'express';
import { asyncHandler } from '../../shared/http/asyncHandler';
import { authenticate } from '../../shared/middlewares/authenticate';
import { validateRequest } from '../../shared/middlewares/validateRequest';
import { BudgetController } from './budget.controller';
import { budgetParamsSchema, budgetSchema } from './budget.dto';

export const budgetRoutes = Router();
const budgetController = new BudgetController();

budgetRoutes.use(authenticate);
budgetRoutes.post('/', validateRequest({ body: budgetSchema }), asyncHandler(budgetController.create));
budgetRoutes.get('/current', asyncHandler(budgetController.getCurrent));
budgetRoutes.put(
  '/:id',
  validateRequest({ params: budgetParamsSchema, body: budgetSchema }),
  asyncHandler(budgetController.update),
);
