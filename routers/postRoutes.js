const { Router } = require('express');

const postControllers  = require('../controllers/postsControllers');

const postRouters = Router();

postRouters.get("/", postControllers.index);

module.exports = postRouters;
