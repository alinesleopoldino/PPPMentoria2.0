import { ApiResponse } from '../types/api';
import { api } from './api';

export async function getRandomQuote() {
  const response = await api.get<ApiResponse<{ quote: string }>>('/motivational-quotes/random');
  return response.data;
}
