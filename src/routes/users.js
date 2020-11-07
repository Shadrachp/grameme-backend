const express = require("express");
const router = express.Router();
const cors = require("cors");

//load model
const userModel = require('../models/Users');

router.get('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const users = await userModel.getUser(id);
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.post('/', async(req, res) => {
  try {
    const {name, email} = req.body;
    const users = await userModel.register(name, email, req.body.password);
    res.json(users.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

router.put('/change_password/:id', async(req, res) => {
  try {
    const { id } = req.params;
    // if(password === password2)
    const user = await userModel.updatePassword(id, req.body.password);
      res.json("Password successfully updated.");
  } catch (err) {
    console.error(err.message);
  }
})

router.delete('/')

module.exports = router;
