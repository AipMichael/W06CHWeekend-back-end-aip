const chalk = require("chalk");
require("dotenv").config();
const debug = require("debug")("robots:server");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");

const logIn = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    // user no existe
    const error = new Error("Error. Peligro. Silencio. No hay banda.");
    error.code = 401;
    next(error);
  } else {
    const rightPassword = await bcrypt.compare(password, user.password); // req password, existing pass, bcryptcompare mocked
    if (!rightPassword) {
      // if compare is null, goes to nohaypfary
      debug(chalk.red("Error. Peligro. No hay pfary."));
      const error = new Error("Error. Peligro. No hay pfary.");
      error.code = 401;
      next(error);
    } else {
      // if compare is ok, jwt.sign is invoked
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 12 * 60 * 60,
        }
      );

      res.json({ token }); // esto tambien
    }
  }
};

module.exports = logIn;
