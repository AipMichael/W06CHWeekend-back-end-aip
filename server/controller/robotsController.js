const debug = require("debug")("robots:controller");
const chalk = require("chalk");
const Robot = require("../../database/models/robot");

const getRobots = async (req, res) => {
  const robots = await Robot.find();
  res.json(robots); // test
};

const getARobot = async (req, res, next) => {
  const { idRobot } = req.params;
  try {
    const searchedRobot = await Robot.findById(idRobot);
    if (searchedRobot) {
      res.json(searchedRobot);
    } else {
      const error = new Error("Error. Peligro. Robot no encontrado.");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

const createRobot = async (req, res, next) => {
  try {
    const robot = req.body;
    robot.user = req.userId;
    const newRobot = await Robot.create(robot);
    res.status(201).json(newRobot);
  } catch {
    const error = new Error("Robot not found");
    error.code = 420;
    error.message = "Error. Peligro. Post-Enhance your calm. ";
    next(error);
  }
};

const updateRobot = async (req, res, next) => {
  // el ha hecho la promesa fuera, como el getARobot
  try {
    debug(chalk.cyanBright("Atención. Estamos modificando."));
    const robot = req.body;
    const { _id } = req.body;

    await Robot.findByIdAndUpdate(_id, req.body, {
      runValidators: true,
      new: true,
    });
    res.json(robot);
  } catch (error) {
    error.code = 404;
    error.message = "Error. Peligro. Nada ha cambiado.";
    next(error);
  }
};

module.exports = { getRobots, getARobot, createRobot, updateRobot };
