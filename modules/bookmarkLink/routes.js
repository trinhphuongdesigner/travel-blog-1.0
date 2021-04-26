const express = require('express');

const router = express.Router();

const {
  getBookmarkLinks,
  deleteBookmarkLink,
  createBookmarkLink,
  updateBookmarkLink,
} = require('./controller');

const { checkBookmarkLink } = require('../../helpers/validator');

router.get('/', getBookmarkLinks);
router.post('/', checkBookmarkLink, createBookmarkLink);
router.put('/:id', updateBookmarkLink);
router.delete('/:id', deleteBookmarkLink);

module.exports = router;
