const { validationResult } = require('express-validator');

const { BookmarkFolder, BookmarkLink } = require('../../models');

module.exports = {
  getBookmarkFolders: async (req, res) => {
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
      sortObject[sortName || 'updatedAt'] = order || 'asc';

      const findObject = {};
      findObject[searchField || 'title'] = new RegExp(searchKey, 'i');

      const query = { ...findObject };

      const result = await BookmarkFolder.find(query)
        .populate('userId', 'firstName lastName')
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

      if (!result) {
        res.json({
          status: 404,
          message: 'Not found',
          payload: null,
        });
        return;
      }

      BookmarkFolder.countDocuments(query).exec((error, count) => {
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

  createBookmarkFolder: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const newBookmarkFolder = new BookmarkFolder({ ...req.body });
      const result = await newBookmarkFolder.save();
      res.json({
        status: 201,
        message: 'Create Bookmark Folder success',
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

  updateBookmarkFolder: async (req, res) => {
    try {
      // let params = {
      //   name: req.body.name,
      //   email: req.body.emaill,
      //   password: req.body.password
      // };

      // for (let prop in params) if (!params[prop]) delete params[prop]; //This will not handle intentionally setting to false, empty string, null, 0, or other falsey values.

      // let params = {};

      // for (let prop in req.body) if (req.body[prop]) params[prop] = req.body[prop];

      const { id } = req.params; // Lay ID tu URL
      const result = await BookmarkFolder.updateOne(
        { _id: id },
        {
          $set: {
            ...req.body,
            updatedAt: new Date().getTime(),
          },
        },
      );
      res.json({
        status: 200,
        message: 'Update Bookmark Folder Success',
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

  deleteBookmarkFolder: async (req, res) => {
    try {
      const { id } = req.params;
      const { type, userId } = req.body;

      // nếu kiểu là xóa cứng > xóa cả folder và các link trong folder.
      if (type === 'HARD_DELETE') {
        try {
          BookmarkLink.deleteMany({ bookmarkFolderId: id });
          res.json({
            status: 200,
            message: 'Delete Bookmark Link Success',
          });
        } catch (err) {
          res.json({
            status: 500,
            message: 'Internal Server Error',
            payload: err,
          });
        }
      } else { // di chuyển các link trong folder vào 1 thư mục Other
        // thực hiện tìm kiếm thư mục, nếu không có thì tạo mới.
        const result = await BookmarkFolder.findOneAndUpdate({ title: 'Other', userId }, {}, { upsert: true });
        // eslint-disable-next-line no-underscore-dangle
        BookmarkLink.updateMany({ bookmarkFolderId: id }, { bookmarkFolderId: result._id });
        res.json({
          status: 200,
          message: 'Move Bookmark Link Success',
        });
      }

      const result = await BookmarkFolder.deleteOne({ _id: id });
      res.json({
        status: 200,
        message: 'Delete Bookmark Folder Success',
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
