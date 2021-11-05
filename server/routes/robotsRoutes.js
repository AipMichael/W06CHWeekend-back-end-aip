const express = require("express");
const { getRobots, getARobot } = require("./controller/robotsController");

const router = express.Router();

router.get("/", getRobots);
router.get("/:idRobot", getARobot);

module.exports = router;
