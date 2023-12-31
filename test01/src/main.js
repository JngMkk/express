import express from "express";

import getHealth from "./apps/health.js";
import movieApp from "./apps/movies.js";
import postApp from "./apps/posts.js";
import userApp from "./apps/users.js";

const app = express();
const port = 3000;

// * JSON 미들웨어 활성화 (req.body를 사용하기 위함)
app.use(express.json());
// * POST 요청 시 content type이 application/x-www-form-urlencoded인 경우 파싱
app.use(express.urlencoded({ extended: true }));

app.get("/health", getHealth);

app.get("/movies/promise", movieApp.getTop20MoviesPromise);
app.get("/movies/async", movieApp.getTop20MoviesAsync);

app.get("/posts", postApp.getPosts);
app.post("/posts", postApp.createPost);
app.delete("/posts/:id", postApp.deletePost);

app.post("/users/callback", userApp.signUpCallBack);
app.post("/users/promise", userApp.signUpPromise);

app.listen(port, () => {
  console.log(`Start Server. Using ${port} port`);
});
