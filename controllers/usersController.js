const jwt = require("jsonwebtoken");
const { authenticator } = require("../middleware/authenticator");
const User = require("../models/User");
require("dotenv").config();

async function index(req, res) {
  try {
    const user = await User.getAll();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function showById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const user = await User.getOneById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function showByUsername(req, res) {
  try {
    const username = req.params.username;
    const user = await User.getOneByUsername(username);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function showAdmin(req, res) {
  jwt.verify(req.token, process.env.JWT_SECRET, async function (err, data) {
    if (err) {
      res.status(403);
    } else {
      try {
        const data = await User.getAdmin();
        res.status(200).json(data);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    }
  });
}

async function createUser(req, res) {
  try {
    const data = req.body;
    const user = await User.create(data);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = req.body.admin;
    const user = await User.getOneById(id);
    const updatedUser = await user.update(data);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
async function verifyLogin(req, res) {
  try {
    const data = req.body;
    const userID = data["username"];

    const login = await User.verifyLogin(data);
    const registerToken = await User.getUserToken(userID);
    res.status(200).json({ token: registerToken["token"] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function destroyUser(req, res) {
  try {
    const username = req.params.username;
    const user = await User.getOneByUsername(username);
    console.log(user);
    const result = await user.destroy();
    res.status(204).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  index,
  showById,
  showByUsername,
  showAdmin,
  createUser,
  updateUser,
  destroyUser,
  verifyLogin,
};
