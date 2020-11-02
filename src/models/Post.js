const pool = require("../../config/db");

const model = {
  createPost : (title, img_link, description) => {
  return pool.query(
      `INSERT INTO post (title, img_link, description)
        VALUES($1, $2, $3)
        RETURNING *`,
      [title, img_link, description]
    );
  },

  getPosts : () => {
    return pool.query(
      `SELECT * FROM post`
    );
  },

  getPost : (post_id) => {
    return pool.query(
      `SELECT * FROM post
        WHERE post_id  = $1`,
      [post_id]
    );
  },

  editPost : (post_id, title, img_link, description) => {
    return pool.query(
      `UPDATE post
          SET title = $2,
              img_link = $3,
              description = $4
        WHERE post_id = $1
        RETURNING *`
      , [post_id, title, img_link, description]
    );
  },

  deletePost : (post_id) => {
    return pool.query(
      `DELETE FROM post
        WHERE post_id = $1
        RETURNING *`,
      [post_id]
    );
  }


};

module.exports = model;
