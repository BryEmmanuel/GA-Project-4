const express = require("express");
const {
  getAllKdrama,
  addKdrama,
  updateKdrama,
  deleteKdrama,
  getKdramaByName,
} = require("../controllers/kdrama");
const { authUser, authAdmin } = require("../middleware/auth");
const router = express.Router();

router.get("/getkdrama", authUser, getAllKdrama);
router.post("/addkdrama", authAdmin, addKdrama);
router.patch("/updatekdrama/:id", authAdmin, updateKdrama);
router.delete("/deletekdrama/:name", authAdmin, deleteKdrama);
router.get("/getkdrama/:name", authUser, getKdramaByName);

module.exports = router;
