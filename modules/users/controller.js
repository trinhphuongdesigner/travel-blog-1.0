const { User } = require("../../models/index");

module.exports = {
  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const users = await User.findById(id).lean();
      if (!users) {
        // Kiểm tra có bài post không?
        res.json({
          // Nếu không có thì trả về 404
          status: 404,
          message: "Not found",
          payload: null,
        });
        return; // Phải có return
      }
      res.json({
        status: 200,
        message: "GetUser Success",
        payload: users,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Error",
        payload: err,
      });
    }
  },

  getUsers: async (req, res) => {
    try {
      const user = await User.find().select().lean();
      if (!user) {
        // Kiểm tra có bài post không?
        res.json({
          // Nếu không có thì trả về 404
          status: 404,
          message: "Not found",
          payload: null,
        });
        return; // Phải có return
      }
      res.json({
        status: 200,
        message: "GetUsers Success",
        payload: user,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Error",
        payload: err,
      });
    }
  },

  createUser: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        role,
        email,
        phone,
        address,
        about,
        socialLink,
      } = req.body; // Lấy url do người dùng nhập
      let newUser = new User({
        firstName,
        lastName,
        birthday,
        role,
        email,
        phone,
        address,
        about,
        socialLink,
        createdAt: new Date().getTime(),
        updateAt: new Date().getTime(),
      });
      user = await newUser.save();
      res.json({
        status: 200,
        message: "Create User Success",
        payload: user,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Error",
        payload: err,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params; //Lấy Id từ URL
      const { phone } = req.body;
      const user = await User.updateOne(
        { _id: id },
        {
          phone: phone,
        }
      );
      res.json({
        status: 200,
        message: "Success",
        message: "Update User Success",
        payload: user,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Error",
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
        message: "Error",
        payload: err,
      });
    }
  },
};

    // try {
    //   const addUser = await new User({
    //     firstName: "nguyen",
    //     lastName: "son",
    //     role: "manager", //amin,manager,contributor
    //     email: "sonnguyen2766@gmail.com",
    //     phone: 0333332766,
    //     address: "456 Trung Nu Vuong - DaNang",
    //     about: "",
    //     socialLink: {
    //       facebook: "https://www.facebook.com/sonnguyen2766/",
    //       instagram: "https://www.instagram.com/_son.1612/",
    //     },
    //     bookmarkFolderId: mongoose.ObjectId,
    //     createAt: new Date(),
    //     updateAt: new Date(),
    //   });
    //   addUser.save().then(() => {
    //     res.json({
    //       status: 200,
    //       message: "Create User Success",
    //       payload: category,
    //     });
    //   });
    // } catch (err) {
    //   res.json({
    //     status: 500,
    //     message: "Error",
    //     payload: err,
    //   });
    // }
