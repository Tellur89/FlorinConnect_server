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
const { Token } = require("../models/Token");
require("dotenv").config();

const authenticator = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userToken = await Token.findOne({
      where: { user_id: decodedToken.userId },
    });

    if (!userToken) {
      throw new Error();
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Authentication failed!" });
  }
};

module.exports = { authenticator };
