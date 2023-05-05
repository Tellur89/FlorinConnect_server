const Post = require('../models/Post');

async function index (req, res) {
    try {
        const posts = await Post.getAll();
        res.status(200).json(snacks);
    } catch (error) {
        res.status(404).json({"error": err.message});
    }
}

module.exports = {
    index
}
