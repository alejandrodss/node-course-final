import { randomUUID } from "node:crypto";
import { DatabaseEntities, PostProduct, Product, ProductBase } from "../types";

export class ProductRepository implements ProductBase {
  products: Product[];
  constructor(
    public database: DatabaseEntities
  ) {
    this.products = database.products;
  }

  getProduct(id: string): Product {
    const product = this.products.find((product) => product.id === id);
    if(product !== undefined) {
      return product;
    }
    throw new Error("Product not found");
  }

  listProducts(): Product[] {
    return this.products;
  }

  createProduct(product: PostProduct): void {
    let newProduct: Product = {
      ...product,
      id: randomUUID()
    }
    this.products.push(newProduct);
  }

  deleteProduct(id: string): void {
    throw new Error(`Method not implemented. Product with id ${id} left intacted`);
  }
}
