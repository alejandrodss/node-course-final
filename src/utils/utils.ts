import { CartItem } from "../types";

export const calculateTotal = (items: CartItem[]) : number => {
  let initialValue = 0;
  return items.reduce((accumulator, item) => (
    accumulator + (item.product.price * item.count)),
    initialValue
  );
}