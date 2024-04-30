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
const { authUser, authAdmin } = require("../middleware/auth");
const router = express.Router();

router.get("/getdiscussion", authUser, getAllDiscussion);
router.post("/adddiscussion", authUser, addDiscussion);
router.delete("/deletediscussion/:id", authAdmin, deleteDiscussion);
router.patch("/updatediscussion/:id", authAdmin, updateDiscussion);
router.get("/getkdramadiscussion/:name", authUser, getKdramaDiscussion);
router.put("/getspecificdiscussion/:id", authUser, getSpecificDiscussion);
router.patch("/increaselikes/:id", authUser, increaseLikes);
router.patch("/decreaselikes/:id", authUser, decreaseLikes);

module.exports = router;
