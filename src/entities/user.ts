import { Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { randomUUID } from "crypto";

@Entity()
export class User {
  @PrimaryKey({type: 'uuid', default: randomUUID()})
  id!: string;

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property()
  role!: string;
}
