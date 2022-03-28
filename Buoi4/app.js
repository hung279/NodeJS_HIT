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
const authRouter = require("./routes/authRouter");

const AppError = require("./utils/appError");
const errorHandler = require("./middlewares/errorHandle");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));

mongoose
  .connect(process.env.DB_LOCALHOST)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/codes", codeRouter);
app.use("/", urlRouter);
app.use("/user", authRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
