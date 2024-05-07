import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  id: string,
  email: string,
  password: string,
  role: string,
  createdAt: Date,
  updatedAt: Date,
}

const UserSchema: Schema = new Schema({
  id: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

export default mongoose.model<IUser>('User', UserSchema);
