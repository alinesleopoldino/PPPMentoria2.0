import { Router } from 'express';

export const healthRoutes = Router();

healthRoutes.get('/', (_request, response) => {
  return response.status(200).json({
    data: {
      status: 'ok',
      service: 'Smart Invest Planner API',
    },
    alerts: [],
    message: 'API disponivel.',
  });
});
