import { Request, Response } from 'express';

import { ItemService } from '../services/item.service';

const validateFilds = (req: Request) => {
  const { service_time, quantity, id_user, id_order, id_product } = req.body;

  if (service_time && quantity && id_user && id_order && id_product) {
    return true;
  }

  return false;
};

export const all = async (req: Request, res: Response) => {
  const items = await ItemService.all();
  return res.json({ items });
};

export const create = async (req: Request, res: Response) => {
  const { service_time, quantity, id_user, id_order, id_product } = req.body;

  if (validateFilds(req)) {
    const item = await ItemService.create({
      service_time,
      quantity: parseInt(quantity),
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
  const objItems = [
    {
      service_time: '09:12',
      quantity: 1,
      id_user: 3,
      id_order: 2,
      id_product: 4,
    },
    {
      service_time: '09:14',
      quantity: 12,
      id_user: 3,
      id_order: 2,
      id_product: 4,
    },
    {
      service_time: '10:01',
      quantity: 10,
      id_user: 3,
      id_order: 2,
      id_product: 4,
    },
  ];

  // COMO RECEBER ARRAY NO req
  // VALIDAR OS ITENS DO ARRAY
  const items = await ItemService.createMany(objItems);
};

export const getByIdOrder = async (req: Request, res: Response) => {
  const { id_order } = req.params;
  const items = await ItemService.getByIdOrder(parseInt(id_order));
  return res.json({ items });
};
