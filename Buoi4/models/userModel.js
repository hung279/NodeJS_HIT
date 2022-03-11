const mongoose = require("mongoose");
const Post = require("./postModel");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
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
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

userSchema.pre("findOneAndDelete", async function (next) {
  const id = this.getQuery()._id;
  //console.log(id);
  await Post.updateOne({ author: id }, { author: null });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
