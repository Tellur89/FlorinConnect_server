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
}



module.exports = Post;
