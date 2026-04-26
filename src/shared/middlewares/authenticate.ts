import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import { AppError } from '../errors/AppError';

type JwtPayload = {
  sub: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export function authenticate(request: Request, _response: Response, next: NextFunction) {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw new AppError('Token de autenticacao nao informado.', 401, 'UNAUTHORIZED');
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    throw new AppError('Token de autenticacao invalido.', 401, 'UNAUTHORIZED');
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret) as JwtPayload;
    request.user = { id: payload.sub };
    return next();
  } catch {
    throw new AppError('Token de autenticacao invalido.', 401, 'UNAUTHORIZED');
  }
}
