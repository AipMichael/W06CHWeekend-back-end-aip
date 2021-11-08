require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("robots:server");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    debug(chalk.red("Error. Peligro. No existes."));
    const error = new Error("Error. Peligro. No existes.");
    error.code = 401;
    next(error);
  } else {
    const token = authHeader.split(" ")[1];
    if (!token) {
      debug(chalk.red("Error. Peligro. No existes."));
      const error = new Error("Error. Peligro. No existes.");
      error.code = 401;
      next(error);
    } else {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = user.id;
        next();
      } catch (error) {
        error.message(
          "Error. Peligro. Para enviar este token, mejor no enviar nada."
        );
        error.code = 401;
        next(error);
      }
    }
  }
};

module.exports = auth;
