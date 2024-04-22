const pool = require("../db/db");

// get all discussion
const getAllDiscussion = async (req, res) => {
  try {
    const allDiscussion = await pool.query("SELECT * FROM discussion");
    res.json(allDiscussion.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "failed to get discussions" });
  }
};

module.exports = { getAllDiscussion };
