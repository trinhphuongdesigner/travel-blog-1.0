const { validationResult } = require('express-validator');

const { Comment } = require('../../models');

module.exports = {
  getComment: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Comment.findOne({ _id: id })
        .populate('userId', 'firstName lastName')
        .populate('postId', 'title')
        .lean();
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
      const {
        perPage,
        page,
        searchField,
        searchKey,
        sortName,
        order,
      } = req.query;

      const defaultPerPage = Number(perPage) || 12;
      const defaultPage = Number(page) || 1;

      const sortObject = {};
      sortObject[sortName || 'createdAt'] = order || 'asc';

      const findObject = {};
      findObject[searchField || 'content'] = new RegExp(searchKey, 'i');

      const query = { ...findObject };

      const result = await Comment.find(query)
        .populate('userId', 'firstName lastName')
        .populate('postId', 'title')
        .skip((defaultPerPage * defaultPage) - defaultPerPage)
        .limit(defaultPerPage)
        .select('')
        .sort(sortObject)
        .lean();
      if (!result) {
        res.json({
          status: 404,
          message: 'Not found',
          payload: null,
        });
        return;
      }

      Comment.countDocuments(query).exec((error, count) => {
        if (error) {
          return res.json(error);
        }
        return res.json({
          status: 200,
          message: 'Get Comments Success',
          payload: {
            total: count,
            totalPage: Math.ceil(count / defaultPerPage),
            currentPage: defaultPage,
            itemInPage: result.length,
            take: defaultPerPage,
            data: result,
          },
        });
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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const newComment = new Comment({
        ...req.body,
      });
      const result = await newComment.save();
      res.json({
        status: 201,
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
      const result = await Comment.deleteOne({ _id: id });

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
