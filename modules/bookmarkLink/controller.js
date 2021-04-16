const { BookmarkLink } = require("../../models");


module.exports = {

  getBookmarkLinks: async (req, res) => {
    try {
      const bookmarklink = await BookmarkLink.find().select().lean();
      if (!bookmarklink) {
        res.json({
          status: 404,
          message: "Not found",
          payload: null,
        });
        return;
      }
      res.json({
        status: 200,
        message: "Get BookmarkLink Success",
        payload: bookmarklink,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal Server Error",
        payload: err,
      });
    }
  },
  createBookmarkLink: async (req, res) => {
    try {
      const newbookmarklink = new BookmarkLink({ ...req.body });
      const bookmarklink = await newbookmarklink.save();
      res.json({
        status: 200,
        message: "Create BookmarkLink success",
        payload: bookmarklink,
      });
    } catch (err) {
        res.json({
          status: 500,
          message: "",
          payload: err,
        });
    }
  },
  updateBookmarkLink: async (req, res) => {
    try {
      const { id } = req.params; // Lay ID tu URL
      const bookmarklink = await BookmarkLink.updateOne(
        { _id: id },
        {
          $set: {
            ...req.body,
          },
        }
      );
      res.json({
        status: 200,
        message: "UpdatebookmarkLink Success",
        payload: bookmarklink,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal Server Error",
        payload: err,
      })
    }
  },
  deleteBookmarkLink: async (req, res) => {
    try {
      const { id } = req.params;
      const bookmarklink = await BookmarkLink.remove({ _id: id });
      res.json({
        status: 200,
        message: "Delete BookmarkLink Success",
        payload: bookmarklink,
      });
    } catch (err) {
        res.json({
        status: 500,
        message: "Internal Server Error",
        payload: err,
      })
    }
  },
};
