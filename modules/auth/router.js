const express = require('express');

const router = express.Router();

// const passport = require('passport');

const { login, register } = require('./controller');

const { checkLogin, checkRegister } = require('../../helpers/validator');

router.get('/login', (req, res) => {
  res.render('admin/login');
});

router.post('/login', checkLogin, login);

// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/users',
//   failureRedirect: '/login',
// }), login);

router.get('/register', (req, res) => {
  res.render('admin/register');
});

router.post('/register', checkRegister, register);

module.exports = router;
