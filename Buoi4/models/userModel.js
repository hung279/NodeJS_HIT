const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Post = require("./postModel");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: Number,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.pre("findOneAndDelete", async function (next) {
  const id = this.getQuery()._id;
  await Post.updateOne({ author: id }, { author: null });
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.signToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_ACCESS_KEY, {
    expiresIn: "30m",
  });
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(16).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256", "hunghjk")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return this.passwordResetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
