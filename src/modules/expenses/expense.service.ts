import { prisma } from '../../config/prisma';
import { AppError } from '../../shared/errors/AppError';
import { toNumber } from '../../shared/utils/money';
import { ExpenseDto } from './expense.dto';

export class ExpenseService {
  async create(userId: string, data: ExpenseDto) {
    await this.ensureCategoryExists(data.categoryId);

    const expense = await prisma.expense.create({
      data: {
        ...data,
        userId,
        date: new Date(data.date),
      },
      include: { category: true },
    });

    const alerts = await this.getIncomeAlerts(userId);

    return {
      expense: this.mapExpense(expense),
      alerts,
    };
  }

  async list(userId: string) {
    const expenses = await prisma.expense.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { date: 'desc' },
    });

    return expenses.map((expense) => this.mapExpense(expense));
  }

  async getById(userId: string, expenseId: string) {
    const expense = await prisma.expense.findFirst({
      where: { id: expenseId, userId },
      include: { category: true },
    });

    if (!expense) {
      throw new AppError('Despesa nao encontrada.', 404, 'EXPENSE_NOT_FOUND');
    }

    return this.mapExpense(expense);
  }

  async update(userId: string, expenseId: string, data: ExpenseDto) {
    await this.getById(userId, expenseId);
    await this.ensureCategoryExists(data.categoryId);

    const expense = await prisma.expense.update({
      where: { id: expenseId },
      data: { ...data, date: new Date(data.date) },
      include: { category: true },
    });

    const alerts = await this.getIncomeAlerts(userId);

    return {
      expense: this.mapExpense(expense),
      alerts,
    };
  }

  async delete(userId: string, expenseId: string) {
    await this.getById(userId, expenseId);
    await prisma.expense.delete({ where: { id: expenseId } });
  }

  private async ensureCategoryExists(categoryId: string) {
    const category = await prisma.category.findUnique({ where: { id: categoryId } });

    if (!category) {
      throw new AppError('Categoria nao encontrada.', 404, 'CATEGORY_NOT_FOUND');
    }
  }

  private async getIncomeAlerts(userId: string) {
    const [user, expenses] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.expense.findMany({ where: { userId } }),
    ]);

    const totalExpenses = expenses.reduce((total, expense) => total + toNumber(expense.amount), 0);
    const monthlyIncome = toNumber(user?.monthlyIncome);

    if (monthlyIncome > 0 && totalExpenses > monthlyIncome) {
      return ['Seu total de despesas ultrapassou a renda mensal, indicando desequilibrio financeiro.'];
    }

    return [];
  }

  private mapExpense(expense: {
    id: string;
    description: string;
    amount: unknown;
    date: Date;
    type: string;
    categoryId: string;
    category?: { id: string; name: string } | null;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      id: expense.id,
      description: expense.description,
      amount: toNumber(expense.amount as never),
      date: expense.date,
      type: expense.type,
      category: expense.category
        ? { id: expense.category.id, name: expense.category.name }
        : { id: expense.categoryId },
      createdAt: expense.createdAt,
      updatedAt: expense.updatedAt,
    };
  }
}
