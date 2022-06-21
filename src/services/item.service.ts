import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type ItemProps = {
  service_time: string;
  quantity: number;
  id_user: number;
  id_order: number;
  id_product: number;
};

export const ItemService = {
  all: async () => {
    const items = await prisma.item.findMany();
    return items;
  },
  getByIdOrder: async (idOrder: number) => {
    const items = await prisma.item.findMany({
      where: {
        id_order: idOrder,
      },
      include: { product: true },
    });
    return items;
  },
  create: async (newItem: ItemProps) => {
    const item = await prisma.item.create({ data: newItem });
    return item;
  },
  createMany: async (newItems: ItemProps[]) => {
    const items = await prisma.item.createMany({ data: newItems });
    return items;
  },
};

//  = await prisma.user.createMany({
//   data: [
//     { name: 'Bob', email: 'bob@prisma.io' },
//     { name: 'Bobo', email: 'bob@prisma.io' }, // Duplicate unique key!
//     { name: 'Yewande', email: 'yewande@prisma.io' },
//     { name: 'Angelique', email: 'angelique@prisma.io' },
//   ],
//   skipDuplicates: true, // Skip 'Bobo'
