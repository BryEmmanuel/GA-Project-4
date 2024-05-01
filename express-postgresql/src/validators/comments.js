const { body, param } = require("express-validator");

const validateAddComments = [
  body("discussion_id", "discussion id is required").not().isEmpty(),
  body("user_id", "user id is required").not().isEmpty(),
  body("contents", "contents is required").not().isEmpty(),
  body("contents", "contents needs to be at least 1 character").isLength({
    min: 1,
  }),
];

module.exports = { validateAddComments };
