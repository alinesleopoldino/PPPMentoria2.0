import { Request, Response } from 'express';
import { successResponse } from '../../shared/http/response';
import { InvestmentService } from './investment.service';

const investmentService = new InvestmentService();

export class InvestmentController {
  async create(request: Request, response: Response) {
    const result = await investmentService.create(request.user!.id, request.body);
    return response
      .status(201)
      .json(successResponse(result.plan, 'Plano de investimento cadastrado com sucesso.', result.alerts));
  }

  async list(request: Request, response: Response) {
    const plans = await investmentService.list(request.user!.id);
    return response.status(200).json(successResponse(plans, 'Planos de investimento retornados com sucesso.'));
  }

  async getById(request: Request, response: Response) {
    const plan = await investmentService.getById(request.user!.id, String(request.params.id));
    return response.status(200).json(successResponse(plan, 'Plano de investimento retornado com sucesso.'));
  }

  async update(request: Request, response: Response) {
    const result = await investmentService.update(request.user!.id, String(request.params.id), request.body);
    return response
      .status(200)
      .json(successResponse(result.plan, 'Plano de investimento atualizado com sucesso.', result.alerts));
  }

  async delete(request: Request, response: Response) {
    await investmentService.delete(request.user!.id, String(request.params.id));
    return response.status(204).send();
  }
}
