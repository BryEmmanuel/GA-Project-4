const express = require("express");
const { getAllKdrama } = require("../controllers/kdrama");
const router = express.Router();

router.get("/getkdrama", getAllKdrama);

module.exports = router;
