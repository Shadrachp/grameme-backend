const pool = require("../../config/db");

const model = {
  getUser : () => {
    return pool.query(
      `SELECT * FROM users`
    );
  },

  register : (name, email, password) => {
    return pool.query(
      `
        INSERT INTO users(name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *
      `, [name, email, password]
    );
  },

  updatePassword : (id, password) => {
    return pool.query(
      `
        UPDATE post
          SET password = $2
        WHERE id = $1
      `, [id, password]
    );
  }
};

module.exports = model;
