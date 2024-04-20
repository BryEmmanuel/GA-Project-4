const { body } = require("express-validator");

const validateRegistrationData = [
  body("email", "email is required").not().isEmpty(),
  body("email", "valid email is required").isEmail(),
  body("username", "username is required").not().isEmpty(),
  body("username", "username min is 1 and max is 50").isLength({
    min: 1,
    max: 50,
  }),
  body("password", "password is required").not().isEmpty(),
  body("password", "password min is 1 and max is 50").isLength({
    min: 1,
    max: 50,
  }),
];

const validateLoginData = [
  body("username", "username is required").not().isEmpty(),
  body("password", "password is required").not().isEmpty(),
];

const validateRefreshToken = [
  body("refresh", "refresh token is required")
    .not()
    .isEmpty()
    .isLength({ min: 1 }),
];

module.exports = {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
};
