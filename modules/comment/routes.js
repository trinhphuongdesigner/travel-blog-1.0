const express = require('express');

const router = express.Router();

const {getComment, getComments, createComment, updateComment, deleteComment} = require ('./controller')

router.get('/', getComment);
router.get('/', getComments);
router.get('/create', createComment);
router.get('/update', updateComment);
router.get('/delete', deleteComment);

module.exports = router