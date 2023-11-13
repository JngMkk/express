import mongoose from "mongoose";

const uri = "mongodb://localhost:27017/testdb";

function connectDB() {
  mongoose.set("strictQuery", false);

  return mongoose.connect(uri);
}

export default connectDB;
