import { BaseError } from "../exceptions/BaseError";
import { ProductNotValidError } from "../exceptions/ProductError";
import { ProductService } from "../product/product.service";
import { ICart, ICartItemEntity } from "../schemas/ICart";
import { IProduct } from "../schemas/IProduct";
import { Cart, CartBase, CartItem, Product } from "../types";
import { Cart as CartEntity } from "../entities/cart";

export class CartService {
  cartRepository : CartBase;
  productService : ProductService;

  constructor(cartRepository: CartBase, productService: ProductService) {
    this.cartRepository = cartRepository;
    this.productService = productService;
  }

  async getUserCart(userId: string): Promise<ICart | Cart | CartEntity> {
    try {
      return await this.cartRepository.getCart(userId);
    } catch (error) {
      throw error;
    }
  }

  async getOrCreateUserCart(userId: string) : Promise<ICart | Cart | CartEntity> {
    try {
      return await this.cartRepository.getCart(userId);
    } catch (error: any) {
      if (error.name === 'CartNotFound'){
        try {
          return await this.cartRepository.createCart(userId);
        } catch(error) {
          throw error;
        }
      }
      throw error;
    }
  }

  async updateUserCart(
    userId: string,
    productId: string,
    count: number,
  ) : Promise<Cart | ICart | CartEntity> {
    try {
      const cart = await this.cartRepository.getCart(userId);
      console.log("getting a cart", cart);
      const items = (cart.items as ICartItemEntity[]);
      const cartItemIndex = items.findIndex((cartItem) => (cartItem.product.id === productId));
      const cartItem: ICartItemEntity | CartItem = items[cartItemIndex];
      if (cartItem !== undefined) {
        if (count > 0) {
          cartItem.count = count;
        } else {
          items.splice(cartItemIndex, 1);
        }
        return await this.cartRepository.updateCart(cart, items);
      } else { // The item is not in the cart yet
        if (count > 0) {
          const cartProduct: IProduct | Product = await this.productService.getProduct(productId);
          const newCartItem: ICartItemEntity = {
            product: cartProduct,
            count
          };
          const items = (cart.items as ICartItemEntity[]);
          items.push(newCartItem);
          return await this.cartRepository.updateCart(cart, items);
        } else {
          throw new ProductNotValidError();
        }
      }
    } catch(err) {
      if((err as BaseError).name === "ProductNotFound") {
        throw new ProductNotValidError();
      }
      throw(err);
    }
  }

  async deleteUserCart(userId: string) {
    await this.cartRepository.deleteCart(userId);
  }
}