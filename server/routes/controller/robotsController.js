const Robot = require("../../../database/models/robot");

const getRobots = async (req, res) => {
  const robots = await Robot.find();
  res.json(robots); // test
};

const getARobot = async (req, res, next) => {
  const { idRobot } = req.params;
  try {
    const searchedRobot = await Robot.findById(idRobot); // test
    if (searchedRobot) {
      res.json(searchedRobot); // test to be called
    } else {
      const error = new Error("Error. Peligro. Robot no encontrado."); // no test: the thrown error goes to catch
      error.code = 404;
      throw error;
    }
  } catch (error) {
    // test
    error.code = 400;
    next(error); // test
  }
};

module.exports = { getRobots, getARobot };
