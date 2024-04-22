import { Cart, Order, OrderBase, PostOrder } from "../types";

export class OrderService {
  orderRepository : OrderBase;

  constructor(orderRepository: OrderBase) {
    this.orderRepository = orderRepository;
  }

  createOrder(userId: string, cart: Cart) : Order {
    const newOrder: PostOrder = {
      userId,
      cartId: cart.id,
      items: [...cart.items],
      comments: '',
      status: 'created'
    }
    return this.orderRepository.createOrder(newOrder);
  }

  checkoutOrder(orderId: string) {
    const order = this.orderRepository.getOrder(orderId);
    order.payment = {
      type: 'Any',
      address: 'Any city',
      creditCard: 'Any number'
    };
    order.delivery = {
      type: 'post',
      address: 'Any address'
    };
  }
}