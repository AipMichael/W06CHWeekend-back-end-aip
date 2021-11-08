const express = require("express");

const {
  getRobots,
  getARobot,
  createRobot,
} = require("../controller/robotsController");
const needToken = require("../middlewares/needToken");

const router = express.Router();

router.get("/", getRobots);
router.get("/:idRobot", getARobot);
router.post("/create", needToken, createRobot);

module.exports = router;
