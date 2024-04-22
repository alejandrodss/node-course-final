import mongoose, { Schema, Document } from 'mongoose';
import { ICartItemEntity } from './ICart';
import { ORDER_STATUS, Payment, Delivery } from '../types';

export interface IOrder extends Document {
  id: string, // uuid
  userId: string,
  cartId: string,
  items: ICartItemEntity[], // products from CartEntity
  payment?: Payment,
  delivery?: Delivery,
  comments: string,
  status: ORDER_STATUS,
  total: number
}

const OrderSchema: Schema = new Schema({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  cartId: { type: String, required: true },
  items: { type: Array<ICartItemEntity>, required: true},
  payment: {  },
  delivery: { },
  comments: { type: String },
  status: { type: String },
  total: { type: Number, required: true}
});

export default mongoose.model<IOrder>('Order', OrderSchema);