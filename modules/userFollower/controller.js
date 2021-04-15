const { UserFollower } = require("../../models");

module.exports = {
  getUserFollowers: async (req, res) => {
    try {
      const { userId, type } = req.body;
      let follower = null;
      if (type === "follower") {
        // lấy danh sách những người mình theo dõi
        follower = await UserFollower.find({ followerId: userId })
          .select()
          .lean();
      } else {
        // lấy danh sách những người theo dõi mình
        follower = await UserFollower.find({ followingId: userId })
          .select()
          .lean();
      }

      if (!follower) {
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
        payload: follower,
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
      let newFollow = new UserFollower({
        ...req.body
      });
      follow = await newFollow.save();
      res.json({
        status: 200,
        message: "Follower Success",
        payload: follow,
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
      const follow = await UserFollower.remove({ _id: id });
      res.json({
        status: 200,
        message: "Unfollow Success",
        payload: follow,
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
