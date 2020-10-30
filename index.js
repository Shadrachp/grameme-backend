const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./config/db");


//middleware
app.use(cors());
app.use(express.json());

//Routes
app.post("/posts", async(req, res) => {
  //await
  try {

    const { title, img_link, description } = req.body;
    const post = await pool.query(
      `INSERT INTO post(title, img_link, description)
      VALUES($1, $2, $3) RETURNING *`,
      [title, img_link, description]
    );

  }catch(err) {
    console.error(err.message)
  }
});

//create post

//get all post
app.get("/posts/test", async(req, res) => {
  try {
    const posts = await pool.query(
      `SELECT * FROM post;`
    );
    console.log(posts.rows);

  } catch (err) {
    console.error(err.message);
  }
})


//get a post
app.get("/posts/:post_id", async(req, res) => {
  try {
    const post = await pool.query(
      `
      SELECT * FROM post
      WHERE post_id  = $1
      `,
      [post_id]
  );
  res.json(post.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})


//update a post
// app.put("/posts/:id", async(req, res) => {
//   try{
//     const post = await pool.query(
// ,
//     )
//   }catch(err) {
//     console.error(err.message);
//   }
// })

//delete post

app.listen(3001, () => {
  console.log("server is up on port 3001");
});
