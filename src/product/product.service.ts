import { Product, ProductBase } from "../types";

export class ProductService {
  productRepository : ProductBase;

  constructor(productRepository : ProductBase) {
    this.productRepository = productRepository;
  }

  getProducts() : Product[] {
    return this.productRepository.listProducts();
  }

  getProduct(productId: string) : Product {
    return this.productRepository.getProduct(productId);
  }
}