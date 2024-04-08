import express, { Express, Router } from 'express';
import { ProductBase } from '../types';
import { ProductService } from './product.service';

export class ProductController {
  app: Express;
  productRouter: Router;
  productService: ProductService;

  constructor(app: Express, productRepository: ProductBase) {
    this.app = app;
    this.productRouter = express.Router();
    this.productService = new ProductService(productRepository);
  }

  productRoutes(): Router {
    this.productRouter.get('/api/products', (req, res, next) => {
      const products = this.productService.getProducts();
      res
      .status(200)
      .send({
        "data": products,
        "error": null
      });
    });

    this.productRouter.get('/api/products/:productId', (req, res, next) => {
      const productId = req.params.productId;
      try {
        const product = this.productService.getProduct(productId);
        res
        .status(200)
        .send({
          "data": JSON.stringify(product),
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
    return this.productRouter;
  }
}