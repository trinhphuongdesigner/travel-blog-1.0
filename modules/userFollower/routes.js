const express = require('express');

const router = express.Router();

const {
  getUserFollowers,
  createUserFollower,
  deleteUserFollower,
} = require('./controller');

const { checkUserFollower } = require('../../helpers/validator');

router.get('/', getUserFollowers);
router.post('/', checkUserFollower, createUserFollower);
router.delete('/:id', deleteUserFollower);

module.exports = router;
