const db = require ('../database/connect');

class Post{
    constructor({post_id, title, content, category, date_created, open, completed, accepted, date_created, accepted_by_id}) {
        this.id = post_id;
        this.title = title;
        this.content = content;
        this.category = category;
        this.date_created = date_created;
        this.open = open;
        this.completed = completed;
        this.accepted = accepted;
        this.accepted_by_id = accepted_by_id;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM posts ORDER BY date_created;");
        if (response.rows.length === 0) {
            throw new Error("No posts available.")
        }
        return response.rows.map(p => new Post(p));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM posts WHERE post_id = $1;",[id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate post.")
        }
        return new Post(response.rows[0]);
    }

    static async create(data) {
        const title = data.title;
        const content = data.content;
        const category = data.category;
           
        const response = await db.query("INSERT INTO posts (title, content, category, date_created) VALUES ($1,$2,$3,NOW());",[title, content, category]);
        const postId = response.rows[0].post_id;
        const newPost = await Post.getOneById(postId);
        return newPost;
    }
}



module.exports = Post;
