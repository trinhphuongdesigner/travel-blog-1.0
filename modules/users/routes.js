const express = require('express');
const router = express.Router();

const {} = require ('./controller');

router.get('/',user);
router.get('/:id',users);
router.get('/create',createUser);
router.get('/update',updateUser);
router.get('/delete',deleteUser);

module.exports = router; 