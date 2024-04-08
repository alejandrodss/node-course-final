import express, { Express, Router } from 'express';
import { CartBase, ProductBase, UpdateCartRequestBody } from '../types';
import { CartService } from './cart.service';

export class CartController {
  app: Express;
  cartRouter: Router;
  cartService: CartService;
  productRepository: ProductBase;

  constructor(app: Express, cartRepository: CartBase, productRepository: ProductBase) {
    this.app = app;
    this.cartRouter = express.Router();
    this.cartService = new CartService(cartRepository);
    this.productRepository = productRepository;
  }

  cartRoutes(): Router {
    this.cartRouter.get('/api/profile/cart', (req, res, next) => {
      const userId = req.get('x-user-id');
      const cart = this.cartService.getUserCart(userId as string);
      res
        .status(200)
        .send({
          "data": cart,
          "error": null
        });
    });

    this.cartRouter.put('/api/profile/cart', (req, res, next) => {
      const { productId, count} = req.body() as UpdateCartRequestBody;
      const userId = req.get('x-user-id') as string;
      try {
        const availableProducts = this.productRepository.listProducts();
        const cart = this.cartService.updateUserCart(userId, productId, count, availableProducts);
        res
          .status(200)
          .send({
            "data": JSON.stringify(cart),
            "error": null
          });
      } catch (error) {
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
    return this.cartRouter;
  }
}