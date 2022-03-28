const authController = require("./../controllers/authController");

const router = require("express").Router();

router
    .route("/login")
    .get(authController.getLogin)
    .post(authController.login);
router
    .route("/forget-password")
    .get(authController.getForgetPassword)
    .post(authController.forgetPassword);
router
    .route("/reset-password/:resetToken")
    .get(authController.getResetPassword)
    .post(authController.changePassword);
module.exports = router;
