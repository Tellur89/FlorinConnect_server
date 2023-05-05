const Post = require('../models/Post');

async function index (req, res) {
    try {
        const posts = await Post.getAll();
        res.status(200).json(posts);
    } catch (err) {
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

async function getByCategory (req, res) {
    try {
        const type = req.params.type
        const posts = await Post.showByCategory(type);
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function getByOpen (req, res) {
    try {
        const posts = await Post.showByOpen();
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function getByAccepted (req, res) {
    try {
        const posts = await Post.showByAccepted();
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
}

async function getByCompleted (req, res) {
    try {
        const posts = await Post.showByCompleted();
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({"error": err.message});
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
    index, show, create, getByCategory, getByOpen, getByCompleted, getByAccepted
}
