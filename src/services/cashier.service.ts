import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type CashierProps = {
  id?: number;
  open_date: string;
  open_time: string;
  close_date?: string;
  close_time?: string;
  order_sum?: number;
  cash_desk_value?: number;
  description?: string;
  id_user_open: number;
  id_user_close?: number;
};

export const CashierService = {
  create: async (newCashier: CashierProps) => {
    try {
      const cashier = await prisma.cashier.create({ data: newCashier });
      return cashier;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  close: async (cashier: CashierProps) => {
    const dateParam =
      cashier.open_date !== null && cashier.open_date !== undefined
        ? cashier.open_date
        : '';
    try {
      const updateCashier = await prisma.cashier.updateMany({
        where: {
          open_date: dateParam,
        },
        data: {
          close_date: cashier.close_date,
          close_time: cashier.close_time,
          order_sum: cashier.order_sum,
          description: cashier.description,
          cash_desk_value: cashier.cash_desk_value,
          id_user_close: cashier.id_user_close,
        },
      });
      return updateCashier;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getByDate: async (date: string) => {
    try {
      // console.log('ze 01');
      const cashier = await prisma.cashier.findFirst({
        where: {
          open_date: date,
        },
      });
      // console.log('ze 02');

      return cashier;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
