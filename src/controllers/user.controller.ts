import { Request, Response } from 'express';

import { UserService } from '../services/user.service';

const validateFilds = (req: Request) => {
  const { name, user_name, password, position } = req.body;

  if (name && user_name && password && position) {
    return true;
  }

  return false;
};

export const all = async (req: Request, res: Response) => {
  const users = await UserService.all();
  return res.json({ users });
};

export const create = async (req: Request, res: Response) => {
  const { name, user_name, password, token, position } = req.body;

  if (validateFilds(req)) {
    const user = await UserService.create({
      name,
      user_name,
      password,
      token,
      position: parseInt(position),
    });
    res.json({ user });
  } else {
    res.json({ error: 'Dados obrigatórios não preenchidos.' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { user_name, password } = req.params;
  const user = await UserService.login(user_name, password);
  return res.json({ user });
};
