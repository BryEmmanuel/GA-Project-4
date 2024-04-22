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

// add discussion
const addDiscussion = async (req, res) => {
  try {
    const { title, description, k_drama_id } = req.body;

    // Check if the specific k_drama exists
    const kDramaExists = await pool.query(
      "SELECT EXISTS(SELECT 1 FROM k_dramas WHERE id = $1)",
      [k_drama_id]
    );

    if (!kDramaExists.rows[0].exists) {
      // If the k_drama does not exist, return an error response
      return res
        .status(400)
        .json({ status: "error", msg: "kdrama does not exist" });
    }

    await pool.query(
      "INSERT INTO discussion (title, description, k_drama_id) VALUES ($1, $2, $3)",
      [title, description, k_drama_id]
    );
    res.status(200).json({ status: "ok", msg: "discussion added" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "failed to add discussion" });
  }
};

module.exports = { getAllDiscussion, addDiscussion };
