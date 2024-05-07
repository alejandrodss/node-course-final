import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { randomUUID } from "crypto";

@Entity()
export class User {
  @PrimaryKey({type: 'uuid'})
  id!: string;

  @Property()
  password!: string;

  @Property({unique: true})
  email!: string;

  @Property()
  role!: string;

  constructor(password: string, email: string, role: string) {
    this.id = randomUUID();
    this.password = password;
    this.email = email;
    this.role = role;
  }
}
