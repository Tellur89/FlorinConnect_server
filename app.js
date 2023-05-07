const express = require('express');
const cors = require('cors');

const postRouters = require('./routers/postRoutes');
const userRoutes = require('./routers/usersRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/posts', postRouters);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
	res.cookie('cookieName', 'cookieValue', {
		httpOnly: true,
		sameSite: 'none',
		secure: true,
	});
	res.json('Florin Connect Api');
});

module.exports = app;
