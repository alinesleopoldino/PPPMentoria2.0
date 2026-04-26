import { z } from 'zod';

export const budgetSchema = z.object({
  monthlyIncome: z.number().positive(),
  investmentPercentage: z.number().min(0).max(100),
  fixedExpenses: z.number().min(0),
  health: z.number().min(0),
  education: z.number().min(0),
  leisure: z.number().min(0),
  freeReserve: z.number().min(0),
});

export const budgetParamsSchema = z.object({
  id: z.string().min(1),
});

export type BudgetDto = z.infer<typeof budgetSchema>;
