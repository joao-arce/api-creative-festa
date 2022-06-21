import { Request, Response } from 'express';

import { OrderService } from '../services/order.service';

type OrderProps = {
  id: number;
  number: number;
  client_name: string;
  date: string;
  adult_qtd: number;
  kid_qtd: number;
  status: string;
  id_ticket: number;
};
const CRIADA = 'criada';
const ABERTA = 'aberta';
const FECHADA = 'fechada';
const ALL = 'all';

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

const ordersOpenAndCreate = (orders: OrderProps[]) => {
  const ordersFiltered = orders.filter((order) => {
    if (order.status === CRIADA || order.status === ABERTA) {
      return order;
    }
  });
  return ordersFiltered;
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

export const getParcial = async (req: Request, res: Response) => {
  const { number, date } = req.params;
  const order = await OrderService.getParcial(parseInt(number), date);
  return res.json({ order });
};

export const getNotStatusByNumberAndDate = async (
  req: Request,
  res: Response
) => {
  const { status, number, date } = req.params;
  // console.log('chegou aqui');
  const order = await OrderService.getNotStatusByNumberAndDate(
    status,
    parseInt(number),
    date
  );
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

const getStatus = (status: string) => {
  switch (status) {
    case 'aberta':
      return ABERTA;
      break;
    case 'criada':
      return CRIADA;
      break;
    case 'fechada':
      return FECHADA;
      break;
    default:
      return ALL;
  }
};

export const getByStatusAndDate = async (req: Request, res: Response) => {
  const { date, status } = req.params;
  const result = await OrderService.getByDate(date);

  const typeStatus = getStatus(status);

  const orders = result.filter((order) => {
    if (typeStatus !== ALL) {
      if (order.status === typeStatus) {
        return order;
      }
    } else {
      return order;
    }
  });

  return res.json({ orders });
};

export const getOrderWithOpenItems = async (req: Request, res: Response) => {
  const { date } = req.params;
  // console.log('getOrderWithOpenItems ', date);
  const orders = await OrderService.getOrderWithOpenItems(date);
  return res.json({ orders });
};
