// const jwt = require('jsonwebtoken');
// require('dotenv').config();
// const Token = require('../models/token.js');

// const verifyJWT = async (req, res, next) => {
// 	const authHeader = req.headers['authorization'];

// 	if (!authHeader) return res.sendStatus(401);

// 	const token = authHeader.split(' ')[1]; //get token

// 	try {
// 		const user_id = await Token.verifyLogin(token);
// 		req.user_id = user_id;
// 		next();
// 	} catch (error) {
// 		res.status(403).json({ error: err.message });
// 	}

// 	// jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
// 	// 	if (err) return res.sendStatus(403); //invalid token
// 	// 	req.user = decoded.username;
// 	// 	next();
// 	// });
// };

// module.exports = verifyJWT;

const Token = require("../models/token");

async function authenticator(req, res, next) {
  try {
    const userToken = req.headers["authorization"];

    if (userToken == "null") {
      throw new Error("User not authenticated.");
    } else {
      const validToken = await Token.getOneByToken(userToken);

      next();
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

module.exports = authenticator;
