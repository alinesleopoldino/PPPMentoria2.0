import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { env } from '../../config/env';
import { AppError } from '../errors/AppError';

export function errorHandler(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    return response.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Campos invalidos ou obrigatorios nao informados.',
        details: error.flatten(),
      },
    });
  }

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
        details: error.details ?? [],
      },
    });
  }

  if (env.nodeEnv !== 'test') {
    console.error(error);
  }

  return response.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Erro interno inesperado.',
      details: [],
    },
  });
}
