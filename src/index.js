const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("../config/db");

//Load routes
const posts = require('./routes/posts');

//middleware
app.use(cors());
app.use(express.json());



//Post Routes
app.use('/posts', posts);

//delete post

app.listen(3001, () => {
  console.log("server is up on port 3001");
});
