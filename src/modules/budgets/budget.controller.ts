import { Request, Response } from 'express';
import { successResponse } from '../../shared/http/response';
import { BudgetService } from './budget.service';

const budgetService = new BudgetService();

export class BudgetController {
  async create(request: Request, response: Response) {
    const result = await budgetService.create(request.user!.id, request.body);
    return response
      .status(201)
      .json(successResponse(result.budget, 'Orcamento cadastrado com sucesso.', result.alerts));
  }

  async getCurrent(request: Request, response: Response) {
    const budget = await budgetService.getCurrent(request.user!.id);
    return response.status(200).json(successResponse(budget, 'Orcamento atual retornado com sucesso.'));
  }

  async update(request: Request, response: Response) {
    const result = await budgetService.update(request.user!.id, String(request.params.id), request.body);
    return response
      .status(200)
      .json(successResponse(result.budget, 'Orcamento atualizado com sucesso.', result.alerts));
  }
}
