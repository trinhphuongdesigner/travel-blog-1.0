const { validationResult } = require('express-validator');

const { User } = require('../../models');

module.exports = {
  renderLogin: (req, res) => {
    res.render('admin/login');
  },

  login: (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    User.findOne({ email }).exec((err, user) => {
      if (err) {
        res.json({
          status: 404,
          message: 'Not found',
          payload: err,
        });
        return;
      }
      if (user && user.isBlocked) {
        res.json({
          status: 403,
          message: 'Your Account is Blocked',
          payload: user,
        });
        return;
      }
      if (!user || !user.comparePassword(password)) {
        res.json({
          status: 401,
          message: 'UseName or Password is Not Correct',
        });
        return;
      }
      req.session.user = user;

      // res.redirect('/admin/dashboard');
      res.json({
        status: 200,
        message: 'Login Success',
        payload: user,
        session: req.session,
      });
    });
  },

  renderRegister: (req, res) => {
    res.render('admin/register');
  },

  register: (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    User.findOne({ email }, (err, user) => {
      if (err) {
        res.json({
          status: 404,
          message: 'Cannot find an account',
          payload: err,
        });
        return;
      }
      if (user) {
        res.json({
          status: 400,
          message: 'Account is Existed',
        });
        return;
      }

      const newUser = new User({ ...req.body });
      newUser.save((saveErr, result) => {
        if (saveErr) {
          res.json({
            status: 400,
            message: 'Save Error',
            payload: saveErr,
          });
          return;
        }
        req.session.user = user;

        // res.redirect('/admin/dashboard');
        res.json({
          status: 201,
          message: 'Create User Success',
          payload: result,
        });
      });
    });
  },

  logoutController: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Logout success >>>');
      // res.redirect('/admin/login');
    });
  },
};
