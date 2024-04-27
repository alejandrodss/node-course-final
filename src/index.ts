import express, { Request, Response, NextFunction} from 'express';
import 'dotenv/config';

import Datasource from './Datasource';
import UserController from './user/user.controller';
import ProductController from './product/product.controller';
import CartController from './cart/cart.controller';
import OrderController from './order/order.controller';

import { UserRepository } from './user/user.repository.mongo';
import { ProductRepository } from './product/product.repository.mongo';
import { CartRepository } from './cart/cart.repository.mongo';
import { OrderRepostiory } from './order/order.repository.mongo';

import { UserService } from './user/user.service';
import { DatabaseEntities } from './types';
import { ProductService } from './product/product.service';
import { CartService } from './cart/cart.service';
import { OrderService } from './order/order.service';
import mongoose from "mongoose";

const uri: string = `mongodb://${process.env.MONGODB_INITDB_ROOT_USERNAME}:${process.env.MONGODB_INITDB_ROOT_PASSWORD}@localhost:27017`;

const app = express();

mongoose.connect(uri).then((con) => {
  con.connection.useDb("node-course");
  console.log("Successfully connected to MongoDB");
}).catch((error: Error) => {
  console.log(`Error connecting to MongoDB: ${error.message}`);
});

// Data init
const database : DatabaseEntities = {
  users: Datasource.users,
  products: Datasource.products,
  orders: [],
  carts: []
}

// Repositories init
const userRepository = new UserRepository();
const productRepository = new ProductRepository();
const cartRepository = new CartRepository();
const orderRepository = new OrderRepostiory();

// Services init

const userService = new UserService(userRepository);
const productService = new ProductService(productRepository);
const cartService = new CartService(cartRepository, productService);
const orderService = new OrderService(orderRepository);

//Middlewares
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
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
      await userService.getUser(userId);
      next();
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

// Routers
const userRouter = UserController(userService);
const productRouter = ProductController(productService);
const cartRouter = CartController(cartService);
const orderRouter = OrderController(orderService, cartService);

app.use(express.json());
app.use(authMiddleware);
app.use('/api/auth', userRouter);
app.use('/api/products', productRouter);
app.use('/api/profile', cartRouter);
app.use('/api/profile/cart', orderRouter);

app.listen(3000, () => {
  console.log('Server is started');
});
