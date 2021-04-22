const {
  check,
} = require('express-validator');

const checkBookmarkFolder = [
  check('title').not().isEmpty().withMessage('Title is required'),
  check('userId').not().isEmpty().withMessage('User is required'),
];

const checkBookmarkLink = [
  check('bookmarkFolderId').not().isEmpty().withMessage('bookmark Folder is required'),
  check('postId').not().isEmpty().withMessage('Post is required'),
];

const checkCategory = [
  check('title').not().isEmpty().withMessage('Title is required'),
];

const checkComment = [
  check('userId').not().isEmpty().withMessage('User is required'),
  check('postId').not().isEmpty().withMessage('Post is required'),
  check('content', 'Content must 6-1500 chars').custom((value) => {
    return value.trim().length >= 6 && value.trim().length <= 1500;
  }),
];

const checkPost = [
  check('title').not().isEmpty().withMessage('Title is required'),
  check('content', 'Content must 6-1500 chars').custom((value) => {
    return value.trim().length >= 6 && value.trim().length <= 1500;
  }),
  check('userId').not().isEmpty().withMessage('Author is required'),
  check('categoryId').not().isEmpty().withMessage('Category is required'),
];

const checkPostActivity = [
  check('postId').not().isEmpty().withMessage('Post is required'),
  check('userId').not().isEmpty().withMessage('Author is required'),
  check('activity').not().isEmpty().withMessage('Activity is required'),
];

const checkLogin = [
  check('email').isEmail().withMessage('Please fill a valid email address'),
  check('email').isEmail().withMessage('Please fill a valid email address'),
  check('password').not().isEmpty().withMessage('Password is required'),
];

const checkRegister = [
  check('email').isEmail().withMessage('Please fill a valid email address'),
  check('password').not().isEmpty().withMessage('Password is required'),
  check('rePassword').matches('password').withMessage('Password is not match'),
];

const checkUserFollower = [
  check('followerId').not().isEmpty().withMessage('Follower is required'),
  check('followingId').not().isEmpty().withMessage('Following is required'),
];

module.exports = {
  checkBookmarkFolder,
  checkBookmarkLink,
  checkCategory,
  checkComment,
  checkPost,
  checkPostActivity,
  checkLogin,
  checkRegister,
  checkUserFollower,
};
