const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const pool = require("../db/db");

// try getting users from db
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await pool.query(
      "SELECT username, email, role, id FROM useraccount"
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
const login = async (req, res) => {
  try {
    // extract username, email and role from req.body
    const { username, email, role } = req.body;

    // checks if username exists in database
    const auth = await pool.query(
      "SELECT * FROM useraccount WHERE username = $1 LIMIT 1",
      [username]
    );

    // if username does not exist
    if (auth.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "Username does not exist!" });
    }

    // compare password to hash
    // the actual data lies in rows[0].hash not rows.hash
    const passwordLegit = await bcrypt.compare(
      req.body.password,
      auth.rows[0].hash
    );

    // if password is wrong, reject
    if (!passwordLegit) {
      console.log("You have entered the wrong password!");
      return res.status(400).json({ status: "error", msg: "Login failed" });
    }
    // adding values into claims to encrypt into JWT
    const claims = {
      username: auth.rows[0].username,
      role: auth.rows[0].role,
      profile_picture_url: auth.rows[0].profile_picture_url,
    };

    // encrypting things above into JWT payload
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "60m",
      jwtid: uuidv4(),
    });

    // generating refresh token
    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "failed to login" });
  }
};

// refresh
const refresh = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);

    const claims = {
      username: decoded.username,
      role: decoded.role,
      profile_picture_url: decoded.profile_picture_url,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "60m",
      jwtid: uuidv4(),
    });

    res.json({ access });
  } catch (error) {
    console.log("Error refreshing key");
    res.status(400).json({ status: "error", msg: "Refresh failed" });
  }
};

module.exports = { getAllUsers, register, login, refresh };
