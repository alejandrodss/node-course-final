export type User = {
  email: string,
  password: string,
  role: string,
  id: string
};

export type PostUser = Omit<User, 'id'>;

export interface UserBase {
  users: User[];
  getUser(id: string): User;
  listUsers(): User[];
  createUser(user: PostUser): void;
  deleteUser(id: string): void;
};

export type Product = {
  id: string,
  title: string,
  description: string,
  price: number
};

export type PostProduct = Omit<Product, 'id'>;

export interface ProductBase {
  products: Product[];
  getProduct(id: string): Product;
  listProducts(): Product[];
  createProduct(product: PostProduct): void;
  deleteProduct(id: string): void;
};

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
  carts: Cart[];
  getCart(userId: string): Cart;
  listCarts(): Cart[];
  createCart(userId: string): Cart;
  updateCart(userId: string, productId: string, count: number, availableProducts: Product[]): Cart;
  deleteCart(userId: string): void;
};

type Payment = {
  type: string,
  address?: string,
  creditCard?: string
};

type Delivery = {
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
  orders: Order[];
  createOrder(order: PostOrder): Order;
  getOrder(id: string): Order;
  updateOrder(id: string, attrs: any[]);
  listOrders(): Order[];
}
