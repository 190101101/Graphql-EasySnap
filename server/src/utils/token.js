require("dotenv").config();
const jwt = require("jsonwebtoken");

const token = {
  generate: ({ username }, expiresIn) => {
    return jwt.sign({ username }, process.env.encrypt, { expiresIn });
  },
};

module.exports = token;