const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Post = require("./postModel");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
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
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.pre("findOneAndDelete", async function (next) {
  const id = this.getQuery()._id;
  //console.log(id);
  await Post.updateOne({ author: id }, { author: null });
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
