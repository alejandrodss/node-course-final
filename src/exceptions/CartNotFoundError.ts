import { BaseError } from "./BaseError";

export class CartNotFoundError extends BaseError {
  constructor() {
    super("Cart not found", 404);
    this.name = 'CartNotFound';
  }
}
