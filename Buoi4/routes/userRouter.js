const userController = require("./../controllers/userController");

const router = require("express").Router();
const authMiddleware = require("./../middlewares/auth");

router
  .route("/")
  .get(authMiddleware.authorizaton, userController.getAllUsers)
  .post(userController.addUser);
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
  .delete(authMiddleware.authorizaton, userController.deleteUser);

module.exports = router;
