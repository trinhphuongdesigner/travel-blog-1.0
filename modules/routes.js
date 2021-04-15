const express = require('express');
const router = express.Router();


const bookmarkFolderRouter = require('./bookmarkFollder/routes');
const bookmarkLinkRouter = require('./bookmarkLink/routes');
const categoryRouter = require('./category/routes');
const commentRouter = require('./comment/routes');
const postActivityRouter = require('./postActivity/routes');
const postsRouter = require('./posts/routes');
const userCommentRouter = require('./userComment/routes');
const userFollowerRouter = require('./userFollower/routes');
const usersRouter = require('./users/routes');


router.use("/bookmark-folders", bookmarkFolderRouter);
router.use("/bookmark-links", bookmarkLinkRouter);
router.use("/categories", categoryRouter);
router.use("/comments", commentRouter);
router.use("/post-activities", postActivityRouter);
router.use("/posts", postsRouter);
router.use("/user-comments", userCommentRouter);
router.use("/user-followers", userFollowerRouter);
router.use("/user", usersRouter);

module.export = router;
