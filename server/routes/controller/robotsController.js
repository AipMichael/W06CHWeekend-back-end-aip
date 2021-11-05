const Robot = require("../../../database/models/robots");

const getRobots = async (req, res) => {
  console.log("cuack");
  const robots = await Robot.find();
  res.json(robots);
};

module.exports = getRobots;
