const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logIn = require("./logInController");
const User = require("../../database/models/user");

jest.mock("../../database/models/user");
jest.mock("bcrypt");

describe("Given a logIn controller function", () => {
  describe("When it receives a req with a username 'calabaza'", () => {
    test("Then it should invoke the findOne method with the received username", async () => {
      // recibe una request y en el body tiene un username y se invoca findOne.
      const username = "calabaza";
      const req = {
        body: {
          username,
          password: "si",
        },
      };
      User.findOne = jest.fn().mockResolvedValue(false);

      const next = jest.fn();

      await logIn(req, null, next);

      expect(User.findOne).toHaveBeenCalledWith({ username });
    });
  });

  describe("When it receives a req with a right username and a wrong password", () => {
    test("Then it should invoke next with an error 401", async () => {
      const username = "calabaza";
      const req = {
        body: {
          username,
          password: "si",
        },
      };
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      User.findOne = jest
        .fn()
        .mockResolvedValue({ id: "2", username, password: "si" });

      const next = jest.fn();
      const expectedError = new Error("Error. Peligro. No hay pfary.");
      expectedError.code = 401;

      await logIn(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });

  describe("When it receives a req with a right username and a rigth password", () => {
    test("Then it should invoke the res.json with an object with a brand new token inside", async () => {
      const req = {
        body: {
          username: "calabaza",
          password: "si",
        },
      };
      const res = {
        json: jest.fn(),
      };
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      User.findOne = jest
        .fn()
        .mockResolvedValue({ id: "2", username: "calabaza", password: "si" });
      const expectedToken = "papaya";
      jwt.sign = jest.fn().mockReturnValue(expectedToken);

      const expectedResponse = { token: expectedToken };

      await logIn(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
