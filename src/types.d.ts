import { ICart, ICartItemEntity } from "./schemas/ICart";
import { IOrder } from "./schemas/IOrder";
import { IProduct } from "./schemas/IProduct";
import { IUser } from "./schemas/IUser";

export type User = {
  email: string,
  password: string,
  role: string,
  id: string
};

export type PostUser = Omit<User, 'id'>;

export interface UserBase {
  users?: User[];
  getUser(id: string): User | Promise<IUser | User>;
  listUsers(): User[] | Promise<User[] | IUser[]>;
  createUser(user: PostUser): void | Promise<void>;
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
  getProduct(id: string): Product | Promise<IProduct | Product>;
  listProducts(): Product[] | Promise<IProduct[] | Product[]>;
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
  getCart(userId: string): Cart | Promise<ICart | Cart>;
  listCarts(): Cart[] | Promise<ICart[] | Cart[]>;
  createCart(userId: string): Cart | Promise<ICart | Cart>;
  updateCart(
    cart: Cart | ICart,
    items: CartItem[] | ICartItemEntity[]
  ): Cart | Promise<ICart | Cart>;
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

type ORDER_STATUS = 'created' | 'completed';

export type Order = {
  id: string,
  userId: string,
  cartId: string,
  items: CartItem[],
  payment?: Payment,
  delivery?: Delivery,
  comments?: string,
  status: ORDER_STATUS,
  total: number
};

export type PostOrder = {
    userId: string,
    cartId: string,
    items: CartItem[],
    comments: string | '',
    status: ORDER_STATUS
};

export interface OrderBase {
  orders?: Order[];
  createOrder(order: PostOrder): Order | Promise<IOrder | Order>;
  getOrder(id: string): Order | Promise<IOrder | Order>;
  updateOrder(id: string, attrs: any[]);
  listOrders(): Order[] | Promise<IOrder[] | Order[]>;
}

export type DatabaseEntities = {
  users: User[]
  products: Product[]
  carts: Cart[]
  orders: Order []
};
