// const Token = require('../models/token.js');

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
