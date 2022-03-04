const userController = require("./../controllers/userController");

const router = require("express").Router();

//GET ALL USERS
router.get("/", userController.getAllUsers);

//GET AN USERS
router.get("/:id", userController.getUser);

//CREAT USER
router.post("/", userController.createUser);

//UPDATE USER
router.put("/:id", userController.updateUser);

//DELETE USER
router.delete("/:id", userController.deleteUser);

module.exports = router;
