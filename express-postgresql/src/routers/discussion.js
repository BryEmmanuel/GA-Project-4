const express = require("express");
const {
  getAllDiscussion,
  addDiscussion,
} = require("../controllers/discussion");
const router = express.Router();

router.get("/getdiscussion", getAllDiscussion);
router.post("/adddiscussion", addDiscussion);

module.exports = router;
