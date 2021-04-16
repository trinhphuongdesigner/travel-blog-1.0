const { User } = require("../../models/index");

module.exports = {
  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const users = await User.findById(id).lean();
      if (!users) {
        res.json({
          status: 404,
          message: "Not found",
          payload: null,
        });
        return;
      }
      res.json({
        status: 200,
        message: "Get User Success",
        payload: users,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal Server Error",
        payload: err,
      });
    }
  },

  getUsers: async (req, res) => {
    try {
      const user = await User.find().select().lean();
      if (!user) {
        res.json({
          status: 404,
          message: "Not found",
          payload: null,
        });
        return;
      }
      res.json({
        status: 200,
        message: "GetUsers Success",
        payload: user,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal Server Error",
        payload: err,
      });
    }
  },

  createUser: async (req, res) => {
    try {
      const newUser = new User({
        ...req.body,
        createdAt: new Date().getTime(),
        updateAt: new Date().getTime(),
      });
      const user = await newUser.save();
      res.json({
        status: 200,
        message: "Create User Success",
        payload: user,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal Server Error",
        payload: err,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.updateOne(
        { _id: id },
        {
          $set: {
            ...req.body,
            updateAt: new Date().getTime(),
          },
        }
      );
      res.json({
        status: 200,
        message: "Update User Success",
        payload: user,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal Server Error",
        payload: err,
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.remove({ _id: id });

      res.json({
        status: 200,
        message: "DeleteUser Success",
        payload: user,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal Server Error",
        payload: err,
      });
    }
  },
};
