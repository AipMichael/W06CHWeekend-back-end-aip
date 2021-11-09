const supertest = require("supertest");
const debug = require("debug")("pets:testing:petsRoutes");
const chalk = require("chalk");

const mongoose = require("mongoose");
const { app } = require("..");
const Robot = require("../../database/models/robot");
const initializeServer = require("..");
const connectDB = require("../../database");

const request = supertest(app);

let server;
let token;

beforeAll(async () => {
  debug(chalk.blue("Atención. Entrando al biforish."));
  await connectDB(process.env.MONGODB_TEST_STRING);
  server = await initializeServer(process.env.SERVER_PORT_TEST);

  await request
    .post("/users/login")
    .send({ username: "noSoyUnBot", password: "soyRobot33" })
    .expect(200);
  token = request.body.token;

  await Robot.deleteMany({});
  await Robot.create({
    id: 1,
    name: "Clockwork Droid",
    imageUrl: "www.google.com",
    specifications: { speed: 7, toughness: 7, creationDate: 1250 },
  });
  await Robot.create({
    id: 2,
    name: "Emojibot",
    imageUrl: "www.google.com",
    specifications: { speed: 5, toughness: 5, creationDate: 2050 },
  });
});

afterEach(async () => {
  debug(chalk.yellow("Inside afterEach"));
  await mongoose.connection.close();
  await server.close();
});
