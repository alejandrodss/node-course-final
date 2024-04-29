import { Collection, Entity, ManyToMany, ManyToOne, PrimaryKey, Property, Ref, Reference } from "@mikro-orm/core";
import { Product } from "./product";
import { CartItem } from "./cartItem";
import { User } from "./user";
import { randomUUID } from "crypto";

@Entity()
export class Cart {
  @PrimaryKey({ type: 'uuid', default: randomUUID() })
  id!: string;

  @ManyToOne(() => User, {nullable: false, ref: true})
  user!: Ref<User>;

  @Property()
  isDeleted!: boolean;

  @ManyToMany(() => Product, undefined, {owner: true, pivotEntity: () => CartItem})
  items = new Collection<Product>(this);

  constructor(userId: string, isDeleted: boolean) {
    this.user = Reference.createFromPK(User, userId);
    this.isDeleted = isDeleted;
  }
}
