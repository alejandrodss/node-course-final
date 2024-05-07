import { OrderBase, PostOrder } from "../types";
import { calculateTotalSql } from "../utils/utils";
import { DatabaseError } from "../exceptions/DatabaseError";
import { Order as OrderEntity } from "../entities/order";
import { EntityRepository } from "@mikro-orm/core";
import { CartItem } from "../entities/cartItem";
import { OrderItem } from "../entities/orderItem";

export class OrderRepostiory implements OrderBase {
  orderRepository: EntityRepository<OrderEntity>;

  constructor(repository: EntityRepository<OrderEntity>) {
    this.orderRepository = repository;
  }
  async createOrder(order: PostOrder): Promise<OrderEntity> {
    try {
      const total = calculateTotalSql(order.items as CartItem[]);
      const newOrder = new OrderEntity(
        order.userId,
        order.cartId,
        total
      );
      this._setItems(order.items as CartItem[], newOrder);
      console.log("Order created: ", newOrder);
      await this.orderRepository.getEntityManager().persistAndFlush(newOrder);
      return newOrder;
    } catch (err) {
      throw new DatabaseError("Error when creating new order");
    }
  }

  async getOrder(id: string): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({id});
    if (order) {
      return order;
    }
    throw new Error("Order not found");
  }

  async updateOrder(id: string, attrs: any[]) {
    throw new Error("Method not implemented.");
  }

  async listOrders(): Promise<OrderEntity[]> {
    const orders = await this.orderRepository.findAll();
    if (orders) {
      return orders;
    }
    throw new Error("No Orders found");
  }

  private _setItems(items: CartItem[], order: OrderEntity) {
    const orderItems = [];
    for(const item of items) {
      const orderItem = new OrderItem({
        product: item.product.getEntity(),
        orderId: order.id,
        count: item.count
      });
      orderItems.push(orderItem);
    }
    order.items.set(orderItems);
  }
}
