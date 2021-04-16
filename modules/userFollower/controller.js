const { UserFollower } = require("../../models");

module.exports = {
  getUserFollowers: async (req, res) => {
    try {
      const { userId, type } = req.body;
      let result = null;
      if (type === "follower") {
        // lấy danh sách những người mình theo dõi
        result = await UserFollower.find({ followerId: userId })
          .select()
          .lean();
      } else {
        // lấy danh sách những người theo dõi mình
        result = await UserFollower.find({ followingId: userId })
          .select()
          .lean();
      }

      if (!result) {
        res.json({
          status: 404,
          message: "Not found",
          payload: null,
        });
        return;
      }

      res.json({
        status: 200,
        message: "Get User Follower Success",
        payload: result,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal Server Error",
        payload: err,
      });
    }
  },

  createUserFollower: async (req, res) => {
    try {
      // const { followingId, followerId } = req.body;
      const newFollow = new UserFollower({
        ...req.body
      });
      const result = await newFollow.save();
      res.json({
        status: 200,
        message: "Follower Success",
        payload: result,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal Server Error",
        payload: err,
      });
    }

  },
  
  deleteUserFollower: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await UserFollower.remove({ _id: id });
      res.json({
        status: 200,
        message: "Unfollow Success",
        payload: result,
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
