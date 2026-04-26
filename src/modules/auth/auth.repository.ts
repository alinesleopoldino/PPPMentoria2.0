import { PrismaClient } from '@prisma/client';
import { prisma } from '../../config/prisma';
import { RegisterUserDto } from './auth.dto';

export class AuthRepository {
  constructor(private readonly database: PrismaClient = prisma) {}

  findUserByEmail(email: string) {
    return this.database.user.findUnique({ where: { email } });
  }

  createUser(data: RegisterUserDto & { passwordHash: string }) {
    return this.database.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash,
        monthlyIncome: data.monthlyIncome,
      },
    });
  }
}
