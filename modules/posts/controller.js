const { Post, PostActivity } = require("../../models");

const updatePostActivities = async (userId, postId, activity) => {
  const newPostActivity = new PostActivity({
    userId,
    activity,
    timeStamp: new Date().getTime(),
    postId,
  });
  newPostActivity.save();
};

module.exports = {
  getPosts: async (req, res) => {
    try {
      const post = await Post.find().select().lean();
      if (!post) {
        res.json({
          status: 404,
          message: "Not found",
          payload: null,
        });
        return;
      }
      res.json({
        status: 200,
        message: "Get Posts Success",
        payload: post,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal Server Error",
        payload: err,
      });
    }
  },

  getPost: async (req, res) => {
    try {
      const { id } = req.params;
      const posts = await Post.findById(id).lean();
      if (!posts) {
        res.json({
          status: 404,
          message: "Not found",
          payload: null,
        });
        return;
      }
      res.json({
        status: 200,
        message: "Get Post Success",
        payload: posts,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal Server Error",
        payload: err,
      });
    }
  },

  createPost: async (req, res) => {
    try {
      const newPost = new Post({
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        ...req.body,
      });
      const post = await newPost.save();
      const { userId } = req.body;
      // eslint-disable-next-line no-underscore-dangle
      const postId = post._id;
      updatePostActivities(userId, postId, "CREATE");
      res.json({
        status: 200,
        message: "Create Post Success",
        payload: post,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal Server Error",
        payload: err,
      });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.updateOne(
        { _id: id },
        {
          $set: {
            // eslint-disable-next-line node/no-unsupported-features/es-syntax
            ...req.body,
          },
        }
      );
      updatePostActivities(req.body.userId, id, "UPDATE");
      res.json({
        status: 200,
        message: "Update Post Success",
        payload: post,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal Server Error",
        payload: err,
      });
    }
  },

  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.remove({ _id: id });
      updatePostActivities(req.body.userId, id, "DELETE");

      res.json({
        status: 200,
        message: "Delete Post Success",
        payload: post,
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
