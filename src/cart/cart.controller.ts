import express, { Router, NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { Cart, UpdateCartRequestBody } from '../types';
import { CartService } from './cart.service';
import { calculateTotal, itemsJsonResponse } from '../utils/utils';
import { ProductService } from '../product/product.service';
import { BaseError } from '../exceptions/BaseError';

const CartController = (cartService: CartService, productService: ProductService) : Router => {
  const cartRouter: Router = express.Router();

  const putCartSchema = Joi.object({
    productId: Joi.string().uuid().required(),
    count: Joi.number().integer().min(0).required()
  });

  const validatePutCartBody = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      await putCartSchema.validateAsync(req.body);
      next();
    } catch (err) {
      console.log("logging there", err)
      res.status(400).send({
        "data": null,
        "error": {
          "message": "Products are not valid"
        }
      });
    }
  };

  const cartJsonResponse = (cart : Cart) : object => {
    return ({
      "data": {
        "cart": {
          "id": cart.id,
          "items": itemsJsonResponse(cart.items)
        },
        "total": calculateTotal(cart.items)
      },
      "error": null
    });
  };

  cartRouter.get('/cart', async (req, res, next) => {
    const userId = req.get('x-user-id');
    try  {
      const cart = await cartService.getOrCreateUserCart(userId as string);
      res
        .status(200)
        .send(cartJsonResponse(cart));
    } catch(err) {
      res
        .status((err as BaseError).status)
        .send({
          "data": null,
          "error": {
            "message": (err as BaseError).message
          }
        })
    }
  });

  cartRouter.put('/cart', validatePutCartBody ,async (req, res, next) => {
    const { productId, count } = req.body as UpdateCartRequestBody;
    const userId = req.get('x-user-id') as string;
    try {
      const cart = await cartService.updateUserCart(userId, productId, count, productService);
      res
        .status(200)
        .send(cartJsonResponse(cart));
    } catch (error) {
      console.log(error);
      if ((error as Error).name === 'CartNotFound') {
        res
          .status(404)
          .send({
            "data": null,
            "error": {
              "message": "Cart was not found"
            }
          })
      } else if ((error as Error).name === 'ProductNotValid'){
        res
          .status(400)
          .send({
            "data": null,
            "error": {
              "message": "Products are not valid"
            }
          });
      } else {
        res
          .status(500)
          .send({
            "data": null,
            "error": {
              "message": "Internal Server error"
            }
          });
      }
    }
  });

  cartRouter.delete('/cart', async (req, res, next) => {
    const userId = req.get('x-user-id') as string;
    try {
      await cartService.deleteUserCart(userId);
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
