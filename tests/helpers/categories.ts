import { prisma } from '../../src/config/prisma';

export async function getCategoryByName(name = 'Moradia') {
  const category = await prisma.category.findUnique({ where: { name } });

  if (!category) {
    throw new Error(`Category ${name} not found`);
  }

  return category;
}
