const express = require("express");
const {
  getAllDiscussion,
  addDiscussion,
  deleteDiscussion,
  updateDiscussion,
  getKdramaDiscussion,
  getSpecificDiscussion,
  increaseLikes,
} = require("../controllers/discussion");
const router = express.Router();

router.get("/getdiscussion", getAllDiscussion);
router.post("/adddiscussion", addDiscussion);
router.delete("/deletediscussion/:id", deleteDiscussion);
router.patch("/updatediscussion/:id", updateDiscussion);
router.get("/getkdramadiscussion/:name", getKdramaDiscussion);
router.put("/getspecificdiscussion/:id", getSpecificDiscussion);
router.patch("/updatelikes/:id", increaseLikes);

module.exports = router;
