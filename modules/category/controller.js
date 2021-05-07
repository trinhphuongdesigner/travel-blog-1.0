const getSlug = require('speakingurl');

const { validationResult } = require('express-validator');

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
      const result = await Category.findOne({ _id: id }).lean();

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
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const { name, status } = req.body;

      const slugName = getSlug(name, { lang: 'vn' });

      const check = await Category.findOne({ slug: slugName }).lean();

      if (check) {
        res.json({
          status: 400,
          message: 'Category is Existed',
        });
        return;
      }

      // kiem tra slug da ton tai chua
      const newCategory = new Category({
        name,
        status,
      });
      const result = await newCategory.save();
      res.json({
        status: 201,
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
      const { type } = req.body;

      if (type === 'DELETE') {
        const result = await Category.updateOne(
          { _id: id },
          {
            $set: {
              isDeleted: true,
              updatedAt: new Date().getTime(),
            },
          },
        );
        res.json({
          status: 200,
          message: 'Update Category Success',
          payload: result,
        });
      } else {
        if (req.body.name) {
          const slugName = getSlug(req.body.name, { lang: 'vn' });

          const check = await Category.findOne({ slug: slugName }).lean();

          if (check) {
            res.json({
              status: 400,
              message: 'Category is Existed',
            });
            return;
          }
        }
        // kiem tra slug da ton tai chua
        const result = await Category.updateOne(
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
          message: 'Update Category Success',
          payload: result,
        });
      }
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
      const result = await Category.deleteOne({ _id: id });
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
