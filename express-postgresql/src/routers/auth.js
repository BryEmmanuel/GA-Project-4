const express = require("express");
const { getAllUsers, register } = require("../controllers/auth");
const router = express.Router();

router.get("/users", getAllUsers);
router.put("/register", register);

module.exports = router;
