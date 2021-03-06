const express = require("express");
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

const { ensureAuth } = require('../../helpers/auth');

//load model
const userModel = require('../models/Users');

router.get('/get/:id', ensureAuth, async(req, res) => {
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
    const hashed = await bcrypt.hash(req.body.password, 10);
    const users = await userModel.register(name, email, hashed);
    res.json(users.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) throw err;
      if(!user) res.send('incorrect credentials');
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send("successfully logged in");
        })
      }
    })(req, res, next);
});

router.post('/logout', ensureAuth, (req, res) => {
  req.logout();
  req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.send("Successfully logged out");
  });
});

router.get('/test', ensureAuth, (req, res) => {

    res.send(req.user);
});

router.patch('/update/password', ensureAuth, async(req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = await userModel.updatePassword(req.user.rows[0].id, hashed);

    res.json("Password successfully updated");
  } catch (err) {
    console.error(err.message);
  }
});

router.delete('/delete/:id', ensureAuth, async(req, res)=> {
  try {
    const { id } = req.params;
    const user = await userModel.deleteUser(id);
    res.json("User successfully deleted");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
