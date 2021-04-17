const { Category } = require('../../models');

module.exports = {
  getCategories: async (req, res) => {
    try {
      const result = await Category.find().select().lean();

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
        message: 'Get Categories Success',
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

  getCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Category.findById(id).lean();

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
        message: 'Get Category Success',
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

  createCategory: async (req, res) => {
    try {
      const { name, status } = req.body;
      const newCategory = new Category({
        name,
        status,
      });
      const result = await newCategory.save();
      res.json({
        status: 200,
        message: 'Create Category Success',
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

  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Category.updateOne(
        { _id: id },
        {
          $set: {
            ...req.body,
          },
        },
      );
      res.json({
        status: 200,
        message: 'Update Category Success',
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

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Category.remove({ _id: id });
      res.json({
        status: 200,
        message: 'Delete Category Success',
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
