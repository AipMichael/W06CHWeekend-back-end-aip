const Robot = require("../../../database/models/robot");

const getRobots = async (req, res) => {
  const robots = await Robot.find();
  res.json(robots); // test
};

const getARobot = async (req, res, next) => {
  const { idRobot } = req.params;
  try {
    const searchedRobot = await Robot.findById(idRobot); // test: receives a req.id + res + next.
    if (searchedRobot) {
      res.json(searchedRobot); // test to be called: receives a req + res with .json + next.
    } else {
      const error = new Error("Error. Peligro. Robot no encontrado."); // test -in the end
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error); // test
  }
};

const createRobot = async (req, res, next) => {
  try {
    const robot = req.body;
    const newRobot = await Robot.create(robot);
    res.json(newRobot);
  } catch (error) {
    error.code = 420;
    error.message = "Error. Peligro. Enhance your calm.";
    next(error);
  }
};

module.exports = { getRobots, getARobot, createRobot };
