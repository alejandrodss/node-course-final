import express, { Router } from 'express';
import { OrderService } from './order.service';
import { CartService } from '../cart/cart.service';
import { BaseError } from '../exceptions/BaseError';
import { orderJsonResponse } from '../utils/utils';

const OrderController = (orderService: OrderService, cartService: CartService) : Router => {
  const orderRouter: Router = express.Router() ;

  orderRouter.post('/checkout', async (req, res, next) => {
    const userId = req.user.id;
    try {
      const cart = await cartService.getUserCart(userId);
      if(cart.items.length > 0) {
        const order = await orderService.createOrder(userId, cart);
        cartService.deleteUserCart(userId);
        res
        .status(200)
        .send({
          "data": orderJsonResponse(order),
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
    } catch(error) {
      if ((error as BaseError).name === 'CartNotFound') {
        res
          .status(400)
          .send({
            "data": null,
            "error": {
              "message": "Cart is empty"
            }
          });
          return;
      }
      res
        .status(500)
        .send({
          "data": null,
          "error": {
            "message": "Internal Server error"
          }
        });
    }
  });
  return orderRouter;
}

export default OrderController;
