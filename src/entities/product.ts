import { Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { randomUUID } from "crypto";

@Entity()
export class Product {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property({ columnType: 'float'})
  price!: number;

  constructor(title: string, description: string, price: number) {
    this.id = randomUUID();
    this.title = title;
    this.description = description;
    this.price = price;
  }
}
