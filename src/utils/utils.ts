import { CartItem, Order, Product } from "../types";
import { CartItem as CartItemEntity } from "../entities/cartItem";
import { Order as OrderEntity } from "../entities/order";
import { OrderItem as OrderItemEntity} from "../entities/orderItem";

export const calculateTotal = (items: CartItem[]) : number => {
  let initialValue = 0;
  return items.reduce((accumulator, item) => (
    accumulator + (item.product.price * item.count)),
    initialValue
  );
}

export const calculateTotalSql = (items: CartItemEntity[]): number => {
  let initialValue = 0;
  return items.reduce((accumulator, item) => (
    accumulator + (item.product.getEntity().price * item.count)),
    initialValue
  );
}

export const itemsJsonResponse = (items: CartItem[] | CartItemEntity[]): Object => {
  const itemsJson : Object[] = items.map((item) => {
    const product = (item instanceof CartItemEntity) ? item.product.getEntity() : item.product
    return ({
      product: productJsonResponse(product),
      count: item.count
    });
  })
  return {
    items: itemsJson
  }
}

const orderItemsJsonResponse = (items: CartItem[] | CartItemEntity[] | OrderItemEntity[]): Object[] => {
  const itemsJson: Object[] = items.map((item) => {
    const product = (item instanceof OrderItemEntity) ? item : (item.product as Product)
    return ({
      product: productJsonResponse(product),
      count: item.count
    });
  })
  return itemsJson;
}

export const productJsonResponse = (product: Product | OrderItemEntity): Object => {
  return({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price
  });
}

export const orderJsonResponse = (order: Order | OrderEntity): Object => {
  const userId = (order instanceof OrderEntity) ? order.user.id : order.userId;
  const items = (order instanceof OrderEntity) ? order.items.getItems() : order.items;
  let orderJson : Object = {
    order: {
      id: order.id,
      userId: userId,
      cartId: order.cartId,
      items: orderItemsJsonResponse(items),
      comments: order.comments,
      status: order.status,
      total: order.total
    }
  }
  if(order.payment) {
    orderJson = {
      ...orderJson,
      payment: order.payment
    }
  }
  if (order.delivery) {
    orderJson = {
      ...orderJson,
      delivery: order.delivery
    }
  }
  return orderJson;
}
