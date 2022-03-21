const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const asyncHandle = require("./../middlewares/asyncHandle");

module.exports.login = asyncHandle(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (!user.validPassword(password)) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { username, role: user.role },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "30m" }
  );
  res.status(200).json({ token });
});
