import { Router } from 'express';
import { authRoutes } from './modules/auth/auth.routes';
import { budgetRoutes } from './modules/budgets/budget.routes';
import { categoryRoutes } from './modules/categories/category.routes';
import { dashboardRoutes } from './modules/dashboard/dashboard.routes';
import { expenseRoutes } from './modules/expenses/expense.routes';
import { healthRoutes } from './modules/health/health.routes';
import { investmentRoutes } from './modules/investments/investment.routes';
import { motivationalQuotesRoutes } from './modules/motivationalQuotes/motivationalQuotes.routes';

export const routes = Router();

routes.use('/health', healthRoutes);
routes.use('/auth', authRoutes);
routes.use('/budgets', budgetRoutes);
routes.use('/categories', categoryRoutes);
routes.use('/expenses', expenseRoutes);
routes.use('/investments', investmentRoutes);
routes.use('/dashboard', dashboardRoutes);
routes.use('/motivational-quotes', motivationalQuotesRoutes);
