import { IOrder } from "../schemas/IOrder";
import { Cart, Order, OrderBase, PostOrder } from "../types";

export class OrderService {
  orderRepository : OrderBase;

  constructor(orderRepository: OrderBase) {
    this.orderRepository = orderRepository;
  }

  async createOrder(userId: string, cart: Cart) : Promise<Order | IOrder> {
    const newOrder: PostOrder = {
      userId,
      cartId: cart.id,
      items: [...cart.items],
      comments: '',
      status: 'created'
    }
    return (await this.orderRepository.createOrder(newOrder));
  }

  async checkoutOrder(orderId: string) {
    const order = await this.orderRepository.getOrder(orderId) as Order;
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