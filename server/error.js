const debug = require("debug")("robots:errors");

const notFoundErrorHandler = (req, res) => {
  res.status(404).json({
    error: "Error. Peligro. Endpoint se ha perdido. Endpoint no encontrado.",
  });
};

const generalErrorHandler = (error, req, res, next) => {
  // TODO aunque ahora no lo usamos, para el test tenemos que poner "next"
  debug(`Error. Peligro. Ha habido un error: ${error.message}`);
  const message = error.code
    ? error.message
    : "Error. Peligro. Ha habido un pete general.";
  res.status(error.code || 500).json({ error: message });
};

module.exports = {
  notFoundErrorHandler,
  generalErrorHandler,
};
