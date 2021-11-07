require("dotenv").config();

const token = process.env.TOKEN;

const needToken = (req, res, next) => {
  if (token === req.query.token) {
    next();
  } else {
    const error = new Error(
      "Error. Peligro. El token introducido es inservible. Introducir el token correcto. I'm a teapot."
    );
    error.code = 418;
    next(error);
  }
};

module.exports = needToken;
