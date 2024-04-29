import { Entity, ManyToOne, Property, Ref, Reference } from "@mikro-orm/core";
import { Order } from "./order";
import { Product } from "./product";

@Entity()
export class OrderItem {
  @ManyToOne(() => Order, {primary: true, ref: true})
  order!: Ref<Order>;

  @Property({ type: 'uuid' })
  id: string;

  @Property()
  title: string;

  @Property()
  description: string;

  @Property()
  price: number;

  @Property()
  count: number;

  constructor(dto: { product: Product, orderId: string, count: number}) {
    this.id = dto.product.id;
    this.description = dto.product.description;
    this.title = dto.product.title;
    this.price = dto.product.price;
    this.count = dto.count;
    this.order = Reference.createFromPK(Order, dto.orderId);
  }
}
