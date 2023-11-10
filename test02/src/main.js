import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import usersApp from "./apps/users.js";

mongoose.set("strictQuery", false); // 경고 뜨지 않게

const app = express();
const dbUri = "mongodb://localhost:27017/testdb";

app.use(bodyParser.json()); // HTTP에서 Body를 파싱하기 위한 설정
app.listen(3000, async () => {
  console.log("Server Started.");

  mongoose.connect(dbUri).then(console.log("DB Connected."));
});

app.get("/users", usersApp.listUsers);
app.get("/users/:email", usersApp.detailUsers);
app.post("/users", usersApp.createUsers);
app.put("/users/:email", usersApp.updateUsers);
app.delete("/users/:email", usersApp.deleteUsers);
