import { randomUUID } from "crypto";
import { Cart, CartBase, CartItem, Product } from "../types";

export class CartRepository implements CartBase {
  carts: Cart[];
  constructor(carts: Cart[]){
    this.carts = carts;
  }

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

  updateCart(userId: string, productId: string, count: number, availableProducts: Product[]): Cart {
    const cart = this.carts.find((cart) => (cart.userId === userId && !cart.isDeleted));
    if (cart !== undefined){
      const cartItemIndex = cart.items.findIndex((cartItem) => (cartItem.product.id === productId));
      const cartItem : CartItem = cart.items[cartItemIndex];
      if(cartItem !== undefined) {
        if(count > 0) {
          cartItem.count = count;
        } else {
          cart.items.splice(cartItemIndex, 1);
        }
      } else {
        if(count > 0) {
          const product = availableProducts.find((product) => product.id == productId);
          if (product !== undefined) {
            const cartProduct : Product = {...product};
            const newCartItem : CartItem = {
              product: cartProduct,
              count
            };
            cart.items.push(newCartItem);
          } else {
            throw new Error("Products are not valid");
          }
        } else {
          throw new Error("Products are not valid");
        }
      }
      return cart;
    }
    throw new Error("Cart not found");
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
