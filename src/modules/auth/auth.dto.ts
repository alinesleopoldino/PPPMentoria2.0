import { z } from 'zod';

export const registerUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  monthlyIncome: z.number().positive(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type RegisterUserDto = z.infer<typeof registerUserSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
