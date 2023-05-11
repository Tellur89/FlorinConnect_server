// const User = require('../models/User');
// const Token = require('../models/token');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const handleLogin = async (req, res) => {
// 	const { username, password } = req.body;
// 	const findUser = await User.verifyLogin(req.body);
// 	const userID = await User.getOneByUsername(username);
// 	if (findUser) {
// 		const accessToken = jwt.sign({ username: findUser.username }, process.env.JWT_SECRET, { expiresIn: '30s' });
// 		const refreshToken = jwt.sign({ username: findUser.username }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' });

// 		//save refresh tokens
// 		const insertRefreshToken = await Token.create(userID.id, refreshToken);
// 		if (insertRefreshToken) {
// 			console.log('inserted refresh token');
// 		}
// 		res.cookie('jwt', refreshToken, {
// 			httpOnly: true,
// 			sameSite: 'None',
// 			secure: false,
// 			maxAge: 24 * 60 * 60 * 1000,
// 		});
// 		//store in memory
// 		res.json({ accessToken: accessToken });
// 	} else {
// 		res.sendStatus(401);
// 	}
// };

// module.exports = { handleLogin };
