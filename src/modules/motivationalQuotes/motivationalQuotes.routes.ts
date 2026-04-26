import { Router } from 'express';
import { asyncHandler } from '../../shared/http/asyncHandler';
import { MotivationalQuotesController } from './motivationalQuotes.controller';

export const motivationalQuotesRoutes = Router();
const motivationalQuotesController = new MotivationalQuotesController();

motivationalQuotesRoutes.get('/random', asyncHandler(motivationalQuotesController.random));
