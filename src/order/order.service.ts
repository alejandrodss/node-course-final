import { Order, OrderBase, PostOrder } from "../types";

export class OrderService {
  orderRepository : OrderBase;

  constructor(orderRepository: OrderBase) {
    this.orderRepository = orderRepository;
  }

  createOrder(order: PostOrder) : Order {
    return this.orderRepository.createOrder(order);
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