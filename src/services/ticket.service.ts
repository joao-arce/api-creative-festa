import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

type TicketProps = {
  description: string;
  adult_price?: number;
  kid_price?: number;
  combo_price?: number;
  initial_date: string;
  final_date?: string;
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

  close: async (id: number, final_date: string) => {
    try {
      const updateTicket = await prisma.ticket.update({
        where: {
          id: id,
        },
        data: {
          final_date: final_date,
        },
      });

      return updateTicket;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          console.log(e.message);
        }
      }
      return e;
    }
  },
};
