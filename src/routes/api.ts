import { Router } from 'express';

import * as ProdutoController from '../controllers/produto.controller';
import * as CategoryController from '../controllers/cotegory.controller';
import * as TicketController from '../controllers/ticket.controller';
import * as UserController from '../controllers/user.controller';
import * as OrderController from '../controllers/order.controller';
import * as ItemController from '../controllers/item.controller';

const router = Router();

// ENDPOINT PRODUCT
router.get('/product', ProdutoController.all);
router.post('/product', ProdutoController.createTest);

// ENDPOINT CATEGORY
router.get('/category', CategoryController.getAll);
router.get('/category/:id', CategoryController.getById);
router.get(
  '/getProductsByCategoryId/:id',
  CategoryController.getProductsByCategoryId
);

// ENDPOINT TICKET
router.get('/ticket', TicketController.all);
router.get('/ticket/:id', TicketController.getById);
router.post('/ticket', TicketController.create);

// ENDPOINT USER
router.get('/user', UserController.all);
router.post('/user', UserController.create);

// ENDPOINT ORDER
router.get('/order', OrderController.all);
router.get('/order/:date', OrderController.getByDate);
router.get('/order/:number/:date', OrderController.getByNumberAndDate);
router.get('/ordercompleta/:id', OrderController.getCompleteOrderById);
router.get(
  '/orderbystatusanddate/:date/:status',
  OrderController.getByStatusAndDate
);
router.get('/orderwithopenitems/:date', OrderController.getOrderWithOpenItems);
router.get(
  '/notclosed/:status/:number/:date',
  OrderController.getNotStatusByNumberAndDate
);
router.get('/order/parcial/:number/:date', OrderController.getParcial);

router.post('/order', OrderController.create);
router.put('/order/:id', OrderController.update);

// ENDPOINT ITEM
router.get('/item', ItemController.all);
router.get('/item/:id_order', ItemController.getByIdOrder);
router.post('/item', ItemController.create);
router.post('/item/createMany', ItemController.createMany);
router.post('/item/createAndUpdate', ItemController.createAndUpdate);
router.put('/item/updateMany/:id_order', ItemController.updateMany);

export default router;
