import mongoose from "mongoose";
import 'dotenv/config'

const uri: string = `mongodb://${process.env.MONGODB_INITDB_ROOT_USERNAME}:${process.env.MONGODB_INITDB_ROOT_PASSWORD}@localhost:27017`;


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
