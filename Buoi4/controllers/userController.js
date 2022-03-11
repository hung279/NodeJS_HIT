const User = require("./../models/userModel");
const Post = require("./../models/postModel");
const asyncHandle = require("./../middlewares/asyncHandle");

const userController = {
  getAllUsers: asyncHandle(async (req, res, next) => {
    const users = await User.find().populate("posts");
    res.status(200).json({
      status: "ok",
      data: users,
    });
  }),

  getUser: asyncHandle(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id).populate("posts");
    res.status(200).json({
      status: "ok",
      data: user,
    });
  }),

  getUsersAgeCondition: asyncHandle(async (req, res, next) => {
    const users = await User.find({ age: { $gte: 18, $lte: 48 } });
    res.status(200).json({
      status: "ok",
      data: users,
    });
  }),

  getUsersNameCondition: asyncHandle(async (req, res, next) => {
    const users = await User.find({ name: /^h/ });
    res.status(200).json({
      status: "ok",
      data: users,
    });
  }),

  addUser: asyncHandle(async (req, res, next) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: "created",
      data: newUser,
    });
  }),

  updateUser: asyncHandle(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);

    res.status(200).json({
      status: "ok",
      data: user,
    });
  }),

  deleteUser: asyncHandle(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    res.status(200).json({
      status: "ok",
      data: null,
    });
  }),
};

module.exports = userController;
