const express = require("express");
const session = require('express-session');
const cookieParser = require('cookie-parser');

const cors = require("cors");
const pool = require("../config/db");

const passport = require('passport');
const passportStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const app = express();

//Load routes
const posts = require('./routes/posts');
const users = require('./routes/users');

//middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));

//Post Routes
app.use('/posts', posts);
app.use('/users', users);

//delete post

app.listen(3001, () => {
  console.log("server is up on port 3001");
});
