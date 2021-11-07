const express = require("express");
const {
  getRobots,
  getARobot,
  createRobot,
} = require("./controller/robotsController");

const router = express.Router();

router.get("/", getRobots);
router.get("/:idRobot", getARobot);
router.get("/create", createRobot);

module.exports = router;
