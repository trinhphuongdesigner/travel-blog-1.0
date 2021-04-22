const express = require('express');

const router = express.Router();

const login = require('./auth/router');
const bookmarkFolderRouter = require('./bookmarkFollder/routes');
const bookmarkLinkRouter = require('./bookmarkLink/routes');
const categoryRouter = require('./category/routes');
const commentRouter = require('./comment/routes');
const postActivityRouter = require('./postActivity/routes');
const postsRouter = require('./posts/routes');
const userFollowerRouter = require('./userFollower/routes');
const userRouter = require('./users/routes');

router.use((req, res, next) => {
  res.locals.flash_messages = req.session.flash;
  delete req.session.flash;
  next();
});

router.use('/admin', login);
router.use('/bookmark-folders', bookmarkFolderRouter);
router.use('/bookmark-links', bookmarkLinkRouter);
router.use('/categories', categoryRouter);
router.use('/comments', commentRouter);
router.use('/post-activities', postActivityRouter);
router.use('/posts', postsRouter);
router.use('/user-followers', userFollowerRouter);
router.use('/users', userRouter);

module.exports = router;
