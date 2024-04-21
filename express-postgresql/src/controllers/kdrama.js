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

module.exports = { getAllKdrama };
