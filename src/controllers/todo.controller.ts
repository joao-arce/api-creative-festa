import { Request, Response } from 'express';

import { Todo } from '../models/Todo';

export const add = async (req: Request, res: Response) => {
  const { title, done } = req.body;

  if (title) {
    const newTodo = await Todo.create({ title, done: done ? true : false });

    res.status(201);
    res.json({ item: newTodo });
  } else {
    res.json({ error: 'Título da tarefa obrigatório!' });
  }
};

export const all = async (req: Request, res: Response) => {
  const list = await Todo.findAll();

  res.json({ list });
};

export const getTodoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = await Todo.findByPk(id);
  if (todo) {
    res.json({ todo });
  } else {
    res.json({ error: 'Tarefa não encontrada!' });
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, done } = req.body;

  let todo = await Todo.findByPk(id);

  if (!todo) {
    res.json({ error: 'Tarefa não encontrada !' });
  } else {
    if (title) todo.title = title;
    if (done) {
      switch (done.toString().toLowerCase()) {
        case 'true':
        case '1':
          todo.done = true;
          break;

        case 'false':
        case '0':
          todo.done = false;
          break;
      }
    }

    await todo.save();
    res.json({ todo });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  const todo = await Todo.findByPk(id);
  if (todo) await todo.destroy();

  res.json({});
};
