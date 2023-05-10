// const Token = require("../models/token");

// async function authenticator(req, res, next) {
//   try {
//     const userToken = req.headers["authorization"];
//     if (userToken == "null") {
//       throw new Error("User not authenticated");
//     } else {
//       const validToken = await Token.getOneByToken(userToken);
//     }
//   } catch (error) {}
// }

//! JWT TOKEN

const jwt = require("jsonwebtoken");
require("dotenv").config();

// const authenticator = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

//     const userToken = await Token.findOne({
//       where: { user_id: decodedToken.userId },
//     });

//     if (!userToken) {
//       throw new Error();
//     }

//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ message: "Authentication failed!" });
//   }
// };

const authenticator = async (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.params.token ||
    req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed!" });
  }
};

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.header["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403);
  }
};

module.exports = { authenticator, verifyToken };
