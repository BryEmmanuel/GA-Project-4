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

// get comments from a discussion post
const getDiscussionComments = async (req, res) => {
  try {
    const { id } = req.params;
    const discussionComments = await pool.query(
      "SELECT comments.id, comments.discussion_id, comments.user_id, comments.contents, comments.created_at, comments.is_deleted, discussion.title, useraccount.username FROM comments JOIN discussion ON comments.discussion_id = discussion.id JOIN useraccount ON comments.user_id = useraccount.id WHERE discussion.id = $1",
      [id]
    );
    res.json(discussionComments.rows);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "failed to get discussion comments" });
  }
};

// delete comment - false delete
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    // check if comment exists
    const commentExists = await pool.query(
      "SELECT id FROM comments WHERE id = $1",
      [id]
    );
    if (commentExists.rows.length > 0) {
      await pool.query("UPDATE comments SET is_deleted = TRUE WHERE id = $1", [
        id,
      ]);
      res.status(200).json({ status: "ok", msg: "comment deleted" });
    } else {
      res.status(400).json({ status: "error", msg: "unable to find comment" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "failed to delete comment" });
  }
};

// update comment
const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { contents } = req.body;
    // check if comment exists
    const commentExists = await pool.query(
      "SELECT id FROM comments WHERE id = $1",
      [id]
    );
    if (commentExists.rows.length > 0) {
      await pool.query("UPDATE comments SET contents = $1 WHERE id = $2", [
        contents,
        id,
      ]);
      res.status(200).json({ status: "ok", msg: "comment updated" });
    } else {
      res.status(400).json({ status: "error", msg: "comment not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "unable to update comment" });
  }
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  deleteComment,
  updateComment,
  getDiscussionComments,
};
