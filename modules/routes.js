const bookmarkFolderRouter = require('./bookmarkFollder/routes');
const bookmarkLinkRouter = require('./bookmarkLink/routes');
const categoryRouter = require('./category/routes');
const commentRouter = require('./comment/routes');
const postActivityRouter = require('./postActivity/routes');
const postsRouter = require('./posts/routes');
const userCommentRouter = require('./userComment/routes');
const userFollowerRouter = require('./userFollower/routes');
const usersRouter = require('./users/routes');



module.exports = {
    bookmarkFolderRouter,
    bookmarkLinkRouter,
    categoryRouter,
    commentRouter,
    postActivityRouter,
    postsRouter,
    userCommentRouter,
    userFollowerRouter,
    usersRouter
}