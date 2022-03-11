const User = require("./../models/userModel");
const asyncHandle = require("./asyncHandle");

module.exports = {
  authorizaton: asyncHandle(async (req, res, next) => {
    const { id } = req.query;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(401).json({ message: "Role not allowed" });
    }

    next();
  }),
};
