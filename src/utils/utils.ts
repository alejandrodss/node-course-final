import { CartItem, Order, Product } from "../types";

export const calculateTotal = (items: CartItem[]) : number => {
  let initialValue = 0;
  return items.reduce((accumulator, item) => (
    accumulator + (item.product.price * item.count)),
    initialValue
  );
}

export const itemsJsonResponse = (items: CartItem[]): Object => {
  const itemsJson : Object[] = items.map((item) => {
    return ({
      product: productJsonResponse(item.product),
      count: item.count
    });
  })
  return {
    items: itemsJson
  }
}

export const productJsonResponse = (product: Product): Object => {
  return({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price
  });
}

export const orderJsonResponse = (order: Order): Object => {
  let orderJson : Object = {
    order: {
      id: order.id,
      userId: order.userId,
      cartId: order.cartId,
      items: itemsJsonResponse(order.items),
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
