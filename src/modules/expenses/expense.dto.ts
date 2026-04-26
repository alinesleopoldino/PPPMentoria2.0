import { z } from 'zod';
import { EXPENSE_TYPES } from '../../shared/constants/financial';

export const expenseSchema = z.object({
  description: z.string().min(2),
  amount: z.number().positive(),
  categoryId: z.string().min(1),
  date: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  type: z.enum(EXPENSE_TYPES),
});

export const expenseParamsSchema = z.object({
  id: z.string().min(1),
});

export type ExpenseDto = z.infer<typeof expenseSchema>;
