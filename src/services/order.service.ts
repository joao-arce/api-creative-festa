import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type OrderProps = {
  number: number;
  client_name: string;
  date: string;
  adult_qtd: number;
  kid_qtd: number;
  status: string;
  id_ticket: number;
};

export const OrderService = {
  all: async () => {
    const orders = await prisma.order.findMany();
    return orders;
  },

  create: async (newOrder: OrderProps) => {
    const order = await prisma.order.create({ data: newOrder });
    return order;
  },

  update: async (id: number, status: string) => {
    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
    return order;
  },

  getByNumberAndDate: async (number: number, date: string) => {
    const orders = await prisma.order.findFirst({
      where: {
        AND: {
          number,
          date,
        },
      },
    });
    return orders;
  },

  getCompleteOrderById: async (id: number) => {
    const orders = await prisma.order.findFirst({
      where: {
        id,
      },
      include: {
        ticket: {
          select: {
            description: true,
            adult_price: true,
            kid_price: true,
          },
        },
      },
    });
    return orders;
  },
  getByDate: async (date: string) => {
    const orders = await prisma.order.findMany({
      where: {
        date,
      },
      orderBy: {
        number: 'desc',
      },
    });
    return orders;
  },
};
