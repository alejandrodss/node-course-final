import mongoose from "mongoose";
import 'dotenv/config'

export async function connect(): Promise<void>{
  const uri: string = `mongodb://${process.env.MONGODB_INITDB_ROOT_USERNAME}:${process.env.MONGODB_INITDB_ROOT_PASSWORD}@localhost:27017`;
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB");
  } catch(e) {
    console.log(`Error connecting to MongoDB. Exiting now...`);
    console.error(e);
    process.exit(1)
  }
}
