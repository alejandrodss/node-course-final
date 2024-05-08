import { Entity, ManyToOne, PrimaryKey, PrimaryKeyProp, Property, Ref, Reference } from "@mikro-orm/core";
import { Order } from "./order";
import { Product } from "./product";

@Entity()
export class OrderItem {
  @ManyToOne(() => Order, {primary: true, ref: true})
  order!: Ref<Order>;

  @PrimaryKey({ type: 'uuid' })
  productId: string;

  @Property()
  title: string;

  @Property()
  description: string;

  @Property({ columnType: 'float'})
  price: number;

  @Property()
  count: number;

  [PrimaryKeyProp]?: ['order', 'productId'];

  constructor(dto: { product: Product, orderId: string, count: number}) {
    this.productId = dto.product.id;
    this.description = dto.product.description;
    this.title = dto.product.title;
    this.price = dto.product.price;
    this.count = dto.count;
    this.order = Reference.createFromPK(Order, dto.orderId);
  }
}
