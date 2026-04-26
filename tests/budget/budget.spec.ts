import request from 'supertest';
import { app } from '../../src/app';
import { createAuthenticatedUser } from '../helpers/auth';

const validBudget = {
  monthlyIncome: 2500,
  investmentPercentage: 5,
  fixedExpenses: 1000,
  health: 150,
  education: 100,
  leisure: 150,
  freeReserve: 975,
};

describe('Budgets', () => {
  it('should create a valid budget', async () => {
    const { token } = await createAuthenticatedUser();

    const response = await request(app).post('/budgets').set('Authorization', `Bearer ${token}`).send(validBudget);

    expect(response.status).toBe(201);
    expect(response.body.data.monthlyIncome).toBe(2500);
    expect(response.body.alerts).toEqual([]);
  });

  it('should return educational alert when investment is less than 5%', async () => {
    const { token } = await createAuthenticatedUser();

    const response = await request(app)
      .post('/budgets')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...validBudget, investmentPercentage: 3 });

    expect(response.status).toBe(201);
    expect(response.body.alerts).toContain('O ideal e investir pelo menos 5% da renda mensal, se possivel.');
  });

  it('should get current budget', async () => {
    const { token } = await createAuthenticatedUser();
    await request(app).post('/budgets').set('Authorization', `Bearer ${token}`).send(validBudget);

    const response = await request(app).get('/budgets/current').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.investmentPercentage).toBe(5);
  });

  it('should require authentication', async () => {
    const response = await request(app).post('/budgets').send(validBudget);

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('UNAUTHORIZED');
  });
});
