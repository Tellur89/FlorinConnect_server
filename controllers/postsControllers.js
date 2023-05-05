const Post = require('../models/Post');

async function index (req, res) {
    try {
        const posts = await Post.getAll();
        res.status(200).json(snacks);
    } catch (error) {
        res.status(404).json({"error": err.message});
    }
}

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const post = await Post.getOneById(id);
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function create (req, res) {
    try {
        const post = await Post.create(req.body);
        res.json(post);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}


module.exports = {
    index, show, create
}
