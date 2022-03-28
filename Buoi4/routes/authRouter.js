const authController = require("./../controllers/authController");

const router = require("express").Router();

router
    .route("/login")
    .get(authController.getLogin)
    .post(authController.login);

router
    .route("/forget-password")
    .get(authController.getForgetPassword);
router
    .route("/reset-password")
    .get(authController.getResetPassword)
    .post(authController.forgetPassword);
module.exports = router;
