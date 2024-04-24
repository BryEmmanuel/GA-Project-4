const express = require("express");
const {
  getAllKdrama,
  addKdrama,
  updateKdrama,
  deleteKdrama,
  getKdramaById,
} = require("../controllers/kdrama");
const router = express.Router();

router.get("/getkdrama", getAllKdrama);
router.post("/addkdrama", addKdrama);
router.patch("/updatekdrama/:id", updateKdrama);
router.delete("/deletekdrama/:id", deleteKdrama);
router.get("/getkdrama/:id", getKdramaById);

module.exports = router;
