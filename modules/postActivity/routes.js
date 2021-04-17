const express = require("express");
const router = express.Router();

const { getActivities } = require("./controller");

router.get("/", getActivities);

module.exports = router;
