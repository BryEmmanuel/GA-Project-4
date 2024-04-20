const express = require("express");
const { getAllUsers, register, login } = require("../controllers/auth");
const router = express.Router();

router.get("/users", getAllUsers);
router.put("/register", register);
router.post("/login", login);

module.exports = router;
