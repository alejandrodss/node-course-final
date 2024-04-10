import express, { Request, Response, NextFunction} from 'express';
import Joi from 'joi';

import Datasource from './src/Datasource';
import UserController from './src/user/user.controller';
import ProductController from './src/product/product.controller';
import CartController from './src/cart/cart.controller';
import OrderController from './src/order/order.controller';

import { UserRepository } from './src/user/user.repository';
import { ProductRepository } from './src/product/product.repository';
import { CartRepository } from './src/cart/cart.repository';
import { OrderRepostiory } from './src/order/order.repository';

import { UserService } from './src/user/user.service';

const app = express();

// Data init
const database = {
  users: Datasource.users,
  products: Datasource.products,
  orders: [],
  carts: []
}

// Repositories init
const userRepository = new UserRepository(database.users);
const productRepository = new ProductRepository(database.products);
const cartRepository = new CartRepository(database.carts);
const orderRepository = new OrderRepostiory(database.orders);

const putCartSchema = Joi.object({
  productId: Joi.string().uuid().required(),
  count: Joi.number().integer().min(1).required()
});

//Middlewares
const userService = new UserService(userRepository);
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.get('x-user-id');
  if(userId == undefined) {
    //	Forbidden(when authorization header is missing)
    res.status(403).send({
      "data": null,
      "error": {
        "message": "You must be authorized user"
      }
    });
  } else {
    try {
      userService.getUser(userId);
      next()
    } catch {
      // 	Unauthorized(when no user matching authorization header is found)
      res.status(401).send({
        "data": null,
        "error": {
          "message": "User is not authorized"
        }
      });
    }
  }
}

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
}

// Routers
const userRouter = UserController(userRepository);
const productRouter = ProductController(productRepository);
const cartRouter = CartController(cartRepository, productRepository, validatePutCartBody);
const orderRouter = OrderController(orderRepository, cartRepository);

app.use(express.json());
app.use(authMiddleware);
app.use('/api/auth', userRouter);
app.use('/api/products', productRouter);
app.use('/api/profile', cartRouter);
app.use('/api/profile/cart', orderRouter);

app.listen(3000, () => {
  console.log('Server is started');
});
