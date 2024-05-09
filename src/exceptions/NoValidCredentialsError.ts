import { BaseError } from "./BaseError";

export class NoValidCredentialsError extends BaseError {
  constructor() {
    super("No user with such email or password", 404);
    this.name = 'NoValidCredentialsError';
  }
}
