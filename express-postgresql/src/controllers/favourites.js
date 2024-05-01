const pool = require("../db/db");

// add to favourites
const addFavourites = async (req, res) => {
  try {
    const { userId, kdramaId } = req.body;
    // check if favourites exist AND favorited
    const favouriteExist = await pool.query(
      "SELECT * FROM favorites WHERE user_id = $1 AND kdrama_id = $2 AND is_favorited = TRUE",
      [userId, kdramaId]
    );
    if (favouriteExist.rows.length > 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "kdrama already favourited" });
    }
    // check if favourites exist AND IS NOT favorited
    const favouriteDeleted = await pool.query(
      "SELECT * FROM favorites WHERE user_id = $1 AND kdrama_id = $2 AND is_favorited = FALSE",
      [userId, kdramaId]
    );
    if (favouriteDeleted.rows.length > 0) {
      // if it's NOT favorited, change to favorited
      await pool.query(
        "UPDATE favorites SET is_favorited = TRUE WHERE user_id = $1 AND kdrama_id = $2",
        [userId, kdramaId]
      );
      return res
        .status(200)
        .json({ status: "success", msg: "kdrama favourited" });
    }
    // add favourite if it doesn't exist
    await pool.query(
      "INSERT INTO favorites (user_id, kdrama_id) VALUES ($1,$2)",
      [userId, kdramaId]
    );
    res.status(200).json({ status: "success", msg: "kdrama favourited" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "failed to add to favourites" });
  }
};

// remove from favourites
const removeFavourites = async (req, res) => {
  try {
    const { userId, kdramaId } = req.body;
    await pool.query(
      "UPDATE favorites SET is_favorited = FALSE WHERE user_id = $1 AND kdrama_id = $2",
      [userId, kdramaId]
    );
    res.status(200).json({ status: "success", msg: "kdrama unfavourited" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "failed to delete favourites" });
  }
};

// get favourites of a user
const getFavouritesOfUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`Extracted userId: ${userId}`);
    const favouritesOfUser = await pool.query(
      "SELECT k_dramas.* , favorites.*, useraccount.username FROM k_dramas JOIN favorites ON k_dramas.id = favorites.kdrama_id JOIN useraccount ON favorites.user_id = useraccount.id WHERE favorites.user_id = $1 AND favorites.is_favorited = true",
      [userId]
    );
    res.json(favouritesOfUser.rows);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "failed to get favourites of user" });
  }
};

module.exports = { addFavourites, getFavouritesOfUser, removeFavourites };
