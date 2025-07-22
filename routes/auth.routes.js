const router = require('express').Router()

const {signup  ,login} = require("../controllers/auth.controller")
const { body } = require('express-validator');
const validate = require('../middleware/validate.middleware');

router.post(
  '/signup',
  [
    body('username').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    validate,
  ],
  signup
);

router.post('/login', [body('email').isEmail(), body('password').notEmpty(), validate], login);

module.exports = router;