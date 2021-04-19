const express = require('express');

const router = express.Router();

const passport = require('passport');

const { login, register } = require('./controller');

router.post('/login/', passport.authenticate('local', {
  successRedirect: '/users',
  failureRedirect: '/login',
}), () => {});

router.post('/register/', register);

module.exports = router;
