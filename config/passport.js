const { Strategy } = require('passport-local');
const bcrypt = require("bcryptjs");

// load user model
const userModel = require('../src/models/Users');

module.exports = function (passport) {
  passport.use(new Strategy({usernameField: 'email'}, async (email, password, done)=>{
    console.log('accessed');

    const usr = await userModel.getUserByEmail(email);
    const user = usr.rows[0];
    if(!user) return done(null, false); //user does not exist make err msg vague
    console.log(user.password);
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if(err) throw err;

      if(isMatch) {
        return done(null, user);
        console.log("teest");

      } else {
        //incorrect password but make the error msg vague
        return done(null, false);
      }

    });
  }));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    const user = await userModel.getUser(id);
    done(err, user);
  })
}
