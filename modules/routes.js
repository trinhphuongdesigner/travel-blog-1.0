const express = require("express");
const router = express.Router();

const bookmarkFolderRouter = require("./bookmarkFollder/routes");
const bookmarkLinkRouter = require("./bookmarkLink/routes");
const categoryRouter = require("./category/routes");
const commentRouter = require("./comment/routes");
const postActivityRouter = require("./postActivity/routes");
const postsRouter = require("./posts/routes");
const userCommentRouter = require("./userComment/routes");
const userFollowerRouter = require("./userFollower/routes");
// const userRouter = require('./users/routes');

router.use("/bookmark-folder", bookmarkFolderRouter);
router.use("/bookmark-link", bookmarkLinkRouter);
router.use("/category", categoryRouter);
router.use("/comment", commentRouter);
router.use("/post-activity", postActivityRouter);
router.use("/posts", postsRouter);
router.use("/user-comment", userCommentRouter);
router.use("/user-follower", userFollowerRouter);
// router.use("/user", userRouter);

module.exports = router;
