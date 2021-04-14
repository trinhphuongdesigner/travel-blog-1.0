const express = require('express');
const router = express.Router();

const { getusers, getuser, createUser, updateUser, deleteUser } = require("./controller");

router.get("/", getusers);
router.get('/:id',getuser);
router.get('/create',createUser);
router.get('/update',updateUser);
router.get('/delete',deleteUser);

module.exports = router; 