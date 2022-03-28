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

  const token = user.signToken();
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
  )}/auth/reset-password/${resetToken}`;

  //res.status(200).json({ resetURL });
  res.redirect(resetURL);
});

exports.getResetPassword = asyncHandle(async (req, res, next) => {
  const user = await User.findOne({
    passwordResetToken: req.params.resetToken,
    passwordResetExpires: { $gte: Date.now() }
  });

  if (!user) {
    return next(new AppError("User not found", 400));
  }

  res.render("reset-password", {
    resetToken: req.params.resetToken,
  });
})

exports.changePassword = asyncHandle(async (req, res, next) => {
  const user = await User.findOne({
    passwordResetToken: req.params.resetToken,
    passwordResetExpires: { $gte: Date.now() }
  });
  
  if (!user) {
    return next(new AppError("User not found", 400));
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json({ message: "change successfully" });
});
