/* const { restart } = require("nodemon"); */
const { getRobots, getARobot } = require("./robotsController");
const Robot = require("../../../database/models/robot");

describe("Given a getRobots function", () => {
  describe("When it receives a res object, and inherits a given Robot model", () => {
    test("Then it should invoke the res's method json", async () => {
      const robots = [
        {
          id: 1,
          name: "K-9",
          imageUrl:
            "https://www.herocollector.com/Content/ArticleImages/277e031b-e366-43b3...",
          specifications: {
            speed: 6,
            toughness: 9,
            creationDate: new Date("1977-06-05T16:21:22.000+00:00"),
          },
        },
        {
          id: 1,
          name: "Clockwork Droid",
          imageUrl:
            "https://i.pinimg.com/236x/04/7a/cd/047acd102d3424cd44743e803818f614--halloween-costumes-th-doctor.jpg",
          specifications: {
            speed: 7,
            toughness: 6,
            creationDate: new Date("1850-12-17T03:24:00.000+00:00"),
          },
        },
      ];

      Robot.find = jest.fn().mockResolvedValue(robots);
      const res = {
        json: jest.fn(),
      };

      await getRobots(null, res);

      expect(Robot.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(robots);
    });
  });
});

describe("Given a getARobot function", () => {
  describe("When it receives a request with an id of 7, a res object, a next function and inherits a given Robot model", () => {
    test("Then it should invoke Robot.findById with the id 7", async () => {
      Robot.findById = jest.fn().mockResolvedValue({});
      const idRobot = 7;
      const req = {
        params: {
          idRobot,
        },
      };
      const res = {
        json: () => {},
      };
      const next = () => {};

      await getARobot(req, res, next);

      expect(Robot.findById).toHaveBeenCalledWith(idRobot);
    });
  });
});
