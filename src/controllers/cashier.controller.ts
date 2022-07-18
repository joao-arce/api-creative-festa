import { Request, Response } from 'express';
import { CashierService } from '../services/cashier.service';

// open_time: string;
// open_date: string;
// close_date?: string;
// close_time?: string;
// order_sum?: number;
// cash_desk_value?: number;
// description?: string;
// id_user_open: number;
// id_user_close?: number;

let msg = '';

const validateCreateFields = (req: Request) => {
  const { open_time, open_date, id_user_open } = req.body;
  if (open_date && open_time && id_user_open) return true;
  return false;
};
const validateCloseFields = (req: Request) => {
  const {
    open_date,
    close_date,
    close_time,
    order_sum,
    cash_desk_value,
    id_user_close,
  } = req.body;

  // console.log('open_date: ', open_date);
  // console.log('close_date: ', close_date);
  // console.log('close_time: ', close_time);
  // console.log('order_sum: ', order_sum);
  // console.log('cash_desk_value: ', cash_desk_value);
  // console.log('id_user_close: ', id_user_close);

  if (
    open_date &&
    close_date &&
    close_time &&
    order_sum &&
    cash_desk_value &&
    id_user_close
  )
    return true;
  return false;
};

const formatCloseCashier = (req: Request) => {
  const {
    open_date,
    close_date,
    close_time,
    order_sum,
    cash_desk_value,
    description,
    id_user_close,
  } = req.body;

  const updatedOne = {
    open_time: '',
    id_user_open: 0,
    open_date: open_date === undefined ? '' : open_date,
    close_date: close_date === undefined ? '' : close_date,
    close_time: close_time === undefined ? '' : close_time,
    order_sum: order_sum === undefined ? 0 : parseInt(order_sum),
    cash_desk_value:
      cash_desk_value === undefined ? 0 : parseInt(cash_desk_value),
    description: description === undefined ? '' : description,
    id_user_close: id_user_close === undefined ? 0 : parseInt(id_user_close),
  };
  return updatedOne;
};

const formatNewCashier = (req: Request) => {
  const { open_time, open_date, id_user_open } = req.body;

  const newOne = {
    open_time,
    open_date,
    id_user_open: parseInt(id_user_open),
  };
  return newOne;
};

export const create = async (req: Request, res: Response) => {
  if (validateCreateFields(req)) {
    const newCashier = formatNewCashier(req);
    const cashier = await CashierService.create(newCashier);
    res.json({ cashier });
  } else {
    res.json({ error: 'Dados obrigatórios não preenchidos.' });
  }
};

export const close = async (req: Request, res: Response) => {
  if (validateCloseFields(req)) {
    const updateCashier = formatCloseCashier(req);
    const cashier = await CashierService.close(updateCashier);
    res.json({ cashier });
  } else {
    res.json({ error: 'Dados obrigatórios não preenchidos.' });
  }
};

export const getByDate = async (req: Request, res: Response) => {
  const { date } = req.params;
  // console.log('VAmos ver ');
  // console.log('date ', date);
  const cashier = await CashierService.getByDate(date);
  // console.log('cashier', cashier);
  res.json({ cashier });
};
