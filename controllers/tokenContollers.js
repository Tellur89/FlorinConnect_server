const Token = require('../models/token.js');
const User = require('../models/User.js');

async function destroy(req, res) {
	try {
		const token = req.params.token;

		const deletedToken = await Token.deleteToken(token);
		res.status(204).json(deletedToken);
	} catch (error) {
		res.status(404).json({ error: err.message });
	}
}

async function checkIfAdmin(req, res) {
	try {
		const token = req.params.token;
		const findToken = await Token.getOneByToken(token);

		const userId = findToken.user_id;
		const user = await User.getOneById(userId);

		if (user.admin) {
			res.status(200).send(user);
		} else {
			res.status(200).send(user);
			console.log('It is not an admin');
		}
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
}

module.exports = { destroy, checkIfAdmin };

// //delete this when done testing
// async function index(req, res) {
// 	try {
// 		const tokens = await Token.getAll();
// 		res.status(200).json(tokens);
// 	} catch (err) {
// 		res.status(404).json({ error: err.message });
// 	}
// }

// async function create(req, res) {
// 	try {
// 		const { user_id } = req.body;
// 		const token = await Token.create(user_id);
// 		res.status(201).json({ token });
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}

// 	// try {
// 	// 	const data = req.body;
// 	// 	const userID = data['username'];
// 	// 	const token = await Token.create(userID);
// 	// 	res.status(201).json(token);
// 	// } catch (error) {
// 	// 	res.status(400).json({ error: error.message });
// 	// }
// }

// module.exports = {
// 	create,
// 	index,
// };
