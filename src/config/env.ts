import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 3333),
  databaseUrl: process.env.DATABASE_URL ?? 'file:./dev.db',
  jwtSecret: process.env.JWT_SECRET ?? 'change-me-in-local-development',
  nodeEnv: process.env.NODE_ENV ?? 'development',
};
