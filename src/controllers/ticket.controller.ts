import { Request, Response } from 'express';

import { TicketService } from '../services/ticket.service';

const validateFilds = (req: Request) => {
  const { description, adult_price, kid_price, initial_date } = req.body;
  if (description && adult_price && kid_price && initial_date) {
    return true;
  }

  return false;
};

export const all = async (req: Request, res: Response) => {
  const tickets = await TicketService.all();
  return res.json({ tickets });
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const ticket = await TicketService.getById(parseInt(id));
  return res.json({ ticket });
};

export const create = async (req: Request, res: Response) => {
  const { description, adult_price, kid_price, initial_date } = req.body;

  if (validateFilds(req)) {
    const ticket = await TicketService.create({
      description,
      adult_price: parseInt(adult_price),
      kid_price: parseInt(kid_price),
      initial_date,
    });
    res.json({ ticket });
  } else {
    res.json({ error: 'Dados obrigatórios não preenchidos.' });
  }
};
