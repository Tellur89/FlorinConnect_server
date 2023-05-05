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
		const response = await db.query('SELECT * FROM users WHERE username = $1', [username]);

		if (response.rows.length != 1) {
			throw new Error('Unable to locate user by username.');
		}
		return new User(response.rows[0]);
	}

	// static async getAdmin(){
	//   const response =
	// }
}
