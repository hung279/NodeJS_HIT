const Course = require("../models/courseModel");
const User = require("../models/userModel");

const courseController = {
  //GET ALL COURSES
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find().populate({
        path: "students",
        select: ["name", "year"],
      });
      res.status(200).json(courses);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  //GET A COURSE
  getCourse: async (req, res) => {
    try {
      const { id } = req.params;
      const course = await Course.findById(id).populate({
        path: "students",
        select: ["name", "year"],
      });

      res.status(200).json(course);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  //CREATE COURSE
  creatCourse: async (req, res) => {
    try {
      const newCourse = await Course.create(req.body);
      res.status(200).json(newCourse);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  //UPDATE COURSE
  updateCourse: async (req, res) => {
    try {
      const { id } = req.params;
      await Course.findByIdAndUpdate(id, req.body);

      res.status(200).json({ message: "Course updated" });
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  //DELETE COURSE
  deleteCourse: async (req, res) => {
    try {
      const { id } = req.params;
      await Course.findByIdAndDelete(id);
      await User.updateMany({ courses: id }, { $pull: { courses: id } });

      res.status(200).json({ message: "Course deleted" });
    } catch (err) {
      res.json({ error: err.message });
    }
  },
};

module.exports = courseController;
