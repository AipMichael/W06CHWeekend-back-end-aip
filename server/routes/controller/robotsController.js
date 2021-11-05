const Robot = require("../../../database/models/robots");

const getRobots = async (req, res) => {
  const robots = await Robot.find();
  res.json(robots);
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
      throw error;
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

module.exports = { getRobots, getARobot };
