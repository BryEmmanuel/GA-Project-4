const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const pool = require("../db/db");

// try getting users from db
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await pool.query(
      "SELECT username, email, role FROM useraccount"
    );
    res.json(allUsers.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Failed to get users" });
  }
};

module.exports = { getAllUsers };
