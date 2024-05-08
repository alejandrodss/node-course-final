import { EntityManager } from "@mikro-orm/core";
import { User } from "../entities/user";
import { Product } from "../entities/product";
import { Seeder } from "@mikro-orm/seeder";

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const user = em.create(User, {
      id: 'a8b4379a-eabc-4cb6-86a9-652c7080c0bb',
      email: 'admin@example.com',
      role: 'admin',
      password: '*SuperStr_n9Pa55w0#d#'
    });

    const product1 = em.create(Product, {
      id: '707f8ff5-30a1-4bb5-89c8-9aa3ae8eac0a',
      title: 'Collectable Car',
      description: 'Toy car for adding to your collection',
      price: 25.33
    })

    const product2 = em.create(Product, {
      id: 'ee16828a-9149-465e-a329-b969655eae41',
      title: 'Book 1',
      description: 'First book of a trilogy about misteries and dragons',
      price: 30.77
    });
  }
}
