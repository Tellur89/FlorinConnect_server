const Token = require("../models/Token");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handlRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const findUserToken = await Token.getOneByToken(refreshToken);
  const findUser = await Token.getUsername(findUserToken["user_id"]);
  console.log(findUser);
  if (!findUserToken) return res.sendStatus(403);
  if (!findUser) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, data) => {
    if (err || findUser !== data.username) return res.sendStatus(403);
    const accessToken = jwt.sign(findUser, process.env.JWT_SECRET, {
      expiresIn: "30s",
    });
    res.json(accessToken);
  });
};

module.exports = handlRefreshToken;
