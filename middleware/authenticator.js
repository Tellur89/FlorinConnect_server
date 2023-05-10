const jwt = require("jsonwebtoken");
const { Token } = require("../models/Token");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  console.log(authHeader);
  const token = authHeader.split(" ")[1]; //get token
  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) return res.sendStatus(403);
    req.user = data.user;
    next();
  });
};

module.exports = verifyJWT;
