//copy refresh token controller and modify it
const Token = require("../models/Token");
require("dotenv").config();

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const findUserToken = await Token.getOneByToken(refreshToken);
  const findUser = await Token.getUsername(findUserToken.user_id);
  if (findUserToken == undefined) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: false });
    return res.sendStatus(204);
  }
  if (findUser == undefined) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: false });
    return res.sendStatus(204);
  }

  //delete refresh token in db

  const deleteToken = await Token.delete(refreshToken);
  if (deleteToken) {
    console.log("token deleted");
  }
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: false });
  res.sendStatus(204);
};

module.exports = { handleLogout };
