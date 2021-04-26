const express = require('express');

const router = express.Router();

const {
  getBookmarkFolders,
  createBookmarkFolder,
  updateBookmarkFolder,
  deleteBookmarkFolder,
} = require('./controller');

const { checkBookmarkFolder } = require('../../helpers/validator');

router.get('/', getBookmarkFolders);
router.post('/', checkBookmarkFolder, createBookmarkFolder);
router.put('/:id', updateBookmarkFolder);
router.delete('/:id', deleteBookmarkFolder);

module.exports = router;
