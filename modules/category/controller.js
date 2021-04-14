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
        message: "Success",
        payload: categories,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal server error",
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
        message: "Success",
        payload: category,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal server error",
        payload: err,
      });
    }
  },

  createCategory: async (req, res) => {
    try {
      const { name, status } = req.body;
      let newCategory = new Category({
        name,
        status,
        createdAt: new Date().getTime(),
        updateAt: new Date().getTime(),
      });
      category = await newCategory.save();
      res.json({
        status: 200,
        message: "Success",
        payload: category,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal server error",
        payload: err,
      });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, status } = req.body;
      const category = await Category.updateOne(
        { _id: id },
        {
          title,
          status,
          updateAt: new Date().getTime(),
        }
      );
      res.json({
        status: 200,
        message: "Success",
        payload: category,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal server error",
        payload: err,
      });
    }
  },

  deleteCategory: async (req, res) => {
    const { id } = req.params;
    const category = await Category.remove({ _id: id });
    res.json({
      status: 200,
      message: "Success",
      payload: category,
    });
  },
};
