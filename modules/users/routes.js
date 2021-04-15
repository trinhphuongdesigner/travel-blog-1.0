const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("./controller");

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/create", createUser);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);

module.exports = router;
