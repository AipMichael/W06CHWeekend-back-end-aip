require("dotenv").config();
const debug = require("debug")("robots:database");

const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = () =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", true);

    // aqui iria el deletee _id
    mongoose.connect(process.env.MONGODB_SERVER, (error) => {
      if (error) {
        debug(
          chalk.red("Error. Peligro. La base de datos no ha podido iniciarse.")
        );
        reject(error);
        return;
      }
      debug(chalk.green("Atención. Conectado a la base de datos"));
      resolve();
    });

    mongoose.connection.on("close", () => {
      debug(
        chalk.green("Atención. Se está desconectando de la base de datos.")
      );
    });
  });

module.exports = connectDB;
