const supertest = require("supertest");
const debug = require("debug")("pets:testing:petsRoutes");
const chalk = require("chalk");
const mongoose = require("mongoose");
const { app, initializeServer } = require("../index");
const Robot = require("../../database/models/robot");
const connectDB = require("../../database");

const request = supertest(app);

let server;
let token;

beforeEach(async () => {
  debug(chalk.blue("Atención. Entrando al biforish."));
  await connectDB(process.env.MONGODB_TEST_STRING);
  server = await initializeServer(process.env.SERVER_PORT_TEST);

  const myRequest = await request
    .post("/users/login")
    .send({ username: "botMolon23", password: "soyRobot45!" })
    .expect(200);
  token = myRequest.body.token;

  await Robot.deleteMany({});
  await Robot.create({
    _id: "61855a3b385ac3020604f432",
    __v: 0,
    name: "Clockwork Droid",
    imageUrl: "www.google.com",
    specifications: {
      speed: 7,
      toughness: 7,
      creationDate: "1970-01-01T00:00:01.250Z",
    },
  });
  await Robot.create({
    _id: "61855a3b385ac3020604f434",
    __v: 0,
    name: "Emojibot",
    imageUrl: "www.google.com",
    specifications: {
      speed: 5,
      toughness: 5,
      creationDate: "1870-04-01T00:00:02.050Z",
    },
  });
});

afterEach(async () => {
  debug(chalk.yellow("Inside afterEach"));
  await mongoose.connection.close();
  await server.close();
});

describe("Given a /robots router", () => {
  describe("When a 'get' request to /robots arrives", () => {
    test("Then it should respond with an array of robots and a 200 status", async () => {
      const { body } = await request
        .get("/robots")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(body).toHaveLength(2);
      expect(body).toContainEqual({
        _id: "61855a3b385ac3020604f432",
        __v: 0,
        name: "Clockwork Droid",
        imageUrl: "www.google.com",
        specifications: {
          speed: 7,
          toughness: 7,
          creationDate: "1970-01-01T00:00:01.250Z",
        },
      });
      expect(body).toContainEqual({
        _id: "61855a3b385ac3020604f434",
        __v: 0,
        name: "Emojibot",
        imageUrl: "www.google.com",
        specifications: {
          speed: 5,
          toughness: 5,
          creationDate: "1870-04-01T00:00:02.050Z",
        },
      });
    });
  });
});
