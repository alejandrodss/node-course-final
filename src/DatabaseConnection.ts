import mongoose from "mongoose";

const uri: string = 'mongodb://root:nodegmp@127.0.0.1:27017/';

const options: mongoose.ConnectOptions = { directConnection: true };

try {
    const connnection = mongoose.createConnection(uri);
    console.log("Successfully connected to MongoDB");
    const dbConnection = connnection.useDb('node-course');
    const collection = dbConnection.collection('users')
    collection.find();
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error}`);
  }

/*mongoose.connect(uri, options).then((con) => {
}).catch((error: Error) => {
}); */
