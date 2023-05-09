const Token = require("../models/token");

async function createToken(req, res) {
  try {
    const data = req.body;
    const user = await Token.create(data);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
module.exports = {
  createToken,
};
