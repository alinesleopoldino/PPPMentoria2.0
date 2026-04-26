import { Router } from 'express';
import { asyncHandler } from '../../shared/http/asyncHandler';
import { authenticate } from '../../shared/middlewares/authenticate';
import { CategoryController } from './category.controller';

export const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.get('/', authenticate, asyncHandler(categoryController.list));
