import express, { Router } from 'express';
import { OrderService } from './order.service';
import { CartService } from '../cart/cart.service';

const OrderController = (orderService: OrderService, cartService: CartService) : Router => {
  const orderRouter: Router = express.Router() ;

  orderRouter.post('/checkout', (req, res, next) => {
    const userId = req.get('x-user-id') as string;
    const cart = cartService.getUserCart(userId);
    if(cart.items.length > 0) {
      const order = orderService.createOrder(userId, cart);
      cartService.deleteUserCart(userId);
      res
      .status(200)
      .send({
        "data": {
          order
        },
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
