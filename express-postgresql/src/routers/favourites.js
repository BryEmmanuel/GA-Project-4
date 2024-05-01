const express = require("express");
const {
  addFavourites,
  getFavouritesOfUser,
  removeFavourites,
} = require("../controllers/favourites");
const { authUser } = require("../middleware/auth");
const router = express.Router();

router.post("/addfavourites", authUser, addFavourites);
router.get("/userfavourites/:userId", authUser, getFavouritesOfUser);
router.delete("/removefavourites", authUser, removeFavourites);

module.exports = router;
