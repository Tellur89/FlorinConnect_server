const { Router } = require('express');

const postControllers  = require('../controllers/postsControllers');

const postRouters = Router();

postRouters
    .get('/', postControllers.index)
    .post('/', postControllers.create);

postRouters
    .get('/search/category/:type', postControllers.getByCategory)
    .get('/search/status/open', postControllers.getByOpen)
    .get('/search/status/accepted', postControllers.getByAccepted)
    .get('/search/status/completed', postControllers.getByCompleted)
    .get('/:id', postControllers.show);
    


module.exports = postRouters;
