const express = require("express");
const mongoose = require("mongoose");
const PORT = 3000;

const app = express();
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/hit-blog")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
