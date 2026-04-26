import { ApiResponse, Expense } from '../types/api';
import { api } from './api';

export type ExpenseInput = {
  description: string;
  amount: number;
  categoryId: string;
  date: string;
  type: 'FIXED' | 'VARIABLE';
};

export async function createExpense(input: ExpenseInput) {
  const response = await api.post<ApiResponse<Expense>>('/expenses', input);
  return response.data;
}

export async function listExpenses() {
  const response = await api.get<ApiResponse<Expense[]>>('/expenses');
  return response.data;
}

export async function updateExpense(id: string, input: ExpenseInput) {
  const response = await api.put<ApiResponse<Expense>>(`/expenses/${id}`, input);
  return response.data;
}

export async function deleteExpense(id: string) {
  await api.delete(`/expenses/${id}`);
}
