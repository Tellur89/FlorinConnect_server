const { Router } = require('express');

const postControllers  = require('../controllers/postsControllers');

const postRouters = Router();

postRouters
    .get('/', postControllers.index)
    .post('/', postControllers.create);

postRouters
    //.use('/search/', postSearchRouter)
    .get('/:id', postControllers.show);
    


module.exports = postRouters;
