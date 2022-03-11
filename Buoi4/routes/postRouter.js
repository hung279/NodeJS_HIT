const postController = require("./../controllers/postController");

const router = require("express").Router();

router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.addPost);

router
  .route("/:id")
  .get(postController.getPost)
  .put(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
