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

// register
const register = async (req, res) => {
  try {
    // extract username, email and role from req.body
    const { username, email, role } = req.body;

    // checks if username is a duplicate
    const auth = await pool.query(
      "SELECT * FROM useraccount WHERE username = $1 LIMIT 1",
      [username]
    );

    // if user with same username is found, throws an error
    if (auth.rows.length > 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "duplicate username" });
    }

    // hashing of password
    const hash = await bcrypt.hash(req.body.password, 12);

    // insert user into the database
    await pool.query(
      "INSERT INTO useraccount (username, email, hash, role) VALUES ($1, $2, $3, $4)",
      [username, email, hash, role]
    );
    res.json({ status: "ok", msg: "user created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "failed to register" });
  }
};

// login
const login = async (req, res) => {};

module.exports = { getAllUsers, register };
