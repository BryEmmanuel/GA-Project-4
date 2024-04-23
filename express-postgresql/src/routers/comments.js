const express = require("express");
const { createComment, getAllComments } = require("../controllers/comments");
const router = express.Router();

router.post("/new", createComment);
router.get("/all", getAllComments);

module.exports = router;
