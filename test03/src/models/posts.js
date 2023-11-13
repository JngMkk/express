import mongoose from "mongoose"

var Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  writer: String,
  pw: String,
  content: String,
  hits: Number,
  createdAt: String,
});

const Posts = mongoose.model("Posts", postSchema);

export default Posts;
