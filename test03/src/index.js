import express from "express";

import connectDB from "./core/db.js";
import postsService from "./services/posts.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, async () => {
    console.log("Server Started.");

    await connectDB();
    console.log("DB Connected.");
});


// * posts
app.get("/posts", postsService.listPosts);
app.get("/posts/:id", postsService.detailPosts);
app.post("/posts", postsService.createPosts);
