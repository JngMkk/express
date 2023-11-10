import mongoose from "mongoose";

var Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  age: Number,
  email: { type: String, required: true },
});

const Users = mongoose.model("Users", userSchema);

export default Users;
