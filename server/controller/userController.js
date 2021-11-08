const User = require("../../database/models/user");

const createUser = async (req, res, next) => {
  try {
    const { name, password } = req.header;
    const newUser = await User.create({ name, password });
    res.json(newUser);
  } catch (error) {
    error.code = 420;
    error.message = "Error. Peligro. Enhance your calm.";
    next(error);
  }
};

module.exports = createUser;
