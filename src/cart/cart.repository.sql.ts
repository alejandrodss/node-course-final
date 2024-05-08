import { CartBase } from "../types";
import { CartNotFoundError } from "../exceptions/CartNotFoundError";
import { DatabaseError } from "../exceptions/DatabaseError";
import { Cart as CartEntity } from "../entities/cart";
import { EntityRepository } from "@mikro-orm/core";
import { CartItem, CartItemDTO } from "../entities/cartItem";

export class CartRepository implements CartBase {
  cartRepository: EntityRepository<CartEntity>;

  constructor(repository: EntityRepository<CartEntity>) {
    this.cartRepository = repository;
  }

  async getCart(userId: string): Promise<CartEntity> {
    try {
      const cart = await this.cartRepository.findOne({ user: userId, isDeleted: false }, {
        populate: ['items', 'products']
      });
      if (cart) {
        return cart;
      }
      throw new CartNotFoundError();
    } catch (err: any) {
      if (err instanceof CartNotFoundError) {
        throw err;
      }
      throw new DatabaseError(`There was an error fetching cart for user with id ${userId}`);
    }
  }

  listCarts(): Promise<CartEntity[]> {
    throw new Error("Method not implemented.");
  }
  
  async createCart(userId: string): Promise<CartEntity> {
    try {
      const newCart = new CartEntity(
        userId,
        false
      );
      await this.cartRepository.insert(newCart);
      return newCart;
    } catch (err) {
      throw new DatabaseError(`There was an error creating the cart ${err}`);
    }
  }

  async updateCart(cart: CartEntity, items: CartItem[]): Promise<CartEntity> {
    try {
      cart.items.set(items);
      await this.cartRepository.getEntityManager().flush();
      return cart;
    } catch(err) {
      throw new DatabaseError(`There was an error updating the cart ${err}`);
    }
  }
  async deleteCart(userId: string): Promise<void> {
    const cart = await this.cartRepository.findOne({ user: userId, isDeleted: false });
    if (cart) {
      cart.isDeleted = true;
      await this.cartRepository.getEntityManager().persistAndFlush(cart);
      return;
    }
    throw new CartNotFoundError();
  }
}
