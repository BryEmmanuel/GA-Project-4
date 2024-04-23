const express = require("express");
const {
  createComment,
  getAllComments,
  getCommentById,
  deleteComment,
} = require("../controllers/comments");
const router = express.Router();

router.post("/new", createComment);
router.get("/all", getAllComments);
router.get("/:id", getCommentById);
router.delete("/delete/:id", deleteComment);

module.exports = router;
