// const passport = require('passport');

const { User } = require('../../models');

module.exports = {
  login: async (req, res) => {
    // try {
    //   const { email, password } = req.body;
    //   const result = await User.findOne({ email });
    //   if (result && result.isBlocked) {
    //     res.json({
    //       status: 200,
    //       message: 'Your Account is Blocked',
    //       payload: result,
    //     });
    //     return;
    //   }
    //   if (!result || !result.comparePassword(password)) {
    //     res.json({
    //       status: 200,
    //       message: 'UseName or Password is Not Correct',
    //       payload: result,
    //     });
    //     return;
    //   }
    //   res.json({
    //     status: 200,
    //     message: 'Login Success',
    //     payload: result,
    //   });
    // } catch (err) {
    //   res.json({
    //     status: 500,
    //     message: '',
    //     payload: err,
    //   });
    // }
  },

  register: async (req, res) => {
    try {
      const { email } = req.body;
      await User.findOne({ email }, (err, user) => {
        if (err) {
          res.json({
            status: 500,
            message: 'Internal Server Error',
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
        newUser.save((saveErr, result) => {
          if (saveErr) {
            res.json({
              status: 500,
              message: 'Internal Server Error',
              payload: saveErr,
            });
            return;
          }
          res.json({
            status: 200,
            message: 'Create User Success',
            payload: result,
          });
        });
        // passport.authenticate('local')(req, res, function() {res.redirect('/login'); });
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
