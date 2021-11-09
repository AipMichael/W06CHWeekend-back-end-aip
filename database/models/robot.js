const { Schema, model } = require("mongoose");

const robotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true, // TODO required premeditado. No cambiar.
  },
  specifications: {
    speed: {
      type: Number,
      required: true,
    },
    toughness: {
      type: Number,
      required: true,
    },
    creationDate: {
      type: Date,
    },
  },
});

const Robot = model("Robot", robotSchema, "robots");

module.exports = Robot;
