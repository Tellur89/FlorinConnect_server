const db = require ('../database/connect');

class Post{
    constructor({post_id, category, title, task, open, accepted, closed, date_created}) {
        this.id = post_id;
        this.category = category;
        this.title = title;
        this.task = task;
        this.open = open;
        this.accepted = accepted;
        this.closed = closed;
        this.date_created = date_created;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM posts ORDER BY date_created;");
        if (response.rows.length === 0) {
            throw new Error("No posts available.")
        }
        return response.rows.map(p => new Post(p));
    }
}



module.exports = Post;
