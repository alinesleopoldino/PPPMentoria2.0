import { ApiResponse, Dashboard } from '../types/api';
import { api } from './api';

export async function getDashboard() {
  const response = await api.get<ApiResponse<Dashboard>>('/dashboard');
  return response.data;
}
