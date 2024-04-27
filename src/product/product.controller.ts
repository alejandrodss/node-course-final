import express, { Router } from 'express';
import { ProductService } from './product.service';
import { productJsonResponse } from '../utils/utils';

const ProductController = (productService: ProductService) : Router => {
  const productRouter: Router = express.Router();

  productRouter.get('/', async (req, res, next) => {
    const products = await productService.getProducts();
    res
    .status(200)
    .send({
      "data": products.map(product => productJsonResponse(product)),
      "error": null
    });
  });

  productRouter.get('/:productId', async (req, res, next) => {
    const productId = req.params.productId;
    try {
      const product = await productService.getProduct(productId);
      res
      .status(200)
      .send({
        "data": productJsonResponse(product),
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