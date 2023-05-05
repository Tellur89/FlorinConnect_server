const db = require('../database/db');

class User {
	constructor({ user_id, username, password, admin }) {
		this.id = user_id;
		this.username = username;
		this.password = password;
		this.admin = admin;
	}

	static async getOneById(id) {
		const response = await db.query('SELECT * FROM users WHERE user_id = $1', [id]);

		if (response.rows.length != 1) {
			throw new Error('Unable to locate user by ID.');
		}
		return new User(response.rows[0]);
	}

	static async getOneByUsername(username) {
		const response = await db.query('SELECT * FROM users WHERE username = $1;', [username]);

		if (response.rows.length != 1) {
			throw new Error('Unable to locate user by username.');
		}
		return new User(response.rows[0]);
	}

	static async getAdmin() {
		const response = await db.query('SELECT * FROM users WHERE admin = true;');

		if (response.rows.length != 1) {
			throw new Error('Unable to locate user by username.');
		}
		return new User(response.rows);
	}

	static async create(data) {
		const { username, password } = data;
		const response = await db.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id;', [username, password]);
		const newId = response.rows[0].user_id;
		const newUser = await User.getOneById(newId);
		return newUser;
	}

	static async update(data, id) {
		const { admin } = data;
		const response = await db.query('UPDATE users SET admin = $1 WHERE users_id = $2;', [admin, id]);

		if (response.rows.length != 1) {
			throw new Error('Unable to update the user');
		}
		return new User(response.rows[0]);
	}

	static async destroy() {
		const response = await db.query('DELETE FROM users WHERE user_id = $1', [this.id]);

		return new User(response.rows[0]);
	}
}

module.exports = Post;
