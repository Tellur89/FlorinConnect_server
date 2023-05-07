const Post = require('../models/Post');

async function index(req, res) {
	try {
		const posts = await Post.getAll();
		res.status(200).json(posts);
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
}

async function show(req, res) {
	try {
		const id = parseInt(req.params.id);
		const post = await Post.getOneById(id);
		res.status(200).json(post);
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
}

async function getByCategory(req, res) {
	try {
		const type = req.params.type;
		const posts = await Post.showByCategory(type);
		res.status(200).json(posts);
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
}

//Get by date
async function getByDate(req, res) {
	try {
		const { date } = req.params;
		console.log(date);
		const posts = await Post.showByDate(date);
		res.status(200).json(posts);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
}

//Get between dates - query needs to be send from client form
async function getBetweenDates(req, res) {
	try {
		const { startDate, endDate } = req.params;
		const posts = await Post.showBetweenDates(startDate, endDate);
		res.status(200).json(posts);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
}

async function getByOpen(req, res) {
	try {
		const posts = await Post.showByOpen();
		res.status(200).json(posts);
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
}

async function getByAccepted(req, res) {
	try {
		const posts = await Post.showByAccepted();
		res.status(200).json(posts);
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
}

async function getByCompleted(req, res) {
	try {
		const posts = await Post.showByCompleted();
		res.status(200).json(posts);
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
}

async function create(req, res) {
	try {
		const post = await Post.create(req.body);
		post.date_created = new Date(post.date_created).toLocaleDateString('en-GB', {
			timeZone: 'Europe/London',
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
		res.status(201).json(post);
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
}

async function update(req, res) {
	try {
		const id = parseInt(req.params.id);
		const data = await Post.getOneById(id);

		data.title = req.body.title || data.title;
		data.content = req.body.content || data.content;
		data.category = req.body.category || data.category;
		data.open = req.body.open || data.open;
		data.accepted = req.body.accepted || data.accepted;
		data.completed = req.body.completed || data.completed;
		data.accepted_by_id = req.body.accepted_by_id || data.accepted_by_id;

		const result = await Post.update(data);
		res.status(200).json(result);
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
}

async function destroy(req, res) {
	try {
		const id = parseInt(req.params.id);
		const result = await Post.destroy(id);
		res.json(result);
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
}

module.exports = {
	index,
	show,
	create,
	getByCategory,
	getByOpen,
	getByCompleted,
	getByAccepted,
	update,
	destroy,
	getBetweenDates,
	getByDate,
};
