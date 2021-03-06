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

  getUserByEmail : (email) => {
    return pool.query(
      `
        SELECT * FROM users
        WHERE email=$1
      `, [email]
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
        UPDATE users
          SET password = $2,
              updated_at = NOW()
        WHERE id = $1
      `, [id, password]
    );
  },

  deleteUser : (id) => {
    return pool.query(
      `
        DELETE FROM users
        WHERE id = $1
      `, [id]
    )
  }
};

module.exports = model;
