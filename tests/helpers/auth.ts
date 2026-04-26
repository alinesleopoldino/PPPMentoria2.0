import request from 'supertest';
import { app } from '../../src/app';

let emailCounter = 0;

export function validRegisterPayload(overrides: Partial<Record<string, unknown>> = {}) {
  emailCounter += 1;

  return {
    name: 'Aline Santos',
    email: `aline.${emailCounter}@example.com`,
    password: 'Senha@123',
    monthlyIncome: 2500,
    ...overrides,
  };
}

export async function createAuthenticatedUser(overrides: Partial<Record<string, unknown>> = {}) {
  const password = 'Senha@123';
  const payload = validRegisterPayload({ password, ...overrides });

  const registerResponse = await request(app).post('/auth/register').send(payload);
  const loginResponse = await request(app).post('/auth/login').send({
    email: payload.email,
    password,
  });

  return {
    user: registerResponse.body.data,
    token: loginResponse.body.data.token as string,
    password,
    email: payload.email as string,
  };
}
