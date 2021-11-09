require("dotenv").config();

const connectDB = require("./database");
const { initializeServer } = require("./server/index");

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 5000;

(async () => {
  initializeServer(port);
  await connectDB();
})();
