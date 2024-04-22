import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  title: string;
  description: string;
  price: number;
}

const ProductSchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }
});

export default mongoose.model<IProduct>('Product', ProductSchema);
