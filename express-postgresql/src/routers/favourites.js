const express = require("express");
const {
  addFavourites,
  getFavouritesOfUser,
} = require("../controllers/favourites");
const router = express.Router();

router.post("/addfavourites", addFavourites);
router.get("/userfavourites/:userId", getFavouritesOfUser);

module.exports = router;
