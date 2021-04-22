const express = require('express');

const router = express.Router();

const { login, register } = require('./controller');

const { checkLogin, checkRegister } = require('../../helpers/validator');

router.get('/login', (req, res) => {
  res.render('admin/login');
});

router.post('/login', checkLogin, login);

router.get('/register', (req, res) => {
  res.render('admin/register');
});

router.post('/register', checkRegister, register);

// router.use((req, res, next) => {
//   if (req.session.user) {
//     console.log("hello my friend!!!")
//     res.locals.currentUser = req.session.user;
//     next();
//   }
//   res.redirect('/login');
// });

module.exports = router;
