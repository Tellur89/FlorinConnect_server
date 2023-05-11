const express = require('express');
const cors = require('cors');
// const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { s3, Bucket, bucketName } = require('./aws/aws');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const db = require('./database/db');

// const verifyJWT = require('./middleware/authenticator');
const postRouters = require('./routers/postsRoutes');
const userRoutes = require('./routers/usersRoutes');
const tokenRoutes = require('./routers/tokensRoutes');
const refreshRoutes = require('./routers/refreshRoutes');

const app = express();

// Set up CORS headers
// const corsOptions = {
// 	origin: ['http://localhost:3000', 'https://florinconnectapi.onrender.com/', 's3://florinconnect/'],
// 	methods: ['GET', 'POST', 'PATCH', 'DELETE'],
// 	allowedHeaders: ['Content-Type', 'Authorization'],
// 	exposedHeaders: ['Authorization'],
// 	credentials: true,
// 	preflightContinue: false,
// 	optionsSuccessStatus: 204,
// };
app.use(cors());
app.use(express.json());
// app.use(cookieParser);

app.use('/posts', postRouters);

app.use('/tokens', tokenRoutes);
app.use('/refresh', refreshRoutes);

// app.use(verifyJWT());
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
