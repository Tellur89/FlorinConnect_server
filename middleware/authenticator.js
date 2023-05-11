const jwt = require("jsonwebtoken");
const { Token } = require("../models/Token");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1]; //get token
  console.log(token);
  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      console.log("cant find shit");
      return res.sendStatus(403);
    }
    req.user = data.user;
    next();
  });
};

module.exports = verifyJWT;
