CREATE DATABASE grameme;

CREATE TABLE post (
  post_id SERIAL PRIMARY KEY,
  title VARCHAR(60),
  img_link TEXT,
  description VARCHAR(255)
);
