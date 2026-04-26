import { prisma } from '../../config/prisma';
import { MINIMUM_RECOMMENDED_INVESTMENT_PERCENTAGE } from '../../shared/constants/financial';
import { AppError } from '../../shared/errors/AppError';
import { roundMoney, toNumber } from '../../shared/utils/money';
import { InvestmentPlanDto } from './investment.dto';

export class InvestmentService {
  async create(userId: string, data: InvestmentPlanDto) {
    const monthlyIncome = await this.getCurrentMonthlyIncome(userId);
    const monthlyRecommendedAmount = roundMoney((monthlyIncome * data.investmentPercentage) / 100);
    const projectedTotalWithoutInterest = roundMoney(monthlyRecommendedAmount * data.months);

    const plan = await prisma.investmentPlan.create({
      data: {
        ...data,
        userId,
        monthlyRecommendedAmount,
        projectedTotalWithoutInterest,
        incomeCommitmentPercentage: data.investmentPercentage,
      },
    });

    return {
      plan: this.mapPlan(plan),
      alerts: this.getInvestmentAlerts(data.investmentPercentage),
    };
  }

  async list(userId: string) {
    const plans = await prisma.investmentPlan.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return plans.map((plan) => this.mapPlan(plan));
  }

  async getById(userId: string, planId: string) {
    const plan = await prisma.investmentPlan.findFirst({
      where: { id: planId, userId },
    });

    if (!plan) {
      throw new AppError('Plano de investimento nao encontrado.', 404, 'INVESTMENT_PLAN_NOT_FOUND');
    }

    return this.mapPlan(plan);
  }

  async update(userId: string, planId: string, data: InvestmentPlanDto) {
    await this.getById(userId, planId);

    const monthlyIncome = await this.getCurrentMonthlyIncome(userId);
    const monthlyRecommendedAmount = roundMoney((monthlyIncome * data.investmentPercentage) / 100);
    const projectedTotalWithoutInterest = roundMoney(monthlyRecommendedAmount * data.months);

    const plan = await prisma.investmentPlan.update({
      where: { id: planId },
      data: {
        ...data,
        monthlyRecommendedAmount,
        projectedTotalWithoutInterest,
        incomeCommitmentPercentage: data.investmentPercentage,
      },
    });

    return {
      plan: this.mapPlan(plan),
      alerts: this.getInvestmentAlerts(data.investmentPercentage),
    };
  }

  async delete(userId: string, planId: string) {
    await this.getById(userId, planId);
    await prisma.investmentPlan.delete({ where: { id: planId } });
  }

  private getInvestmentAlerts(investmentPercentage: number) {
    return investmentPercentage < MINIMUM_RECOMMENDED_INVESTMENT_PERCENTAGE
      ? ['O ideal e investir pelo menos 5% da renda mensal, se possivel.']
      : ['Parabens por planejar investir pelo menos 5% da sua renda.'];
  }

  private async getCurrentMonthlyIncome(userId: string) {
    const [user, currentBudget] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.budget.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    if (!user) {
      throw new AppError('Usuario nao encontrado.', 404, 'USER_NOT_FOUND');
    }

    return toNumber(currentBudget?.monthlyIncome ?? user.monthlyIncome);
  }

  private mapPlan(plan: {
    id: string;
    investmentPercentage: unknown;
    goal: string;
    months: number;
    profile: string;
    monthlyRecommendedAmount: unknown;
    projectedTotalWithoutInterest: unknown;
    incomeCommitmentPercentage: unknown;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      id: plan.id,
      investmentPercentage: toNumber(plan.investmentPercentage as never),
      goal: plan.goal,
      months: plan.months,
      profile: plan.profile,
      monthlyRecommendedAmount: toNumber(plan.monthlyRecommendedAmount as never),
      projectedTotalWithoutInterest: toNumber(plan.projectedTotalWithoutInterest as never),
      incomeCommitmentPercentage: toNumber(plan.incomeCommitmentPercentage as never),
      createdAt: plan.createdAt,
      updatedAt: plan.updatedAt,
    };
  }
}
