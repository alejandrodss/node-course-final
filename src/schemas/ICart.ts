import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from './IProduct';
import { Product } from '../types';

export interface ICartItemEntity {
  product: IProduct | Product;
  count: number;
}

export interface ICart extends Document {
  id: string;
  userId: string;
  isDeleted: boolean;
  items: ICartItemEntity[];
}

const CartSchema: Schema = new Schema({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
  items: { type: Array<ICartItemEntity>, required: true },
});

export default mongoose.model<ICart>('Cart', CartSchema);
