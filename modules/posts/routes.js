const express = require('express');
const router = express.Router();

const {post, posts, createPost, updatePost, deletePost } = require ('./controller');

router.get('/',post);
router.get('/',posts);
router.get('/',createPost);
router.get('/',updatePost);
router.get('/',deletePost);

module.exports = router;