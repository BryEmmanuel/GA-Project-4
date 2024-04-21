const express = require("express");
const {
  getAllKdrama,
  addKdrama,
  updateKdrama,
} = require("../controllers/kdrama");
const router = express.Router();

router.get("/getkdrama", getAllKdrama);
router.post("/addkdrama", addKdrama);
router.patch("/updatekdrama/:id", updateKdrama);

module.exports = router;
