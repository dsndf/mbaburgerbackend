import express from 'express';
import createdOrder, { deleteOrder, getAllOrders, getSingleOrder, myOrders, updateOrder } from '../controllers/order.js';
import authorization from '../middleware/authorization.js';
import userAuth from '../middleware/userAuth.js';
import asyncError from '../utils/asyncError.js';
const orderRouter = express.Router();

orderRouter.post('/create/order',userAuth,asyncError(createdOrder));
orderRouter.get('/order/:id',asyncError(getSingleOrder));
orderRouter.get('/my/orders',asyncError(myOrders));
orderRouter.get('/admin/orders',userAuth, authorization("admin") ,asyncError(getAllOrders));
orderRouter.put('/admin/update/order/:id',asyncError(updateOrder));
orderRouter.delete('/admin/delete/order/:id',asyncError(deleteOrder));
export default orderRouter;