import { Prisma } from '@prisma/client';

export function toNumber(value: Prisma.Decimal | number | string | null | undefined) {
  if (value === null || value === undefined) {
    return 0;
  }

  return Number(value);
}

export function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}
