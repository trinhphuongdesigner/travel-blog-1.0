const { User } = require('../../models/index');

module.exports = {
  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await User.findOne(id).lean();
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

  createUser: async (req, res) => {
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

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await User.updateOne(
        { _id: id },
        {
          $set: {
            ...req.body,
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
