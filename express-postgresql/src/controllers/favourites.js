const pool = require("../db/db");

// add to favourites
const addFavourites = async (req, res) => {
  try {
    const { userId, kdramaId } = req.body;
    // check if favourites exist
    const favouriteExist = await pool.query(
      "SELECT * FROM favorites WHERE user_id = $1 AND kdrama_id = $2",
      [userId, kdramaId]
    );
    if (favouriteExist.rows.length > 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "kdrama already favourited" });
    }
    // add favourite
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

// get favourites of a user
const getFavouritesOfUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`Extracted userId: ${userId}`);
    const favouritesOfUser = await pool.query(
      "SELECT k_dramas.* , favorites.*, useraccount.username FROM k_dramas JOIN favorites ON k_dramas.id = favorites.kdrama_id JOIN useraccount ON favorites.user_id = useraccount.id WHERE favorites.user_id = $1",
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

module.exports = { addFavourites, getFavouritesOfUser };
