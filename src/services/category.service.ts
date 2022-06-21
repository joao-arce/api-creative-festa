import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const CategoryService = {
  getAll: async () => {
    const categories = await prisma.category.findMany();
    return categories;
  },
  getById: async (id: number) => {
    const category = await prisma.category.findUnique({ where: { id } });
    return category;
  },
  getProductsByCategoryId: async (id: number) => {
    const category = await prisma.category.findFirst({
      where: {
        id,
      },
      include: { products: true },
    });
    return category;
  },
};
