const express = require("express");
const {
  getAllDiscussion,
  addDiscussion,
  deleteDiscussion,
} = require("../controllers/discussion");
const router = express.Router();

router.get("/getdiscussion", getAllDiscussion);
router.post("/adddiscussion", addDiscussion);
router.delete("/deletediscussion/:id", deleteDiscussion);

module.exports = router;
