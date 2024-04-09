import express, { Express, Router } from 'express';
import { CartBase, OrderBase } from '../types';
import { OrderService } from './order.service';

const OrderController = (orderRepository: OrderBase, cartRepository: CartBase) : Router => {
  const orderRouter: Router = express.Router() ;
  const orderService: OrderService = new OrderService(orderRepository);

  orderRouter.post('/checkout', (req, res, next) => {
    const userId = req.get('x-user-id') as string;
    const cart = cartRepository.getCart(userId);
    if(cart.items.length > 0) {
      const order = orderService.createOrder(userId, cart);
      res
      .status(200)
      .send({
        "data": JSON.stringify(order),
        "error": null
      });
    } else {
      res
      .status(400)
      .send({
        "data": null,
        "error": {
          "message": "Cart is empty"
        }
      });
    }
  });
  return orderRouter;
}

export default OrderController;
