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

// get all discussions of a specific k-drama
const getKdramaDiscussion = async (req, res) => {
  try {
    const { name: kdramaName } = req.params;
    const specificKdramaDiscussion = await pool.query(
      "SELECT discussion.id, discussion.title, discussion.number_of_likes, discussion.created_at, discussion.description, k_dramas.name AS k_drama_name, useraccount.username FROM discussion JOIN k_dramas ON discussion.k_drama_id = k_dramas.id JOIN useraccount ON discussion.user_id = useraccount.id WHERE k_dramas.name = $1",
      [kdramaName]
    );
    res.json(specificKdramaDiscussion.rows);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "failed to get specific kdrama" });
  }
};

// get specific discussion
const getSpecificDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const specificDiscussion = await pool.query(
      "SELECT discussion.*, useraccount.username FROM discussion JOIN useraccount ON discussion.user_id = useraccount.id WHERE discussion.id = $1",
      [id]
    );
    res.json(specificDiscussion.rows);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "failed to get specific discussion" });
  }
};

// add discussion
const addDiscussion = async (req, res) => {
  try {
    const { title, description, k_drama_id } = req.body;

    // Check if the specific k_drama exists
    // think about using COUNT
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

// delete discussion
const deleteDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    // check if this specific discussion thread exists
    const discussionExist = await pool.query(
      "SELECT id from discussion WHERE id = $1",
      [id]
    );
    if (discussionExist.rows.length > 0) {
      await pool.query("DELETE FROM discussion WHERE id = $1", [id]);
      res.status(200).json({ status: "ok", msg: "discussion deleted" });
    } else {
      res.status(400).json({ status: "error", msg: "discussion not found" });
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "failed to delete discussion" });
  }
};

// update discussion
const updateDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    // check if this specific discussion thread exists
    const discussionExist = await pool.query(
      "SELECT id from discussion WHERE id = $1",
      [id]
    );
    if (discussionExist.rows.length > 0) {
      await pool.query(
        "UPDATE discussion SET title = $1, description = $2 WHERE id = $3",
        [title, description, id]
      );
      res
        .status(200)
        .json({ status: "success", msg: "Discussion updated successfully" });
    } else {
      res
        .status(400)
        .json({ status: "error", msg: "unable to find this discussion" });
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "unable to update discussion" });
  }
};

// handle likes count of the discussion
// increase likes
const increaseLikes = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(
      "UPDATE discussion SET number_of_likes = number_of_likes + 1 WHERE id = $1",
      [id]
    );
    res.status(200).json({ status: "success", msg: "likes updated" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "unable to update likes" });
  }
};

// decrease likes
const decreaseLikes = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(
      "UPDATE discussion SET number_of_likes = number_of_likes - 1 WHERE id = $1",
      [id]
    );
    res.status(200).json({ status: "success", msg: "likes updated" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "unable to update likes" });
  }
};

module.exports = {
  getAllDiscussion,
  addDiscussion,
  deleteDiscussion,
  updateDiscussion,
  getKdramaDiscussion,
  getSpecificDiscussion,
  increaseLikes,
  decreaseLikes,
};
