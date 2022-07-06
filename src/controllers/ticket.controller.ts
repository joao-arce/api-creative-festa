import { Request, Response } from 'express';

import { TicketService } from '../services/ticket.service';

const getTicketValue = (field: string) => {
  return field === undefined || field === null || field === '' ? 0 : +field;
};

const validateFilds = (req: Request) => {
  const { description, initial_date } = req.body;
  if (description && initial_date) {
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
  const { description, adult_price, kid_price, combo_price, initial_date } =
    req.body;

  // res.json({ message: 'estamos testando' });

  if (validateFilds(req)) {
    const ticket = await TicketService.create({
      description,
      adult_price: getTicketValue(adult_price),
      kid_price: getTicketValue(kid_price),
      combo_price: getTicketValue(combo_price),
      initial_date,
    });
    res.json({ ticket });
  } else {
    res.json({ error: 'Dados obrigatórios não preenchidos.' });
  }
};

export const close = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { final_date } = req.body;

  // console.log('id ', id);
  // console.log('final_date ', final_date);

  const ticket = await TicketService.close(parseInt(id), final_date);
  res.json({ ticket });
};
