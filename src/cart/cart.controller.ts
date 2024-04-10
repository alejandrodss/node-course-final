import express, { Express, Handler, Router } from 'express';
import { CartBase, ProductBase, UpdateCartRequestBody } from '../types';
import { CartService } from './cart.service';

const CartController = (cartRepository: CartBase, productRepository: ProductBase, middleware: Handler) : Router => {
  const cartRouter: Router = express.Router();
  const cartService: CartService = new CartService(cartRepository);

  cartRouter.get('/cart', (req, res, next) => {
    const userId = req.get('x-user-id');
    const cart = cartService.getUserCart(userId as string);
    res
      .status(200)
      .send({
        "data": cart,
        "error": null
      });
  });

  cartRouter.put('/cart', middleware ,(req, res, next) => {
    const { productId, count } = req.body as UpdateCartRequestBody;
    const userId = req.get('x-user-id') as string;
    try {
      const availableProducts = productRepository.listProducts();
      const cart = cartService.updateUserCart(userId, productId, count, availableProducts);
      res
        .status(200)
        .send({
          "data": cart,
          "error": null
        });
    } catch (error) {
      if ((error as Error).message === 'Cart not found') {
        res
          .status(404)
          .send({
            "data": null,
            "error": {
              "message": "Cart was not found"
            }
          })
      } else {
        res
          .status(400)
          .send({
            "data": null,
            "error": {
              "message": "Products are not valid"
            }
          });
      }
    }
  });

  cartRouter.delete('/cart', (req, res, next) => {
    const userId = req.get('x-user-id') as string;
    try {
      cartService.deleteUserCart(userId);
      res
        .status(200)
        .send({
          "data": {
            "success": true
          },
          "error": null
        });
    } catch(error) {
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
  return cartRouter;
}

export default CartController;
