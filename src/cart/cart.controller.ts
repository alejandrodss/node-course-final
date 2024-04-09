import express, { Express, Router } from 'express';
import { CartBase, ProductBase, UpdateCartRequestBody } from '../types';
import { CartService } from './cart.service';

const CartController = (cartRepository: CartBase, productRepository: ProductBase) : Router => {
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

  cartRouter.put('/cart', (req, res, next) => {
    const { productId, count} = req.body() as UpdateCartRequestBody;
    const userId = req.get('x-user-id') as string;
    try {
      const availableProducts = productRepository.listProducts();
      const cart = cartService.updateUserCart(userId, productId, count, availableProducts);
      res
        .status(200)
        .send({
          "data": JSON.stringify(cart),
          "error": null
        });
    } catch (error) {
      console.log(error);
      res
        .status(404)
        .send({
          "data": null,
          "error": {
            "message": "No product with such id"
          }
        });
    }
  });

  cartRouter.delete('/api/profile/cart', (req, res, next) => {
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
