import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  title: string;
  description: string;
  price: number;
  createdAt: Date,
  updatedAt: Date,
}

const ProductSchema: Schema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

export default mongoose.model<IProduct>('Product', ProductSchema);
