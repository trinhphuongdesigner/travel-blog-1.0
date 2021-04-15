const express = require('express');
const router = express.Router();

const { getUserComment, getUserComments, createUserComment, updateUserComment, deleteUserComment } = require ('./controller');

router.get("/", getUserComment);
router.get("/:id", getUserComments);
router.get('/',createUserComment);
router.get('/',updateUserComment);
router.get('/',deleteUserComment);

module.exports = router;
