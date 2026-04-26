import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import { AppError } from '../../shared/errors/AppError';
import { toNumber } from '../../shared/utils/money';
import { LoginDto, RegisterUserDto } from './auth.dto';
import { AuthRepository } from './auth.repository';

export class AuthService {
  constructor(private readonly authRepository = new AuthRepository()) {}

  async register(data: RegisterUserDto) {
    const userAlreadyExists = await this.authRepository.findUserByEmail(data.email);

    if (userAlreadyExists) {
      throw new AppError('E-mail ja esta em uso.', 409, 'EMAIL_ALREADY_EXISTS');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await this.authRepository.createUser({ ...data, passwordHash });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      monthlyIncome: toNumber(user.monthlyIncome),
      createdAt: user.createdAt,
    };
  }

  async login(data: LoginDto) {
    const user = await this.authRepository.findUserByEmail(data.email);

    if (!user) {
      throw new AppError('E-mail ou senha invalidos.', 401, 'INVALID_CREDENTIALS');
    }

    const passwordMatches = await bcrypt.compare(data.password, user.passwordHash);

    if (!passwordMatches) {
      throw new AppError('E-mail ou senha invalidos.', 401, 'INVALID_CREDENTIALS');
    }

    const token = jwt.sign({ email: user.email }, env.jwtSecret, {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        monthlyIncome: toNumber(user.monthlyIncome),
      },
    };
  }
}
