const getRobots = async (req, res) => {
  const robots = await Robot.find();
  res.json(robots);
};

module.exports = {
  getRobots,
};
