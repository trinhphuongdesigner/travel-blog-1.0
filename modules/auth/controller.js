// const passport = require('passport');

const { User } = require('../../models');

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    await User.findOne({ email }).exec((err, user) => {
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
          status: 200,
          message: 'Your Account is Blocked',
          payload: user,
        });
        return;
      }
      if (!user || !user.comparePassword(password)) {
        res.json({
          status: 200,
          message: 'UseName or Password is Not Correct',
        });
        return;
      }
      res.json({
        status: 200,
        message: 'Login Success',
        payload: user,
      });
    });
  },

  register: async (req, res) => {
    try {
      const { email } = req.body;
      await User.findOne({ email }, (err, user) => {
        if (err) {
          res.json({
            status: 500,
            message: 'Cannot find an account',
            payload: err,
          });
          return;
        }
        if (user) {
          res.json({
            status: 500,
            message: 'Account is Existed',
          });
          return;
        }

        const newUser = new User({
          ...req.body,
        });
        newUser.save((saveErr, nUser) => {
          if (saveErr) {
            res.json({
              status: 400,
              message: 'Save Error',
              payload: saveErr,
            });
            return;
          }
          res.json({
            status: 200,
            message: 'Create User Success',
            payload: nUser,
          });
        });
      });
    } catch (err) {
      res.json({
        status: 500,
        message: 'Internal Server Error',
        payload: err,
      });
    }
  },
};
