const express = require("express");
const {
  getAllDiscussion,
  addDiscussion,
  deleteDiscussion,
  updateDiscussion,
} = require("../controllers/discussion");
const router = express.Router();

router.get("/getdiscussion", getAllDiscussion);
router.post("/adddiscussion", addDiscussion);
router.delete("/deletediscussion/:id", deleteDiscussion);
router.patch("/updatediscussion/:id", updateDiscussion);

module.exports = router;
