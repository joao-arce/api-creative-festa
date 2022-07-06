import { Request, Response } from 'express';

import { ItemService } from '../services/item.service';

const validateFilds = (req: Request) => {
  const { service_time, quantity, status, id_user, id_order, id_product } =
    req.body;

  if (service_time && quantity && status && id_user && id_order && id_product) {
    return true;
  }

  return false;
};

export const all = async (req: Request, res: Response) => {
  const items = await ItemService.all();
  return res.json({ items });
};

export const create = async (req: Request, res: Response) => {
  const { service_time, quantity, status, id_user, id_order, id_product } =
    req.body;

  if (validateFilds(req)) {
    const item = await ItemService.create({
      service_time,
      quantity: parseInt(quantity),
      status: status === undefined ? 'aberto' : status,
      id_user: parseInt(id_user),
      id_order: parseInt(id_order),
      id_product: parseInt(id_product),
    });
    res.json({ item });
  } else {
    res.json({ error: 'Dados obrigatórios não preenchidos.' });
  }
};

export const createMany = async (req: Request, res: Response) => {
  type NewItem = {
    service_time: string;
    quantity: number;
    status: string;
    id_user: number;
    id_order: number;
    id_product: number;
  };

  const newItems: NewItem[] = req.body.map((element: NewItem) => element);
  // console.log('newItems ', newItems);
  const items = await ItemService.createMany(newItems);
  // console.log('Qtd de Items criados ', items);

  res.json({ items });
};

export const updateMany = async (req: Request, res: Response) => {
  const { id_order } = req.params;
  const { status } = req.body;
  const items = await ItemService.updateMany(parseInt(id_order), status);
  res.json({ items });
};

export const getByIdOrder = async (req: Request, res: Response) => {
  const { id_order } = req.params;
  const items = await ItemService.getByIdOrder(parseInt(id_order));
  // console.log('items', items);
  return res.json({ items });
};

export const createAndUpdate = async (req: Request, res: Response) => {
  type NewItem = {
    service_time: string;
    quantity: number;
    status: string;
    id_user: number;
    id_order: number;
    id_product: number;
  };

  const newItems: NewItem[] = req.body.map((element: NewItem) => element);

  const { id_order } = newItems[0];
  const status = 'aberta';

  // console.log('createAndUpdate');
  // console.log('newItems ', newItems);
  // console.log('id_order ', id_order);
  // console.log('status ', status);

  // res.json({ message: 'teste' });

  const items = ItemService.createAndUpdate(newItems, id_order, status);

  // const result = await prisma.$transaction([createTwo, createOne])

  res.json({ items });
};
