const { Category } = require("../../models");

module.exports = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find().select().lean();

      if (!categories) {
        res.json({
          status: 404,
          message: "Not found",
          payload: null,
        });
        return;
      }

      res.json({
        status: 200,
        message: "Get Categories Success",
        payload: categories,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal Server Error",
        payload: err,
      });
    }
  },

  getCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id).lean();

      if (!category) {
        res.json({
          status: 404,
          message: "Not found",
          payload: null,
        });
        return;
      }

      res.json({
        status: 200,
        message: "Get Category Success",
        payload: category,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal Server Error",
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
        createdAt: new Date().getTime(),
        updateAt: new Date().getTime(),
      });
      const category = await newCategory.save();
      res.json({
        status: 200,
        message: "Create Category Success",
        payload: category,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal Server Error",
        payload: err,
      });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.updateOne(
        { _id: id },
        {
          $set: {
            ...req.body,
            updateAt: new Date().getTime(),
          },
        }
      );
      res.json({
        status: 200,
        message: "Update Category Success",
        payload: category,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal Server Error",
        payload: err,
      });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.remove({ _id: id });
      res.json({
        status: 200,
        message: "Delete Category Success",
        payload: category,
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
