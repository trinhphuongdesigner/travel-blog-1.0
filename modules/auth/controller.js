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
      const checkedEmail = await User.findOne({ email });
      if (checkedEmail) {
        res.json({
          status: 500,
          message: 'Account is Existed',
        });
        return;
      }
      const newUser = new User({
        ...req.body,
        createdAt: new Date().getTime(),
        updateAt: new Date().getTime(),
      });
      const result = await newUser.save();
      // passport.authenticate('local')(req, res, function() {res.redirect('/login'); });

      res.json({
        status: 200,
        message: 'Create User Success',
        payload: result,
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
