import { ApiResponse, Budget } from '../types/api';
import { api } from './api';

export type BudgetInput = {
  monthlyIncome: number;
  investmentPercentage: number;
  fixedExpenses: number;
  health: number;
  education: number;
  leisure: number;
  freeReserve: number;
};

export async function createBudget(input: BudgetInput) {
  const response = await api.post<ApiResponse<Budget>>('/budgets', input);
  return response.data;
}

export async function getCurrentBudget() {
  const response = await api.get<ApiResponse<Budget>>('/budgets/current');
  return response.data;
}

export async function updateBudget(id: string, input: BudgetInput) {
  const response = await api.put<ApiResponse<Budget>>(`/budgets/${id}`, input);
  return response.data;
}
