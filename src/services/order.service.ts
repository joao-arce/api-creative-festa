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
  id_cashier: number;
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
  getParcial: async (number: number, date: string) => {
    // console.log('getParcial');
    const orders = await prisma.order.findFirst({
      where: {
        AND: {
          number,
          date,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        ticket: true,
      },
    });
    return orders;
  },
  getNotStatusByNumberAndDate: async (
    status: string,
    number: number,
    date: string
  ) => {
    // console.log('status', status);
    // console.log('number', number);
    // console.log('date ', date);

    const orders = await prisma.order.findFirst({
      where: {
        number,
        date,
        status: {
          not: status,
        },
      },
    });
    // console.log('PRINT', orders);
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

  getOrderItemByDate: async (date: string) => {
    const orders = await prisma.order.findMany({
      where: {
        date,
      },
      include: {
        ticket: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    return orders;
  },

  getOrderWithOpenItems: async (date: string) => {
    const orders = await prisma.order.findMany({
      where: {
        date,
        status: 'aberta',

        // status: {
        //   not: 'fechada',
        // },
        items: {
          some: {
            status: 'aberto',
          },
        },
      },
    });
    return orders;
  },
};
