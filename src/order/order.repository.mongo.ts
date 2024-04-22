import { randomUUID } from "crypto";
import MongoOrder, { IOrder } from "../schemas/IOrder";
import { Order, OrderBase, PostOrder } from "../types";
import { calculateTotal } from "../utils/utils";
import { DatabaseError } from "../exceptions/DatabaseError";

export class OrderRepostiory implements OrderBase {
  async createOrder(order: PostOrder): Promise<Order | IOrder> {
    try {
      const total = calculateTotal(order.items);
      const newOrder: IOrder = new MongoOrder({
        ...order,
        id: randomUUID(),
        total
      });
      const savedOrder = await newOrder.save();
      console.log("Order created: ", savedOrder);
      return savedOrder;
    } catch (err) {
      throw new DatabaseError("Error when creating new order");
    }
  }

  async getOrder(id: string): Promise<Order | IOrder> {
    const order = await MongoOrder.findOne({id}).exec();
    if (order) {
      return order;
    }
    throw new Error("Order not found");
  }

  async updateOrder(id: string, attrs: any[]) {
    throw new Error("Method not implemented.");
  }

  async listOrders(): Promise<Order[] | IOrder[]> {
    const orders = await MongoOrder.find().exec();
    if (orders) {
      return orders;
    }
    throw new Error("No Orders found");
  }
}
