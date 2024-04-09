import express from 'express';

import UserController from './src/user/user.controller';
import ProductController from './src/product/product.controller';
import CartController from './src/cart/cart.controller';
import OrderController from './src/order/order.controller';

import { UserRepository } from './src/user/user.repository';
import { ProductRepository } from './src/product/product.repository';
import { CartRepository } from './src/cart/cart.repository';
import { OrderRepostiory } from './src/order/order.repository';

const app = express();

/*Repositories init*/

const userRepository = new UserRepository([]);
const productRepository = new ProductRepository([]);
const cartRepository = new CartRepository();
const orderRepository = new OrderRepostiory();

const userRouter = UserController(userRepository);
const productRouter = ProductController(productRepository);
const cartRouter = CartController(cartRepository, productRepository);
const orderRouter = OrderController(orderRepository, cartRepository);

app.use('/api/auth', userRouter);
app.use('/api/products', productRouter);
app.use('/api/profile', cartRouter);
app.use('/api/profile/cart', orderRouter);

app.listen(3000, () => {
  console.log('Server is started');
});
