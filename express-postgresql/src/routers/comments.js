const express = require("express");
const {
  createComment,
  getAllComments,
  getCommentById,
} = require("../controllers/comments");
const router = express.Router();

router.post("/new", createComment);
router.get("/all", getAllComments);
router.get("/:id", getCommentById);

module.exports = router;
