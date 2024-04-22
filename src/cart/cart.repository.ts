import { randomUUID } from "crypto";
import { Cart, CartBase, CartItem, DatabaseEntities, Product } from "../types";

export class CartRepository implements CartBase {
  carts: Cart[];
  constructor(database: DatabaseEntities){
    this.carts = database.carts;
  }

  /* TODO
  * Change implementation to match new logic on service level
  */
  getCart(userId: string): Cart {
    const cart = this.carts.find((cart) => (cart.userId === userId && !cart.isDeleted));
    if(cart === undefined) {
      return this.createCart(userId);
    } else {
      return cart;
    }
  }

  listCarts(): Cart[] {
    //For admin purposes
    //return this.carts;
    throw new Error("Method not implemented.");
  }

  createCart(userId: string): Cart {
    const newCart : Cart = {
      id: randomUUID(),
      userId: userId,
      isDeleted: false,
      items: []
    };
    this.carts.push(newCart);
    return newCart;
  }

  updateCart(cart: Cart, items: CartItem[]): Cart {
    cart.items = items;
    return cart;
  }

  deleteCart(userId: string): void {
    console.log(this.carts);
    const cart = this.carts.find((cart) => (cart.userId === userId && !cart.isDeleted));
    if(cart !== undefined) {
      cart.isDeleted = true;
      return;
    }
    throw new Error("Cart not found");
  }
}
