import { Request, Response } from 'express';

import { OrderService } from '../services/order.service';

const validateFilds = (req: Request) => {
  const { number, date, id_ticket } = req.body;

  if (number && date && id_ticket) {
    return true;
  }

  return false;
};

const isOrderUnique = async (number: number, date: string) => {
  const order = await OrderService.getByNumberAndDate(number, date);
  if (!order) {
    return true;
  } else {
    return false;
  }
};

export const all = async (req: Request, res: Response) => {
  const orders = await OrderService.all();
  return res.json({ orders });
};

export const create = async (req: Request, res: Response) => {
  const { number, client_name, date, adult_qtd, kid_qtd, status, id_ticket } =
    req.body;
  // console.log(req.body);
  if (validateFilds(req)) {
    const isUnique = await isOrderUnique(+number, date);
    if (isUnique) {
      const order = await OrderService.create({
        number: parseInt(number),
        client_name,
        date,
        adult_qtd: adult_qtd === undefined ? 0 : parseInt(adult_qtd),
        kid_qtd: kid_qtd === undefined ? 0 : parseInt(kid_qtd),
        status: status === undefined ? 'criada' : status,
        id_ticket: parseInt(id_ticket),
      });
      res.json({ order });
    } else {
      res.json({ message: 'Jà existe comanda com esse número nessa data.' });
    }
  } else {
    res.json({ error: 'Dados obrigatórios não preenchidos.' });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await OrderService.update(parseInt(id), status);
  res.json({ order });
};

export const getByNumberAndDate = async (req: Request, res: Response) => {
  const { number, date } = req.params;
  const order = await OrderService.getByNumberAndDate(parseInt(number), date);
  return res.json({ order });
};

export const getCompleteOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await OrderService.getCompleteOrderById(parseInt(id));
  return res.json({ order });
  // return res.json({ teste: 'agora foi' });
};

export const getByDate = async (req: Request, res: Response) => {
  const { date } = req.params;
  const orders = await OrderService.getByDate(date);
  return res.json({ orders });
};
