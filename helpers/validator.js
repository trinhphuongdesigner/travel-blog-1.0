const {
  check,
} = require('express-validator');

const checkBookmarkFolder = [
  check('title').not().isEmpty().withMessage('Title is required'),
  check('userId').not().isEmpty().withMessage('Author Id is required'),
];

const checkBookmarkLink = [
  check('bookmarkFolderId').not().isEmpty().withMessage('bookmark Folder is required'),
  check('postId').not().isEmpty().withMessage('Post Id is required'),
];

const checkCategory = [
  check('title').not().isEmpty().withMessage('Title is required'),
];

const checkComment = [
  check('userId').not().isEmpty().withMessage('Author Id is required'),
  check('postId').not().isEmpty().withMessage('Post Id is required'),
  check('content', 'Content must 6-1500 chars').custom((value) => value.trim().length >= 6 && value.trim().length <= 1500),
];

const checkPost = [
  check('title').not().isEmpty().withMessage('Title is required'),
  check('content', 'Content must 6-1500 chars').custom((value) => value.trim().length >= 6 && value.trim().length <= 1500),
  check('userId').not().isEmpty().withMessage('Author Id is required'),
  check('categoryId').not().isEmpty().withMessage('Category is required'),
];

// Not use now
const checkPostActivity = [
  check('postId').not().isEmpty().withMessage('Post Id is required'),
  check('userId').not().isEmpty().withMessage('Author Id is required'),
];

const checkLogin = [
  check('email').not().isEmpty().withMessage('Email is required')
    .isEmail()
    .withMessage('Please fill a valid email address'),
  check('password').not().isEmpty().withMessage('Password is required'),
];

const checkRegister = [
  check('email').not().isEmpty().withMessage('Email is required')
    .isEmail()
    .withMessage('Please fill a valid email address'),
  check('password').not().isEmpty().withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password is so sort'),
  check('repassword', 'Password is not match').custom((value, { req }) => (
    req.body.password === value
  )),
];

const checkUserFollower = [
  check('followerId').not().isEmpty().withMessage('Follower Id is required'),
  check('followingId').not().isEmpty().withMessage('Following Id is required'),
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
