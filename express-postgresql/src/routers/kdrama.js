const express = require("express");
const { getAllKdrama, addKdrama } = require("../controllers/kdrama");
const router = express.Router();

router.get("/getkdrama", getAllKdrama);
router.post("/addkdrama", addKdrama);

module.exports = router;
