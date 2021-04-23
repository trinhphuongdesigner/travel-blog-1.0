const express = require('express');

const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('./controller');

const { checkRegister } = require('../../helpers/validator');

router.get('/', getUsers);
router.get('/:id', getUser);
router.route('/register').post(checkRegister, createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
