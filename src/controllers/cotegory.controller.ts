import { Request, Response } from 'express';

import { CategoryService } from '../services/category.service';

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await CategoryService.getById(parseInt(id));
  if (category) {
    res.json({ category });
  } else {
    res.json({ message: 'Categoria não encontrada.' });
  }
};

export const getAll = async (req: Request, res: Response) => {
  const categories = await CategoryService.getAll();
  res.json({ categories });
};

export const getProductsByCategoryId = async (req: Request, res: Response) => {
  const { id } = req.params;

  const allProducts = await CategoryService.getProductsByCategoryId(
    parseInt(id)
  );
  res.json({ allProducts });
};
