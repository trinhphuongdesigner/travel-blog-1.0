const { BookmarkFolder } = require('../../models');

module.exports = {
  getBookmarkFolders: async (req, res) => {
    try {
      const bookmarkfolder = await BookmarkFolder.find().select().lean();
      if (!bookmarkfolder) {
        res.json({
          status: 404,
          message: "Not found",
          payload: null,
        });
        return;
      }
      res.json({
        status: 200,
        message: "Get BookmarkFolder Success",
        payload: bookmarkfolder,
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
      const bookmarkFolder = await newbookmarkfolder.save();
      res.json({
        status: 200,
        message: "Create bookmarkLink success",
        payload: bookmarkFolder,
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
      const bookmarkfolder = await BookmarkFolder.updateOne(
        { _id: id },
        {
          $set: {
            ...req.body,
          }
        }
      );
      res.json({
        status: 200,
        message: "updatebookmarkFolder",
        payload: bookmarkfolder
      })
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
        message: "Delete BookmarkFolder Success",
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
