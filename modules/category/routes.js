const express = require('express');

const router = express.Router();

const {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('./controller');

const { checkCategory } = require('../../helpers/validator');

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', checkCategory, createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
