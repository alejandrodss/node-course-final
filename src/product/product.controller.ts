import express, { Express, Router } from 'express';
import { ProductBase } from '../types';
import { ProductService } from './product.service';

const ProductController = (productRepository: ProductBase) : Router => {
  const productRouter: Router = express.Router();
  const productService: ProductService = new ProductService(productRepository);

  productRouter.get('', (req, res, next) => {
    const products = productService.getProducts();
    res
    .status(200)
    .send({
      "data": products,
      "error": null
    });
  });

  productRouter.get('/:productId', (req, res, next) => {
    const productId = req.params.productId;
    try {
      const product = productService.getProduct(productId);
      res
      .status(200)
      .send({
        "data": product,
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
  return productRouter;
}

export default ProductController;