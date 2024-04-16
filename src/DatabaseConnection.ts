import mongoose from "mongoose";

const uri: string = 'mongodb://root:nodegmp@localhost:27017/node-course';

const options : mongoose.ConnectOptions = { };

mongoose.connect(uri, options).then((con) => {
  console.log("Successfully connected to MongoDB");
}).catch((error: Error) => {
  console.log(`Error connecting to MongoDB: ${error.message}`);
})