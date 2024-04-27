import { BaseError } from "./BaseError";

export class DatabaseError extends BaseError {
  constructor(message: string) {
    super(message, 500);
    this.name = 'DatabaseError';
  }
}