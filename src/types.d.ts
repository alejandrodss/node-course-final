import { ICart, ICartItemEntity } from "./schemas/ICart";
import { IOrder } from "./schemas/IOrder";
import { IProduct } from "./schemas/IProduct";
import { IUser } from "./schemas/IUser";
import { User as UserEntity } from "./entities/user";
import { Product as ProductEntity } from "./entities/product";
import { Cart as CartEntity } from "./entities/cart";
import { CartItem as CartItemEntity} from "./entities/cartItem";
import { Order as OrderEntity } from "./entities/order";
import { OrderItem as OrderItemEntity } from "./entities/orderItem";

declare global {
    namespace Express {
        interface Request {
            user: CurrentUser
        }
    }
}

export type User = {
  email: string,
  password: string,
  role: string,
  id: string
};

export type PostUser = Omit<User, 'id'>;
export type CurrentUser = Omit<User, 'password'>;

export interface UserBase {
  users?: User[];
  getUser(id: string): User | Promise<IUser | User | UserEntity>;
  getUserByEmail(email: string): Promise<IUser | User, UserEntity | null>;
  listUsers(): User[] | Promise<User[] | IUser[] | UserEntity[]>;
  createUser(user: PostUser): Promise<User | IUser | UserEntity>;
  deleteUser(id: string): void | Promise<void>;
}

export type Product = {
  id: string,
  title: string,
  description: string,
  price: number
};

export type PostProduct = Omit<Product, 'id'>;

export interface ProductBase {
  products?: Product[];
  getProduct(id: string): Product | Promise<IProduct | Product | ProductEntity>;
  listProducts(): Product[] | Promise<IProduct[] | Product[] | ProductEntity[]>;
  createProduct(product: PostProduct): void | Promise<void>;
  deleteProduct(id: string): void | Promise<void>;
}

export type CartItem = {
  product: Product,
  count: number
};

export type Cart = {
  id: string,
  userId: string,
  isDeleted: boolean,
  items: CartItem[]
};

export type UpdateCartRequestBody = {
  productId: string,
  count: number,
}

export interface CartBase {
  carts?: Cart[];
  getCart(userId: string): Cart | Promise<ICart | Cart | CartEntity>;
  listCarts(): Cart[] | Promise<ICart[] | Cart[] | CartEntity[]>;
  createCart(userId: string): Cart | Promise<ICart | Cart | CartEntity>;
  updateCart(
    cart: Cart | ICart | CartEntity,
    items: CartItem[] | ICartItemEntity[] | CartItemEntity[]
  ): Cart | Promise<ICart | Cart | CartEntity>;
  deleteCart(userId: string): void | Promise<void>;
}

export type Payment = {
  type: string,
  address?: string,
  creditCard?: string
};

export type Delivery = {
  type: string,
  address: string
};

export type ORDER_STATUS = 'created' | 'completed';

export type Order = {
  id: string,
  userId: string,
  cartId: string,
  items: CartItem[] | OrderItemEntity[] | CartItemEntity[],
  payment?: Payment,
  delivery?: Delivery,
  comments?: string,
  status: ORDER_STATUS,
  total: number
};

export type PostOrder = {
    userId: string,
    cartId: string,
    items: CartItem[] | CartItemEntity[],
    comments: string | '',
    status: ORDER_STATUS
};

export interface OrderBase {
  orders?: Order[];
  createOrder(order: PostOrder): Order | Promise<IOrder | Order | OrderEntity>;
  getOrder(id: string): Order | Promise<IOrder | Order | OrderEntity>;
  updateOrder(id: string, attrs: any[]);
  listOrders(): Order[] | Promise<IOrder[] | Order[] | OrderEntity[]>;
}

export type DatabaseEntities = {
  users: User[]
  products: Product[]
  carts: Cart[]
  orders: Order []
};

export type LoginResponse = {
  token: string;
}
