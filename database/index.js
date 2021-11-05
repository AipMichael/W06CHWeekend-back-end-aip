require("dotenv").config();
const debug = require("debug")("robots:database");

const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = () =>
  new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGODB_SERVER, (error) => {
      if (error) {
        debug(
          chalk.red("Error. Peligro. La base de datos no ha podido iniciarse.")
        );
        reject();
        return;
      }
      debug(chalk.green("Atención. Conectado a la base de datos"));
      resolve();
    });
  });

module.exports = connectDB;
