const express = require("express");
const router = express.Router();

//load model
const postModel = require('../models/Post');

const { ensureAuth } = require('../../helpers/auth');

//create post
router.post("/:user_id", async(req, res) => {
  //await
  try {
    const { user_id } = req.params;
    const { title, img_link, description } = req.body;
    const post = await postModel.createPost(user_id, title, img_link);
    res.json(post.rows[0]);
  }catch(err) {
    console.error(err.message)
  }
});

//get all post
router.get("/", ensureAuth, async(req, res) => {
  try {
    const posts = await postModel.getPosts();
    res.json(posts.rows);
  } catch (err) {
    console.error(err.message);
  }
});


//get a post
router.get("/:post_id", async(req, res) => {
  try {
    const { post_id } = req.params;
    const post = await postModel.getPost(post_id);
    res.json(post.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


//update a post
router.put("/:post_id", async(req, res) => {
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
router.delete("/:post_id", async(req, res) => {
  try{
    const { post_id } = req.params;
    const post = await postModel.deletePost(post_id);
    res.json(`Successfully deleted ${post.rows[0].title}`)
  } catch(err) {
    console.error(err.message);
  }
});



module.exports = router;
