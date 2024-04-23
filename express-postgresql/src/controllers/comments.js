const pool = require("../db/db");

// create comment
const createComment = async (req, res) => {
  try {
    const { discussion_id, user_id, contents } = req.body;
    await pool.query(
      "INSERT INTO comments (discussion_id, user_id, contents) VALUES ($1, $2, $3)",
      [discussion_id, user_id, contents]
    );
    res.status(200).json({ status: "ok", msg: "new comment created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "failed to create comment" });
  }
};

// get all comments
const getAllComments = async (req, res) => {
  try {
    const allComments = await pool.query("SELECT * FROM comments");
    res.json(allComments.rows);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "failed to get all comments" });
  }
};

// get single comment
const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const specificComment = await pool.query(
      "SELECT * FROM comments WHERE id = $1",
      [id]
    );
    if (specificComment.rows.length > 0) {
      res.json(specificComment.rows);
    } else {
      res.status(400).json({ status: "error", msg: "comment not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "failed to get comment" });
  }
};

module.exports = { createComment, getAllComments, getCommentById };
