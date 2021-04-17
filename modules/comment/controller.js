const { Comment } = require('../../models');

module.exports = {
  getComment: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Comment.findById(id).lean();
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
        message: 'Get Comment Success',
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

  getComments: async (req, res) => {
    try {
      const result = await Comment.find().select().lean();
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
        message: 'Get Comments Success',
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

  createComment: async (req, res) => {
    try {
      const newComment = new Comment({
        ...req.body,
      });
      const result = await newComment.save();
      res.json({
        status: 200,
        message: 'Create Comment Success',
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

  updateComment: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Comment.updateOne(
        { _id: id },
        {
          $set: {
            ...req.body,
          },
        },
      );
      res.json({
        status: 200,
        message: 'Update Comment Success',
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

  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Comment.remove({ _id: id });

      res.json({
        status: 200,
        message: 'Delete Comment Success',
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
