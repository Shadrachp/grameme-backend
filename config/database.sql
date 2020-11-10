CREATE DATABASE grameme;

DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email)
);

CREATE TABLE post (
  post_id SERIAL PRIMARY KEY,
  user_id INT,
  title VARCHAR(60) NOT NULL,
  img_link TEXT NOT NULL,
  upvote INT DEFAULT 0,
  downvote INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT fk_post_users
    FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
);
