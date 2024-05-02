const { body, param } = require("express-validator");

const validateAddDiscussion = [
  body("title", "title is required").not().isEmpty(),
  body("description", "description is required").not().isEmpty(),
  body("k_drama_id", "kdrama id is required").not().isEmpty(),
  body("k_drama_id", "kdrama id needs to be a valid integer").isInt({ min: 1 }),
];

const validateNameInParam = [
  param("name", "name is required").not().isEmpty(),
  param("name", "name needs to be at least 2 characters long").isLength({
    min: 2,
  }),
];

module.exports = { validateAddDiscussion, validateNameInParam };
