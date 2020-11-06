CREATE DATABASE grameme;

CREATE TABLE post (
  post_id SERIAL PRIMARY KEY,
  title VARCHAR(60) NOT NULL,
  img_link TEXT NOT NULL,
  upvote INT DEFAULT 0,
  downvote INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
