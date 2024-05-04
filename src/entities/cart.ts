import { Collection, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property, Ref, Reference } from "@mikro-orm/core";
import { Product } from "./product";
import { CartItem } from "./cartItem";
import { User } from "./user";
import { randomUUID } from "crypto";

@Entity()
export class Cart {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @ManyToOne(() => User, {nullable: false, ref: true})
  user!: Ref<User>;

  @Property()
  isDeleted!: boolean;

  @ManyToMany(() => Product, undefined, {owner: true, pivotEntity: () => CartItem})
  products = new Collection<Product>(this);

  @OneToMany(() => CartItem, item => item.cart, { orphanRemoval: true })
  items = new Collection<CartItem>(this);

  constructor(userId: string, isDeleted: boolean) {
    this.id = randomUUID();
    this.user = Reference.createFromPK(User, userId);
    this.isDeleted = isDeleted;
  }
}
