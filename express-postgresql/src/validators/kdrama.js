const { body, param } = require("express-validator");

const validateAddKdrama = [
  body("name", "name is required").not().isEmpty(),
  body("number_of_episodes", "number of episodes is required").not().isEmpty(),
  body("number_of_episodes", "number of episodes must be greater than 0").isInt(
    { min: 1 }
  ),
  body("year_released", "year is required").not().isEmpty(),
  body("year_released", "year needs to be greater than 1900").isInt({
    min: 1900,
  }),
  body("plot", "plot is required").not().isEmpty(),
  body("image_url", "image url is required").not().isEmpty(),
  body("genre", "genre is required").not().isEmpty(),
  body("youtube_url", "youtube embed code is required").not().isEmpty(),
];

module.exports = { validateAddKdrama };
