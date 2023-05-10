// const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");

const db = require("../database/db");

class Token {
  constructor({ token_id, user_id, token }) {
    this.id = token_id;
    this.user_id = user_id;
    this.token = token;
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM tokens ORDER BY user_id;");
    if (response.rows.length === 0) {
      throw new Error("No data available.");
    }

    return response.rows.map((t) => new Token(t));
  }

  // create tokens for each users
  static async create(user_id, token) {
    //get user id
    // const getUserID = await db.query(
    //   "SELECT user_ID FROM users WHERE username = $1",
    //   [username]
    // );
    // let selectedUserID = getUserID.rows[0];
    // //expires in 1 week
    // const token = jwt.sign(selectedUserID, process.env.JWT_SECRET, {
    //   expiresIn: 604800,
    // });

    // const response = await db.query(
    //   "INSERT INTO tokens (user_id, token) VALUES ($1, $2)",
    //   [selectedUserID["user_id"], token]
    // );

    // if (response.rows.length != 0) {
    //   throw new Error("User ID does not exist.");
    // } else {
    //   return "Your token has been added";
    // }

    const response = await db.query(
      "INSERT INTO tokens (user_id, token) VALUES ($1,$2)",
      [user_id, token]
    );
    const tokenId = response.rows[0].token_id;
    const newToken = await Token.getOneById(tokenId);
    return newToken;
  }

  //get token details from token id
  static async getOneById(id) {
    const response = await db.query(
      "SELECT * FROM tokens WHERE token_id = $1",
      [id]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to locate Token.");
    } else {
      return new Token(response.rows[0]);
    }
  }
  //get token details from token value
  static async getOneByToken(token) {
    const response = await db.query("SELECT * FROM tokens where token = $1", [
      token,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate Token.");
    } else {
      return new Token(response.rows[0]);
    }
  }

  //get the username if it matches
  static async getUsername(id) {
    const response = await db.query(
      "SELECT users.username FROM tokens INNER JOIN users ON tokens.user_id = users.user_id where tokens.user_id = $1",
      [id]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to locate Token.");
    }
    return response.rows[0];
  }

  //delete token details from token value
  static async delete(token) {
    const response = await db.query("DELETE FROM tokens WHERE token = $1", [
      token,
    ]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate Token.");
    } else {
      return new Token(response.rows[0]);
    }
  }

  static async verifyLogin(data) {
    const { username, password } = data;

    const response = await db.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    if (response.rows.length != 1) {
      throw new Error("Unable to locate Token.");
    } else {
      return new Token(response.rows[0]);
    }
  }
}

module.exports = Token;
