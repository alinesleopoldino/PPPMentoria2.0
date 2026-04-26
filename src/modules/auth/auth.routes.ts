import { Router } from 'express';
import { asyncHandler } from '../../shared/http/asyncHandler';
import { validateRequest } from '../../shared/middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { loginSchema, registerUserSchema } from './auth.dto';

export const authRoutes = Router();
const authController = new AuthController();

authRoutes.post(
  '/register',
  validateRequest({ body: registerUserSchema }),
  asyncHandler(authController.register),
);

authRoutes.post('/login', validateRequest({ body: loginSchema }), asyncHandler(authController.login));
