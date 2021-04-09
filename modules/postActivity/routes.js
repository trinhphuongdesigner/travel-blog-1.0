const express = require('express');
const router = express.Router();

const {postActivity, postActivitys, createPostActivity, updatePostActivity, deletePostActivity} = require ('./controller');

router.get('/',postActivity);
router.get('/:id',postActivitys);
router.get('/create',createPostActivity);
router.get('/update',updatePostActivity);
router.get('/delete',deletePostActivity);

module.exports = router