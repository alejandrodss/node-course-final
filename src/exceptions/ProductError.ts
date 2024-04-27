import { BaseError } from "./BaseError";

export class ProductNotFoundError extends BaseError {
  constructor() {
    super("Product not found", 404);
    this.name = 'ProductNotFound';
  }
}

export class ProductNotValidError extends BaseError {
  constructor() {
    super("Products are not valid", 400);
    this.name = 'ProductNotValid';
  }
}
