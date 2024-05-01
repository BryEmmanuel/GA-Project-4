const express = require("express");
const {
  addFavourites,
  getFavouritesOfUser,
  removeFavourites,
} = require("../controllers/favourites");
const router = express.Router();

router.post("/addfavourites", addFavourites);
router.get("/userfavourites/:userId", getFavouritesOfUser);
router.delete("/removefavourites", removeFavourites);

module.exports = router;
