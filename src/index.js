const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const cors = require('cors');
const pool = require('../config/db');

const passport = require('passport');
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
  saveUninitialized: true,
  cookie: {
//        secure: true,
        maxAge:  24 * 60 * 60 * 1000 //sets cookie for 1 day
  }
}));

//load cookie-parser middleware
app.use(cookieParser());

//passport config
require('../config/passport')(passport);

//passportjs middleware
app.use(passport.initialize());
app.use(passport.session());

//Post Routes
app.use('/posts', posts);
app.use('/users', users);

//delete post

app.listen(3001, () => {
  console.log("server is up on port 3001");
});
