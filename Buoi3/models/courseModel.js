const mongoose = require("mongoose");

//creat model - collection - bảng

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
  teacher: {
    type: String,
    required: true,
  },
  users: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
