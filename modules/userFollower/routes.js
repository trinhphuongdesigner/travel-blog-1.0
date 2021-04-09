const express = require('express');
const router = express.Router();

const { userFollower, userFollowers, createUserFollower, updateUserFollower, deleteUserFollower } = require ('./controller');

router.get ('/',userFollower);
router.get ('/:id',userFollowers);
router.get ('/create',createUserFollower);
router.get ('/update',updateUserFollower);
router.get ('/delete',deleteUserFollower);

module.exports = router