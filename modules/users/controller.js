const { validationResult } = require('express-validator/check');

const { User } = require('../../models/index');

module.exports = {
  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await User.findOne({ _id: id }).lean();
      if (!result) {
        res.json({
          status: 404,
          message: 'Not found',
          payload: null,
        });
        return;
      }
      res.json({
        status: 200,
        message: 'Get User Success',
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

  getUsers: async (req, res) => {
    try {
      const result = await User.find().select().lean();
      if (!result) {
        res.json({
          status: 404,
          message: 'Not found',
          payload: null,
        });
        return;
      }
      res.json({
        status: 200,
        message: 'GetUsers Success',
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

  createUser: (req, res) => {
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

      const newUser = new User({
        email,
        password,
      });
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

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await User.updateOne(
        { _id: id },
        {
          $set: {
            ...req.body,
            updatedAt: new Date().getTime(),
          },
        },
      );
      res.json({
        status: 200,
        message: 'Update User Success',
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

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await User.remove({ _id: id });

      res.json({
        status: 200,
        message: 'DeleteUser Success',
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
