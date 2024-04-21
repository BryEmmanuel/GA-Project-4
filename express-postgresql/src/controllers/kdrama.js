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
    await pool.query(
      "INSERT INTO k_dramas (name, number_of_episodes, year_released, plot, image_url, genre) VALUES ($1, $2, $3, $4, $5, $6)",
      [name, number_of_episodes, year_released, plot, image_url, genre]
    );
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "failed to add kdrama" });
  }
};

module.exports = { getAllKdrama, addKdrama };
