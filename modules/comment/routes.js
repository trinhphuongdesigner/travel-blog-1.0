const express = require('express');

const router = express.Router();

const {
  getComment,
  getComments,
  createComment,
  updateComment,
  deleteComment,
} = require('./controller');

const { checkComment } = require('../../helpers/validator');

router.get('/:id', getComment);
router.get('/', getComments);
router.post('/', checkComment, createComment);
router.put('/:id', updateComment);
router.delete('/id', deleteComment);

module.exports = router;
