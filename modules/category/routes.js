const express = require('express');
const router = express.Router();

const {getCategory, getCategories, createCategory, updateCategory, deleteCategory } = require ('./controller');

router.get ('/:id',getCategory);

router.get ('/',getCategories);

router.get ('/create',createCategory);

router.get ('/update',updateCategory);

router.get ('/delete',deleteCategory);

module.exports = router