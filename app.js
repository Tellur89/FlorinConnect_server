const express = require('express');
const cors = require('cors');

const postRouters = require('./routers/postRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/posts', postRouters);

app.get('/', (req, res) => {
	res.json('Florin Connect Api');
});

module.exports = app;
