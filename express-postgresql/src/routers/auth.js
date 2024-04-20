const express = require("express");
const {
  getAllUsers,
  register,
  login,
  refresh,
} = require("../controllers/auth");
const router = express.Router();

router.get("/users", getAllUsers);
router.put("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

module.exports = router;
