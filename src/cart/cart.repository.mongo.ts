import { randomUUID } from "node:crypto";
import MongoCart, { ICart, ICartItemEntity } from "../schemas/ICart";
import MongoProduct, { IProduct } from '../schemas/IProduct';
import { Cart, CartBase, Product } from "../types";

export class CartRepository implements CartBase {
  async getCart(userId: string): Promise<Cart | ICart> {
    try {
      const cart = await MongoCart.findOne({ userId, isDeleted: false }).exec();
      if (cart) {
        return cart;
      } else {
        return await this.createCart(userId);
      }
    } catch (err) {
      throw new Error(`There was an error fetching cart for user with id ${userId}`);
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
      throw new Error(`There was an error creating the cart ${err}`);
    }
  }

  async updateCart(userId: string, productId: string, count: number): Promise<Cart | ICart> {
    const cart = await MongoCart.findOne({userId, isDeleted: false}).exec();
    if (cart) {
      const items = cart.items;
      const cartItemIndex = items.findIndex((cartItem) => (cartItem.product.id === productId));
      const cartItem: ICartItemEntity = items[cartItemIndex];
      if (cartItem !== undefined) {
        if (count > 0) {
          cartItem.count = count;
        } else {
          items.splice(cartItemIndex, 1);
        }
        await cart.updateOne({items: items});
      } else {
        if (count > 0) {
          const product = await MongoProduct.findOne({id: productId}).exec();
          if (product) {
            const cartProduct: IProduct = product;
            const newCartItem: ICartItemEntity = {
              product: cartProduct,
              count
            };
            const items = cart.items;
            items.push(newCartItem);
            await cart.updateOne({items});
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
  async deleteCart(userId: string): Promise<void> {
    const cart = await MongoCart.findOne({userId, isDeleted: false}).exec();
    if (cart) {
      await cart.updateOne({isDeleted: true});
      return;
    }
    throw new Error("Cart not found");
  }
}
