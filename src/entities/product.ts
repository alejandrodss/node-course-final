import { Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { randomUUID } from "crypto";

@Entity()
export class Product {
  @PrimaryKey({ type: 'uuid', default: randomUUID() })
  id!: string;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  price!: number;
}
