import { randomUUID } from "node:crypto";
import MongoProduct, { IProduct } from "../schemas/IProduct";
import { PostProduct, Product, ProductBase } from "../types";
import { ProductNotFoundError } from "../exceptions/ProductError";
import { DatabaseError } from "../exceptions/DatabaseError";
import { BaseError } from "../exceptions/BaseError";

export class ProductRepository implements ProductBase {
  async getProduct(id: string): Promise<Product | IProduct> {
    try {
      MongoProduct.db.useDb("node-course");
      const product = await MongoProduct.findOne({id}).lean();
      if(product) {
        return product;
      }
      throw new ProductNotFoundError();
    } catch (err) {
      if ((err as BaseError).name === "ProductNotFound") {
        throw err;
      }
      throw new DatabaseError(`There was an error fetching product with id ${id}`);
    }
  }

  async listProducts(): Promise<Product[] | IProduct[]> {
    try {
      return await MongoProduct.find().lean();
    } catch (err){
      throw new DatabaseError(`There was an error fetching products ${err}`);
    }
  }

  async createProduct(product: PostProduct) {
    try {
      const newProduct = new MongoProduct({
        id: randomUUID(),
        ...product
      });
      await newProduct.save();
    } catch (err) {
      throw new DatabaseError(`There was an error creating the product ${err}`);
    }
  }

  async deleteProduct(id: string) {
    try {
      const result = await MongoProduct.deleteOne({ id });
      console.log("Delete result: ", result);
    } catch (err) {
      throw new DatabaseError(`There was an error deleting the product ${err}`);
    }
  }
}
