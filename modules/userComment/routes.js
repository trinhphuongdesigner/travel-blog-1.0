const express = require("express");
const router = express.Router();

const {
  getUserComment,
  getUserComments,
  createUserComment,
  updateUserComment,
  deleteUserComment,
} = require("./controller");

router.get("/:id", getUserComment);
router.get("/", getUserComments);
router.get("/", createUserComment);
router.get("/", updateUserComment);
router.get("/", deleteUserComment);

module.exports = router;
