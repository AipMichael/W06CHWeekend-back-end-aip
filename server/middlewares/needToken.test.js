const needToken = require("./needToken");

describe("Given the needToken function", () => {
  describe("When it receives a create request with a correct token", () => {
    test("Then it should invoke the function next", () => {
      const req = {
        query: {
          token: process.env.TOKEN,
        },
      };

      const res = {};

      const next = jest.fn();

      needToken(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives a create request with an incorrect token", () => {
    test("Then it should respond with an error", () => {
      const req = {
        query: {
          token: "No soy un token",
        },
      };

      const res = {};

      const next = jest.fn();

      needToken(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
