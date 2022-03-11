const User = require("./../models/userModel");
const Post = require("./../models/postModel");
const asyncHandle = require("./../middlewares/asyncHandle");

const postController = {
  getAllPosts: asyncHandle(async (req, res, next) => {
    const posts = await Post.find();
    res.status(200).json({
      status: "ok",
      data: posts,
    });
  }),

  getPost: asyncHandle(async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findById(id);

    res.status(200).json({
      status: "ok",
      data: post,
    });
  }),

  addPost: asyncHandle(async (req, res, next) => {
    const newPost = await Post.create(req.body);
    if (req.body.author) {
      const author = await User.findById(req.body.author);
      await author.updateOne({ $push: { posts: newPost._id } });
    }
    res.status(201).json({
      status: "created",
      data: newPost,
    });
  }),

  updatePost: asyncHandle(async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body);

    res.status(200).json({
      status: "ok",
      data: post,
    });
  }),

  deletePost: asyncHandle(async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);

    res.status(200).json({
      status: "ok",
      data: null,
    });
  }),
};

module.exports = postController;
