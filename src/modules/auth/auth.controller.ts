import { Request, Response } from 'express';
import { successResponse } from '../../shared/http/response';
import { AuthService } from './auth.service';

const authService = new AuthService();

export class AuthController {
  async register(request: Request, response: Response) {
    const user = await authService.register(request.body);

    return response.status(201).json(successResponse(user, 'Usuario cadastrado com sucesso.'));
  }

  async login(request: Request, response: Response) {
    const data = await authService.login(request.body);

    return response.status(200).json(successResponse(data, 'Login realizado com sucesso.'));
  }
}
