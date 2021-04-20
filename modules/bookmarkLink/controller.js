const { validationResult } = require('express-validator');

const { BookmarkLink } = require('../../models');

module.exports = {

  getBookmarkLinks: async (req, res) => {
    try {
      const {
        bookmarkFolderId,
        order,
      } = req.query;

      const result = await BookmarkLink.find({ bookmarkFolderId })
        .populate('bookmarkFolderId', 'title slug')
        .populate('postId', 'title slug')
        .select('')
        .sort({ createdAt: order || 'asc' })
        .lean();
      if (!result) {
        res.json({
          status: 404,
          message: 'Not found',
          payload: null,
        });
        return;
      }

      if (!result) {
        res.json({
          status: 404,
          message: 'Not found',
          payload: null,
        });
        return;
      }

      BookmarkLink.countDocuments({ bookmarkFolderId }).exec((error, count) => {
        if (error) {
          return res.json(error);
        }
        return res.json({
          status: 200,
          message: 'Get Comments Success',
          payload: {
            total: count,
            itemInPage: result.length,
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

  createBookmarkLink: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const newBookmarkLink = new BookmarkLink({ ...req.body });
      const result = await newBookmarkLink.save();
      res.json({
        status: 201,
        message: 'Create Bookmark Link success',
        payload: result,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: '',
        payload: err,
      });
    }
  },

  updateBookmarkLink: async (req, res) => {
    try {
      const { id } = req.params; // Lay ID tu URL
      const result = await BookmarkLink.updateOne(
        { _id: id },
        {
          $set: {
            ...req.body,
          },
        },
      );
      res.json({
        status: 200,
        message: 'Update Bookmark Link Success',
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

  deleteBookmarkLink: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await BookmarkLink.deleteOne({ _id: id });
      res.json({
        status: 200,
        message: 'Delete Bookmark Link Success',
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
