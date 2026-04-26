import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultCategories = [
  'Moradia',
  'Alimentacao',
  'Transporte',
  'Saude',
  'Estudos',
  'Lazer',
  'Investimentos',
  'Reserva de emergencia',
  'Outros',
];

async function main() {
  await Promise.all(
    defaultCategories.map((name) =>
      prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
