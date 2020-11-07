const pool = require("../../config/db");

const model = {
  getUser : (id) => {
    return pool.query(
      `
        SELECT * FROM users
        WHERE id=$1
      `, [id]
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
