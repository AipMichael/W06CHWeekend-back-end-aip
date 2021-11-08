const express = require("express");

const {
  getRobots,
  getARobot,
  createRobot,
} = require("../controller/robotsController");
/* const needToken = require("../middlewares/needToken"); */
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, getRobots);
router.get("/:idRobot", auth, getARobot);
router.post("/create", auth, createRobot);

module.exports = router;
