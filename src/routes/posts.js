const express = require("express");
const app = express();
const cors = require("cors");

//load model
const postModel = require('../models/Post');

//create post
app.post("/", async(req, res) => {
  //await
  try {
    const { title, img_link, description } = req.body;
    const post = await postModel.createPost(title, img_link, description);
    res.json(post.rows[0]);
  }catch(err) {
    console.error(err.message)
  }
});

//get all post
app.get("/", async(req, res) => {
  try {
    const posts = await postModel.getPosts();
    res.json(posts.rows);
  } catch (err) {
    console.error(err.message);
  }
});


//get a post
app.get("/:post_id", async(req, res) => {
  try {
    const { post_id } = req.params;
    const post = await postModel.getPost(post_id);
    res.json(post.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


//update a post
app.put("/:post_id", async(req, res) => {
  try{
    const { post_id } = req.params;
    const { title, img_link, description } = req.body;
    const post = await postModel.editPost(post_id, title, img_link, description);
    res.json(post.rows[0]);
  }catch(err) {
    console.error(err.message);
  }
});


//delete a new post
app.delete("/:post_id", async(req, res) => {
  try{
    const { post_id } = req.params;
    const post = await postModel.deletePost(post_id);
    res.json(`Successfully deleted ${post.rows[0].title}`)
  } catch(err) {
    console.error(err.message);
  }
});

module.exports = app;
