const express = require('express');

const router = express.Router();

const auth = require('../modules/auth/router');
const bookmarkFolderRouter = require('../modules/bookmarkFollder/routes');
const bookmarkLinkRouter = require('../modules/bookmarkLink/routes');
const categoryRouter = require('../modules/category/routes');
const commentRouter = require('../modules/comment/routes');
const postActivityRouter = require('../modules/postActivity/routes');
const postsRouter = require('../modules/posts/routes');
const userFollowerRouter = require('../modules/userFollower/routes');
const userRouter = require('../modules/users/routes');

router.use((req, res, next) => {
  res.locals.flash_messages = req.session.flash;
  delete req.session.flash;
  next();
});

router.use('/', auth);
router.use('/bookmark-folders', bookmarkFolderRouter);
router.use('/bookmark-links', bookmarkLinkRouter);
router.use('/categories', categoryRouter);
router.use('/comments', commentRouter);
router.use('/post-activities', postActivityRouter);
router.use('/posts', postsRouter);
router.use('/user-followers', userFollowerRouter);
router.use('/users', userRouter);

module.exports = router;
