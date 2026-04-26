import axios from 'axios';
import { ApiErrorResponse } from '../types/api';
import { getToken } from '../utils/storage';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3333',
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export function getApiErrorMessage(error: unknown) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.error?.message ?? 'Nao foi possivel concluir a operacao.';
  }

  return 'Erro inesperado. Tente novamente.';
}
