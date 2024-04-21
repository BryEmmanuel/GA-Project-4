const express = require("express");
const { getAllKdrama } = require("../controllers/kdrama");
const router = express.Router();

router.get("/kdrama", getAllKdrama);

module.exports = router;
