import { Entity, ManyToOne, Property, Ref, Reference } from "@mikro-orm/core";
import { Product } from "./product";
import { Cart } from "./cart";

@Entity()
export class CartItem {
  @ManyToOne(() => Cart, {primary: true, ref: true})
  cart!: Ref<Cart>;

  @ManyToOne(() => Product, { primary: true, ref: true})
  product!: Ref<Product>;

  @Property()
  count!: number;

  constructor(dto: {count: number, cartId: string, productId: string}) {
    this.count = dto.count;
    this.cart = Reference.createFromPK(Cart, dto.cartId);
    this.product = Reference.createFromPK(Product, dto.productId);
  }
}
