const express = require("express");

const router = express.Router();

const {
  getUserFollowers,
  createUserFollower,
  deleteUserFollower,
} = require("./controller");

router.get("/", getUserFollowers);
router.post("/", createUserFollower);
router.delete("/:id", deleteUserFollower);

module.exports = router;
