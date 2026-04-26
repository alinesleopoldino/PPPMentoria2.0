import { Request, Response } from 'express';
import { successResponse } from '../../shared/http/response';
import { DashboardService } from './dashboard.service';

const dashboardService = new DashboardService();

export class DashboardController {
  async show(request: Request, response: Response) {
    const dashboard = await dashboardService.getDashboard(request.user!.id);
    return response.status(200).json(successResponse(dashboard, 'Dashboard financeiro retornado com sucesso.'));
  }
}
