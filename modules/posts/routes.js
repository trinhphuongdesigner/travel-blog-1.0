const express = require('express');

const router = express.Router();

const {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require('./controller');

const { checkPost } = require('../../helpers/validator');

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', checkPost, createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
