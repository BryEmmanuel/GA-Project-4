const express = require("express");
const { addFavourites } = require("../controllers/favourites");
const router = express.Router();

router.post("/addfavourites", addFavourites);

module.exports = router;
