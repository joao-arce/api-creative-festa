import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type ItemProps = {
  service_time: string;
  quantity: number;
  status: string;
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
      include: { product: true, order: true },
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

  updateMany: async (idOrder: number, status: string) => {
    // console.log('idOrder ', idOrder);
    // console.log('status ', status);

    const updateItems = await prisma.item.updateMany({
      where: {
        id_order: idOrder,
      },
      data: {
        status,
      },
    });
    return updateItems;
  },

  createAndUpdate: async (
    newItems: ItemProps[],
    id_order: number,
    status: string
  ) => {
    const items = prisma.item.createMany({ data: newItems });
    const order = prisma.order.update({
      where: {
        id: id_order,
      },
      data: {
        status,
      },
    });

    // console.log('Teste de funcionamento');
    // console.log('id_order ', id_order);
    // console.log('status ', status);

    // const result = await prisma.$transaction([ItemService, OrderService])
    const result = await prisma.$transaction([items, order]);
    return result;
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
