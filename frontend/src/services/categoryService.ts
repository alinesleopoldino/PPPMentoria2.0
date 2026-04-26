import { ApiResponse } from '../types/api';
import { api } from './api';

export type Category = {
  id: string;
  name: string;
};

export async function listCategories() {
  const response = await api.get<ApiResponse<Category[]>>('/categories');
  return response.data;
}
