const chalk = require("chalk");
const debug = require("debug")("robots:server");
const express = require("express");
const morgan = require("morgan");
const { notFoundErrorHandler, generalErrorHandler } = require("./error");
const robotsRoutes = require("./routes/robotsRoutes");

const app = express();

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.blue(`Atención. Se está escuchando en el puerto ${port}`));
  });

  server.on("error", (error) => {
    debug(
      chalk.red("Error. Peligro. Ha habido un error al iniciar el servidor.")
    );
    if (error.code === "EADDRINUSE") {
      debug(chalk.blue(`Error. Peligro. El puerto ${port} está en uso.`));
    }
  });
};

app.use(morgan("dev"));
app.use(express.json());

app.use("/robots", robotsRoutes);

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

module.exports = initializeServer;
