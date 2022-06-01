import { Router, Request, Response } from 'express';

import * as TodoController from '../controllers/todo.controller';

const router = Router();

router.get('/todo', TodoController.all);
router.get('/todo/:id', TodoController.getTodoById);
router.post('/todo', TodoController.add);
router.put('/todo/:id', TodoController.update);
router.delete('/todo/:id', TodoController.remove);

export default router;
