import { z } from 'zod';
import { INVESTMENT_PROFILES } from '../../shared/constants/financial';

export const investmentPlanSchema = z.object({
  investmentPercentage: z.number().min(0).max(100),
  goal: z.string().min(2),
  months: z.number().int().positive(),
  profile: z.enum(INVESTMENT_PROFILES),
});

export const investmentPlanParamsSchema = z.object({
  id: z.string().min(1),
});

export type InvestmentPlanDto = z.infer<typeof investmentPlanSchema>;
