const express = require('express');
const router = express.Router();

const {userComment, userComment, createUserComment, updateUserComment, deleteUserComment } = require ('./controller');

router.get('/',userComment);
router.get('/:id',userComments);
router.get('/',createUserComment);
router.get('/',updateUserComment);
router.get('/',deleteUserComment);

module.exports = router;
