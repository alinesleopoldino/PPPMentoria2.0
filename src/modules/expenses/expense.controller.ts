import { Request, Response } from 'express';
import { successResponse } from '../../shared/http/response';
import { ExpenseService } from './expense.service';

const expenseService = new ExpenseService();

export class ExpenseController {
  async create(request: Request, response: Response) {
    const result = await expenseService.create(request.user!.id, request.body);
    return response
      .status(201)
      .json(successResponse(result.expense, 'Despesa cadastrada com sucesso.', result.alerts));
  }

  async list(request: Request, response: Response) {
    const expenses = await expenseService.list(request.user!.id);
    return response.status(200).json(successResponse(expenses, 'Despesas retornadas com sucesso.'));
  }

  async getById(request: Request, response: Response) {
    const expense = await expenseService.getById(request.user!.id, String(request.params.id));
    return response.status(200).json(successResponse(expense, 'Despesa retornada com sucesso.'));
  }

  async update(request: Request, response: Response) {
    const result = await expenseService.update(request.user!.id, String(request.params.id), request.body);
    return response
      .status(200)
      .json(successResponse(result.expense, 'Despesa atualizada com sucesso.', result.alerts));
  }

  async delete(request: Request, response: Response) {
    await expenseService.delete(request.user!.id, String(request.params.id));
    return response.status(204).send();
  }
}
