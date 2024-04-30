const express = require("express");
const {
  createComment,
  getAllComments,
  getCommentById,
  deleteComment,
  updateComment,
  getDiscussionComments,
} = require("../controllers/comments");
const { authUser, authAdmin } = require("../middleware/auth");
const router = express.Router();

router.post("/new", authUser, createComment);
router.get("/all", authUser, getAllComments);
router.get("/:id", authUser, getCommentById);
router.delete("/delete/:id", authAdmin, deleteComment);
router.patch("/:id", authAdmin, updateComment);
router.put("/discussion/:id", authUser, getDiscussionComments);

module.exports = router;
