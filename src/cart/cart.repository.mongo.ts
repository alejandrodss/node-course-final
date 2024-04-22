import { randomUUID } from "node:crypto";
import MongoCart, { ICart, ICartItemEntity } from "../schemas/ICart";
import { Cart, CartBase, CartItem, Product } from "../types";
import { CartNotFoundError } from "../exceptions/CartNotFoundError";
import { DatabaseError } from "../exceptions/DatabaseError";

export class CartRepository implements CartBase {
  async getCart(userId: string): Promise<Cart | ICart> {
    try {
      const cart = await MongoCart.findOne({ userId, isDeleted: false }).exec();
      if (cart) {
        return cart;
      }
      throw new CartNotFoundError();
    } catch (err: any) {
      if (err.name === "CartNotFound") {
        throw err;
      }
      throw new DatabaseError(`There was an error fetching cart for user with id ${userId}`);
    }
  }

  listCarts(): Cart[] | Promise<Cart[] | ICart[]> {
    throw new Error("Method not implemented.");
  }
  
  async createCart(userId: string): Promise<Cart | ICart> {
    try {
      const newCart = new MongoCart({
        id: randomUUID(),
        userId: userId,
        isDeleted: false,
        items: []
      });
      const savedCart = await newCart.save();
      return savedCart;
    } catch (err) {
      throw new DatabaseError(`There was an error creating the cart ${err}`);
    }
  }

  async updateCart(cart: ICart, items: ICartItemEntity[]): Promise<Cart | ICart> {
    try {
      await cart.updateOne({items: items}).lean();
      return cart;
    } catch(err) {
      throw new DatabaseError(`There was an error updating the cart ${err}`);
    }
  }
  async deleteCart(userId: string): Promise<void> {
    const cart = await MongoCart.findOne({userId, isDeleted: false}).exec();
    if (cart) {
      await cart.updateOne({isDeleted: true});
      return;
    }
    throw new CartNotFoundError();
  }
}
