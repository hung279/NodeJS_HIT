const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
const courseRouter = require("./routes/courseRouter");
const userRouter = require("./routes/userRouter");

mongoose
  .connect("mongodb://127.0.0.1:27017/hit-course")
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/v1/courses", courseRouter);
app.use("/v1/users", userRouter);
  
app.listen(3000, () => {
  console.log(`Server is running ...`);
});
