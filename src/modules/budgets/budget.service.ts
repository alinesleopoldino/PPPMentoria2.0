import { prisma } from '../../config/prisma';
import { MINIMUM_RECOMMENDED_INVESTMENT_PERCENTAGE } from '../../shared/constants/financial';
import { AppError } from '../../shared/errors/AppError';
import { toNumber } from '../../shared/utils/money';
import { BudgetDto } from './budget.dto';

export class BudgetService {
  async create(userId: string, data: BudgetDto) {
    const budget = await prisma.budget.create({ data: { ...data, userId } });

    return {
      budget: this.mapBudget(budget),
      alerts: this.getBudgetAlerts(data),
    };
  }

  async getCurrent(userId: string) {
    const budget = await prisma.budget.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!budget) {
      throw new AppError('Orcamento nao encontrado.', 404, 'BUDGET_NOT_FOUND');
    }

    return this.mapBudget(budget);
  }

  async update(userId: string, budgetId: string, data: BudgetDto) {
    const existingBudget = await prisma.budget.findFirst({ where: { id: budgetId, userId } });

    if (!existingBudget) {
      throw new AppError('Orcamento nao encontrado.', 404, 'BUDGET_NOT_FOUND');
    }

    const budget = await prisma.budget.update({ where: { id: budgetId }, data });

    return {
      budget: this.mapBudget(budget),
      alerts: this.getBudgetAlerts(data),
    };
  }

  private getBudgetAlerts(data: BudgetDto) {
    const alerts: string[] = [];

    if (data.investmentPercentage < MINIMUM_RECOMMENDED_INVESTMENT_PERCENTAGE) {
      alerts.push('O ideal e investir pelo menos 5% da renda mensal, se possivel.');
    }

    if (data.health === 0) {
      alerts.push('Considere reservar algum valor para saude.');
    }

    if (data.education === 0) {
      alerts.push('Considere reservar algum valor para estudos.');
    }

    return alerts;
  }

  private mapBudget(budget: {
    id: string;
    monthlyIncome: unknown;
    investmentPercentage: unknown;
    fixedExpenses: unknown;
    health: unknown;
    education: unknown;
    leisure: unknown;
    freeReserve: unknown;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      id: budget.id,
      monthlyIncome: toNumber(budget.monthlyIncome as never),
      investmentPercentage: toNumber(budget.investmentPercentage as never),
      fixedExpenses: toNumber(budget.fixedExpenses as never),
      health: toNumber(budget.health as never),
      education: toNumber(budget.education as never),
      leisure: toNumber(budget.leisure as never),
      freeReserve: toNumber(budget.freeReserve as never),
      createdAt: budget.createdAt,
      updatedAt: budget.updatedAt,
    };
  }
}
