const { Post } = require("../../models");

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
        ...req.body,
      });
      const post = await newPost.save();
      // create post activity
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
            ...req.body,
          },
        }
      );
      // create post activity
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

    // create post activity
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
