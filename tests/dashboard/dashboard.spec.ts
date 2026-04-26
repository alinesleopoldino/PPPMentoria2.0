import request from 'supertest';
import { app } from '../../src/app';
import { createAuthenticatedUser } from '../helpers/auth';
import { getCategoryByName } from '../helpers/categories';

describe('Dashboard', () => {
  it('should calculate dashboard correctly with alerts', async () => {
    const { token } = await createAuthenticatedUser({ monthlyIncome: 1000 });
    const housing = await getCategoryByName('Moradia');
    const food = await getCategoryByName('Alimentacao');

    await request(app).post('/budgets').set('Authorization', `Bearer ${token}`).send({
      monthlyIncome: 1000,
      investmentPercentage: 4,
      fixedExpenses: 600,
      health: 0,
      education: 0,
      leisure: 50,
      freeReserve: 310,
    });

    await request(app).post('/expenses').set('Authorization', `Bearer ${token}`).send({
      description: 'Aluguel',
      amount: 600,
      categoryId: housing.id,
      date: '2026-04-26',
      type: 'FIXED',
    });

    await request(app).post('/expenses').set('Authorization', `Bearer ${token}`).send({
      description: 'Mercado',
      amount: 300,
      categoryId: food.id,
      date: '2026-04-26',
      type: 'VARIABLE',
    });

    await request(app).post('/investments/plans').set('Authorization', `Bearer ${token}`).send({
      investmentPercentage: 4,
      goal: 'Comecar a investir',
      months: 10,
      profile: 'CONSERVATIVE',
    });

    const response = await request(app).get('/dashboard').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.monthlyIncome).toBe(1000);
    expect(response.body.data.totalExpenses).toBe(900);
    expect(response.body.data.totalPlannedInvestment).toBe(40);
    expect(response.body.data.remainingBalance).toBe(60);
    expect(response.body.data.categoryPercentages.Moradia).toBe(60);
    expect(response.body.data.alerts).toContain('Despesas fixas ultrapassam 50% da renda mensal.');
    expect(response.body.data.alerts).toContain('Investimento planejado esta abaixo da recomendacao minima de 5%.');
    expect(response.body.data.alerts).toContain('Saude esta sem reserva planejada.');
    expect(response.body.data.alerts).toContain('Estudos esta sem reserva planejada.');
    expect(response.body.data.motivationalQuote).toEqual(expect.any(String));
  });

  it('should suggest budget review when remaining balance is negative', async () => {
    const { token } = await createAuthenticatedUser({ monthlyIncome: 1000 });
    const housing = await getCategoryByName('Moradia');

    await request(app).post('/budgets').set('Authorization', `Bearer ${token}`).send({
      monthlyIncome: 1000,
      investmentPercentage: 5,
      fixedExpenses: 900,
      health: 10,
      education: 10,
      leisure: 10,
      freeReserve: 20,
    });

    await request(app).post('/expenses').set('Authorization', `Bearer ${token}`).send({
      description: 'Despesa maior que renda',
      amount: 1100,
      categoryId: housing.id,
      date: '2026-04-26',
      type: 'FIXED',
    });

    const response = await request(app).get('/dashboard').set('Authorization', `Bearer ${token}`);

    expect(response.body.data.remainingBalance).toBeLessThan(0);
    expect(response.body.data.alerts).toContain('Saldo restante negativo. Revise seu orcamento.');
    expect(response.body.data.alerts).toContain('Parabens por manter investimento igual ou superior a 5% da renda.');
  });
});
