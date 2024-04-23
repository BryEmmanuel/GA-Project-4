const pool = require("../db/db");

// create comment
const createComment = async (req, res) => {
  try {
    const { discussion_id, user_id, contents } = req.body;
    const newComment = await pool.query(
      "INSERT INTO comments (discussion_id, user_id, contents) VALUES ($1, $2, $3)",
      [discussion_id, user_id, contents]
    );
    res.status(200).json({ status: "ok", msg: "new comment created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "failed to create comment" });
  }
};

module.exports = { createComment };
