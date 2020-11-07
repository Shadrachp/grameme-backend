const express = require("express");
const app = express();
const cors = require("cors");

//load model
const userModel = require('../models/Users');

app.get('/', async(req, res) => {
  try {
    const users = await userModel.getUser();
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/', async(req, res) => {
  try {
    const {name, email, password} = req.body;
    const users = await userModel.register(name, email, password);
    res.json(users.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put('/change_password', async(req, res) => {
  try {
    const { password} = req.body;
    const user;
    // if(password === password2)
      user = await userModel.updatePassword(password);
      res.json("Password successfully updated.");
  } catch (err) {
    console.error(err.message);
  }
})

module.exports = app;
