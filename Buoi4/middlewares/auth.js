const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const asyncHandle = require("./asyncHandle");

module.exports.protect = asyncHandle(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token is invalid" });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "Don't have Token" });
  }
});

module.exports.authorizaton = asyncHandle(async (req, res, next) => {
  const { id } = req.query;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.role !== "admin") {
    return res.status(401).json({ message: "Role not allowed" });
  }

  next();
});
