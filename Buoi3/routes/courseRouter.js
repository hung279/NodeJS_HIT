const courseController = require("./../controllers/courseController");

const router = require("express").Router();

//GET COURSES
router.get("/", courseController.getAllCourses);

//GET A COURSE
router.get("/:id", courseController.getCourse);

//ADD COURSE
router.post("/", courseController.creatCourse);

//UPDATE COURSE
router.put("/:id", courseController.updateCourse);

//DELETE COURSE
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
