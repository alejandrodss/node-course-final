import { Cart, CartBase, Product } from "../types";

export class CartService {
  cartRepository : CartBase;

  constructor(cartRepository: CartBase) {
    this.cartRepository = cartRepository;
  }

  getUserCart(userId: string) : Cart {
    return (this.cartRepository.getCart(userId) as Cart);
  }

  updateUserCart(
    userId: string,
    productId: string,
    count: number,
    availableProducts: Product[]
  ) : Cart {
    return (this.cartRepository.updateCart(userId, productId, count, availableProducts) as Cart);
  }

  deleteUserCart(userId: string) {
    this.cartRepository.deleteCart(userId);
  }
}