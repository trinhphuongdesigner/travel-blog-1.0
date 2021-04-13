const express = require('express');
const router = express.Router();

const {postActivity, postActivities, createPostActivity, updatePostActivity, deletePostActivity} = require ('./controller');

router.get('/',postActivity);
router.get('/:id',postActivities);
router.get('/create',createPostActivity);
router.get('/update',updatePostActivity);
router.get('/delete',deletePostActivity);

module.exports = router