import { ApiResponse, AuthPayload, User } from '../types/api';
import { api } from './api';

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  monthlyIncome: number;
};

export type LoginInput = {
  email: string;
  password: string;
};

export async function register(input: RegisterInput) {
  const response = await api.post<ApiResponse<User>>('/auth/register', input);
  return response.data;
}

export async function login(input: LoginInput) {
  const response = await api.post<ApiResponse<AuthPayload>>('/auth/login', input);
  return response.data;
}
