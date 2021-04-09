const express = require('express');
const router = express.Router();

const {getCategory, getCategorys, createCategory, updateCategory, deleteCategory } = require ('./controller');

router.get ('/:id',getCategory);

router.get ('/',getCategorys);

router.get ('/create',createCategory);

router.get ('/update',updateCategory);

router.get ('/delete',deleteCategory);

module.exports = router