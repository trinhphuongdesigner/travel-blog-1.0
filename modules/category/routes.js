const express = require('express');

const router = express.Router();

const {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('./controller');

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
