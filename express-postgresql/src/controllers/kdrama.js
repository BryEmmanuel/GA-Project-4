const pool = require("../db/db");

// get all kdramas
const getAllKdrama = async (req, res) => {
  try {
    const allKdrama = await pool.query("SELECT * FROM k_dramas");
    res.json(allKdrama.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "failed to get all kdramas" });
  }
};

// add kdramas
const addKdrama = async (req, res) => {
  try {
    const { name, number_of_episodes, year_released, plot, image_url, genre } =
      req.body;

    // Check if the genre exists in the genres table
    const genreExist = await pool.query(
      "SELECT genre_id FROM genres WHERE genre_name = $1",
      [genre]
    );

    let genreId;
    if (genreExist.rows.length > 0) {
      // If the genre exists, use its genre_id
      genreId = genreExist.rows[0].genre_id;
    } else {
      // If the genre does not exist, insert it into the genres table and use the new genre_id
      const insertNewGenre = await pool.query(
        "INSERT INTO genres (genre_name) VALUES ($1) RETURNING genre_id",
        [genre]
      );
      genreId = insertNewGenre.rows[0].genre_id;
    }

    await pool.query(
      "INSERT INTO k_dramas (name, number_of_episodes, year_released, plot, image_url, genre_id) VALUES ($1, $2, $3, $4, $5, $6)",
      [name, number_of_episodes, year_released, plot, image_url, genreId]
    );

    res.status(200).json({ status: "success", msg: "Kdrama added" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "failed to add kdrama" });
  }
};

// update kdrama
const updateKdrama = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, number_of_episodes, year_released, plot, image_url, genre } =
      req.body;

    // codes are same as above to allow dynamic addition of genre
    // Check if the genre exists in the genres table
    const genreExist = await pool.query(
      "SELECT genre_id FROM genres WHERE genre_name = $1",
      [genre]
    );

    let genreId;
    if (genreExist.rows.length > 0) {
      // If the genre exists, use its genre_id
      genreId = genreExist.rows[0].genre_id;
    } else {
      // If the genre does not exist, insert it into the genres table and use the new genre_id
      const insertNewGenre = await pool.query(
        "INSERT INTO genres (genre_name) VALUES ($1) RETURNING genre_id",
        [genre]
      );
      genreId = insertNewGenre.rows[0].genre_id;
    }
    // check if kdrama to be updated exists, only update if it exists.
    const kdramaExist = await pool.query(
      "SELECT id FROM k_dramas WHERE id = $1",
      [id]
    );
    if (kdramaExist.rows.length > 0) {
      await pool.query(
        "UPDATE k_dramas SET name = $1, number_of_episodes = $2, year_released = $3, plot = $4, image_url = $5, genre_id = $6 WHERE id = $7",
        [name, number_of_episodes, year_released, plot, image_url, genreId, id]
      );
    } else {
      res.status(400).json({
        status: "failed",
        msg: "kdrama does not exist, unable to update",
      });
    }

    res.status(200).json({ status: "success", msg: "kdrama updated" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "failed to update kdrama" });
  }
};

// DELETE kdrama
const deleteKdrama = async (req, res) => {
  try {
    const { id } = req.params;
    // check if id exists
    const kdramaExist = await pool.query(
      "SELECT id FROM k_dramas WHERE id = $1",
      [id]
    );
    if (kdramaExist.rows.length > 0) {
      await pool.query("DELETE FROM k_dramas WHERE id = $1", [id]);
      res
        .status(200)
        .json({ status: "success", msg: "kdrama deleted successfully" });
    } else {
      res.status(400).json({
        status: "failed",
        msg: "kdrama does not exist, unable to delete",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "failed to delete kdrama" });
  }
};

module.exports = { getAllKdrama, addKdrama, updateKdrama, deleteKdrama };
