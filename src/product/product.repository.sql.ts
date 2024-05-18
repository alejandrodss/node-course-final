import { PostProduct, ProductBase } from "../types";
import { ProductNotFoundError } from "../exceptions/ProductError";
import { DatabaseError } from "../exceptions/DatabaseError";
import { BaseError } from "../exceptions/BaseError";
import { EntityRepository } from "@mikro-orm/core";
import { Product as ProductEntity } from "../entities/product";
import Logger from "../utils/logger";

export class ProductRepository implements ProductBase {
  productRepository: EntityRepository<ProductEntity>;
  logger : Logger = Logger.getInstance();

  constructor(repository: EntityRepository<ProductEntity>) {
    this.productRepository = repository;
  }
  async getProduct(id: string): Promise<ProductEntity> {
    try {
      const product = await this.productRepository.findOne({id});
      if(product) {
        return product;
      }
      throw new ProductNotFoundError();
    } catch (err) {
      if ((err as BaseError).name === "ProductNotFound") {
        throw err;
      }
      this.logger.error((err as Error).message);
      throw new DatabaseError(`There was an error fetching product with id ${id}`);
    }
  }

  async listProducts(): Promise<ProductEntity[]> {
    try {
      return await this.productRepository.findAll();
    } catch (err){
      this.logger.error((err as Error).message);
      throw new DatabaseError(`There was an error fetching products ${err}`);
    }
  }

  async createProduct(product: PostProduct) {
    try {
      const newProduct = new ProductEntity(
        product.title,
        product.description,
        product.price
      );
      await this.productRepository.insert(newProduct);
    } catch (err) {
      this.logger.error((err as Error).message);
      throw new DatabaseError(`There was an error creating the product ${err}`);
    }
  }

  async deleteProduct(id: string) {
    try {
      const product = await this.productRepository.findOne({ id });
      if (product !== null) {
        const result = await this.productRepository.getEntityManager().removeAndFlush(product);
        this.logger.debug("Delete result: ", result);
      }
    } catch (err) {
      this.logger.error((err as Error).message);
      throw new DatabaseError(`There was an error deleting the product ${err}`);
    }
  }
}
