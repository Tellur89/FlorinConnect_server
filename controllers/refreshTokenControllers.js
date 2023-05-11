const Token = require("../models/Token");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const findUserToken = await Token.getOneByToken(refreshToken);

  const findUser = await Token.getUsername(findUserToken.user_id);
  if (findUserToken == undefined) return res.sendStatus(403);
  if (!findUser == undefined) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, data) => {
    if (err || findUser.username !== data.username) return res.sendStatus(403);
    const accessToken = jwt.sign(findUser, process.env.JWT_SECRET, {
      expiresIn: "30s",
    });
    res.json(accessToken);
  });
};

module.exports = { handleRefreshToken };
