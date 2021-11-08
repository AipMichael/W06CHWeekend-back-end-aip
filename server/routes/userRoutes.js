const express = require("express");
/* const bcrypt = require("bcrypt"); */
const logInController = require("../controller/logInController");

const router = express.Router();

/* const User = require("../../database/models/user");
 router.get("/", async () => {
  User.create({
    name: "MiBot",
    username: "botMolon23",
    password: await bcrypt.hash("soyRobot45!", 10),
  });
}); */

router.post("/login", logInController);

module.exports = router;
