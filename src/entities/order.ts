import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Ref, Reference } from "@mikro-orm/core";
import { OrderItem } from "./orderItem";
import { User } from "./user";
import { randomUUID } from "crypto";

type ORDER_STATUS = 'created' | 'completed';

type Payment = {
  type: string,
  address?: string,
  creditCard?: string
};

type Delivery = {
  type: string,
  address: string
};

@Entity()
export class Order {
  @PrimaryKey({type: 'uuid', default: randomUUID()})
  id!: string;

  @ManyToOne(() => User, { nullable: false, ref: true })
  user!: Ref<User>;

  @Property()
  cartId: string;

  @OneToMany(() => OrderItem, 'order' ,{orphanRemoval: true})
  items: Collection<OrderItem> = new Collection<OrderItem>(this);

  @Property({nullable: true})
  payment?: Payment;

  @Property({nullable: true})
  delivery?: Delivery;

  @Property({default: ''})
  comments!: string;

  @Property({default: "created"})
  status!: ORDER_STATUS;

  @Property()
  total: number

  constructor(userId: string, cartId: string, total: number) {
    this.user = Reference.createFromPK(User, userId);
    this.cartId = cartId;
    this.total = total;
  }
}
