const User = require("./../models/userModel");
const Course = require("./../models/courseModel");

const userController = {
  //GET ALL USERS
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate({
        path: "courses",
        select: ["name", "teacher"],
      });
      res.status(200).json(users);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  //GET AN USER
  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id).populate({
        path: "courses",
        select: ["name", "teacher"],
      });

      res.status(200).json(user);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  //CREATE USER
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      if (req.body.courses) {
        const course = await Course.findById(req.body.courses);
        await course.updateOne({ $push: { students: newUser._id } });
      }
      res.status(200).json(newUser);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  //UPDATE USER
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndUpdate(id, req.body);

      res.status(200).json({ message: "Updated successfully" });
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  //DELETE USER
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      await Course.updateMany({ students: id }, { $pull: { students: id } });

      res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
      res.json({ error: err.message });
    }
  },
};

module.exports = userController;
