const express = require("express");
const { getAllDiscussion } = require("../controllers/discussion");
const router = express.Router();

router.get("/getdiscussion", getAllDiscussion);

module.exports = router;
