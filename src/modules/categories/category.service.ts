import { prisma } from '../../config/prisma';
import { DEFAULT_CATEGORIES } from '../../shared/constants/financial';

export class CategoryService {
  async list() {
    await this.ensureDefaultCategories();
    return prisma.category.findMany({ orderBy: { name: 'asc' } });
  }

  async ensureDefaultCategories() {
    await Promise.all(
      DEFAULT_CATEGORIES.map((name) =>
        prisma.category.upsert({
          where: { name },
          update: {},
          create: { name },
        }),
      ),
    );
  }
}
