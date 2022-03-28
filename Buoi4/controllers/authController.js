const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const asyncHandle = require("./../middlewares/asyncHandle");
const AppError = require("./../utils/appError");

exports.getLogin = (req, res, next) => {
  res.render('login');
}

exports.login = asyncHandle(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (!(await user.validPassword(password))) {
    return next(new AppError("Invalid password", 400));
  }

  const token = jwt.sign(
    { username, role: user.role },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "30m" }
  );
  res.status(200).json({ token });
});

exports.getForgetPassword = (req, res, next) => {
  res.render('forget');
}

exports.forgetPassword = asyncHandle(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("User not found with email address", 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  //req.protocol = http, req.get('host') = localhost:3000
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/user/reset-password?code=${resetToken}`;

  //res.status(200).json({ resetURL });
  res.redirect(resetURL)
});

exports.getResetPassword = (req, res, next) => {
  res.render("reset-password");
}

exports.changePassword = asyncHandle(async (req, res, next) => {
  console.log(req.query);
  const user = await User.findOne({
    passwordResetToken: req.query.code,
    passwordResetExpires: { $gte: Date.now() }
  });
  
  console.log(user);

  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  await user.save();

  res.status(200).json({ message: "change successfully" });
});
