const db = require('../database/db');

class Post {
	constructor({ post_id, title, content, category, date_created, image_url, open, completed, accepted, accepted_by_id }) {
		this.id = post_id;
		this.title = title;
		this.content = content;
		this.category = category;
		this.date_created = new Date(date_created).toLocaleDateString('en-GB', { timeZone: 'Europe/London' });
		this.image_url = image_url;
		this.open = open;
		this.completed = completed;
		this.accepted = accepted;
		this.accepted_by_id = accepted_by_id;
	}

	static async getAll() {
		const response = await db.query('SELECT * FROM posts ORDER BY date_created DESC;');
		if (response.rows.length === 0) {
			throw new Error('No posts available.');
		}
		return response.rows.map((p) => new Post(p));
	}

	static async getOneById(id) {
		const response = await db.query('SELECT * FROM posts WHERE post_id = $1;', [id]);
		if (response.rows.length != 1) {
			throw new Error('Unable to locate post.');
		}
		return new Post(response.rows[0]);
	}

	static async showByCategory(type) {
		const response = await db.query('SELECT * FROM posts WHERE category = $1 ORDER BY date_created;', [type]);
		if (response.rows.length === 0) {
			throw new Error('No posts available.');
		}
		return response.rows.map((p) => new Post(p));
	}

	// Show by Date
	static async showByDate(date) {
		const response = await db.query('SELECT * FROM posts WHERE date_created::date = $1::date;', [date]);
		if (response.rows.length < 1) {
			throw new Error('No posts found for the given date.');
		}
		return response.rows.map((p) => new Post(p));
	}

	//Show between dates
	static async showBetweenDates(startDate, endDate) {
		const response = await db.query('SELECT * FROM posts WHERE date_created BETWEEN $1::date AND $2::date ORDER BY date_created;', [startDate, endDate]);
		if (response.rows.length === 0) {
			throw new Error('No posts found between the given dates.');
		}
		return response.rows.map((p) => new Post(p));
	}

	//Show by keyword
	static async showByWord(word) {
		const response = await db.query('SELECT * FROM posts WHERE LOWER (content) LIKE $1 OR LOWER (title) LIKE $1;', ['%' + word + '%']);
		if (response.rows.length === 0) {
			throw new Error('No posts found by the given word');
		}
		return response.rows.map((p) => new Post(p));
	}

	static async showByOpen() {
		const response = await db.query('SELECT * FROM posts WHERE open = TRUE ORDER BY date_created;');

		if (response.rows.length === 0) {
			throw new Error('No open posts available.');
		}
		return response.rows.map((p) => new Post(p));
	}

	static async showByCompleted() {
		const response = await db.query('SELECT * FROM posts WHERE completed = TRUE ORDER BY date_created;');

		if (response.rows.length === 0) {
			throw new Error('No completed posts available.');
		}
		return response.rows.map((p) => new Post(p));
	}

	static async showByAccepted() {
		const response = await db.query('SELECT * FROM posts WHERE accepted = TRUE ORDER BY date_created;');

		if (response.rows.length === 0) {
			throw new Error('No accepted posts available.');
		}
		return response.rows.map((p) => new Post(p));
	}

	static async create(data) {
		const title = data.title;
		const content = data.content;
		const category = data.category;
		const now = new Date();
		const options = { timeZone: 'Europe/London' };
		const date_created = now.toLocaleDateString('en-GB', options);
		const image_url = data.image_url;

		const response = await db.query('INSERT INTO posts (title, content, category, date_created, image_url) VALUES ($1,$2,$3,$4,$5) RETURNING *;', [
			title,
			content,
			category,
			date_created,
			image_url,
		]);

		const postId = response.rows[0].post_id;
		const newPost = await Post.getOneById(postId);
		return newPost;
	}

	static async update(data) {
		const response = await db.query(
			'UPDATE posts SET title = $1, content = $2, category = $3, open = $4, completed = $5, accepted = $6, accepted_by_id = $7 WHERE post_id = $8 RETURNING *',
			[data.title, data.content, data.category, data.open, data.completed, data.accepted, data.accepted_by_id, data.id]
		);
		if (response.rowCount != 1) {
			throw new Error('Unable to update post.');
		}
		return new Post(response.rows[0]);
	}

	static async destroy(data) {
		const response = await db.query('DELETE FROM posts WHERE post_id = $1 RETURNING *;', [data]);
		if (response.rows.length != 1) {
			throw new Error('Unable to delete post.');
		}
		return new Post(response.rows[0]);
	}

	static async updateStatus(id) {
		const newPost = await Post.getOneById(id);

		if (newPost.open === true) {
			const response = await db.query('UPDATE posts SET open = FALSE, accepted = TRUE WHERE post_id = $1 RETURNING *', [newPost.id]);
		} else if (newPost.accepted === true) {
			const response = await db.query('UPDATE posts SET accepted = FALSE, completed = TRUE WHERE post_id = $1 RETURNING *', [newPost.id]);
		}

		if (response.rowCount != 1) {
			throw new Error('Unable to change post.');
		}

		return newPost;
	}
}

module.exports = Post;
