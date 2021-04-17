const { BookmarkFolder } = require('../../models');

module.exports = {
  getBookmarkFolders: async (req, res) => {
    try {
      const result = await BookmarkFolder.find().select().lean();
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
        message: "Get Bookmark Folder Success",
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

  createBookmarkFolder: async (req, res) => {
    try {
      const newbookmarkfolder = new BookmarkFolder({ ...req.body });
      const result = await newbookmarkfolder.save();
      res.json({
        status: 200,
        message: "Create Bookmark Folder success",
        payload: result,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "",
        payload: err
      });
      }
    },

  updatebookmarkFolder: async (req, res) => {
    try {
      const { id } = req.params; // Lay ID tu URL
      const result = await BookmarkFolder.updateOne(
        { _id: id },
        {
          $set: {
            ...req.body,
          },
        }
      );
      res.json({
        status: 200,
        message: "Update Bookmark Folder Success",
        payload: result,
      });
    } catch (err){
      res.json({
        status: 500,
        message: "Internal Server Error",
        payload: err,
      })
      }
  },

  deletebookmarkFolder: async (req, res) => {
    try {
      const { id } = req.params;
      const bookmarkfolder = await BookmarkFolder.remove({ _id: id });
      res.json({
        status: 200,
        message: "Delete Bookmark Folder Success",
        payload: bookmarkfolder,
      })
    } catch (err){
      res.json({
        status: 500,
        message: "Internal Server Error",
        payload: err,
      })
    }
    },
}
