import mongoose from "mongoose";
import MongoUser from './schemas/IUser';
import { ProductRepository } from "./product/product.repository.mongo";

const uri: string = 'mongodb://root:nodegmp@localhost:27017';

mongoose.connect(uri).then(async(con) => {
  con.connection.useDb("node-course");
  console.log("Successfully connected to MongoDB");
  try {
    const newUser = new MongoUser({
      email: 'admin@example.com',
      password: '*SuperStr_n9Pa55w0#d#',
      role: 'admin',
      id: 'admin'
    });

    const savedUser = await newUser.save();
    console.log("Admin created: ", savedUser);
  } catch (err) {
    console.error(`There was an error creating the user ${err}`);
  }

  const productRepository = new ProductRepository();
  try {
    await productRepository.createProduct({
      title: 'Collectable Car',
      description: 'Toy car for adding to your collection',
      price: 25.33
    });
    console.log("Product has been created");
  } catch (err) {
    console.error(`There was an error creating the product ${err}`);
  }
  try {
    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error while closing the database connection: ", error);
  }
}).catch((error: Error) => {
  console.log(`Error connecting to MongoDB: ${error.message}`);
});
