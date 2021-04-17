const { BookmarkLink } = require('../../models');

module.exports = {

  getBookmarkLinks: async (req, res) => {
    try {
      const result = await BookmarkLink.find().select().lean();
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
        message: 'Get Bookmark Link Success',
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
  createBookmarkLink: async (req, res) => {
    try {
      const newbookmarklink = new BookmarkLink({ ...req.body });
      const result = await newbookmarklink.save();
      res.json({
        status: 200,
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
      const result = await BookmarkLink.remove({ _id: id });
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
