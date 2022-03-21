const codeController = require("./../controllers/codeController");

const router = require("express").Router();
const authMiddleware = require("./../middlewares/auth");

router.route("/encode").post(authMiddleware.protect, codeController.encrypt);
router.route("/decode").post(authMiddleware.protect, codeController.decrypt);

module.exports = router;
