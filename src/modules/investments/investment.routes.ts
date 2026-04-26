import { Router } from 'express';
import { asyncHandler } from '../../shared/http/asyncHandler';
import { authenticate } from '../../shared/middlewares/authenticate';
import { validateRequest } from '../../shared/middlewares/validateRequest';
import { InvestmentController } from './investment.controller';
import { investmentPlanParamsSchema, investmentPlanSchema } from './investment.dto';

export const investmentRoutes = Router();
const investmentController = new InvestmentController();

investmentRoutes.use(authenticate);
investmentRoutes.post(
  '/plans',
  validateRequest({ body: investmentPlanSchema }),
  asyncHandler(investmentController.create),
);
investmentRoutes.get('/plans', asyncHandler(investmentController.list));
investmentRoutes.get(
  '/plans/:id',
  validateRequest({ params: investmentPlanParamsSchema }),
  asyncHandler(investmentController.getById),
);
investmentRoutes.put(
  '/plans/:id',
  validateRequest({ params: investmentPlanParamsSchema, body: investmentPlanSchema }),
  asyncHandler(investmentController.update),
);
investmentRoutes.delete(
  '/plans/:id',
  validateRequest({ params: investmentPlanParamsSchema }),
  asyncHandler(investmentController.delete),
);
