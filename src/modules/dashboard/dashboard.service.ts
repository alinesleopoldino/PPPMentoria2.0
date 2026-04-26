import { prisma } from '../../config/prisma';
import { MINIMUM_RECOMMENDED_INVESTMENT_PERCENTAGE } from '../../shared/constants/financial';
import { AppError } from '../../shared/errors/AppError';
import { roundMoney, toNumber } from '../../shared/utils/money';
import { MotivationalQuotesService } from '../motivationalQuotes/motivationalQuotes.service';

export class DashboardService {
  constructor(private readonly motivationalQuotesService = new MotivationalQuotesService()) {}

  async getDashboard(userId: string) {
    const [user, budget, expenses, investmentPlan] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.budget.findFirst({ where: { userId }, orderBy: { createdAt: 'desc' } }),
      prisma.expense.findMany({ where: { userId }, include: { category: true } }),
      prisma.investmentPlan.findFirst({ where: { userId }, orderBy: { createdAt: 'desc' } }),
    ]);

    if (!user) {
      throw new AppError('Usuario nao encontrado.', 404, 'USER_NOT_FOUND');
    }

    const monthlyIncome = toNumber(budget?.monthlyIncome ?? user.monthlyIncome);
    const totalExpenses = roundMoney(expenses.reduce((total, expense) => total + toNumber(expense.amount), 0));
    const totalPlannedInvestment = toNumber(investmentPlan?.monthlyRecommendedAmount);
    const remainingBalance = roundMoney(monthlyIncome - totalExpenses - totalPlannedInvestment);
    const fixedExpensesTotal = expenses
      .filter((expense) => expense.type === 'FIXED')
      .reduce((total, expense) => total + toNumber(expense.amount), 0);
    const investmentPercentage = toNumber(
      investmentPlan?.investmentPercentage ?? budget?.investmentPercentage ?? 0,
    );

    const categoryPercentages = expenses.reduce<Record<string, number>>((acc, expense) => {
      const current = acc[expense.category.name] ?? 0;
      acc[expense.category.name] = roundMoney(current + (toNumber(expense.amount) / monthlyIncome) * 100);
      return acc;
    }, {});

    const alerts = this.getAlerts({
      monthlyIncome,
      remainingBalance,
      fixedExpensesTotal,
      investmentPercentage,
      health: toNumber(budget?.health),
      education: toNumber(budget?.education),
    });

    return {
      monthlyIncome,
      totalExpenses,
      totalPlannedInvestment,
      remainingBalance,
      categoryPercentages,
      alerts,
      motivationalQuote: this.motivationalQuotesService.getDailyQuote().quote,
    };
  }

  private getAlerts(data: {
    monthlyIncome: number;
    remainingBalance: number;
    fixedExpensesTotal: number;
    investmentPercentage: number;
    health: number;
    education: number;
  }) {
    const alerts: string[] = [];

    if (data.fixedExpensesTotal > data.monthlyIncome * 0.5) {
      alerts.push('Despesas fixas ultrapassam 50% da renda mensal.');
    }

    if (data.investmentPercentage < MINIMUM_RECOMMENDED_INVESTMENT_PERCENTAGE) {
      alerts.push('Investimento planejado esta abaixo da recomendacao minima de 5%.');
    } else {
      alerts.push('Parabens por manter investimento igual ou superior a 5% da renda.');
    }

    if (data.health === 0) {
      alerts.push('Saude esta sem reserva planejada.');
    }

    if (data.education === 0) {
      alerts.push('Estudos esta sem reserva planejada.');
    }

    if (data.remainingBalance < 0) {
      alerts.push('Saldo restante negativo. Revise seu orcamento.');
    }

    return alerts;
  }
}
