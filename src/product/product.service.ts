import { IProduct } from "../schemas/IProduct";
import { Product, ProductBase } from "../types";

export class ProductService {
  productRepository : ProductBase;

  constructor(productRepository : ProductBase) {
    this.productRepository = productRepository;
  }

  async getProducts() : Promise<Product[] | IProduct[]> {
    return (await this.productRepository.listProducts());
  }

  async getProduct(productId: string) : Promise<Product | IProduct> {
    return (await this.productRepository.getProduct(productId));
  }
}