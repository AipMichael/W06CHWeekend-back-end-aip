const { Joi } = require("express-validation");

const loginSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = loginSchema;
