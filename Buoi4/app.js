const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = 3000;

dotenv.config();

const app = express();
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const urlRouter = require("./routes/urlRouter");
const codeRouter = require("./routes/codeRouter");

const errorHandler = require("./middlewares/errorHandle");

app.use(express.json());

mongoose
  .connect(process.env.DB_LOCALHOST)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/codes", codeRouter);
app.use("/", urlRouter);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
