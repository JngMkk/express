import mongoose from "mongoose"

import Posts from "../models/posts.js"
import getPaginator from "../core/paginator.js";

async function listPosts(req, res) {
  const perPage = 10;
  const page = parseInt(req.query.page) || 1;
  const keyword = req.query.kw || "";
  const dbQuery = { title: new RegExp(keyword, "i") };
  const posts = await Posts.find(dbQuery).limit(10).skip((page - 1) * perPage).sort({ createdAt: -1 });
  const totalCount = await Posts.countDocuments(dbQuery);
  const paginator = getPaginator(totalCount, page, perPage);

  return res.send({data: posts, meta: paginator});
}

async function createPosts(req, res) {
  const post = new Posts(req.body);
  post.hits = 0;
  post.createdAt = new Date().toISOString();

  await post.save();
  return res.send(post);
}

async function detailPosts(req, res) {
  const projectionOption = { projection: { pw: 0 }};

  // filter, update, option
  const post = await Posts.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(req.params.id) },
    { $inc: { hits: 1 } },
    projectionOption
  );

  return res.send(post);
}

const postsService = { listPosts, createPosts, detailPosts };

export default postsService;
