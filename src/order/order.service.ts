import { IOrder } from "../schemas/IOrder";
import { Cart, Order, OrderBase, PostOrder } from "../types";
import { Cart as CartEntity } from "../entities/cart";
import { Order as OrderEntity } from "../entities/order";

export class OrderService {
  orderRepository : OrderBase;

  constructor(orderRepository: OrderBase) {
    this.orderRepository = orderRepository;
  }

  async createOrder(userId: string, cart: Cart | CartEntity) : Promise<Order | IOrder | OrderEntity> {
    const items = (cart instanceof CartEntity) ? cart.items.getItems() : cart.items;
    const newOrder: PostOrder = {
      userId,
      cartId: cart.id,
      items: items,
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