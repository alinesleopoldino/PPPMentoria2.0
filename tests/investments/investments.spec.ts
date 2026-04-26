import request from 'supertest';
import { app } from '../../src/app';
import { createAuthenticatedUser } from '../helpers/auth';

describe('Investments', () => {
  it('should create investment plan and calculate projection', async () => {
    const { token } = await createAuthenticatedUser({ monthlyIncome: 2000 });

    const response = await request(app).post('/investments/plans').set('Authorization', `Bearer ${token}`).send({
      investmentPercentage: 5,
      goal: 'Reserva de emergencia',
      months: 12,
      profile: 'CONSERVATIVE',
    });

    expect(response.status).toBe(201);
    expect(response.body.data.monthlyRecommendedAmount).toBe(100);
    expect(response.body.data.projectedTotalWithoutInterest).toBe(1200);
  });

  it('should calculate investment using current budget income when budget exists', async () => {
    const { token } = await createAuthenticatedUser({ monthlyIncome: 400000 });

    await request(app).post('/budgets').set('Authorization', `Bearer ${token}`).send({
      monthlyIncome: 4000,
      investmentPercentage: 10,
      fixedExpenses: 1000,
      health: 100,
      education: 100,
      leisure: 200,
      freeReserve: 2200,
    });

    const response = await request(app).post('/investments/plans').set('Authorization', `Bearer ${token}`).send({
      investmentPercentage: 10,
      goal: 'Investir pela renda atual',
      months: 12,
      profile: 'CONSERVATIVE',
    });

    expect(response.status).toBe(201);
    expect(response.body.data.monthlyRecommendedAmount).toBe(400);
    expect(response.body.data.projectedTotalWithoutInterest).toBe(4800);
  });

  it('should list investment plans', async () => {
    const { token } = await createAuthenticatedUser();

    await request(app).post('/investments/plans').set('Authorization', `Bearer ${token}`).send({
      investmentPercentage: 6,
      goal: 'Estudos',
      months: 10,
      profile: 'MODERATE',
    });

    const response = await request(app).get('/investments/plans').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
  });

  it('should update investment plan and recalculate projection', async () => {
    const { token } = await createAuthenticatedUser({ monthlyIncome: 3000 });

    const created = await request(app).post('/investments/plans').set('Authorization', `Bearer ${token}`).send({
      investmentPercentage: 5,
      goal: 'Reserva',
      months: 12,
      profile: 'CONSERVATIVE',
    });

    const response = await request(app)
      .put(`/investments/plans/${created.body.data.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        investmentPercentage: 10,
        goal: 'Comprar apartamento',
        months: 24,
        profile: 'MODERATE',
      });

    expect(response.status).toBe(200);
    expect(response.body.data.goal).toBe('Comprar apartamento');
    expect(response.body.data.monthlyRecommendedAmount).toBe(300);
    expect(response.body.data.projectedTotalWithoutInterest).toBe(7200);
  });

  it('should delete investment plan', async () => {
    const { token } = await createAuthenticatedUser();

    const created = await request(app).post('/investments/plans').set('Authorization', `Bearer ${token}`).send({
      investmentPercentage: 6,
      goal: 'Viagem',
      months: 8,
      profile: 'BOLD',
    });

    const deleteResponse = await request(app)
      .delete(`/investments/plans/${created.body.data.id}`)
      .set('Authorization', `Bearer ${token}`);
    const listResponse = await request(app).get('/investments/plans').set('Authorization', `Bearer ${token}`);

    expect(deleteResponse.status).toBe(204);
    expect(listResponse.body.data).toHaveLength(0);
  });
});
