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
const { validateAddComments } = require("../validators/comments");
const { errorCheck } = require("../validators/errorCheck");
const router = express.Router();

router.post("/new", authUser, validateAddComments, errorCheck, createComment);
router.get("/all", authUser, getAllComments);
router.get("/:id", authUser, getCommentById);
router.delete("/delete/:id", authUser, deleteComment);
router.patch("/:id", authAdmin, updateComment);
router.put("/discussion/:id", authUser, getDiscussionComments);

module.exports = router;
