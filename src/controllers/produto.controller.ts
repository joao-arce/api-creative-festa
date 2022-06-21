import { Request, Response } from 'express';

import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/produto.service';

export const all = async (req: Request, res: Response) => {
  const products = await ProductService.all();
  res.json({ products });
};

export const create = async (req: Request, res: Response) => {
  const { name, price, initial_date, id_category } = req.body;

  if (name && price && initial_date && id_category) {
    const category = await CategoryService.getById(parseInt(id_category));
    if (category) {
      const product = await ProductService.create({
        name,
        price: parseInt(price),
        initial_date,
        id_category: parseInt(id_category),
      });
      res.json({ product });
    } else {
      res.json({ error: 'Categoria não cadastrada.' });
    }
  } else {
    res.json({ error: 'Dados obrigatórios não preenchidos.' });
  }
};
export const createTest = async (req: Request, res: Response) => {
  const { name, price, initial_date, id_category } = req.body;

  if (name && price && initial_date && id_category) {
    const product = await ProductService.createTest({
      name,
      price: parseInt(price),
      initial_date,
      id_category: parseInt(id_category),
    });
    res.json({ product });
  } else {
    res.json({ error: 'Dados obrigatórios não preenchidos.' });
  }
};
