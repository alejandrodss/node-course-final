import { randomUUID } from "node:crypto";
import MongoProduct, { IProduct } from "../schemas/IProduct";
import { PostProduct, Product, ProductBase } from "../types";

export class ProductRepository implements ProductBase {
  async getProduct(id: string): Promise<Product | IProduct> {
    try {
      const product = await MongoProduct.findOne({id}).exec();
      if(product) {
        return product;
      }
      throw new Error("Product not found");
    } catch (err) {
      throw new Error(`There was an error fetching product with id ${id}`);
    }
  }

  async listProducts(): Promise<Product[] | IProduct[]> {
    try {
      return await MongoProduct.find().exec();
    } catch (err){
      throw new Error(`There was an error fetching products ${err}`);
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
      throw new Error(`There was an error creating the product ${err}`);
    }
  }

  async deleteProduct(id: string) {
    try {
      const result = await MongoProduct.deleteOne({ id });
      console.log("Delete result: ", result);
    } catch (err) {
      throw new Error(`There was an error deleting the product ${err}`);
    }
  }
}
