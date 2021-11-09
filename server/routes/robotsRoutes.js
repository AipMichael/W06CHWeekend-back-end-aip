const express = require("express");

const {
  getRobots,
  getARobot,
  createRobot,
  updateRobot,
} = require("../controller/robotsController");
/* const needToken = require("../middlewares/needToken"); */
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, getRobots);
router.get("/:idRobot", auth, getARobot);
router.post("/create", auth, createRobot);
router.put("/update", auth, updateRobot);

module.exports = router;
