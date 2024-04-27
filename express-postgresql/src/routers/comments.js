const express = require("express");
const {
  createComment,
  getAllComments,
  getCommentById,
  deleteComment,
  updateComment,
  getDiscussionComments,
} = require("../controllers/comments");
const router = express.Router();

router.post("/new", createComment);
router.get("/all", getAllComments);
router.get("/:id", getCommentById);
router.delete("/delete/:id", deleteComment);
router.patch("/:id", updateComment);
router.put("/discussion/:id", getDiscussionComments);

module.exports = router;
