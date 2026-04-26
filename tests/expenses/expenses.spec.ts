import request from 'supertest';
import { app } from '../../src/app';
import { createAuthenticatedUser } from '../helpers/auth';
import { getCategoryByName } from '../helpers/categories';

async function createBudget(token: string, monthlyIncome = 1000) {
  await request(app).post('/budgets').set('Authorization', `Bearer ${token}`).send({
    monthlyIncome,
    investmentPercentage: 5,
    fixedExpenses: 300,
    health: 50,
    education: 50,
    leisure: 100,
    freeReserve: 450,
  });
}

describe('Expenses', () => {
  it('should create a valid expense', async () => {
    const { token } = await createAuthenticatedUser({ monthlyIncome: 1000 });
    const category = await getCategoryByName();

    const response = await request(app).post('/expenses').set('Authorization', `Bearer ${token}`).send({
      description: 'Aluguel',
      amount: 500,
      categoryId: category.id,
      date: '2026-04-26',
      type: 'FIXED',
    });

    expect(response.status).toBe(201);
    expect(response.body.data.description).toBe('Aluguel');
  });

  it('should reject negative expense amount', async () => {
    const { token } = await createAuthenticatedUser();
    const category = await getCategoryByName();

    const response = await request(app).post('/expenses').set('Authorization', `Bearer ${token}`).send({
      description: 'Valor invalido',
      amount: -10,
      categoryId: category.id,
      date: '2026-04-26',
      type: 'VARIABLE',
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('should alert when expenses exceed income', async () => {
    const { token } = await createAuthenticatedUser({ monthlyIncome: 1000 });
    await createBudget(token, 1000);
    const category = await getCategoryByName();

    const response = await request(app).post('/expenses').set('Authorization', `Bearer ${token}`).send({
      description: 'Despesa alta',
      amount: 1200,
      categoryId: category.id,
      date: '2026-04-26',
      type: 'VARIABLE',
    });

    expect(response.status).toBe(201);
    expect(response.body.alerts).toContain(
      'Seu total de despesas ultrapassou a renda mensal, indicando desequilibrio financeiro.',
    );
  });

  it('should list, get, update and delete expenses', async () => {
    const { token } = await createAuthenticatedUser();
    const category = await getCategoryByName('Alimentacao');

    const created = await request(app).post('/expenses').set('Authorization', `Bearer ${token}`).send({
      description: 'Mercado',
      amount: 200,
      categoryId: category.id,
      date: '2026-04-26',
      type: 'VARIABLE',
    });

    const id = created.body.data.id;
    expect((await request(app).get('/expenses').set('Authorization', `Bearer ${token}`)).body.data).toHaveLength(1);
    expect((await request(app).get(`/expenses/${id}`).set('Authorization', `Bearer ${token}`)).status).toBe(200);

    const updated = await request(app).put(`/expenses/${id}`).set('Authorization', `Bearer ${token}`).send({
      description: 'Mercado semanal',
      amount: 250,
      categoryId: category.id,
      date: '2026-04-27',
      type: 'VARIABLE',
    });

    expect(updated.body.data.amount).toBe(250);
    expect((await request(app).delete(`/expenses/${id}`).set('Authorization', `Bearer ${token}`)).status).toBe(204);
  });
});
