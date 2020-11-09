const pool = require("../../config/db");

const model = {
  createPost : (user_id, title, img_link) => {
  return pool.query(
      `INSERT INTO post (user_id, title, img_link)
        VALUES($1, $2, $3)
        RETURNING *`,
      [user_id, title, img_link]
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

  editPost : (post_id, title, img_link) => {
    return pool.query(
      `UPDATE post
          SET title = $2,
              img_link = $3,
        WHERE post_id = $1
        RETURNING *`,
        [post_id, title, img_link]
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
