import express, { Request, Response, NextFunction} from 'express';

import Datasource from './Datasource';
import UserController from './user/user.controller';
import ProductController from './product/product.controller';
import CartController from './cart/cart.controller';
import OrderController from './order/order.controller';

import { UserRepository } from './user/user.repository';
import { ProductRepository } from './product/product.repository';
import { CartRepository } from './cart/cart.repository';
import { OrderRepostiory } from './order/order.repository';

import { UserService } from './user/user.service';
import { DatabaseEntities } from './types';
import { ProductService } from './product/product.service';
import { CartService } from './cart/cart.service';
import { OrderService } from './order/order.service';

const app = express();

// Data init
const database : DatabaseEntities = {
  users: Datasource.users,
  products: Datasource.products,
  orders: [],
  carts: []
}

// Repositories init
const userRepository = new UserRepository(database);
const productRepository = new ProductRepository(database);
const cartRepository = new CartRepository(database);
const orderRepository = new OrderRepostiory(database);

// Services init

const userService = new UserService(userRepository);
const productService = new ProductService(productRepository);
const cartService = new CartService(cartRepository);
const orderService = new OrderService(orderRepository);

//Middlewares
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

// Routers
const userRouter = UserController(userService);
const productRouter = ProductController(productService);
const cartRouter = CartController(cartService, productService);
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
