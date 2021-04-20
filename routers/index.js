const express = require('express');

const router = express.Router();

const adminRouter = require('./admin.routes');
const clientRouter = require('./client.routes');

router.use('/admin', adminRouter);
router.use('/', clientRouter);

module.exports = router;
