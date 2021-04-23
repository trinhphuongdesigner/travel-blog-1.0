const express = require('express');

const router = express.Router();

const {
  renderLogin,
  login,
  renderRegister,
  register,
  logoutController,
} = require('./controller');

const { checkLogin, checkRegister } = require('../../helpers/validator');

router.use(['/login', '/register'], (req, res, next) => {
  if (req.session.user) {
    // return res.redirect('/');
    res.json({
      status: 200,
      message: 'Account was login success',
    });
  }
  next();
});

router.route('/login').get(renderLogin).post(checkLogin, login);

router.route('/register').get(renderRegister).post(checkRegister, register);

router.use((req, res, next) => {
  if (req.session.user) {
    res.locals.currentUser = req.session.user;
    return next();
  }
  res.json({
    status: 500,
    message: 'Save info fail',
  });
  // req.flash('danger', 'login fail');
  // res.redirect('/admin/login');
});

router.get('/logout', logoutController);

module.exports = router;
