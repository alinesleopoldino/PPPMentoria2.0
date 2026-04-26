import { ApiResponse, InvestmentPlan } from '../types/api';
import { api } from './api';

export type InvestmentInput = {
  investmentPercentage: number;
  goal: string;
  months: number;
  profile: 'CONSERVATIVE' | 'MODERATE' | 'BOLD';
};

export async function createInvestmentPlan(input: InvestmentInput) {
  const response = await api.post<ApiResponse<InvestmentPlan>>('/investments/plans', input);
  return response.data;
}

export async function listInvestmentPlans() {
  const response = await api.get<ApiResponse<InvestmentPlan[]>>('/investments/plans');
  return response.data;
}

export async function getInvestmentPlan(id: string) {
  const response = await api.get<ApiResponse<InvestmentPlan>>(`/investments/plans/${id}`);
  return response.data;
}

export async function updateInvestmentPlan(id: string, input: InvestmentInput) {
  const response = await api.put<ApiResponse<InvestmentPlan>>(`/investments/plans/${id}`, input);
  return response.data;
}

export async function deleteInvestmentPlan(id: string) {
  await api.delete(`/investments/plans/${id}`);
}
