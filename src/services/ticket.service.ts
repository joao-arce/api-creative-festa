import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type TicketProps = {
  description: string;
  adult_price: number;
  kid_price: number;
  initial_date: string;
};

export const TicketService = {
  all: async () => {
    const tickets = await prisma.ticket.findMany();
    return tickets;
  },
  getById: async (id: number) => {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id,
      },
    });
    return ticket;
  },
  create: async (newTicket: TicketProps) => {
    const ticket = await prisma.ticket.create({ data: newTicket });
    return ticket;
  },
};
