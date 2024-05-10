import express from 'express';
import 'dotenv/config';
import http from 'http';

import UserController from './user/user.controller';
import ProductController from './product/product.controller';
import CartController from './cart/cart.controller';
import OrderController from './order/order.controller';

import { UserRepository } from './user/user.repository.sql';
import { ProductRepository } from './product/product.repository.sql';
import { CartRepository } from './cart/cart.repository.sql';
import { OrderRepostiory } from './order/order.repository.sql';

import { UserService } from './user/user.service';
import { ProductService } from './product/product.service';
import { CartService } from './cart/cart.service';
import { OrderService } from './order/order.service';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import config from './config/mikro-orm.config';
import 'reflect-metadata';
import { User } from './entities/user';
import { Product } from './entities/product';
import { Order } from './entities/order';
import { Cart } from './entities/cart';
import { verifyToken } from './middleware/auth';

export const DI = {} as {
  server: http.Server;
  orm: MikroORM;
  em: EntityManager;
  userRepository: EntityRepository<User>;
  productRepository: EntityRepository<Product>;
  cartRepository: EntityRepository<Cart>;
  orderRepository: EntityRepository<Order>;
}

export const app = express();
const port = 3001;

export const init = (async() => {
  DI.orm = await MikroORM.init<PostgreSqlDriver>(config);
  DI.em = DI.orm.em;
  DI.userRepository = DI.orm.em.getRepository(User);
  DI.productRepository = DI.orm.em.getRepository(Product);
  DI.cartRepository = DI.orm.em.getRepository(Cart);
  DI.orderRepository = DI.orm.em.getRepository(Order);

  // Repositories init
  const cartRepository = new CartRepository(DI.cartRepository);
  const orderRepository = new OrderRepostiory(DI.orderRepository);

  const userRepositorySql = new UserRepository(DI.userRepository);
  const productRepositorySql = new ProductRepository(DI.productRepository);

  // Services init

  const userService = new UserService(userRepositorySql);
  const productService = new ProductService(productRepositorySql);
  const cartService = new CartService(cartRepository, productService);
  const orderService = new OrderService(orderRepository);

  // Routers
  const userRouter = UserController(userService);
  const productRouter = ProductController(productService);
  const cartRouter = CartController(cartService);
  const orderRouter = OrderController(orderService, cartService);

  app.use(express.json());
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
  app.use('/api/auth', userRouter);
  app.use('/api/products', verifyToken, productRouter);
  app.use('/api/profile', verifyToken, cartRouter);
  app.use('/api/profile/cart', verifyToken, orderRouter);

  DI.server = app.listen(3000, () => {
    console.log('Server is started');
  });
})();
