const express = require("express");
const {
  getAllDiscussion,
  addDiscussion,
  deleteDiscussion,
  updateDiscussion,
  getKdramaDiscussion,
  getSpecificDiscussion,
  increaseLikes,
  decreaseLikes,
} = require("../controllers/discussion");
const router = express.Router();

router.get("/getdiscussion", getAllDiscussion);
router.post("/adddiscussion", addDiscussion);
router.delete("/deletediscussion/:id", deleteDiscussion);
router.patch("/updatediscussion/:id", updateDiscussion);
router.get("/getkdramadiscussion/:name", getKdramaDiscussion);
router.put("/getspecificdiscussion/:id", getSpecificDiscussion);
router.patch("/increaselikes/:id", increaseLikes);
router.patch("/decreaselikes/:id", decreaseLikes);

module.exports = router;
