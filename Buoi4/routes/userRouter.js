const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = require("express").Router();
const authMiddleware = require("./../middlewares/auth");

router
  .route("/")
  .get(authMiddleware.protect, userController.getAllUsers)
  .post(userController.addUser);
router
  .route("/login")
  .post(authController.login);
router
  .route("/forget-password")
  .post(authController.forgetPassword)
  .put(authController.changePassword);
router
  .route("/age_condition")
  .get(authMiddleware.authorizaton, userController.getUsersAgeCondition);
router
  .route("/name_condition")
  .get(authMiddleware.authorizaton, userController.getUsersNameCondition);
router
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
