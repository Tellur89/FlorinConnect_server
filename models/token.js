// const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const db = require('../database/connect');

class Token {
	constructor({ token_id, user_id, token }) {
		this.token_id = token_id;
		this.user_id = user_id;
		this.token = token;
	}
	// create tokens for each users
	static async create(user_id) {
		// const token = uuidv4();
		const token = jwt.sign({ userId: user_id }, process.env.JWT_SECRET);
		const response = await db.query('INSERT INTO tokens (user_id, token) VALUES ($1, $2)', [user_id, token]);
		const newId = response.rows[0].token_id;
		const newToken = await Token.getOneByID(newId);
		return newToken;
	}

	//get token details from token id
	static async getOneById(id) {
		const response = await db.query('SELECT * FROM tokens WHERE token_id = $1', [id]);
		if (response.rows.length != 1) {
			throw new Error('Unable to locate Token.');
		} else {
			return new Token(response.rows[0]);
		}
	}
	//get token details from token value
	static async getOneByToken(token) {
		const response = await db.query('SELECT * FROM token where token = $1', [token]);
		if (response.rows.length != 1) {
			throw new Error('Unable to locate Token.');
		} else {
			return new Token(response.rows[0]);
		}
	}

	//delete token details from token value
	static async delete(token) {
		const response = await db.query('DELETE FROM token WHERE token = $1', [token]);
		if (response.rows.length != 1) {
			throw new Error('Unable to locate Token.');
		} else {
			return new Token(response.rows[0]);
		}
	}
}

module.exports = Token;
