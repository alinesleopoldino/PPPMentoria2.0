import { Router } from 'express';
import { asyncHandler } from '../../shared/http/asyncHandler';
import { authenticate } from '../../shared/middlewares/authenticate';
import { DashboardController } from './dashboard.controller';

export const dashboardRoutes = Router();
const dashboardController = new DashboardController();

dashboardRoutes.get('/', authenticate, asyncHandler(dashboardController.show));
