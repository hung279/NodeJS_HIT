const urlController = require("./../controllers/urlController");

const router = require("express").Router();
const authMiddleware = require("./../middlewares/auth");

router.route("/api/urls").post(authMiddleware.protect, urlController.creatUrl);

router.route("/:code").get(urlController.getUrl);
module.exports = router;
