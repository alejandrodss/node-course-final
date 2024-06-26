import { randomUUID } from "crypto";
import { CartItem, DatabaseEntities, Order, OrderBase, PostOrder } from "../types";
import { calculateTotal } from "../utils/utils";

export class OrderRepostiory implements OrderBase {
  orders: Order[];
  constructor(database: DatabaseEntities) {
    this.orders = database.orders;
  }

  createOrder(order: PostOrder): Order {
    const total = calculateTotal(order.items as CartItem[]);
    const newOrder : Order = {
      ...order,
      id: randomUUID(),
      total
    }
    this.orders.push(newOrder);
    return newOrder;
  }

  getOrder(id: string): Order {
    const order = this.orders.find((order) => order.id === id);
    if(order !== undefined) {
      return order;
    }
    throw new Error("Order not found");
  }

  updateOrder(id: string, attrs: any[]) {
    // for adding payment and delivery details
    throw new Error("Method not implemented.");
  }

  listOrders(): Order[] {
    // admin purposes
    return this.orders;
  }
}